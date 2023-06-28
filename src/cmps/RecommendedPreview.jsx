import React from "react";
import { useNavigate } from "react-router-dom";

export function RecommendedPreview({ song }) {

console.log('song from preview',song)
  return (
    <article className="recommended-song flex align-center">
      <div className="img-and-title flex align-center">
      <img src={song.imgUrl} className="song-img"/>
      <span>{song?.title}</span>
      </div>
      <button className="pointer">Add</button>
    </article>
  );
}