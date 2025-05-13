import { describe, expect, it } from 'vitest';
import { InstagramNormalizer } from './instagram';

describe("instagram-normalizer", () => {

  it("should normalize all instagram photo URL formats", () => {
    const normalizer = new InstagramNormalizer();

    const testCases = [
      // With username
      'https://www.instagram.com/elonmusk/p/CzZ0Z_vjF8b',
      'https://www.instagram.com/elonmusk/p/CzZ0Z_vjF8b/',
      'instagram.com/elonmusk/p/CzZ0Z_vjF8b',
      'www.instagram.com/elonmusk/p/CzZ0Z_vjF8b',
      'instagram.com/elonmusk/p/CzZ0Z_vjF8b/',

      // Without username
      'https://www.instagram.com/p/CzZ0Z_vjF8b',
      'https://www.instagram.com/p/CzZ0Z_vjF8b/',
      'instagram.com/p/CzZ0Z_vjF8b',
      'www.instagram.com/p/CzZ0Z_vjF8b',
      'instagram.com/p/CzZ0Z_vjF8b/',
      'instagr.am/p/CzZ0Z_vjF8b',
      'instagr.am/p/CzZ0Z_vjF8b/',
    ];

    for (const url of testCases) {
      const result = normalizer.normalize({ url });
      console.log(result);
      expect(result).toBeDefined();

      const expectedUrl = url.includes('/elonmusk/')
        ? 'https://www.instagram.com/elonmusk/p/CzZ0Z_vjF8b'
        : 'https://www.instagram.com/p/CzZ0Z_vjF8b';

      expect(result?.url).toBe(expectedUrl);
      expect(result?.type).toBe('instagram_post');
      expect(result?.network).toBe('instagram');
      expect(result?.data?.mediaId).toBeDefined();
      expect(result?.data?.mediaId).toBe(normalizer.fromShortCodeToMediaId('CzZ0Z_vjF8b'));
      expect(result?.data?.postId).toBe('CzZ0Z_vjF8b');

      // Assert if there is a username it must be extracted as well
      if (url.includes('/elonmusk/')) {
        expect(result?.data?.username).toBe('elonmusk');
      }
    }
  });

  it("should handle whenNotFoundUse option for non-matching URLs", () => {
    const normalizer = new InstagramNormalizer();
    const testCases = [
      'foo',
      'bar123',
      'some-random-text',
      'CzZ0Z_vjF8b',
    ];

    for (const postId of testCases) {
      const result = normalizer.normalize({
        url: postId,
        onNotFoundTryWith: 'instagram_post'
      });

      expect(result).toBeDefined();
      expect(result?.url).toBe(`https://www.instagram.com/p/${postId}`);
      expect(result?.type).toBe('instagram_post');
      expect(result?.network).toBe('instagram');
      expect(result?.data?.mediaId).toBeDefined();
      expect(result?.data?.mediaId).toBe(normalizer.fromShortCodeToMediaId(postId));
      expect(result?.data?.postId).toBe(postId);
    }

    // Should return undefined when whenNotFoundUse is not set
    for (const postId of testCases) {
      const result = normalizer.normalize({ url: postId });
      expect(result).toBeUndefined();
    }
  });

  it("should normalize all instagram reel URL formats", () => {
    const normalizer = new InstagramNormalizer();

    const testCases = [
      'https://www.instagram.com/camila_cabral_/reel/DAVtfMKudel?igsh=MXFhZmVudHNl',
      'https://www.instagram.com/reel/DAVtfMKudel',
      'https://www.instagram.com/reel/DAVtfMKudel/',
      'instagram.com/reel/DAVtfMKudel',
      'www.instagram.com/reel/DAVtfMKudel',
      'instagram.com/reel/DAVtfMKudel/',
      'www.instagram.com/reel/DAVtfMKudel/',
    ];

    for (const url of testCases) {
      const result = normalizer.normalize({ url });
      expect(result).toBeDefined();

      const expectedUrl = url.includes('/camila_cabral_/')
        ? 'https://www.instagram.com/camila_cabral_/reel/DAVtfMKudel'
        : 'https://www.instagram.com/reel/DAVtfMKudel';

      expect(result?.url).toBe(expectedUrl);
      expect(result?.type).toBe('instagram_reel');
      expect(result?.network).toBe('instagram');
      expect(result?.data?.mediaId).toBeDefined();
      expect(result?.data?.mediaId).toBe(normalizer.fromShortCodeToMediaId('DAVtfMKudel'));
      expect(result?.data?.postId).toBe('DAVtfMKudel');

      if (url.includes('/camila_cabral_/')) {
        expect(result?.data?.username).toBe('camila_cabral_');
      }
    }

    // Test whenNotFoundUse
    const result = normalizer.normalize({
      url: 'DAVtfMKudel',
      onNotFoundTryWith: 'instagram_reel'
    });

    expect(result).toBeDefined();
    expect(result?.url).toBe('https://www.instagram.com/reel/DAVtfMKudel');
    expect(result?.type).toBe('instagram_reel');
    expect(result?.network).toBe('instagram');
    expect(result?.data?.mediaId).toBeDefined();
    expect(result?.data?.postId).toBe('DAVtfMKudel');
  });

  it("should normalize all instagram story URL formats", () => {
    const normalizer = new InstagramNormalizer();

    const testCases = [
      'https://www.instagram.com/stories/camilacoelho/',
      'https://www.instagram.com/stories/camilacoelho/?igsh=MXFhZmVudHNl',
      'https://www.instagram.com/stories/camilacoelho/1234567890',
      'https://www.instagram.com/stories/camilacoelho/1234567890/?igsh=MXFhZmVudHNl',
      'instagram.com/stories/camilacoelho/',
      'instagram.com/stories/camilacoelho/1234567890',
      'instagram.com/stories/camilacoelho/1234567890/?igsh=MXFhZmVudHNl',
      'www.instagram.com/stories/camilacoelho/',
      'www.instagram.com/stories/camilacoelho/1234567890',
      'www.instagram.com/stories/camilacoelho/1234567890/?igsh=MXFhZmVudHNl',
      'http://www.instagram.com/stories/camilacoelho/',
      'http://www.instagram.com/stories/camilacoelho/1234567890',
      'http://www.instagram.com/stories/camilacoelho/1234567890/?igsh=MXFhZmVudHNl',
    ];

    for (const url of testCases) {
      const result = normalizer.normalize({ url });
      expect(result).toBeDefined();

      const hasPostId = url.includes('1234567890');
      const expectedUrl = hasPostId
        ? 'https://www.instagram.com/stories/camilacoelho/1234567890'
        : 'https://www.instagram.com/stories/camilacoelho/';

      expect(result?.url).toBe(expectedUrl);
      expect(result?.type).toBe('instagram_story');
      expect(result?.network).toBe('instagram');
      expect(result?.data?.username).toBe('camilacoelho');

      if (hasPostId) {
        expect(result?.data?.postId).toBe('1234567890');
      }
    }

    // Test whenNotFoundUse with username
    const usernameCases = ['@camilacoelho', 'camilacoelho'];
    for (const username of usernameCases) {
      const result = normalizer.normalize({
        url: username,
        onNotFoundTryWith: 'instagram_story'
      });

      expect(result).toBeDefined();
      expect(result?.url).toBe('https://www.instagram.com/stories/camilacoelho/');
      expect(result?.type).toBe('instagram_story');
      expect(result?.network).toBe('instagram');
      expect(result?.data?.username).toBe('camilacoelho');
    }
  });

  it("should normalize all instagram profile URL formats", () => {
    const normalizer = new InstagramNormalizer();

    const testCases = [
      'https://www.instagram.com/camilacoelho',
      'https://www.instagram.com/camilacoelho/',
      'https://www.instagram.com/camilacoelho/?igsh=MXFhZmVudHNl',
      'instagram.com/camilacoelho',
      'instagram.com/camilacoelho/',
      'www.instagram.com/camilacoelho',
      'www.instagram.com/camilacoelho/',
      'http://www.instagram.com/camilacoelho',
      'http://www.instagram.com/camilacoelho/',
    ];

    for (const url of testCases) {
      const result = normalizer.normalize({ url });
      expect(result).toBeDefined();
      expect(result?.url).toBe('https://www.instagram.com/camilacoelho/');
      expect(result?.type).toBe('instagram_profile');
      expect(result?.network).toBe('instagram');
      expect(result?.data?.username).toBe('camilacoelho');
    }

    // Test whenNotFoundUse
    const usernameCases = [
      '@camilacoelho',
      'camilacoelho',
      'https://www.instagram.com/stories/camilacoelho/3631755389213869778/',
      'https://www.instagram.com/stories/camilacoelho/3631755389213869778/?igsh=MXFhZmVudHNl',
      'instagram.com/camilacoelho/p/CzZ0Z_vjF8b',
      'instagram.com/camilacoelho/reel/CzZ0Z_vjF8b',
      'instagram.com/camilacoelho/tv/CzZ0Z_vjF8b',
    ];

    for (const username of usernameCases) {
      const result = normalizer.normalize({
        url: username,
        onNotFoundTryWith: 'instagram_profile'
      });

      expect(result).toBeDefined();
      expect(result?.url).toBe('https://www.instagram.com/camilacoelho/');
      expect(result?.type).toBe('instagram_profile');
      expect(result?.network).toBe('instagram');
      expect(result?.data?.username).toBe('camilacoelho');
    }
  });

  it("can force resolve as a specific type", () => {
    const normalizer = new InstagramNormalizer();

    // Resolve post
    const resultPost = normalizer.normalize({
      url: 'https://www.instagram.com/camilacoelho/p/CzZ0Z_vjF8b',
      attemptToResolveAs: 'instagram_post'
    });

    expect(resultPost).toBeDefined();
    expect(resultPost?.type).toBe('instagram_post');
    expect(resultPost?.network).toBe('instagram');
    expect(resultPost?.data?.mediaId).toBeDefined();
    expect(resultPost?.data?.mediaId).toBe(normalizer.fromShortCodeToMediaId('CzZ0Z_vjF8b'));

    // Resolve profile
    const profileCases = [
      'https://www.instagram.com/camilacoelho',
      'https://www.instagram.com/camilacoelho/',
      'https://www.instagram.com/camilacoelho/?igsh=MXFhZmVudHNl',
      'instagram.com/camilacoelho',
      'instagram.com/camilacoelho/',
      'https://www.instagram.com/camilacoelho/p/CzZ0Z_vjF8b',
      'https://www.instagram.com/camilacoelho/reel/CzZ0Z_vjF8b',
      'https://www.instagram.com/camilacoelho/tv/CzZ0Z_vjF8b',
      'camilacoelho',
      '@camilacoelho',
    ];

    for (const url of profileCases) {
      const resultProfile = normalizer.normalize({
        url,
        attemptToResolveAs: 'instagram_profile'
      });

      expect(resultProfile).toBeDefined();
      expect(resultProfile?.type).toBe('instagram_profile');
      expect(resultProfile?.network).toBe('instagram');
      expect(resultProfile?.data?.username).toBe('camilacoelho');
    }
  });

});