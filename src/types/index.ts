
export interface MediaItem {
  id: string;
  file: File;
  type: 'image' | 'video';
  url: string;
  width: number;
  height: number;
  x: number;
  y: number;
  startTime: number;
  endTime: number;
  maintainAspectRatio: boolean;
}

export interface MediaContextType {
  mediaItems: MediaItem[];
  currentTime: number;
  isPlaying: boolean;
  selectedMediaId: string | null;
  addMedia: (file: File) => void;
  removeMedia: (id: string) => void;
  updateMedia: (id: string, updates: Partial<MediaItem>) => void;
  selectMedia: (id: string | null) => void;
  togglePlay: () => void;
  resetTimer: () => void;
  setCurrentTime: (time: number) => void;
}

export interface DimensionInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export interface TimeInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}
