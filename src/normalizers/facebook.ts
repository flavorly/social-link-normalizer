import type { FacebookLinkType } from '../types/link-types';
import type {
  NormalizedLinkResult,
  Normalizer,
  NormalizerOptions,
} from '../types/shared';
import { pipe } from '../utils/generic';
import { onlyQueryParams } from '../utils/url';

type FacebookNormalizerResult = NormalizedLinkResult<FacebookLinkType> | undefined;
type FacebookNormalizerCheckFn = (
  url: string,
) => FacebookNormalizerResult | undefined;
type FacebookNormalizerChecks = Record<
  FacebookLinkType,
  FacebookNormalizerCheckFn
>;

export class FacebookNormalizer implements Normalizer<FacebookLinkType> {
  private static readonly PATTERNS = {
    post: [
      // Regular post pattern
      /^(?:(?<username>[a-zA-Z0-9._-]{1,50})\/)?(posts?)\/(?<postId>[0-9]+)/i,
      // Permalink pattern
      /^permalink\.php$/i,
      // Mobile story pattern
      /^(?:m\/)?story\.php$/i,
      // Activity pattern
      /^(?<userId>[0-9]+)\/activity\/(?<postId>[0-9]+)/i,
      // Group post pattern
      /^groups\/(?<groupId>[0-9]+)\/permalink\/(?<postId>[0-9]+)/i,
    ],
    video: [
      // Regular video pattern
      /^(?:(?<username>[a-zA-Z0-9._-]{1,50})\/)?(videos?)\/(?<videoId>[0-9]+)/i,
      // Watch pattern
      /^watch$/i,
      // Video.php pattern
      /^video\.php$/i,
    ],
    live_video: [
      // Watch live pattern
      /^watch\/live$/i,
      // Live video pattern
      /^live\/video\/(?<videoId>[0-9]+)/i,
    ],
    reel: [
      // Regular reel pattern
      /^reel\/(?<videoId>[0-9]+)/i,
      // Username reel pattern
      /^(?<username>[a-zA-Z0-9._-]{1,50})\/reels\/(?<videoId>[0-9]+)/i,
    ],
    photo: [
      // Photo.php pattern
      /^photo\.php$/i,
      // Regular photo pattern
      /^(?<username>[a-zA-Z0-9._-]{1,50})\/photos\/(?<photoId>[0-9]+)/i,
    ],
    profile: [
      // Profile pattern
      /^(?!posts?|photos?|videos?|groups?|events?|notes?|watch|reel|permalink\.php|story\.php|video\.php|photo\.php|profile\.php)(?:@)?(?<username>[a-zA-Z0-9._-]{1,50})(?:\/(?:posts?|photos?|videos?|reels?|activity)\/[0-9]+)?\/?$/i,
      // Profile.php pattern
      /^profile\.php$/i,
      // Simple username pattern
      /^@?(?<username>[a-zA-Z0-9._-]{1,50})$/i,
    ],
    page: [
      // Pages pattern
      /^pages\/(?<pageName>[^/]+)\/(?<pageId>[0-9]+)/i,
      // Simple page pattern (same as profile, but marked as page)
      /^(?!posts?|photos?|videos?|groups?|events?|notes?|watch|reel|permalink\.php|story\.php|video\.php|photo\.php|profile\.php)(?<pageName>[a-zA-Z0-9._-]{1,50})\/?$/i,
    ],
    group: [
      // Group pattern
      /^groups\/(?<groupId>[0-9]+)(?:\/permalink\/(?<postId>[0-9]+))?/i,
    ],
    event: [
      // Event pattern
      /^events\/(?<eventId>[0-9]+)/i,
    ],
    note: [
      // Note pattern
      /^notes\/(?<username>[a-zA-Z0-9._-]{1,50})\/(?:[^/]+)\/(?<noteId>[0-9]+)/i,
    ],
    redirect: [
      // Redirect patterns
      /^l\.php$/i,
      /^lm\.php$/i,
    ],
  };

  normalize(options: NormalizerOptions): FacebookNormalizerResult {
    // Remove extra query params but keep important ones
    const url = pipe(
      options.url,
      (url) =>
        onlyQueryParams(url, [
          'story_fbid',
          'id',
          'v',
          'fbid',
          'comment_id',
          'u',
        ]),
    );

    // Pipeline for each type
    const checks: FacebookNormalizerChecks = {
      facebook_post: (url) => this.posts({ ...options, url }),
      facebook_profile: (url) => this.profile({ ...options, url }),
      facebook_photo: (url) => this.photos({ ...options, url }),
      facebook_video: (url) => this.videos({ ...options, url }),
      facebook_page: (url) => this.pages({ ...options, url }),
      facebook_group: (url) => this.groups({ ...options, url }),
      facebook_event: (url) => this.events({ ...options, url }),
      facebook_note: (url) => this.notes({ ...options, url }),
      facebook_live_video: (url) => this.liveVideos({ ...options, url }),
    };

    // Remove the Facebook domain and get the path only
    let path = url.match(
      /^(?:(?:www|m)\.)?(?:facebook\.com|fb\.com)\/(.+)$/i,
    )?.[1];

    // If we have a specific type to resolve, we use that
    if (options.as) {
      return checks[options.as as FacebookLinkType](path ?? url);
    }

    // No domain was found, and we dont want a fallback, so we return nothing
    if (!options.onNotFoundTryWith && !path) {
      return undefined;
    }

    // We get the path extracted or use the URL
    path = path ?? options.url;

    for (const [_key, check] of Object.entries(checks)) {
      const result = check(path);
      if (result) {
        return result;
      }
    }
    return undefined;
  }

