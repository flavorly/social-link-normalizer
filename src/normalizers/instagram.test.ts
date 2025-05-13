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
        whenNotFoundUse: 'instagram_post'
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
});
