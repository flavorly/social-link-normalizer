import type { InstagramLinkType } from "../types/link-types";
import type { NormalizedLinkResult, Normalizer, NormalizerOptions } from "../types/shared";
import { removeProtocalAndWWW } from "../utils/url";

export class InstagramNormalizer implements Normalizer<InstagramLinkType> {

  public static readonly MEDIA_PATTERNS = [
    /^(?:(?<username>[a-zA-Z0-9._]{1,30})\/)?((?<type>p|tv|video))\/(?<mediaId>[a-zA-Z0-9_-]+)/i
  ];

  public static readonly PHOTO_PATTERNS = [
    /^(?:(?<username>[a-zA-Z0-9._]{1,30})\/)?(p)\/(?<postId>[a-zA-Z0-9_-]+)/i
  ];

  public static readonly TV_PATTERNS = [
    /^(?:(?<username>[a-zA-Z0-9._]{1,30})\/)?(tv)\/(?<postId>[a-zA-Z0-9_-]+)/i
  ];

  public static readonly REEL_PATTERNS = [
    /^(?:(?<username>[a-zA-Z0-9._]{1,30})\/)?(reels?)\/(?<postId>[a-zA-Z0-9_-]+)/i
  ];

  public static readonly STORY_PATTERNS = [
    /^(?:(?<username>[a-zA-Z0-9._]{1,30})\/)?(stories)\/(?<storyUsername>[a-zA-Z0-9._]{1,30})(?:\/(?<postId>[a-zA-Z0-9_-]+))?\/?/i
  ];

  public static readonly USERNAME_PATTERN = [
    /^(?<username>[a-zA-Z0-9._]{1,30})(?:\/(?:[^p/][\w.-]*)*)?\/?$/i
  ];

  public static readonly USER_PROFILE_PATH_PATTERN = [
    /^(?<username>[a-zA-Z0-9._]{1,30})\/?(?!\w|\?.*)/i
  ];

  normalize(options: NormalizerOptions): NormalizedLinkResult<InstagramLinkType> | undefined {
    const url = removeProtocalAndWWW(options.url);

    let path = url.match(/^(?:instagram\.com|instagr\.am)\/(.+)$/i)?.[1]
    if (!options.whenNotFoundUse && !path) {
      return undefined;
    }

    // We get the path extracted or use the URL
    path = path ?? options.url;

    const checks = [
      this.photos({ ...options, url: path }),
      this.tv({ ...options, url: path }),
      this.reels({ ...options, url: path }),
      this.stories({ ...options, url: path }),
      // this.stories({ ...options, url: path }),
      // this.username({ ...options, url: path }),
      // this.userProfile({ ...options, url: path }),
    ];

    for (const check of checks) {
      if (check) {
        return check;
      }
    }

    return undefined;
  }

  photos(options: NormalizerOptions): NormalizedLinkResult<InstagramLinkType> | undefined {
    for (const pattern of InstagramNormalizer.PHOTO_PATTERNS) {
      const match = options.url.match(pattern);
      if (match) {
        const { username, postId } = match.groups ?? {};
        if (!postId) return undefined;
        return this.toGenericUrl({ username, postId, type: "instagram_post", urlPath: "p" });
      }
    }

    if (options.whenNotFoundUse === "instagram_post") {
      return this.toGenericUrl({ postId: options.url, type: "instagram_post", urlPath: "p" });
    }

    return undefined;
  }

  tv(options: NormalizerOptions): NormalizedLinkResult<InstagramLinkType> | undefined {
    for (const pattern of InstagramNormalizer.TV_PATTERNS) {
      const match = options.url.match(pattern);
      if (match) {
        const { username, postId } = match.groups ?? {};
        if (!postId) return undefined;
        return this.toGenericUrl({ username, postId, type: "instagram_igtv", urlPath: "tv" });
      }
    }

    if (options.whenNotFoundUse === "instagram_igtv") {
      return this.toGenericUrl({ postId: options.url, type: "instagram_igtv", urlPath: "tv" });
    }

    return undefined;
  }

  reels(options: NormalizerOptions): NormalizedLinkResult<InstagramLinkType> | undefined {
    for (const pattern of InstagramNormalizer.REEL_PATTERNS) {
      const match = options.url.match(pattern);
      if (match) {
        const { username, postId } = match.groups ?? {};
        if (!postId) return undefined;
        return this.toGenericUrl({ username, postId, type: "instagram_reel", urlPath: "reel" });
      }
    }

    if (options.whenNotFoundUse === "instagram_reel") {
      return this.toGenericUrl({ postId: options.url, type: "instagram_reel", urlPath: "reel" });
    }

    return undefined;
  }

  stories(options: NormalizerOptions): NormalizedLinkResult<InstagramLinkType> | undefined {
    for (const pattern of InstagramNormalizer.STORY_PATTERNS) {
      const match = options.url.match(pattern);
      if (match) {
        const { username, storyUsername, postId } = match.groups ?? {};

        const targetUsername = storyUsername ?? username;
        if (!targetUsername) return undefined;

        // Stories have a different URL structure
        const link = postId
          ? `https://www.instagram.com/stories/${targetUsername}/${postId}`
          : `https://www.instagram.com/stories/${targetUsername}/`;

        return {
          url: link,
          type: "instagram_story",
          network: "instagram",
          data: {
            username: targetUsername,
            ...(postId && {
              postId
            })
          },
        };
      }
    }

    if (options.whenNotFoundUse === "instagram_story") {
      const username = options.url.replace('@', '');
      return {
        url: `https://www.instagram.com/stories/${username}/`,
        type: "instagram_story",
        network: "instagram",
        data: {
          username
        },
      };
    }

    return undefined;
  }

  fromShortCodeToMediaId(shortcode: string): string | undefined {
    try {
      const code = 'A'.repeat(Math.max(0, 12 - shortcode.length)) + shortcode;
      const standardBase64 = code
        .replace(/-/g, '+')
        .replace(/_/g, '/');

      const paddedBase64 = standardBase64.padEnd(Math.ceil(standardBase64.length / 4) * 4, '=');
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
    urlPath: string;
  }): NormalizedLinkResult<InstagramLinkType> {
    const link = options.username
      ? `https://www.instagram.com/${options.username}/${options.urlPath}/${options.postId}`
      : `https://www.instagram.com/${options.urlPath}/${options.postId}`;

    return {
      url: link,
      type: options.type,
      network: "instagram",
      data: {
        username: options.username,
        postId: options.postId,
        mediaId: this.fromShortCodeToMediaId(options.postId),
      },
    };
  }

  fromMediaIdtoShortCode(mediaId: string | number): string | undefined {
    try {
      let id = BigInt(mediaId);

      const buffer = Buffer.alloc(9);
      for (let i = 8; i >= 0; i--) {
        buffer[i] = Number(id & 255n);
        id >>= 8n;
      }
      let encoded = buffer.toString('base64')
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
