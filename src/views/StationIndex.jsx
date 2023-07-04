import { useEffect } from 'react'
import { StationList } from '../cmps/StationList'
import { useDispatch, useSelector } from 'react-redux'
import { loadStations } from '../store/actions/station.actions'
import { LatestStationsIndex } from '../cmps/LatestStations/LatestStationsIndex'

export function StationIndex() {
  const stations = useSelector(
    (storeState) => storeState.stationModule.stations
  )
  console.log('stations', stations)
  const filterBy = useSelector(
    (storeState) => storeState.stationModule.categoryBy
  )
  console.log('filterBy', filterBy)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadStations())
  }, [filterBy])
  useEffect(() => {
    console.log('filterBy', filterBy)
  }, [filterBy])

  if (!stations) return <div className="loader"></div>

  return (
    <section className="station-index">
      <LatestStationsIndex />
      <StationList stations={stations} />
    </section>
  )
}
