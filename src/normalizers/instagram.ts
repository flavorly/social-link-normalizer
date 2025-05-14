import type { InstagramLinkType } from '../types/link-types';
import type {
  NormalizedLinkResult,
  Normalizer,
  NormalizerOptions,
} from '../types/shared';
import { removeProtocolAndWWW, removeQueryString } from '../utils/url';

type InstagramNormalizerResult =
  | NormalizedLinkResult<InstagramLinkType>
  | undefined;
type InstagramNormalizerCheckFn = (
  url: string,
) => InstagramNormalizerResult | undefined;
type InstagramNormalizerChecks = Record<
  InstagramLinkType,
  InstagramNormalizerCheckFn
>;
export class InstagramNormalizer implements Normalizer<InstagramLinkType> {

  private static readonly PATTERNS = {
    post: [
      /^(?:(?<username>[a-zA-Z0-9._]{1,30})\/)?(p)\/(?<postId>[a-zA-Z0-9_-]+)/i,
    ],
    tv: [
      /^(?:(?<username>[a-zA-Z0-9._]{1,30})\/)?(tv)\/(?<postId>[a-zA-Z0-9_-]+)/i,
    ],
    reel: [
      /^(?:(?<username>[a-zA-Z0-9._]{1,30})\/)?(reels?)\/(?<postId>[a-zA-Z0-9_-]+)/i,
    ],
    story: [
      /^stories\/(?<storyUsername>[a-zA-Z0-9._]{1,30})(?:\/(?<postId>[a-zA-Z0-9_-]+))?\/?$/i,
    ],
    profile: [
      /^(?!stories|reels?|tv|p|video)(?<username>[a-zA-Z0-9._]{1,30})\/?$/i,
    ],
  };

  normalize(options: NormalizerOptions): InstagramNormalizerResult {
    // Remove protocol and www
    let url = removeProtocolAndWWW(options.url);
    url = removeQueryString(url);

    // Pipeline for each type
    const checks: InstagramNormalizerChecks = {
      instagram_post: (url) => this.photos({ ...options, url }),
      instagram_igtv: (url) => this.tv({ ...options, url }),
      instagram_reel: (url) => this.reels({ ...options, url }),
      instagram_story: (url) => this.stories({ ...options, url }),
      instagram_profile: (url) => this.username({ ...options, url }),
    };

    // Remove the Instagram domain and get the path only
    let path = url.match(/^(?:instagram\.com|instagr\.am)\/(.+)$/i)?.[1];

    // If we have a specific type to resolve, we use that
    if (options.as) {
      return checks[options.as as InstagramLinkType](path ?? url);
    }

    // No domain was found, and we dont want a fallback, so we return nothing
    if (!options.onNotFoundTryWith && !path) {
      return undefined;
    }

    // We get the path extracted or use the URL
    path = path ?? options.url;

    for (const [key, check] of Object.entries(checks)) {
      const result = check(path);
      if (result) {
        return result;
      }
    }
    return undefined;
  }

  photos(options: NormalizerOptions): InstagramNormalizerResult {
    for (const pattern of InstagramNormalizer.PATTERNS.post) {
      const match = options.url.match(pattern);
      console.log('Found post', match, options.url);
      if (match) {
        const { username, postId } = match.groups ?? {};
        if (!postId) return undefined;
        return this.toGenericUrl({
          username,
          postId,
          type: 'instagram_post',
          urlPath: 'p',
        });
      }
    }

    if (options.onNotFoundTryWith === 'instagram_post') {
      return this.toGenericUrl({
        postId: options.url,
        type: 'instagram_post',
        urlPath: 'p',
      });
    }

    return undefined;
  }

  tv(options: NormalizerOptions): InstagramNormalizerResult {
    for (const pattern of InstagramNormalizer.PATTERNS.tv) {
      const match = options.url.match(pattern);
      if (match) {
        const { username, postId } = match.groups ?? {};
        if (!postId) return undefined;
        return this.toGenericUrl({
          username,
          postId,
          type: 'instagram_igtv',
          urlPath: 'tv',
        });
      }
    }

    if (options.onNotFoundTryWith === 'instagram_igtv') {
      return this.toGenericUrl({
        postId: options.url,
        type: 'instagram_igtv',
        urlPath: 'tv',
      });
    }

    return undefined;
  }

