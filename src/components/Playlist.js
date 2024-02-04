// components/Playlist.js
import React from 'react';
import './Playlist.css';

const Playlist = ({ files, onFileSelect, onFileRemove, onFileClick }) => {
  const handleFileChange = (e) => {
    const fileList = e.target.files;
    onFileSelect(fileList);
  };

  const handleRemove = (file) => {
    onFileRemove(file);
  };

  return (
    <div className="playlist-container">
      <input type="file" accept="audio/mpeg" onChange={handleFileChange} multiple />
      <ul className="playlist-list">
        {files.map((file, index) => (
          <li key={index} className="playlist-item" onClick={() => onFileClick(file)}>
            {file.name}
            <button className="remove-button" onClick={(e) => { e.stopPropagation(); handleRemove(file); }}>×</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Playlist;
