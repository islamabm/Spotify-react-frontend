import React from "react";

export function RecommendedPreview({ song }) {

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
