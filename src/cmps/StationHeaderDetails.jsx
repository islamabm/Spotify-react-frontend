import React from "react"
import { useSelector } from "react-redux"
import StationSystem  from "./StationSystem";
import StationUser from "./StationUser.jsx";

export default function StationHeaderDetails(props) {
  const bgStyle = props.bgStyle
  const station = props.station
  const stationType = useSelector(
    (storeState) => storeState.stationModule.currStationType
  )
  console.log('stationType', stationType)
  
  return (
    <div className="station-header-content" style={bgStyle}>
       {stationType === "system" && (<StationSystem station={station}/>)}
       {stationType === "user" && (<StationUser station={station}/>)}
    </div>
  )
}