  posts(options: NormalizerOptions): FacebookNormalizerResult {
    // Extract query parameters
    const url = new URL(
      options.url.startsWith('http') ? options.url : `https://facebook.com/${options.url}`,
    );
    const storyFbid = url.searchParams.get('story_fbid');
    const id = url.searchParams.get('id');

    // Handle permalink.php and story.php cases
    if (
      url.pathname.endsWith('permalink.php') ||
      url.pathname.endsWith('story.php')
    ) {
      if (!storyFbid || !id) return undefined;
      return {
        url: `https://www.facebook.com/permalink.php?story_fbid=${storyFbid}&id=${id}`,
        type: 'facebook_post',
        network: 'facebook',
        data: {
          postId: storyFbid,
          userId: id,
        },
      };
    }

    // Handle other patterns
    for (const pattern of FacebookNormalizer.PATTERNS.post) {
      const match = url.pathname.match(pattern);
      if (match) {
        const { username, userId, postId, groupId } = match.groups ?? {};

        // Group post
        if (groupId && postId) {
          return {
            url: `https://www.facebook.com/groups/${groupId}/permalink/${postId}/`,
            type: 'facebook_post',
            network: 'facebook',
            data: {
              groupId,
              postId,
            },
          };
        }

        // Regular post
        if (postId) {
          const baseUrl = username
            ? `https://www.facebook.com/${username}/posts/${postId}`
            : (userId
              ? `https://www.facebook.com/${userId}/posts/${postId}`
              : `https://www.facebook.com/posts/${postId}`);

          // Add comment_id if present
          const commentId = url.searchParams.get('comment_id');
          const finalUrl = commentId ? `${baseUrl}?comment_id=${commentId}` : baseUrl;

          return {
            url: finalUrl,
            type: 'facebook_post',
            network: 'facebook',
            data: {
              ...(username && { username }),
              ...(userId && { userId }),
              postId,
              ...(commentId && { commentId }),
            },
          };
        }
      }
    }

    if (options.onNotFoundTryWith === 'facebook_post') {
      return {
        url: `https://www.facebook.com/posts/${options.url}`,
        type: 'facebook_post',
        network: 'facebook',
        data: {
          postId: options.url,
        },
      };
    }

    return undefined;
  }

  videos(options: NormalizerOptions): FacebookNormalizerResult {
    const url = new URL(
      options.url.startsWith('http') ? options.url : `https://facebook.com/${options.url}`,
    );
    const videoId = url.searchParams.get('v');

    // Handle watch and video.php cases
    if (
      url.pathname.endsWith('watch') ||
      url.pathname.endsWith('video.php')
    ) {
      if (!videoId) return undefined;
      return {
        url: `https://www.facebook.com/watch/?v=${videoId}`,
        type: 'facebook_video',
        network: 'facebook',
        data: {
          videoId,
        },
      };
    }

    // Handle other patterns
    for (const pattern of FacebookNormalizer.PATTERNS.video) {
      const match = url.pathname.match(pattern);
      if (match) {
        const { username, videoId } = match.groups ?? {};
        if (!videoId) continue;

        return {
          url: username
            ? `https://www.facebook.com/${username}/videos/${videoId}`
            : `https://www.facebook.com/watch/?v=${videoId}`,
          type: 'facebook_video',
          network: 'facebook',
          data: {
            ...(username && { username }),
            videoId,
          },
        };
      }
    }

    return undefined;
  }

  liveVideos(options: NormalizerOptions): FacebookNormalizerResult {
    const url = new URL(
      options.url.startsWith('http') ? options.url : `https://facebook.com/${options.url}`,
    );
    const videoId = url.searchParams.get('v');

    // Handle watch/live case
    if (url.pathname.endsWith('watch/live')) {
      if (!videoId) return undefined;
      return {
        url: `https://www.facebook.com/watch/live/?v=${videoId}`,
        type: 'facebook_live_video',
        network: 'facebook',
        data: {
          videoId,
        },
      };
    }

    // Handle other patterns
    for (const pattern of FacebookNormalizer.PATTERNS.live_video) {
      const match = url.pathname.match(pattern);
      if (match) {
        const { username, videoId } = match.groups ?? {};
        if (!videoId) continue;

        return {
          url: username
            ? `https://www.facebook.com/${username}/videos/${videoId}/`
            : `https://www.facebook.com/live/video/${videoId}`,
          type: 'facebook_live_video',
          network: 'facebook',
          data: {
            ...(username && { username }),
            videoId,
          },
        };
      }
    }

    return undefined;
  }

