
import React, { useCallback, useState } from 'react';
import { useMediaContext } from '@/context/MediaContext';
import { Button } from '@/components/ui/button';
import { Upload, Plus } from 'lucide-react';
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
        className={`drop-indicator h-32 ${isDragging ? 'border-editor-highlight bg-editor-highlight/5' : 'border-gray-600'}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <Upload className="w-8 h-8 mb-2 text-gray-400" />
        <p className="text-sm">Drag & drop media here</p>
      </div>
      
      <div className="flex justify-center mt-4">
        <label htmlFor="file-upload">
          <Button 
            className="bg-editor-purple hover:bg-editor-highlight text-white"
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
    </div>
  );
};

export default MediaUpload;
