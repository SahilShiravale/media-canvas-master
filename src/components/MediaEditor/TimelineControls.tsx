
import React from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface TimelineControlsProps {
  currentTime: number;
  isPlaying: boolean;
  togglePlay: () => void;
  resetTimer: () => void;
}

const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const TimelineControls: React.FC<TimelineControlsProps> = ({
  currentTime,
  isPlaying,
  togglePlay,
  resetTimer,
}) => {
  return (
    <div className="flex items-center space-x-4">
      <Button
        onClick={togglePlay}
        variant="outline"
        size="sm"
        className="bg-editor-sidebar border-gray-700 text-white hover:bg-gray-700"
      >
        {isPlaying ? (
          <Pause className="h-4 w-4" />
        ) : (
          <Play className="h-4 w-4" />
        )}
      </Button>
      
      <Button
        onClick={resetTimer}
        variant="outline"
        size="sm"
        className="bg-editor-sidebar border-gray-700 text-white hover:bg-gray-700"
      >
        <RotateCcw className="h-4 w-4" />
      </Button>
      
      <div className="bg-gray-800 px-3 py-1 rounded text-sm">
        {formatTime(currentTime)}
      </div>
    </div>
  );
};

export default TimelineControls;
