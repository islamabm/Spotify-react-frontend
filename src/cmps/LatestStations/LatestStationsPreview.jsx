import React from "react";

export default function LatestStationsPreview({ station }) {
  return (
    station && (
        <article className="latest-station-article">{station.name}</article>

    )
  );
}
