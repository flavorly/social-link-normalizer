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
    }
  });
});
