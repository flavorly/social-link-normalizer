import psl from "psl";

export function removeQueryString(url: string): string {
  const queryStringIndex = url.indexOf("?");
  if (queryStringIndex === -1) {
    return url;
  }
  return url.slice(0, queryStringIndex);
}

export function removeTrailingSpaces(url: string): string {
  return url.trimEnd();
}

export function removeTrailingSlash(url: string): string {
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

export function isValidDomain(url: string): boolean {
  return psl.isValid(url);
}

export function removeProtocolAndWWW(url: string): string {
  // Remove any protocol (http://, https://, ftp://, ssh://, etc.)
  let cleanUrl = url.replace(/^[a-z]+:\/\//i, "");

  // Remove 'www.' or similar prefixes (e.g., 'ww2.')
  cleanUrl = cleanUrl.replace(/^(?:w{3}\d?\.)/i, "");

  // Remove trailing slash if present
  cleanUrl = cleanUrl.replace(/\/$/, "");

  // Remove hash
  cleanUrl = cleanUrl.split("#")[0] ?? cleanUrl;

  return cleanUrl;
}
