import React from 'react';
import VideoCaption from './VideoCaption';

const App = () => {
  return (
    <div className="flex flex-col m-10 shadow-xl md:h-[calc(100vh-5rem)] min-h-[35rem] bg-purple-500  rounded-xl items-center">
      <h1 className="text-3xl font-bold text-white font-mono m-6">Video Caption Generator</h1>
      <VideoCaption/>
    </div>
  );
};

export default App;