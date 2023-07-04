import { useEffect } from 'react'
import { StationList } from '../cmps/StationList'
import { useDispatch, useSelector } from 'react-redux'
import { loadStations } from '../store/actions/station.actions'
import { LatestStationsIndex } from '../cmps/LatestStations/LatestStationsIndex'

export function StationIndex() {
  const stations = useSelector(
    (storeState) => storeState.stationModule.stations
  )
  const categoryBy = useSelector(
    (storeState) => storeState.stationModule.categoryBy
  )

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadStations(categoryBy))
  }, [categoryBy])
  useEffect(() => {
  }, [categoryBy])

  if (!stations) return <div className="loader"></div>

  return (
    <section className="station-index">
      <LatestStationsIndex />
      <StationList stations={stations} />
    </section>
  )
}
