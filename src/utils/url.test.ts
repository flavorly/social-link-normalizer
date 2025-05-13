import { describe, expect, it } from "vitest";
import { removeProtocalAndWWW } from "./url";

describe("utils/url", () => {
  it("should remove protocol and www from url", () => {
    expect(removeProtocalAndWWW("https://www.google.com")).toBe("google.com");
    expect(removeProtocalAndWWW("http://www.google.com")).toBe("google.com");
    expect(removeProtocalAndWWW("www.google.com")).toBe("google.com");
    expect(removeProtocalAndWWW("google.com")).toBe("google.com");
    expect(removeProtocalAndWWW("ftp://www.google.com")).toBe("google.com");
    expect(removeProtocalAndWWW("ssh://www.google.com")).toBe("google.com");
    expect(removeProtocalAndWWW("http://www.google.com#hash")).toBe("google.com");
    expect(removeProtocalAndWWW("http://www.google.com?query=1")).toBe("google.com?query=1");
  });
});
