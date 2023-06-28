import React from "react";
import { useNavigate } from "react-router-dom";

export function RecommendedPreview({ song }) {
  const navigate = useNavigate();
  function handleSongClick() {
    navigate(`/songs/${song.videoId}`);
  }

  return (
    <article className="info" onClick={handleSongClick}>
      <img src={song.imgUrl}/>
      <h3>{song?.title}</h3>
      <p>{song?.artist}</p>
      <p>{song?.album}</p>
    </article>
  );
}
