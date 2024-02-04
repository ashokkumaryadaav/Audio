// Inside AudioPlayer.js

import React, { useRef, useEffect } from 'react';

const AudioPlayer = ({ src }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (src) {
      audio.src = src;
      audio.load();
      audio.play();
    }
  }, [src]);

  return (
    <audio ref={audioRef} controls>
      Your browser does not support the audio element.
    </audio>
  );
};

export default AudioPlayer;
