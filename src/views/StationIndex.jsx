import { useEffect } from 'react'
import { StationList } from '../cmps/StationList'
import { useDispatch, useSelector } from 'react-redux'
import { loadStations } from '../store/actions/station.actions'
import { LatestStationsIndex } from '../cmps/LatestStations/LatestStationsIndex'
import { getGreeting } from "../services/util.service"





export function StationIndex() {
  const stations = useSelector(
    (storeState) => storeState.stationModule.stations
    )
    
    const filterBy = useSelector(
      (storeState) => storeState.stationModule.categoryBy
      )
      
      const dispatch = useDispatch()
      const currentDate = new Date();
      const greeting = getGreeting(currentDate);
      
  useEffect(() => {
    dispatch(loadStations(filterBy))
  }, [filterBy])

  if (!stations) return <div className="loader"></div>

  return (
    <section className="station-index">
      <h1 className='greeting'>{greeting}</h1>
      <LatestStationsIndex />
      <StationList stations={stations} />
    </section>
  )
}
