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

  public static readonly VIDEO_PATTERNS = [
    /^(?:(?<username>[a-zA-Z0-9._]{1,30})\/)?(video)\/(?<postId>[a-zA-Z0-9_-]+)/i
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
      // this.media(path),
      // this.reels(path),
      // this.stories(path),
      // this.username(path),
      // this.userProfile(path),
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


        const link = username
          ? `https://www.instagram.com/${username}/p/${postId}`
          : `https://www.instagram.com/p/${postId}`;

        if (!postId) {
          return undefined;
        }

        return {
          url: link,
          type: "instagram_post",
          network: "instagram",
          data: {
            username,
            postId,
            mediaId: this.fromShortCodeToMediaId(postId),
          },
        };
      }
    }

    if (options.whenNotFoundUse === "instagram_post") {
      return {
        url: `https://www.instagram.com/p/${options.url}`,
        type: "instagram_post",
        network: "instagram",
        data: {
          postId: options.url,
          mediaId: this.fromShortCodeToMediaId(options.url),
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
