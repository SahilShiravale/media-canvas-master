
import React from 'react';
import { MediaProvider } from '@/context/MediaContext';
import Sidebar from '@/components/MediaEditor/Sidebar';
import Canvas from '@/components/MediaEditor/Canvas';
import TimelineControls from '@/components/MediaEditor/TimelineControls';
import { useMediaContext } from '@/context/MediaContext';
import { Search, HelpCircle, LogIn, ZapIcon, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const EditorInterface: React.FC = () => {
  const { currentTime, isPlaying, togglePlay, resetTimer } = useMediaContext();
  
  return (
    <div className="media-editor">
      <header className="editor-header">
        <div className="flex items-center space-x-4">
          <div className="text-2xl font-bold">V</div>
          <div className="text-lg font-semibold">Project Name</div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="h-5 w-5 absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="pl-9 pr-4 py-1.5 bg-indigo-600 border border-indigo-500 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-white/20"
            />
          </div>
          
          <Button variant="ghost" size="sm" className="text-white hover:bg-indigo-600">
            <HelpCircle className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center space-x-2 text-sm">
            <Button variant="ghost" size="sm" className="text-white hover:bg-indigo-600">
              Sign Up
            </Button>
            <span>•</span>
            <Button variant="ghost" size="sm" className="text-white hover:bg-indigo-600">
              <LogIn className="h-4 w-4 mr-1" /> Log In
            </Button>
          </div>
          
          <Button className="bg-amber-500 hover:bg-amber-600 text-white">
            <ZapIcon className="h-4 w-4 mr-1" /> Upgrade
          </Button>
          
          <Button className="bg-white text-indigo-700 hover:bg-gray-100">
            <CheckCircle className="h-4 w-4 mr-1" /> Done
          </Button>
        </div>
      </header>
      
      <main className="editor-main">
        <Sidebar />
        
        <div className="editor-canvas-container">
          <Canvas />
          
          <div className="bg-white border-t border-gray-200 p-4 flex justify-between items-center">
            <TimelineControls 
              currentTime={currentTime}
              isPlaying={isPlaying}
              togglePlay={togglePlay}
              resetTimer={resetTimer}
            />
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="text-sm">
                Landscape (16:9)
              </Button>
            </div>
          </div>
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
