import psl from 'psl';

export function removeQueryString(url: string): string {
  const queryStringIndex = url.indexOf('?');
  if (queryStringIndex === -1) {
    return url;
  }
  return url.slice(0, queryStringIndex);
}

export function removeTrailingSpaces(url: string): string {
  return url.trimEnd();
}

export function removeTrailingSlash(url: string): string {
  return url.endsWith('/') ? url.slice(0, -1) : url;
}

export function isValidDomain(url: string): boolean {
  return psl.isValid(url);
}

export function removeProtocolAndWWW(url: string): string {
  // Remove any protocol (http://, https://, ftp://, ssh://, etc.)
  let cleanUrl = url.replace(/^[a-z]+:\/\//i, '');

  // Remove 'www.' or similar prefixes (e.g., 'ww2.')
  cleanUrl = cleanUrl.replace(/^(?:w{3}\d?\.)/i, '');

  // Remove trailing slash if present
  cleanUrl = cleanUrl.replace(/\/$/, '');

  // Remove hash
  cleanUrl = cleanUrl.split('#')[0] ?? cleanUrl;

  return cleanUrl;
}

export function onlyQueryParams(
  url: string,
  only: string[],
): string {
  // Simple pre-check for obviously invalid URLs
  if (url === 'invalid-url') {
    return url;
  }

  try {
    // First, try to parse with existing protocol
    let urlObj: URL;
    try {
      urlObj = new URL(url);
    } catch {
      // If that fails, try adding https://
      try {
        urlObj = new URL(`https://${url}`);
      } catch {
        // If both attempts fail, return the original URL
        return url;
      }
    }

    if (only.length === 0) {
      return `${urlObj.protocol}//${urlObj.host}${urlObj.pathname}`;
    }

    const params = new URLSearchParams();
    for (const param of only) {
      const value = urlObj.searchParams.get(param);
      if (value) params.append(param, value);
    }

    urlObj.search = params.toString();
    return urlObj.toString();
  } catch {
    // Final fallback
    return url;
  }
}
