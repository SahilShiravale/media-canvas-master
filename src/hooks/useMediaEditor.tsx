
import { useCallback } from 'react';
import { useMediaContext } from '@/context/MediaContext';
import { MediaItem } from '@/types';

export const useMediaEditor = (mediaId: string | null) => {
  const { 
    mediaItems, 
    updateMedia, 
    removeMedia, 
    currentTime,
    isPlaying,
    togglePlay,
    resetTimer,
  } = useMediaContext();

  const selectedMedia = mediaId 
    ? mediaItems.find(item => item.id === mediaId) || null 
    : null;

  const updatePosition = useCallback((x: number, y: number) => {
    if (!mediaId) return;
    updateMedia(mediaId, { x, y });
  }, [mediaId, updateMedia]);

  const updateDimensions = useCallback((width: number, height: number) => {
    if (!mediaId || !selectedMedia) return;
    
    const updates: Partial<MediaItem> = { width, height };
    
    // If maintaining aspect ratio, calculate the other dimension
    if (selectedMedia.maintainAspectRatio) {
      const aspectRatio = selectedMedia.width / selectedMedia.height;
      
      if (width !== selectedMedia.width) {
        updates.height = Math.round(width / aspectRatio);
      } else if (height !== selectedMedia.height) {
        updates.width = Math.round(height * aspectRatio);
      }
    }
    
    updateMedia(mediaId, updates);
  }, [mediaId, selectedMedia, updateMedia]);

  const updateTimeRange = useCallback((startTime: number, endTime: number) => {
    if (!mediaId) return;
    updateMedia(mediaId, { startTime, endTime });
  }, [mediaId, updateMedia]);

  const toggleAspectRatio = useCallback(() => {
    if (!mediaId || !selectedMedia) return;
    updateMedia(mediaId, { maintainAspectRatio: !selectedMedia.maintainAspectRatio });
  }, [mediaId, selectedMedia, updateMedia]);

  const deleteMedia = useCallback(() => {
    if (!mediaId) return;
    removeMedia(mediaId);
  }, [mediaId, removeMedia]);

  const isVisible = useCallback((media: MediaItem) => {
    return currentTime >= media.startTime && currentTime <= media.endTime;
  }, [currentTime]);

  return {
    selectedMedia,
    updatePosition,
    updateDimensions,
    updateTimeRange,
    toggleAspectRatio,
    deleteMedia,
    isVisible,
    currentTime,
    isPlaying,
    togglePlay,
    resetTimer,
  };
};
