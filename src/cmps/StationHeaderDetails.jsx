import React from "react"
import { useSelector } from "react-redux"
import { stationService } from "../services/station.service.js"
import StationSystem  from "./StationSystem";
import StationUser from "./StationUser.jsx";

export default function StationHeaderDetails(props) {
  const bgStyle = props.bgStyle
  const station = props.station
  const stationType = useSelector(
    (storeState) => storeState.stationModule.currStationType
  )
  
  const stationNameClass = stationService.stationNameClass(station)

  return (
    <div className="station-header-content" style={bgStyle}>
       {stationType === "system" && (<StationSystem station={station}/>)}
       {stationType === "user" && (<StationUser station={station}/>)}
    </div>
  )
}
