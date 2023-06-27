import React from "react"
import { stationService } from "../services/station.service.js"
import { getSpotifySvg } from "../services/SVG.service.js"

export default function StationUser(props) {
    const station = props.station
    const stationNameClass = stationService.stationNameClass(station)
    console.log('station', station)
    return (
    <>
      <div className="station-main-img">
        <span
          dangerouslySetInnerHTML={{
            __html: getSpotifySvg('listIcon'),
          }}
        ></span>
      </div>
      <div className="station-info">
        <span className="playlist-word">Playlist</span>
        <h1 className={stationNameClass}>{station.name}</h1>
        <span className="songs-count"> {station.songs?.length} songs </span>
      </div>
    </>
  )
}
