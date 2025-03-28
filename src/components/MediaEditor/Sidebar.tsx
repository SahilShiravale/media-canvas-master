
import React from 'react';
import { useMediaContext } from '@/context/MediaContext';
import { useMediaEditor } from '@/hooks/useMediaEditor';
import DimensionInput from './DimensionInput';
import TimeInput from './TimeInput';
import MediaUpload from './MediaUpload';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Trash } from 'lucide-react';

const Sidebar: React.FC = () => {
  const { selectedMediaId } = useMediaContext();
  const { 
    selectedMedia, 
    updateDimensions,
    updateTimeRange,
    toggleAspectRatio,
    deleteMedia,
  } = useMediaEditor(selectedMediaId);

  const handleWidthChange = (width: number) => {
    if (selectedMedia) {
      updateDimensions(width, selectedMedia.height);
    }
  };

  const handleHeightChange = (height: number) => {
    if (selectedMedia) {
      updateDimensions(selectedMedia.width, height);
    }
  };

  const handleStartTimeChange = (startTime: number) => {
    if (selectedMedia) {
      updateTimeRange(startTime, selectedMedia.endTime);
    }
  };

  const handleEndTimeChange = (endTime: number) => {
    if (selectedMedia) {
      updateTimeRange(selectedMedia.startTime, endTime);
    }
  };

  return (
    <div className="editor-sidebar">
      <h2 className="text-xl font-bold mb-6">Media Editor</h2>
      
      <MediaUpload />
      
      {selectedMedia ? (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-4">Media Properties</h3>
          
          <div className="bg-gray-800 p-4 rounded-md mb-4">
            <h4 className="text-sm font-medium mb-3 text-gray-300">Dimensions</h4>
            <div className="grid grid-cols-2 gap-3">
              <DimensionInput 
                label="Width" 
                value={selectedMedia.width} 
                onChange={handleWidthChange} 
              />
              <DimensionInput 
                label="Height" 
                value={selectedMedia.height} 
                onChange={handleHeightChange} 
              />
            </div>
            
            <div className="flex items-center justify-between mt-3">
              <Label htmlFor="aspect-ratio" className="text-sm text-gray-300">Maintain aspect ratio</Label>
              <Switch 
                id="aspect-ratio"
                checked={selectedMedia.maintainAspectRatio}
                onCheckedChange={toggleAspectRatio}
              />
            </div>
          </div>
          
          <div className="bg-gray-800 p-4 rounded-md mb-4">
            <h4 className="text-sm font-medium mb-3 text-gray-300">Timeline</h4>
            <div className="grid grid-cols-2 gap-3">
              <TimeInput 
                label="Start Time (s)" 
                value={selectedMedia.startTime} 
                onChange={handleStartTimeChange} 
              />
              <TimeInput 
                label="End Time (s)" 
                value={selectedMedia.endTime} 
                onChange={handleEndTimeChange} 
              />
            </div>
          </div>
          
          <Button 
            variant="destructive" 
            onClick={deleteMedia}
            className="w-full mt-4"
          >
            <Trash className="h-4 w-4 mr-2" />
            Remove Media
          </Button>
        </div>
      ) : (
        <div className="text-gray-400 text-center mt-8">
          <p>Upload media or select an item to edit its properties</p>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
