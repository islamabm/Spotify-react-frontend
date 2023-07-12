import React from "react"
import { getSpotifySvg } from "../../services/SVG.service"
import { EditStationMobileList } from "./EditStationMobileList"
import { useSelector } from "react-redux"

export function EditStationMobile() {
  const station = useSelector(
    (storeState) => storeState.stationModule.currStation
  )
  console.log('station', station)
  return (
    <section className="edit-station-mobile">
      <div className="edit-station-mobile-header flex align-center">
        <span className="edit-station-save">Save</span>
        <span className="edit-station-text">Edit playlist</span>
        <span
          //   onClick={onCloseEditModal}
          className="edit-station-x flex pointer"
          dangerouslySetInnerHTML={{
            __html: getSpotifySvg("x"),
          }}
        ></span>
      </div>
      <div className="edit-station-mobile-img-container flex justify-center">
        <img
          className="edit-station-mobile-img"
          src={station?.imgUrl}
          alt="edit station mobile img"
        />
        <span className="edit-station-mobile-change-img">Change image</span>
      </div>
      <div className="edit-station-mobile-input-container flex justify-center align-center">
        <input
          className="edit-station-mobile-input"
          type="text"
          placeholder={station?.name}
        />
        <button className="edit-station-mobile-description">
          Add description
        </button>
      </div>
      {station?.songs && (
        <div className="edit-station-song-list">
          <EditStationMobileList list={station.songs} />
        </div>
      )}
    </section>
  )
}
