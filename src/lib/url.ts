export const BASE_URL = import.meta.env.BASE_URL;

const EXTERNAL = /^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i;

export function withBase(path = "/"): string {
  if (EXTERNAL.test(path)) return path;
  const base = BASE_URL.endsWith("/") ? BASE_URL.slice(0, -1) : BASE_URL;
  if (base && (path === base || path.startsWith(`${base}/`))) return path;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function absoluteUrl(path: string, site: URL): string {
  return new URL(withBase(path), site).toString();
}
