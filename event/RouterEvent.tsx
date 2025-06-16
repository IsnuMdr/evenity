"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { progress } from "@/hooks/useProgress";

export default function RouterEvents() {
  const router = useRouter();
  const originalPush = useRef(router.push);
  const originalReplace = useRef(router.replace);
  const originalBack = useRef(router.back);
  const originalForward = useRef(router.forward);

  useEffect(() => {
    // Override router methods
    router.push = async (...args: Parameters<typeof router.push>) => {
      progress.start();
      try {
        return await originalPush.current.apply(router, args);
      } catch (error) {
        progress.finish();
        throw error;
      }
    };

    router.replace = async (...args: Parameters<typeof router.replace>) => {
      progress.start();
      try {
        return await originalReplace.current.apply(router, args);
      } catch (error) {
        progress.finish();
        throw error;
      }
    };

    router.back = () => {
      progress.start();
      originalBack.current.call(router);
    };

    router.forward = () => {
      progress.start();
      originalForward.current.call(router);
    };

    return () => {
      // Restore original methods
      router.push = originalPush.current;
      router.replace = originalReplace.current;
      router.back = originalBack.current;
      router.forward = originalForward.current;
    };
  }, [router]);

  return null;
}
