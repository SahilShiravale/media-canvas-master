
import React, { useCallback, useRef } from 'react';
import { useMediaContext } from '@/context/MediaContext';
import { useMediaEditor } from '@/hooks/useMediaEditor';
import { MediaItem } from '@/types';

const Canvas: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const { mediaItems, selectMedia, selectedMediaId, updateMedia } = useMediaContext();
  const { isVisible } = useMediaEditor(selectedMediaId);

  const handleSelect = useCallback((id: string) => {
    selectMedia(id);
  }, [selectMedia]);

  const handleDragStart = useCallback((e: React.DragEvent, mediaId: string) => {
    e.dataTransfer.setData('mediaId', mediaId);
    selectMedia(mediaId);
  }, [selectMedia]);

  const handleDrag = useCallback((e: React.DragEvent, mediaId: string) => {
    if (!canvasRef.current) return;
    
    e.preventDefault();
    // This is a placeholder for a more sophisticated drag implementation
  }, []);

  const handleDragEnd = useCallback((e: React.DragEvent, mediaId: string) => {
    if (!canvasRef.current) return;
    
    // Calculate new position relative to canvas
    const canvasRect = canvasRef.current.getBoundingClientRect();
    const newX = e.clientX - canvasRect.left;
    const newY = e.clientY - canvasRect.top;
    
    // Update the media position
    updateMedia(mediaId, { x: newX, y: newY });
  }, [updateMedia]);

  const handleCanvasDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const handleCanvasDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const mediaId = e.dataTransfer.getData('mediaId');
    
    if (!canvasRef.current || !mediaId) return;
    
    // Calculate new position relative to canvas
    const canvasRect = canvasRef.current.getBoundingClientRect();
    const newX = e.clientX - canvasRect.left;
    const newY = e.clientY - canvasRect.top;
    
    // Update the media position
    updateMedia(mediaId, { x: newX, y: newY });
  }, [updateMedia]);

  // Function to handle manual resize
  const handleResize = useCallback((
    e: React.MouseEvent, 
    mediaId: string, 
    direction: 'nw' | 'ne' | 'se' | 'sw'
  ) => {
    e.preventDefault();
    e.stopPropagation();
    
    const media = mediaItems.find(item => item.id === mediaId);
    if (!media || !canvasRef.current) return;
    
    // This would be where you'd implement a full resize handler
    // For now, we'll just select the media
    selectMedia(mediaId);
  }, [mediaItems, selectMedia]);

  const renderMedia = (media: MediaItem) => {
    // Check if the media should be visible according to timeline
    const visible = isVisible(media);
    if (!visible) return null;
    
    const isSelected = media.id === selectedMediaId;
    
    const mediaStyle: React.CSSProperties = {
      width: `${media.width}px`,
      height: `${media.height}px`,
      left: `${media.x}px`,
      top: `${media.y}px`,
      border: isSelected ? '2px solid #8B5CF6' : 'none',
      zIndex: isSelected ? 10 : 1,
    };
    
    return (
      <div
        key={media.id}
        className="media-container"
        style={mediaStyle}
        onClick={() => handleSelect(media.id)}
        draggable
        onDragStart={(e) => handleDragStart(e, media.id)}
        onDrag={(e) => handleDrag(e, media.id)}
        onDragEnd={(e) => handleDragEnd(e, media.id)}
      >
        {media.type === 'image' ? (
          <img 
            src={media.url} 
            alt="Uploaded media" 
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        ) : (
          <video 
            src={media.url} 
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            controls={false}
            muted
            loop
            autoPlay
          />
        )}
        
        {isSelected && (
          <>
            <div 
              className="resize-handle resize-nw"
              style={{
                position: 'absolute',
                width: '10px',
                height: '10px',
                background: '#8B5CF6',
                borderRadius: '50%',
                top: '-5px',
                left: '-5px',
                cursor: 'nwse-resize'
              }}
              onMouseDown={(e) => handleResize(e, media.id, 'nw')}
            />
            <div 
              className="resize-handle resize-ne"
              style={{
                position: 'absolute',
                width: '10px',
                height: '10px',
                background: '#8B5CF6',
                borderRadius: '50%',
                top: '-5px',
                right: '-5px',
                cursor: 'nesw-resize'
              }}
              onMouseDown={(e) => handleResize(e, media.id, 'ne')}
            />
            <div 
              className="resize-handle resize-se"
              style={{
                position: 'absolute',
                width: '10px',
                height: '10px',
                background: '#8B5CF6',
                borderRadius: '50%',
                bottom: '-5px',
                right: '-5px',
                cursor: 'nwse-resize'
              }}
              onMouseDown={(e) => handleResize(e, media.id, 'se')}
            />
            <div 
              className="resize-handle resize-sw"
              style={{
                position: 'absolute',
                width: '10px',
                height: '10px',
                background: '#8B5CF6',
                borderRadius: '50%',
                bottom: '-5px',
                left: '-5px',
                cursor: 'nesw-resize'
              }}
              onMouseDown={(e) => handleResize(e, media.id, 'sw')}
            />
          </>
        )}
      </div>
    );
  };

  return (
    <div 
      className="editor-canvas" 
      ref={canvasRef}
      onDragOver={handleCanvasDragOver}
      onDrop={handleCanvasDrop}
      onClick={() => selectMedia(null)}
    >
      {mediaItems.length === 0 ? (
        <div className="flex items-center justify-center h-full text-gray-400">
          <p>Upload media to get started</p>
        </div>
      ) : (
        mediaItems.map(renderMedia)
      )}
    </div>
  );
};

export default Canvas;
