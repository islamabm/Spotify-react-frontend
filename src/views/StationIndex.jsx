import { useEffect } from 'react'
import { StationList } from '../cmps/StationList'
import { useDispatch, useSelector } from 'react-redux'
import { loadStations } from '../store/actions/station.actions'

export function StationIndex() {
  const stations = useSelector(
    (storeState) => storeState.stationModule.stations
  )
  const filterBy = useSelector(
    (storeState) => storeState.stationModule.categoryBy
  )  

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadStations(filterBy))
  }, [])

  if (!stations) return <div className="loader"></div>

  return (
    <section className="station-index">
      <StationList stations={stations} />
    </section>
  )
}
