import React from "react";

export default function LatestStationsPreview({ station }) {
  return (
    station && (
        <article className="latest-stations-article pointer">
          <img src={station.imgUrl} />
          <span>{station.name}</span>
          <div className="play-button flex justify-center align-center"></div>
          </article>
    )
  );
}
