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

    // Extract path after domain
    const isInstagramDomain = url.match(/^(?:instagram\.com|instagr\.am)\/(.+)$/i);
    if (!isInstagramDomain || !isInstagramDomain[1]) {
      return undefined;
    }

    const path = isInstagramDomain[1];

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

  private photos(options: NormalizerOptions): NormalizedLinkResult<InstagramLinkType> | undefined {
    for (const pattern of InstagramNormalizer.PHOTO_PATTERNS) {
      const match = options.url.match(pattern);
      if (match) {
        const { username, postId } = match.groups ?? {};

        const link = username
          ? `https://www.instagram.com/${username}/p/${postId}`
          : `https://www.instagram.com/p/${postId}`;

        return {
          url: link,
          type: "instagram_post",
          network: "instagram",
          data: {
            username,
            postId,
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
        },
      };
    }

    return undefined;
  }

  private fromShortCodeToMediaId(code: string): string | undefined {
    try {
      const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
      const base = alphabet.length;
      let mediaId = 0;

      for (const char of code) {
        const index = alphabet.indexOf(char);
        if (index === -1) {
          throw new Error(`Invalid character "${char}" in shortcode`);
        }
        mediaId = mediaId * base + index;
      }

      return mediaId.toString();
    } catch {
      return undefined;
    }
  }

  private fromMediaIdtoShortCode(mediaId: number): string | undefined {
    try {
      const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
      const base = alphabet.length;
      let shortcode = '';

      while (mediaId > 0) {
        const remainder = mediaId % base;
        shortcode = alphabet[remainder] + shortcode;
        mediaId = Math.floor(mediaId / base);
      }
      return shortcode;
    } catch {
      return undefined;
    }
  }
}
