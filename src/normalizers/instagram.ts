import type { InstagramLinkType, SocialLinkType } from "../types/link-types";
import type { NormalizedLinkResult, Normalizer, NormalizerOptions } from "../types/shared";

export class InstagramNormalizer implements Normalizer<InstagramLinkType> {

  public static readonly DOMAIN_REGEX = /^(?:https?:\/\/)?(?:www\.)?instagram\.com/i;
  public static readonly MEDIA_PATTERNS = [/^https?:\/\/(?:www\.)?instagram\.com\/(?:p|tv|videos?)\/([a-zA-Z0-9_-]+)/i];
  public static readonly REEL_PATTERNS = [/^https?:\/\/(?:www\.)?instagram\.com\/reels?\/([a-zA-Z0-9_-]+)/i];
  public static readonly STORY_PATTERNS = [/^https?:\/\/(?:www\.)?instagram\.com\/stories\/([a-zA-Z0-9._]{1,30})(?:\/[a-zA-Z0-9_-]+)?\/?/i];
  public static readonly USERNAME_PATTERN = /^(?:https?:\/\/(?:www\.)?instagram\.com\/)?([a-zA-Z0-9._]{1,30})(?:\/(?:[^p/][\w.-]*)*)?\/?$/i;
  public static readonly USER_PROFILE_PATH_PATTERN = /^https?:\/\/(?:www\.)?instagram\.com\/([a-zA-Z0-9._]{1,30})\/?(?!\w|\?.*)/i;

  normalize(options: NormalizerOptions): NormalizedLinkResult<InstagramLinkType> {
    return {
      url: "works!",
      type: "instagram_likes",
      network: "instagram",
    };
  }

  private isInstagramMedia(url: string): boolean {
    return InstagramNormalizer.MEDIA_PATTERNS.some(pattern => pattern.test(url)) || this.fromShortCodeToMediaId(url) !== undefined;
  }

  private isInstagramReel(url: string): boolean {
    return InstagramNormalizer.REEL_PATTERNS.some(pattern => pattern.test(url));
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
