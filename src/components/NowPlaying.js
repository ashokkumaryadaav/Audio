import React from 'react';

const NowPlaying = ({ currentFile }) => {
  return (
    <div>
      <h2>Now Playing</h2>
      {currentFile && <p>{currentFile.name}</p>}
    </div>
  );
};

export default NowPlaying;
