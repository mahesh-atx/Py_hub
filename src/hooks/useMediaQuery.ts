"use client";

import { useEffect, useState } from "react";

export function useMediaQuery(query: string, serverFallback = false): boolean {
  const [matches, setMatches] = useState(() =>
    typeof window === "undefined" ? serverFallback : window.matchMedia(query).matches,
  );

  useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setMatches(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [query]);

  return matches;
}
