import { useState, useEffect, useCallback } from 'react';

export interface FullscreenHook {
  isFullscreen: boolean;
  toggleFullscreen: () => Promise<void>;
  exitFullscreen: () => Promise<void>;
  requestFullscreen: () => Promise<void>;
  isSupported: boolean;
}

export const useFullscreen = (): FullscreenHook => {
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Check if fullscreen is supported
  const isSupported = !!(
    document.fullscreenEnabled ||
    (document as any).webkitFullscreenEnabled ||
    (document as any).mozFullScreenEnabled ||
    (document as any).msFullscreenEnabled
  );

  // Update fullscreen state when it changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!(
        document.fullscreenElement ||
        (document as any).webkitFullscreenElement ||
        (document as any).mozFullScreenElement ||
        (document as any).msFullscreenElement
      );
      setIsFullscreen(isCurrentlyFullscreen);
    };

    // Add event listeners for different browsers
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, []);

  const requestFullscreen = useCallback(async (): Promise<void> => {
    if (!isSupported) return;

    const element = document.documentElement;

    try {
      if (element.requestFullscreen) {
        await element.requestFullscreen();
      } else if ((element as any).webkitRequestFullscreen) {
        await (element as any).webkitRequestFullscreen();
      } else if ((element as any).mozRequestFullScreen) {
        await (element as any).mozRequestFullScreen();
      } else if ((element as any).msRequestFullscreen) {
        await (element as any).msRequestFullscreen();
      }
    } catch (error) {
      console.warn('Failed to request fullscreen:', error);
    }
  }, [isSupported]);

  const exitFullscreen = useCallback(async (): Promise<void> => {
    if (!isSupported) return;

    try {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        await (document as any).webkitExitFullscreen();
      } else if ((document as any).mozCancelFullScreen) {
        await (document as any).mozCancelFullScreen();
      } else if ((document as any).msExitFullscreen) {
        await (document as any).msExitFullscreen();
      }
    } catch (error) {
      console.warn('Failed to exit fullscreen:', error);
    }
  }, [isSupported]);

  const toggleFullscreen = useCallback(async (): Promise<void> => {
    if (isFullscreen) {
      await exitFullscreen();
    } else {
      await requestFullscreen();
    }
  }, [isFullscreen, exitFullscreen, requestFullscreen]);

  return {
    isFullscreen,
    toggleFullscreen,
    exitFullscreen,
    requestFullscreen,
    isSupported,
  };
};