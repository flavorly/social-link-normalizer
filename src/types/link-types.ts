// Default Link Type
export type DefaultLinkType = 'default';

// Instagram Link Types
export type InstagramLinkType =
  | 'instagram_post'
  | 'instagram_reel'
  | 'instagram_story'
  | 'instagram_profile'
  | 'instagram_igtv'
  | 'instagram_guide'
  | 'instagram_highlight';

// Facebook Link Types
export type FacebookLinkType =
  | 'facebook_post'
  | 'facebook_photo'
  | 'facebook_video'
  | 'facebook_profile'
  | 'facebook_page'
  | 'facebook_group'
  | 'facebook_event'
  | 'facebook_note'
  | 'facebook_live_video';

// Threads Link Types
export type ThreadsLinkType =
  | 'threads_post'
  | 'threads_profile';

// Twitter (X) Link Types
export type TwitterLinkType =
  | 'twitter_tweet'
  | 'twitter_profile'
  | 'twitter_list'
  | 'twitter_space'
  | 'twitter_community';

// YouTube Link Types
export type YoutubeLinkType =
  | 'youtube_video'
  | 'youtube_short'
  | 'youtube_channel'
  | 'youtube_playlist'
  | 'youtube_live_stream'
  | 'youtube_community_post'
  | 'youtube_handle';

// TikTok Link Types
export type TiktokLinkType =
  | 'tiktok_video'
  | 'tiktok_profile'
  | 'tiktok_live_stream'
  | 'tiktok_sound'
  | 'tiktok_hashtag';

// Spotify Link Types
export type SpotifyLinkType =
  | 'spotify_track'
  | 'spotify_album'
  | 'spotify_artist'
  | 'spotify_playlist'
  | 'spotify_show'
  | 'spotify_episode'
  | 'spotify_user_profile';

// Discord Link Types
export type DiscordLinkType =
  | 'discord_server_invite'
  | 'discord_message_link';

// Telegram Link Types
export type TelegramLinkType =
  | 'telegram_channel_or_group'
  | 'telegram_post'
  | 'telegram_user_profile';

// Website Link Types
export type WebsiteLinkType = 'website_url';

// SoundCloud Link Types
export type SoundcloudLinkType =
  | 'soundcloud_track'
  | 'soundcloud_playlist'
  | 'soundcloud_album'
  | 'soundcloud_user_profile'
  | 'soundcloud_repost';

// Twitch Link Types
export type TwitchLinkType =
  | 'twitch_channel'
  | 'twitch_video_on_demand'
  | 'twitch_clip';

// Google Link Types
export type GoogleLinkType =
  | 'google_maps_place'
  | 'google_business_profile'
  | 'google_document'
  | 'google_sheet'
  | 'google_slide'
  | 'google_form'
  | 'google_drive_file';

// LinkedIn Link Types
export type LinkedinLinkType =
  | 'linkedin_profile'
  | 'linkedin_post'
  | 'linkedin_article'
  | 'linkedin_company_page'
  | 'linkedin_group_page'
  | 'linkedin_event_page'
  | 'linkedin_job_posting'
  | 'linkedin_learning_course';

// Reddit Link Types
export type RedditLinkType =
  | 'reddit_post'
  | 'reddit_comment_link'
  | 'reddit_subreddit_page'
  | 'reddit_user_profile'
  | 'reddit_multireddit';

// App Store Link Types
export type AppStoreLinkType =
  | 'app_store_ios_app'
  | 'google_play_store_app';

// VKontakte (VK) Link Types
export type VkontakteLinkType =
  | 'vk_profile'
  | 'vk_post'
  | 'vk_photo'
  | 'vk_video'
  | 'vk_community_page'
  | 'vk_article'
  | 'vk_clip';

// Tidal Link Types
export type TidalLinkType =
  | 'tidal_track'
  | 'tidal_album'
  | 'tidal_artist'
  | 'tidal_playlist'
  | 'tidal_video';

// Pinterest Link Types
export type PinterestLinkType =
  | 'pinterest_pin'
  | 'pinterest_board'
  | 'pinterest_profile'
  | 'pinterest_idea_pin';

// Vimeo Link Types
export type VimeoLinkType =
  | 'vimeo_video'
  | 'vimeo_user_profile'
  | 'vimeo_channel'
  | 'vimeo_group'
  | 'vimeo_on_demand';

// Quora Link Types
export type QuoraLinkType =
  | 'quora_question'
  | 'quora_answer'
  | 'quora_profile'
  | 'quora_post'
  | 'quora_space';

// Clubhouse Link Types
export type ClubhouseLinkType =
  | 'clubhouse_profile'
  | 'clubhouse_room'
  | 'clubhouse_event'
  | 'clubhouse_club';

// Kick Link Types
export type KickLinkType =
  | 'kick_channel'
  | 'kick_video_on_demand'
  | 'kick_clip';

// OnlyFans Link Types
export type OnlyfansLinkType = 'onlyfans_profile';

// Rumble Link Types
export type RumbleLinkType =
  | 'rumble_video'
  | 'rumble_channel'
  | 'rumble_live_stream';

// Snapchat Link Types
export type SnapchatLinkType =
  | 'snapchat_profile_link'
  | 'snapchat_public_story_link'
  | 'snapchat_spotlight_video_link';

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
