import { useEffect, useRef, useState } from "react";
import { scanImages } from "../utils/imageUtils";

/**
 * Scans an array of image URLs on mount and returns only the subset that
 * successfully loads.  While scanning, the original list is returned so the
 * UI can render immediately; once the scan completes the list is narrowed to
 * valid images only (with the original list as a fallback if all fail).
 */
export function useImageScan(urls: string[]): string[] {
  const [validUrls, setValidUrls] = useState<string[]>(urls);
  // Keep a mutable ref so the latest urls are always used inside the effect
  // without adding them to the dependency array (which would restart the scan
  // on every render when the caller passes an inline array literal).
  const urlsRef = useRef(urls);
  urlsRef.current = urls;

  useEffect(() => {
    let cancelled = false;
    scanImages(urlsRef.current).then((valid) => {
      if (!cancelled) {
        setValidUrls(valid);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return validUrls;
}
