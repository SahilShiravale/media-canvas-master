
import React, { useCallback, useState } from 'react';
import { useMediaContext } from '@/context/MediaContext';
import { Button } from '@/components/ui/button';
import { Upload, Plus, Mic, FileText } from 'lucide-react';
import { toast } from 'sonner';

const MediaUpload: React.FC = () => {
  const { addMedia } = useMediaContext();
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    
    // Check if the file is a video or image
    if (!file.type.match('image.*') && !file.type.match('video.*')) {
      toast.error('Please upload an image or video file');
      return;
    }
    
    addMedia(file);
    
    // Reset the input
    e.target.value = '';
  }, [addMedia]);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    
    // Check if the file is a video or image
    if (!file.type.match('image.*') && !file.type.match('video.*')) {
      toast.error('Please upload an image or video file');
      return;
    }
    
    addMedia(file);
  }, [addMedia]);

  return (
    <div className="mb-6">
      <div 
        className={`drop-indicator h-32 ${isDragging ? 'border-indigo-600 bg-indigo-50' : 'border-gray-300'}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <Upload className="w-8 h-8 mb-2 text-gray-400" />
        <p className="text-sm font-medium">Upload a File</p>
        <p className="text-xs text-gray-500 mt-1">Drag & drop a file<br />or import from a link</p>
      </div>
      
      <div className="flex justify-center mt-4">
        <label htmlFor="file-upload">
          <Button 
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
            type="button"
            onClick={() => document.getElementById('file-upload')?.click()}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Media
          </Button>
          <input 
            id="file-upload" 
            type="file" 
            className="hidden" 
            accept="image/*,video/*"
            onChange={handleFileChange}
          />
        </label>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="veed-card flex items-center p-3 cursor-pointer">
          <Mic className="w-5 h-5 mr-2 text-gray-600" />
          <span className="text-sm">Record</span>
        </div>
        <div className="veed-card flex items-center p-3 cursor-pointer">
          <FileText className="w-5 h-5 mr-2 text-gray-600" />
          <span className="text-sm">Text To Speech</span>
        </div>
      </div>
    </div>
  );
};

export default MediaUpload;
