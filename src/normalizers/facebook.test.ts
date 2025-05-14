import { describe, expect, it } from 'vitest';
import { FacebookNormalizer } from './facebook';

describe('facebook-normalizer', () => {
  const normalizer = new FacebookNormalizer();

  it('can normalize various valid post URLs', () => {
    const validPostUrls = [
      // Regular posts with username
      'https://www.facebook.com/username.test/posts/123456789012345',
      'https://www.facebook.com/username.test/posts/123456789012345/',
      'facebook.com/username.test/posts/123456789012345',
      'https://m.facebook.com/username.test/posts/123456789012345?_rdr',
      'https://www.facebook.com/username.test/posts/123456789012345?comment_id=987',

      // Regular posts with user ID
      'https://www.facebook.com/100001234567890/posts/123456789012345',
      'https://m.facebook.com/100001234567890/posts/123456789012345/',

      // Regular posts with only post ID
      'https://www.facebook.com/posts/123456789012345',
      'fb.com/posts/123456789012345',
      'https://www.facebook.com/posts/123456789012345?comment_id=123&reply_comment_id=456',

      // Permalink URLs
      'https://www.facebook.com/permalink.php?story_fbid=pAbcdef12345&id=100001234567890',
      'https://m.facebook.com/permalink.php?story_fbid=S:_I-AWxNjA2NTgxNzE1NzoyMzYxOTg0MDI3ODg2NzA%3D&id=100001234567890&funlid=Abcdef',
      'https://www.facebook.com/permalink.php?story_fbid=pAbcdef12345&id=100001234567890&comment_id=789',

      // Mobile story URLs (should normalize to permalink format or similar post structure)
      'https://www.facebook.com/story.php?story_fbid=pfbid02ZsearchForSomethingGood&id=100001234567890',
      'https://m.facebook.com/story.php?story_fbid=shortFormatStoryId&id=100001234567890',

      // Activity URLs (should normalize to user/posts format)
      'https://www.facebook.com/100001234567890/activity/123456789012345',
      'https://m.facebook.com/100001234567890/activity/123456789012345/',

      // Group post URLs
      'https://www.facebook.com/groups/some.group.id.123/permalink/123456789012345/',
      'facebook.com/groups/anothergroupid/permalink/123456789012345?sfnsn=mo',
      'https://m.facebook.com/groups/group.name.here/permalink/123456789012345/?',
    ];

    for (const url of validPostUrls) {
      const result = normalizer.normalize({ url });

      if (!result) {
        console.error(`Normalization failed for valid URL: ${url}`);
      }

      expect(result, `URL: ${url}`).toBeDefined();
      expect(result?.type, `URL: ${url}`).toBe('facebook_post');
      expect(result?.network, `URL: ${url}`).toBe('facebook');
      expect(result?.data?.postId, `URL: ${url}`).toBeDefined();
      expect(result?.data?.postId, `URL: ${url}`).not.toBe('');
      expect(result?.url, `URL: ${url}`).toMatch(/^https:\/\/(www|m)\.facebook\.com\//);
    }
  });

  it('does not normalize URLs that are not posts', () => {
    const nonPostUrls = [
      'https://www.facebook.com/username.test', // Profile
      'https://www.facebook.com/username.test/', // Profile with slash
      'https://www.facebook.com/photo.php?fbid=123&id=456', // Photo
      'https://www.facebook.com/photo/?fbid=12345&set=a.setid', // Photo variant
      'https://www.facebook.com/videos/1234567890', // Video
      'https://www.facebook.com/watch/?v=1234567890', // Video (watch)
      'https://fb.watch/a1B2c3D4e5/', // Video (fb.watch)
      'https://www.facebook.com/events/12345/', // Event
      'https://www.facebook.com/groups/somegroupid/', // Group (not a specific post in a group)
      'https://www.facebook.com/',
      'facebook.com/',
      'https://www.facebook.com/pages/SomePage/1234567890', // Page
      'justsomerandomtext',
      'http://example.com/facebook.com/username.test/posts/12345', // Not a direct FB domain
      '', // Empty string
    ];

    for (const url of nonPostUrls) {
      const result = normalizer.normalize({ url });
      expect(result, `URL: ${url}`).toBeUndefined();
    }
  });

  it('can fallback to post type if specified', () => {
    const postId = 'randomPostId123';
    const result = normalizer.normalize({
      url: postId,
      onNotFoundTryWith: 'facebook_post',
    });

    expect(result).toBeDefined();
    expect(result?.type).toBe('facebook_post');
    expect(result?.network).toBe('facebook');
    expect(result?.data?.postId).toBe(postId);
    expect(result?.url).toBe(`https://www.facebook.com/posts/${postId}`);
  });

}); 