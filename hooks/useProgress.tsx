import NProgress from "nprogress";
import "nprogress/nprogress.css";

// Configure NProgress
NProgress.configure({
  minimum: 0.3,
  easing: "ease",
  speed: 500,
  showSpinner: false,
});

// Global progress state
let isLoading = false;

export const progress = {
  start: () => {
    if (!isLoading) {
      isLoading = true;
      NProgress.start();
    }
  },
  finish: () => {
    if (isLoading) {
      isLoading = false;
      NProgress.done();
    }
  },
  isLoading: () => isLoading,
};

// Auto-intercept fetch for API calls
const originalFetch = window.fetch;
window.fetch = async (...args) => {
  progress.start();
  try {
    const response = await originalFetch(...args);
    return response;
  } finally {
    // Small delay to show progress for very fast requests
    setTimeout(() => progress.finish(), 100);
  }
};