  photos(options: NormalizerOptions): FacebookNormalizerResult {
    const url = new URL(
      options.url.startsWith('http') ? options.url : `https://facebook.com/${options.url}`,
    );
    const fbid = url.searchParams.get('fbid');
    const id = url.searchParams.get('id');

    // Handle photo.php case
    if (url.pathname.endsWith('photo.php')) {
      if (!fbid || !id) return undefined;
      return {
        url: `https://www.facebook.com/photo.php?fbid=${fbid}&id=${id}`,
        type: 'facebook_photo',
        network: 'facebook',
        data: {
          photoId: fbid,
          userId: id,
        },
      };
    }

    // Handle other patterns
    for (const pattern of FacebookNormalizer.PATTERNS.photo) {
      const match = url.pathname.match(pattern);
      if (match) {
        const { username, photoId } = match.groups ?? {};
        if (!photoId || !username) continue;

        return {
          url: `https://www.facebook.com/${username}/photos/${photoId}`,
          type: 'facebook_photo',
          network: 'facebook',
          data: {
            username,
            photoId,
          },
        };
      }
    }

    return undefined;
  }

  profile(options: NormalizerOptions): FacebookNormalizerResult {
    const url = new URL(
      options.url.startsWith('http') ? options.url : `https://facebook.com/${options.url}`,
    );
    const id = url.searchParams.get('id');

    // Handle profile.php case
    if (url.pathname.endsWith('profile.php')) {
      if (!id) return undefined;
      return {
        url: `https://www.facebook.com/profile.php?id=${id}`,
        type: 'facebook_profile',
        network: 'facebook',
        data: {
          userId: id,
        },
      };
    }

    // Handle other patterns
    for (const pattern of FacebookNormalizer.PATTERNS.profile) {
      const match = url.pathname.match(pattern);
      if (match) {
        const { username } = match.groups ?? {};
        if (!username) continue;

        return {
          url: `https://www.facebook.com/${username}/`,
          type: 'facebook_profile',
          network: 'facebook',
          data: {
            username,
          },
        };
      }
    }

    if (options.onNotFoundTryWith === 'facebook_profile') {
      const username = options.url.replace(/^@/, '');
      return {
        url: `https://www.facebook.com/${username}/`,
        type: 'facebook_profile',
        network: 'facebook',
        data: {
          username,
        },
      };
    }

    return undefined;
  }

  pages(options: NormalizerOptions): FacebookNormalizerResult {
    for (const pattern of FacebookNormalizer.PATTERNS.page) {
      const match = options.url.match(pattern);
      if (match) {
        const { pageName, pageId } = match.groups ?? {};
        if (!pageName) continue;

        return {
          url: pageId
            ? `https://www.facebook.com/pages/${pageName}/${pageId}`
            : `https://www.facebook.com/${pageName}/`,
          type: 'facebook_page',
          network: 'facebook',
          data: {
            pageName,
            ...(pageId && { pageId }),
          },
        };
      }
    }

    return undefined;
  }

  groups(options: NormalizerOptions): FacebookNormalizerResult {
    for (const pattern of FacebookNormalizer.PATTERNS.group) {
      const match = options.url.match(pattern);
      if (match) {
        const { groupId, postId } = match.groups ?? {};
        if (!groupId) continue;

        return {
          url: postId
            ? `https://www.facebook.com/groups/${groupId}/permalink/${postId}/`
            : `https://www.facebook.com/groups/${groupId}`,
          type: 'facebook_group',
          network: 'facebook',
          data: {
            groupId,
            ...(postId && { postId }),
          },
        };
      }
    }

    return undefined;
  }

  events(options: NormalizerOptions): FacebookNormalizerResult {
    for (const pattern of FacebookNormalizer.PATTERNS.event) {
      const match = options.url.match(pattern);
      if (match) {
        const { eventId } = match.groups ?? {};
        if (!eventId) continue;

        return {
          url: `https://www.facebook.com/events/${eventId}`,
          type: 'facebook_event',
          network: 'facebook',
          data: {
            eventId,
          },
        };
      }
    }

    return undefined;
  }

  notes(options: NormalizerOptions): FacebookNormalizerResult {
    for (const pattern of FacebookNormalizer.PATTERNS.note) {
      const match = options.url.match(pattern);
      if (match) {
        const { username, noteId } = match.groups ?? {};
        if (!username || !noteId) continue;

        return {
          url: `https://www.facebook.com/notes/${username}/${noteId}`,
          type: 'facebook_note',
          network: 'facebook',
          data: {
            username,
            noteId,
          },
        };
      }
    }

    return undefined;
  }
} 