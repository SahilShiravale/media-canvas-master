import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { MediaContextType, MediaItem } from '@/types';
import { toast } from 'sonner';

const MediaContext = createContext<MediaContextType | undefined>(undefined);

export const MediaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [selectedMediaId, setSelectedMediaId] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timerId, setTimerId] = useState<number | null>(null);

  // Handle timer for playback
  useEffect(() => {
    if (isPlaying) {
      const id = window.setInterval(() => {
        setCurrentTime(prev => prev + 0.1);
      }, 100);
      setTimerId(id);
    } else if (timerId !== null) {
      clearInterval(timerId);
      setTimerId(null);
    }

    return () => {
      if (timerId !== null) {
        clearInterval(timerId);
      }
    };
  }, [isPlaying]);

  const addMedia = useCallback((file: File) => {
    const id = `media-${Date.now()}`;
    const isVideo = file.type.startsWith('video/');
    const type = isVideo ? 'video' : 'image';
    
    const url = URL.createObjectURL(file);
    
    // Create a new media item with default values
    const newMedia: MediaItem = {
      id,
      file,
      type,
      url,
      width: 320,
      height: 240,
      x: 100,
      y: 100,
      startTime: 0,
      endTime: 60,
      maintainAspectRatio: true,
    };

    // For images, update dimensions based on actual image size
    if (type === 'image') {
      const img = new Image();
      img.onload = () => {
        setMediaItems(prev => {
          return prev.map(item => {
            if (item.id === id) {
              // Keep aspect ratio but set a reasonable max size
              let width = img.width;
              let height = img.height;
              const maxDimension = 400;
              
              if (width > maxDimension || height > maxDimension) {
                const ratio = width / height;
                if (width > height) {
                  width = maxDimension;
                  height = width / ratio;
                } else {
                  height = maxDimension;
                  width = height * ratio;
                }
              }
              
              return { ...item, width, height };
            }
            return item;
          });
        });
      };
      img.src = url;
    }
    
    setMediaItems(prev => [...prev, newMedia]);
    setSelectedMediaId(id);
    toast.success('Media added successfully');
  }, []);

  const removeMedia = useCallback((id: string) => {
    setMediaItems(prev => {
      // Get the media item to revoke its object URL
      const mediaToRemove = prev.find(item => item.id === id);
      if (mediaToRemove) {
        URL.revokeObjectURL(mediaToRemove.url);
      }
      return prev.filter(item => item.id !== id);
    });
    
    if (selectedMediaId === id) {
      setSelectedMediaId(null);
    }
    
    toast.info('Media removed');
  }, [selectedMediaId]);

  const updateMedia = useCallback((id: string, updates: Partial<MediaItem>) => {
    setMediaItems(prev =>
      prev.map(item => (item.id === id ? { ...item, ...updates } : item))
    );
  }, []);

  const selectMedia = useCallback((id: string | null) => {
    setSelectedMediaId(id);
  }, []);

  const togglePlay = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);
  
  const resetTimer = useCallback(() => {
    setCurrentTime(0);
    setIsPlaying(false);
  }, []);

  // Clean up object URLs when component unmounts
  useEffect(() => {
    return () => {
      mediaItems.forEach(item => {
        URL.revokeObjectURL(item.url);
      });
    };
  }, []);

  const value: MediaContextType = {
    mediaItems,
    currentTime,
    isPlaying,
    selectedMediaId,
    addMedia,
    removeMedia,
    updateMedia,
    selectMedia,
    togglePlay,
    resetTimer,
    setCurrentTime,
  };

  return <MediaContext.Provider value={value}>{children}</MediaContext.Provider>;
};

export const useMediaContext = (): MediaContextType => {
  const context = useContext(MediaContext);
  if (context === undefined) {
    throw new Error('useMediaContext must be used within a MediaProvider');
  }
  return context;
};
