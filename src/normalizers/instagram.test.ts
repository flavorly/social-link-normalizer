import { describe, expect, it } from 'vitest';
import { InstagramNormalizer } from './instagram';

describe("instagram-normalizer", () => {
  
  it("should normalize instagram post link", () => {
    const normalizer = new InstagramNormalizer();
    const result = normalizer.normalize({ url: "https://www.instagram.com/p/CJQ8aQlJ5O1/" });
    expect(result).toBeDefined();
    expect(result?.url).toBe("https://www.instagram.com/p/CJQ8aQlJ5O1/");
    expect(result?.type).toBe("instagram_post");
    expect(result?.network).toBe("instagram");
  });

  it("should normalize instagram post link with username", () => {
    const normalizer = new InstagramNormalizer();
    const result = normalizer.normalize({ url: "https://www.instagram.com/username/p/CJQ8aQlJ5O1/" });
    expect(result).toBeDefined();
    expect(result?.url).toBe("https://www.instagram.com/username/p/CJQ8aQlJ5O1/");
    expect(result?.type).toBe("instagram_post");
    expect(result?.network).toBe("instagram");
  });
});
