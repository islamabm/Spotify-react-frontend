import React from "react";
import { useNavigate } from "react-router-dom";

export function RecommendedPreview({ song }) {
  const navigate = useNavigate();
  function handleSongClick() {
    navigate(`/songs/${song.videoId}`);
  }

  return (
    <article className="song" onClick={handleSongClick}>
      <img src={song.imgUrl} className="song-img"/>
      <div className="name-and-artist">
      <span>{song?.title}</span>
      <span className="song-artist">{song?.artist}</span>
      </div>
      <span>{song?.album}</span>
    </article>
  );
}
