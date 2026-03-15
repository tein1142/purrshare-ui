/**
 * Attempts to load a single image URL and resolves to true if it loads
 * successfully, or false if it fails (404, 403, network error, CORS, etc.).
 */
export function checkImage(src: string): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = src;
  });
}

/**
 * Scans an array of image URLs in parallel and returns only the URLs that
 * can actually be loaded.  If every URL fails the original list is returned
 * as a safety-net so the caller always has at least something to show.
 */
export async function scanImages(urls: string[]): Promise<string[]> {
  const results = await Promise.all(
    urls.map(async (url) => ({ url, ok: await checkImage(url) }))
  );
  const valid = results.filter((r) => r.ok).map((r) => r.url);
  return valid.length > 0 ? valid : urls;
}
