import React from "react"
import { useSelector } from "react-redux"
import StationSystem  from "./StationSystem";
import StationUser from "./StationUser.jsx";

export default function StationHeaderDetails(props) {
  const bgStyle = props.bgStyle
  const station = props.station
  const createdBy = station.createdBy.fullname
  
  return (
    <div className="station-header-content" style={bgStyle}>
       {createdBy === "system" && (<StationSystem station={station}/>)}
       {createdBy === "guset" && (<StationUser station={station}/>)}
    </div>
  )
}
