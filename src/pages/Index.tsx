
import React from 'react';
import { MediaProvider } from '@/context/MediaContext';
import Sidebar from '@/components/MediaEditor/Sidebar';
import Canvas from '@/components/MediaEditor/Canvas';
import TimelineControls from '@/components/MediaEditor/TimelineControls';
import { useMediaContext } from '@/context/MediaContext';

const EditorInterface: React.FC = () => {
  const { currentTime, isPlaying, togglePlay, resetTimer } = useMediaContext();
  
  return (
    <div className="media-editor">
      <header className="editor-header">
        <h1 className="text-xl font-bold">Media Canvas Master</h1>
        <TimelineControls 
          currentTime={currentTime}
          isPlaying={isPlaying}
          togglePlay={togglePlay}
          resetTimer={resetTimer}
        />
      </header>
      
      <main className="editor-main">
        <Sidebar />
        
        <div className="editor-canvas-container">
          <Canvas />
        </div>
      </main>
    </div>
  );
};

const Index: React.FC = () => {
  return (
    <MediaProvider>
      <EditorInterface />
    </MediaProvider>
  );
};

export default Index;
