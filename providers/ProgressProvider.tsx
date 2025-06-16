"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { progress } from "@/hooks/useProgress";

export default function ProgressProvider() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Handle route changes
  useEffect(() => {
    progress.finish();
  }, [pathname, searchParams]);

  // Start progress on page unload (route change)
  useEffect(() => {
    const handleBeforeUnload = () => {
      progress.start();
    };

    // For client-side navigation
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        progress.start();
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return null;
}
