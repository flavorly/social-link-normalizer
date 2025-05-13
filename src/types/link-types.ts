// Default Link Type
export type DefaultLinkType = 'default';

// Instagram Link Types
export type InstagramLinkType =
  | 'instagram_post' // e.g., /p/Cxyz123.../
  | 'instagram_reel' // e.g., /reel/Cxyz123.../
  | 'instagram_story' // e.g., /stories/username/123.../ (often temporary)
  | 'instagram_profile' // e.g., /username/
  | 'instagram_igtv' // e.g., /tv/Cxyz123.../ (being phased out for Reels)
  | 'instagram_guide' // e.g., /username/guide/guide-name/123.../
  | 'instagram_highlight'; // e.g., /stories/highlights/123.../

// Facebook Link Types
export type FacebookLinkType =
  | 'facebook_post' // e.g., /username/posts/123... or /story.php?story_fbid=...
  | 'facebook_photo' // e.g., /photo.php?fbid=... or /username/photos/a.123.../
  | 'facebook_video' // e.g., /watch/?v=... or /username/videos/123.../
  | 'facebook_profile' // e.g., /username or /profile.php?id=...
  | 'facebook_page' // e.g., /pagename
  | 'facebook_group' // e.g., /groups/groupname/
  | 'facebook_event' // e.g., /events/123.../
  | 'facebook_note' // e.g., /notes/username/note-title/123.../
  | 'facebook_live_video'; // e.g., /username/videos/123... (live or past live)

// Threads Link Types
export type ThreadsLinkType =
  | 'threads_post' // e.g., /@username/post/Cxyz123...
  | 'threads_profile'; // e.g., /@username

// Twitter (X) Link Types
export type TwitterLinkType =
  | 'twitter_tweet' // e.g., /username/status/123...
  | 'twitter_profile' // e.g., /username
  | 'twitter_list' // e.g., /username/lists/listname
  | 'twitter_space' // e.g., /i/spaces/123...
  | 'twitter_community'; // e.g., /i/communities/123...

// YouTube Link Types
export type YoutubeLinkType =
  | 'youtube_video' // e.g., /watch?v=VIDEO_ID or /VIDEO_ID
  | 'youtube_short' // e.g., /shorts/SHORT_ID
  | 'youtube_channel' // e.g., /channel/CHANNEL_ID or /c/ChannelName or /@handle
  | 'youtube_playlist' // e.g., /playlist?list=PLAYLIST_ID
  | 'youtube_live_stream' // e.g., /watch?v=VIDEO_ID (live or past live)
  | 'youtube_community_post' // e.g., /channel/CHANNEL_ID/community or /@handle/community
  | 'youtube_handle'; // e.g., /@handle (redirects to channel)

// TikTok Link Types
export type TiktokLinkType =
  | 'tiktok_video' // e.g., /@username/video/123...
  | 'tiktok_profile' // e.g., /@username
  | 'tiktok_live_stream' // e.g., /@username/live (when live)
  | 'tiktok_sound' // e.g., /music/Sound-Name-123...
  | 'tiktok_hashtag'; // e.g., /tag/hashtagname

// Spotify Link Types
export type SpotifyLinkType =
  | 'spotify_track' // e.g., /track/TRACK_ID
  | 'spotify_album' // e.g., /album/ALBUM_ID
  | 'spotify_artist' // e.g., /artist/ARTIST_ID
  | 'spotify_playlist' // e.g., /playlist/PLAYLIST_ID or /user/username/playlist/PLAYLIST_ID
  | 'spotify_show' // e.g., /show/SHOW_ID (podcast)
  | 'spotify_episode' // e.g., /episode/EPISODE_ID (podcast episode)
  | 'spotify_user_profile'; // e.g., /user/USER_ID

// Discord Link Types
export type DiscordLinkType =
  | 'discord_server_invite' // e.g., /invite/INVITE_CODE or discord.gg/INVITE_CODE
  | 'discord_message_link'; // e.g., /channels/SERVER_ID/CHANNEL_ID/MESSAGE_ID (requires auth)

// Telegram Link Types
export type TelegramLinkType =
  | 'telegram_channel_or_group' // e.g., t.me/channelname or t.me/joinchat/AAAAA...
  | 'telegram_post' // e.g., t.me/channelname/POST_ID
  | 'telegram_user_profile'; // e.g., t.me/username (for users with public usernames)

// Website Link Types
export type WebsiteLinkType = 'website_url'; // Generic website URL

// SoundCloud Link Types
export type SoundcloudLinkType =
  | 'soundcloud_track' // e.g., /username/track-name
  | 'soundcloud_playlist' // e.g., /username/sets/playlist-name
  | 'soundcloud_album' // e.g., /username/sets/album-name (often uses 'sets')
  | 'soundcloud_user_profile' // e.g., /username
  | 'soundcloud_repost'; // (Action, not a distinct URL type for normalization)

// Twitch Link Types
export type TwitchLinkType =
  | 'twitch_channel' // e.g., /username
  | 'twitch_video_on_demand' // e.g., /videos/VOD_ID (past broadcasts, highlights)
  | 'twitch_clip'; // e.g., /username/clip/CLIP_ID or /clips.twitch.tv/CLIP_ID

// Google Link Types
export type GoogleLinkType =
  | 'google_maps_place' // e.g., /maps/place/PlaceName/... or /maps?q=...&cid=...
  | 'google_business_profile' // Often overlaps with maps, e.g. search result leading to GMB
  | 'google_document' // e.g., docs.google.com/document/d/DOC_ID/
  | 'google_sheet' // e.g., docs.google.com/spreadsheets/d/SHEET_ID/
  | 'google_slide' // e.g., docs.google.com/presentation/d/SLIDE_ID/
  | 'google_form' // e.g., docs.google.com/forms/d/e/FORM_ID/viewform
  | 'google_drive_file'; // e.g., drive.google.com/file/d/FILE_ID/