  reels(options: NormalizerOptions): InstagramNormalizerResult {
    for (const pattern of InstagramNormalizer.PATTERNS.reel) {
      const match = options.url.match(pattern);
      if (match) {
        const { username, postId } = match.groups ?? {};
        if (!postId) return undefined;
        return this.toGenericUrl({
          username,
          postId,
          type: 'instagram_reel',
          urlPath: 'reel',
        });
      }
    }

    if (options.onNotFoundTryWith === 'instagram_reel') {
      return this.toGenericUrl({
        postId: options.url,
        type: 'instagram_reel',
        urlPath: 'reel',
      });
    }

    return undefined;
  }

  stories(options: NormalizerOptions): InstagramNormalizerResult {
    for (const pattern of InstagramNormalizer.PATTERNS.story) {
      const match = options.url.match(pattern);
      if (match) {
        const { storyUsername, postId } = match.groups ?? {};

        const targetUsername = storyUsername ?? options.url.replace('@', '');
        if (!targetUsername) return undefined;

        // Stories have a different URL structure
        const link = postId
          ? `https://www.instagram.com/stories/${targetUsername}/${postId}`
          : `https://www.instagram.com/stories/${targetUsername}/`;

        return {
          url: link,
          type: 'instagram_story',
          network: 'instagram',
          data: {
            username: targetUsername,
            ...(postId && {
              postId,
            }),
          },
        };
      }
    }

    if (options.onNotFoundTryWith === 'instagram_story') {
      const username = options.url.replace('@', '');
      return {
        url: `https://www.instagram.com/stories/${username}/`,
        type: 'instagram_story',
        network: 'instagram',
        data: {
          username,
        },
      };
    }

    return undefined;
  }

  username(options: NormalizerOptions): InstagramNormalizerResult {
    for (const pattern of InstagramNormalizer.PATTERNS.profile) {
      const match = options.url.match(pattern);
      console.log('Found profile Matches/URL', match, options.url);
      if (match) {
        const { username } = match.groups ?? {};
        if (!username) {
          return undefined;
        }
        return {
          url: `https://www.instagram.com/${username}/`,
          type: 'instagram_profile',
          network: 'instagram',
          data: {
            username,
          },
        };
      }
    }

    if (options.onNotFoundTryWith === 'instagram_profile') {
      const username = options.url.replace(/^@/, '');
      return {
        url: `https://www.instagram.com/${username}/`,
        type: 'instagram_profile',
        network: 'instagram',
        data: {
          username,
        },
      };
    }

    return undefined;
  }

  fromShortCodeToMediaId(shortcode: string): string | undefined {
    try {
      const code = 'A'.repeat(Math.max(0, 12 - shortcode.length)) + shortcode;
      const standardBase64 = code.replace(/-/g, '+').replace(/_/g, '/');

      const paddedBase64 = standardBase64.padEnd(
        Math.ceil(standardBase64.length / 4) * 4,
        '=',
      );
      const buffer = Buffer.from(paddedBase64, 'base64');
      let value = 0n;
      for (const byte of buffer) {
        value = (value << 8n) | BigInt(byte);
      }
      return value.toString();
    } catch {
      return undefined;
    }
  }

  private toGenericUrl(options: {
    username?: string;
    postId: string;
    type: InstagramLinkType;
    urlPath: 'p' | 'tv' | 'reel';
  }): NormalizedLinkResult<InstagramLinkType> {
    const link = options.username
      ? `https://www.instagram.com/${options.username}/${options.urlPath}/${options.postId}`
      : `https://www.instagram.com/${options.urlPath}/${options.postId}`;

    return {
      url: link,
      type: options.type,
      network: 'instagram',
      data: {
        username: options.username,
        postId: options.postId,
        mediaId: this.fromShortCodeToMediaId(options.postId),
      },
    };
  }

  fromMediaIdToShortCode(mediaId: string | number): string | undefined {
    try {
      let id = BigInt(mediaId);

      const buffer = Buffer.alloc(9);
      for (let i = 8; i >= 0; i--) {
        buffer[i] = Number(id & 255n);
        id >>= 8n;
      }
      let encoded = buffer
        .toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
      encoded = encoded.replace(/^A+/, '').padStart(11, 'A');

      return encoded;
    } catch {
      return undefined;
    }
  }
}
