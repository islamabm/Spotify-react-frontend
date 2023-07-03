import React from "react";

export default function LatestStationsPreview({ station }) {
  return (
    station && (
        <article className="latest-stations-article flex align-center">
          <img src={station.imgUrl} />
          <span>{station.name}</span>
          </article>
    )
  );
}
