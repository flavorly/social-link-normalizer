import type { SocialLinkType } from './link-types';

export interface NormalizerOptions {
  url: string | URL;
  type?: SocialLinkType;
  discovery?: boolean;
}

export type SocialNetwork = 'instagram'
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
  normalize(options: NormalizerOptions): NormalizedLinkResult<T>;
}

export type NormalizedLinkResult<T extends SocialLinkType = SocialLinkType> = {
  url: string;
  type: T;
  network: SocialNetwork;
}

