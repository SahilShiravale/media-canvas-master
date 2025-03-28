
import React from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw, SkipBack, SkipForward } from 'lucide-react';

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
        variant="outline"
        size="sm"
        onClick={resetTimer}
        className="bg-white border-gray-300 text-gray-700 hover:bg-gray-100 h-8 w-8 p-0"
      >
        <SkipBack className="h-4 w-4" />
      </Button>
      
      <Button
        onClick={togglePlay}
        variant="outline"
        size="sm"
        className="bg-white border-gray-300 text-gray-700 hover:bg-gray-100 h-8 w-8 p-0"
      >
        {isPlaying ? (
          <Pause className="h-4 w-4" />
        ) : (
          <Play className="h-4 w-4" />
        )}
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        disabled
        className="bg-white border-gray-300 text-gray-700 hover:bg-gray-100 h-8 w-8 p-0"
      >
        <SkipForward className="h-4 w-4" />
      </Button>
      
      <div className="bg-white px-3 py-1 rounded text-sm border border-gray-300">
        {formatTime(currentTime)} / 01:00:0
      </div>
    </div>
  );
};

export default TimelineControls;
