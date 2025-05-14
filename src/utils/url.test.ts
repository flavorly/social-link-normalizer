import { describe, expect, it } from 'vitest';
import { removeProtocolAndWWW } from './url';

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
});
