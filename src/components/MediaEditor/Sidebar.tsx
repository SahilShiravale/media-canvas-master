
import React from 'react';
import { useMediaContext } from '@/context/MediaContext';
import { useMediaEditor } from '@/hooks/useMediaEditor';
import DimensionInput from './DimensionInput';
import TimeInput from './TimeInput';
import MediaUpload from './MediaUpload';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Trash, Upload, Video, Headphones, FileText, Square, Settings } from 'lucide-react';

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
      <h2 className="veed-sidebar-title">Add Media</h2>
      
      <MediaUpload />
      
      <div className="flex flex-col space-y-4 mt-8">
        <SidebarItem icon={<Video size={18} />} label="Video" />
        <SidebarItem icon={<Headphones size={18} />} label="Audio" />
        <SidebarItem icon={<FileText size={18} />} label="Subtitles" />
        <SidebarItem icon={<Square size={18} />} label="Text" />
        <SidebarItem icon={<Square size={18} />} label="Elements" />
        <SidebarItem icon={<Settings size={18} />} label="Settings" />
      </div>
      
      {selectedMedia ? (
        <div className="mt-8 border-t border-gray-200 pt-6">
          <h3 className="text-lg font-semibold mb-4">Media Properties</h3>
          
          <div className="bg-gray-50 p-4 rounded-md mb-4">
            <h4 className="text-sm font-medium mb-3 text-gray-700">Dimensions</h4>
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
              <Label htmlFor="aspect-ratio" className="text-sm text-gray-700">Maintain aspect ratio</Label>
              <Switch 
                id="aspect-ratio"
                checked={selectedMedia.maintainAspectRatio}
                onCheckedChange={toggleAspectRatio}
              />
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-md mb-4">
            <h4 className="text-sm font-medium mb-3 text-gray-700">Timeline</h4>
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
      ) : null}
    </div>
  );
};

const SidebarItem: React.FC<{ icon: React.ReactNode; label: string }> = ({ icon, label }) => {
  return (
    <div className="flex items-center space-x-2 text-gray-600 cursor-pointer hover:text-indigo-600 transition-colors py-2">
      <div className="text-gray-500">{icon}</div>
      <span className="text-sm">{label}</span>
    </div>
  );
};

export default Sidebar;
