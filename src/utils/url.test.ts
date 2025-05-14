import { describe, expect, it } from 'vitest';
import { removeProtocolAndWWW, onlyQueryParams } from './url';

describe('url-utils', () => {
  it('should remove protocol and www', () => {
    expect(removeProtocolAndWWW('https://www.google.com')).toBe('google.com');
    expect(removeProtocolAndWWW('http://www.google.com')).toBe('google.com');
    expect(removeProtocolAndWWW('www.google.com')).toBe('google.com');
    expect(removeProtocolAndWWW('google.com')).toBe('google.com');
    expect(removeProtocolAndWWW('ftp://www.google.com')).toBe('google.com');
    expect(removeProtocolAndWWW('ssh://www.google.com')).toBe('google.com');
    expect(removeProtocolAndWWW('http://www.google.com#hash')).toBe(
      'google.com',
    );
    expect(removeProtocolAndWWW('http://www.google.com?query=1')).toBe(
      'google.com?query=1',
    );
  });

  it('should keep only specified query params', () => {
    expect(onlyQueryParams('https://google.com?q=test&utm_source=twitter', ['q'])).toBe('https://google.com/?q=test');
    expect(onlyQueryParams('google.com?q=test&id=123&ref=home', ['id', 'ref'])).toBe('https://google.com/?id=123&ref=home');
    expect(onlyQueryParams('https://example.com?a=1&b=2&c=3', ['b'])).toBe('https://example.com/?b=2');
    expect(onlyQueryParams('https://site.com/path?x=1&y=2', [])).toBe('https://site.com/path');
    expect(onlyQueryParams('https://domain.com/page?param=value', ['missing'])).toBe('https://domain.com/page');
    expect(onlyQueryParams('invalid-url', ['param'])).toBe('invalid-url');
  });
});
