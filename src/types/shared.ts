import type { SocialLinkType } from './link-types';

export interface NormalizerOptions {
  url: string;
  type?: SocialLinkType;
  discovery?: boolean;
  onNotFoundTryWith?: SocialLinkType;
  attemptToResolveAs?: SocialLinkType;
}

export type SocialNetwork =
  | 'instagram'
  | 'facebook'
  | 'threads'
  | 'twitter'
  | 'youtube'
  | 'tiktok'
  | 'spotify'
  | 'discord'
  | 'telegram'
  | 'website'
  | 'soundcloud'
  | 'twitch'
  | 'google'
  | 'linkedin'
  | 'reddit'
  | 'app_store'
  | 'vkontakte'
  | 'tidal'
  | 'pinterest'
  | 'vimeo'
  | 'quora'
  | 'clubhouse'
  | 'kick'
  | 'onlyfans'
  | 'rumble'
  | 'snapchat'
  | 'unknown';

export interface Normalizer<T extends SocialLinkType = SocialLinkType> {
  normalize(options: NormalizerOptions): NormalizedLinkResult<T> | undefined;
}

export type NormalizedLinkResult<T extends SocialLinkType = SocialLinkType> = {
  url: string;
  type: T;
  network: SocialNetwork;
  error?: string;
  data?: {
    postId?: string | number;
    username?: string;
    userId?: string | number;
    [key: string | number]: unknown;
  };
};