// LinkedIn Link Types
export type LinkedinLinkType =
  | 'linkedin_profile' // e.g., /in/username/ or /pub/firstname-lastname/xyz
  | 'linkedin_post' // e.g., /feed/update/urn:li:activity:123.../ or /posts/activity-123...
  | 'linkedin_article' // e.g., /pulse/articlename-authorname-id
  | 'linkedin_company_page' // e.g., /company/companyname/
  | 'linkedin_group_page' // e.g., /groups/123.../
  | 'linkedin_event_page' // e.g., /events/123.../
  | 'linkedin_job_posting' // e.g., /jobs/view/123.../
  | 'linkedin_learning_course'; // e.g., /learning/course-name

// Reddit Link Types
export type RedditLinkType =
  | 'reddit_post' // e.g., /r/subreddit/comments/POST_ID/post_title/
  | 'reddit_comment_link' // e.g., /r/subreddit/comments/POST_ID/post_title/COMMENT_ID/
  | 'reddit_subreddit_page' // e.g., /r/subreddit/
  | 'reddit_user_profile' // e.g., /user/username/
  | 'reddit_multireddit'; // e.g., /user/username/m/multiredditname/

// App Store Link Types
export type AppStoreLinkType =
  | 'app_store_ios_app' // e.g., apps.apple.com/us/app/app-name/idAPP_ID
  | 'google_play_store_app'; // e.g., play.google.com/store/apps/details?id=com.package.name

// VKontakte (VK) Link Types
export type VkontakteLinkType =
  | 'vk_profile' // e.g., /idUSER_ID or /username
  | 'vk_post' // e.g., /wall-GROUP_ID_POST_ID or /wallUSER_ID_POST_ID
  | 'vk_photo' // e.g., /photo-GROUP_ID_PHOTO_ID or /photoUSER_ID_PHOTO_ID
  | 'vk_video' // e.g., /video-GROUP_ID_VIDEO_ID or /videoUSER_ID_VIDEO_ID
  | 'vk_community_page' // e.g., /clubGROUP_ID or /publicGROUP_ID or /eventGROUP_ID
  | 'vk_article' // e.g., /@username/article-name or /read/@username/article-name
  | 'vk_clip'; // e.g., /clip-GROUP_ID_CLIP_ID

// Tidal Link Types
export type TidalLinkType =
  | 'tidal_track' // e.g., /browse/track/TRACK_ID
  | 'tidal_album' // e.g., /browse/album/ALBUM_ID
  | 'tidal_artist' // e.g., /browse/artist/ARTIST_ID
  | 'tidal_playlist' // e.g., /browse/playlist/PLAYLIST_ID
  | 'tidal_video'; // e.g., /browse/video/VIDEO_ID

// Pinterest Link Types
export type PinterestLinkType =
  | 'pinterest_pin' // e.g., /pin/PIN_ID/
  | 'pinterest_board' // e.g., /username/board-name/
  | 'pinterest_profile' // e.g., /username/
  | 'pinterest_idea_pin'; // e.g., /idea-pin/PIN_ID/ (newer format)

// Vimeo Link Types
export type VimeoLinkType =
  | 'vimeo_video' // e.g., /VIDEO_ID
  | 'vimeo_user_profile' // e.g., /username
  | 'vimeo_channel' // e.g., /channels/channelname
  | 'vimeo_group' // e.g., /groups/groupname
  | 'vimeo_on_demand'; // e.g., /ondemand/moviename

// Quora Link Types
export type QuoraLinkType =
  | 'quora_question' // e.g., /question/Question-Title
  | 'quora_answer' // e.g., /Question-Title/answer/Username
  | 'quora_profile' // e.g., /profile/Username
  | 'quora_post' // e.g., /Username/post/Post-Title (on a blog/space)
  | 'quora_space'; // e.g., /q/spacename

// Clubhouse Link Types
export type ClubhouseLinkType =
  | 'clubhouse_profile' // e.g., /@username or /club/clubname/@username
  | 'clubhouse_room' // e.g., /room/ROOM_ID
  | 'clubhouse_event' // e.g., /event/EVENT_ID
  | 'clubhouse_club'; // e.g., /club/clubname

// Kick Link Types
export type KickLinkType =
  | 'kick_channel' // e.g., /USERNAME
  | 'kick_video_on_demand' // e.g., /video/VOD_UUID
  | 'kick_clip'; // e.g., /USERNAME/clip/CLIP_ID

// OnlyFans Link Types
export type OnlyfansLinkType = 'onlyfans_profile'; // e.g., /username (public/shareable)

// Rumble Link Types
export type RumbleLinkType =
  | 'rumble_video' // e.g., /vVIDEO_ID-video-title.html
  | 'rumble_channel' // e.g., /c/ChannelName
  | 'rumble_live_stream'; // e.g., /live/ChannelName (when live)

// Snapchat Link Types
export type SnapchatLinkType =
  | 'snapchat_profile_link' // e.g., snapchat.com/add/USERNAME
  | 'snapchat_public_story_link' // e.g., story.snapchat.com/p/STORY_ID or story.snapchat.com/s/USERNAME
  | 'snapchat_spotlight_video_link'; // e.g., snapchat.com/spotlight/VIDEO_ID

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
