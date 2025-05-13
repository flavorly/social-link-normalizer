// Default Link Type
export type DefaultLinkType = 'default';

// Instagram Link Types
export type InstagramLinkType =
  | 'instagram_likes'
  | 'instagram_comments'
  | 'instagram_followers'
  | 'instagram_views'
  | 'instagram_view_live'
  | 'instagram_mentions_by_username_followers'
  | 'instagram_mentions_by_link_likers'
  | 'instagram_mentions_by_list'
  | 'instagram_mentions_by_hashtags'
  | 'instagram_story_views'
  | 'instagram_services'
  | 'instagram_reels'
  | 'instagram_bookmarks'
  | 'instagram_shares'
  | 'instagram_impressions'
  | 'instagram_auto_likes'
  | 'instagram_auto_views';

// Facebook Link Types
export type FacebookLinkType =
  | 'facebook_page_likes'
  | 'facebook_post_likes'
  | 'facebook_post_auto_likes'
  | 'facebook_post_reactions'
  | 'facebook_followers'
  | 'facebook_post_comments'
  | 'facebook_post_views'
  | 'facebook_post_shares'
  | 'facebook_live_stream_views'
  | 'facebook_services';

// Threads Link Types
export type ThreadsLinkType =
  | 'threads_likes'
  | 'threads_auto_likes'
  | 'threads_comments'
  | 'threads_views'
  | 'threads_services'
  | 'threads_followers';

// Twitter Link Types
export type TwitterLinkType =
  | 'twitter_likes'
  | 'twitter_shares'
  | 'twitter_followers'
  | 'twitter_bookmarks'
  | 'twitter_impressions'
  | 'twitter_views'
  | 'twitter_views_live'
  | 'twitter_services'
  | 'twitter_comments';

// YouTube Link Types
export type YoutubeLinkType =
  | 'youtube_views'
  | 'youtube_auto_views'
  | 'youtube_comments'
  | 'youtube_likes'
  | 'youtube_shorts_likes'
  | 'youtube_subscribers'
  | 'youtube_live_views'
  | 'youtube_services';

// TikTok Link Types
export type TiktokLinkType =
  | 'tiktok_views'
  | 'tiktok_likes'
  | 'tiktok_auto_likes'
  | 'tiktok_shares'
  | 'tiktok_saves'
  | 'tiktok_comments'
  | 'tiktok_followers'
  | 'tiktok_live'
  | 'tiktok_services';

// Spotify Link Types
export type SpotifyLinkType =
  | 'spotify_plays'
  | 'spotify_followers'
  | 'spotify_services';

// Discord Link Types
export type DiscordLinkType =
  | 'discord_members'
  | 'discord_messages'
  | 'discord_services';

// Telegram Link Types
export type TelegramLinkType =
  | 'telegram_members'
  | 'telegram_messages'
  | 'telegram_reactions'
  | 'telegram_services';

// Website Link Types
export type WebsiteLinkType = 'website_traffic';

// SoundCloud Link Types
export type SoundcloudLinkType =
  | 'soundcloud_plays'
  | 'soundcloud_likes'
  | 'soundcloud_comments'
  | 'soundcloud_followers'
  | 'soundcloud_reposts'
  | 'soundcloud_services';

// Twitch Link Types
export type TwitchLinkType =
  | 'twitch_live_plays'
  | 'twitch_followers'
  | 'twitch_services'
  | 'twitch_views_clip';

// Google Link Types
export type GoogleLinkType = 'google_reviews' | 'google_services';

// LinkedIn Link Types
export type LinkedinLinkType =
  | 'linkedin_followers'
  | 'linkedin_likes'
  | 'linkedin_services';

// Reddit Link Types
export type RedditLinkType =
  | 'reddit_upvotes'
  | 'reddit_likes'
  | 'reddit_subscribers'
  | 'reddit_comments'
  | 'reddit_followers'
  | 'reddit_services';

// App Store Link Types
export type AppStoreLinkType =
  | 'app_store_android_installs'
  | 'app_store_ios_installs';

// VKontakte Link Types
export type VkontakteLinkType =
  | 'vkontakte_likes'
  | 'vkontakte_followers'
  | 'vkontakte_services';

// Tidal Link Types
export type TidalLinkType = 'tidal_plays' | 'tidal_followers' | 'tidal_services';

// Pinterest Link Types
export type PinterestLinkType =
  | 'pinterest_likes'
  | 'pinterest_comments'
  | 'pinterest_followers'
  | 'pinterest_services';

// Vimeo Link Types
export type VimeoLinkType =
  | 'vimeo_likes'
  | 'vimeo_plays'
  | 'vimeo_comments'
  | 'vimeo_followers'
  | 'vimeo_services';

// Quora Link Types
export type QuoraLinkType =
  | 'quora_shares'
  | 'quora_likes'
  | 'quora_followers'
  | 'quora_services';

// Clubhouse Link Types
export type ClubhouseLinkType =
  | 'clubhouse_room_visitors'
  | 'clubhouse_followers';

// Kick Link Types
export type KickLinkType = 'kick_followers' | 'kick_live_plays';

// OnlyFans Link Types
export type OnlyfansLinkType = 'onlyfans_followers' | 'onlyfans_likes';

// Rumble Link Types
export type RumbleLinkType = 'rumble_live_views';

// Snapchat Link Types
export type SnapchatLinkType =
  | 'snapchat_followers'
  | 'snapchat_stories_views';

// Unknown Link Type
export type UnknownLinkType = 'unknown';

// Aggregate type for any social link
export type SocialLinkType =
  | DefaultLinkType
  | InstagramLinkType
  | FacebookLinkType
  | ThreadsLinkType
  | TwitterLinkType
  | YoutubeLinkType
  | TiktokLinkType
  | SpotifyLinkType
  | DiscordLinkType
  | TelegramLinkType
  | WebsiteLinkType
  | SoundcloudLinkType
  | TwitchLinkType
  | GoogleLinkType
  | LinkedinLinkType
  | RedditLinkType
  | AppStoreLinkType
  | VkontakteLinkType
  | TidalLinkType
  | PinterestLinkType
  | VimeoLinkType
  | QuoraLinkType
  | ClubhouseLinkType
  | KickLinkType
  | OnlyfansLinkType
  | RumbleLinkType
  | SnapchatLinkType
  | UnknownLinkType;
