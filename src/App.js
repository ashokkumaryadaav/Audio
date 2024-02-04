// App.js
import React, { useState, useEffect } from 'react';
import AudioPlayer from './components/AudioPlayer';
import Playlist from './components/Playlist';
import './App.css';

const App = () => {
  const [files, setFiles] = useState([]);
  const [currentFile, setCurrentFile] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const storedFiles = JSON.parse(localStorage.getItem('playlistFiles'));
    if (storedFiles) {
      setFiles(storedFiles);
    }
    const storedFile = JSON.parse(localStorage.getItem('currentFile'));
    const storedTime = JSON.parse(localStorage.getItem('currentTime'));
    setCurrentFile(storedFile);
    setCurrentTime(storedTime);
  }, []);

  useEffect(() => {
    localStorage.setItem('playlistFiles', JSON.stringify(files));
    localStorage.setItem('currentFile', JSON.stringify(currentFile));
    localStorage.setItem('currentTime', JSON.stringify(currentTime));
  }, [files, currentFile, currentTime]);

  const handleFileSelect = (fileList) => {
    setFiles(prevFiles => [...prevFiles, ...fileList]);
  };

  const handleFileClick = (file) => {
    setCurrentFile(file);
    setCurrentTime(0);
  };

  const handleTimeUpdate = (time) => {
    setCurrentTime(time);
  };

  const handleFileRemove = (fileToRemove) => {
    const updatedFiles = files.filter(file => file !== fileToRemove);
    setFiles(updatedFiles);
    if (currentFile === fileToRemove) {
      setCurrentFile(null);
      setCurrentTime(0);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">Music Player</h1>
      </header>
      <div className="app-content">
        <Playlist
          files={files}
          onFileSelect={handleFileSelect}
          onFileClick={handleFileClick}
          onFileRemove={handleFileRemove}
        />
        <div className="audio-player-container">
          <div className="now-playing-wrapper">
            <NowPlayingTitle />
            {currentFile && (
              <div className="audio-player">
                <p className="now-playing">{currentFile.name}</p>
                <AudioPlayer
                  src={currentFile && URL.createObjectURL(currentFile)}
                  currentTime={currentTime}
                  onTimeUpdate={handleTimeUpdate}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const NowPlayingTitle = () => (
  <h2 className="now-playing-title">Now Playing</h2>
);

export default App;
