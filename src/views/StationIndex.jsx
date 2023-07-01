import { useCallback, useEffect } from 'react'
import { StationList } from '../cmps/StationList'
import { useDispatch, useSelector } from 'react-redux'
import { loadStations, removeStation } from '../store/actions/station.actions'

export function StationIndex() {
  const stations = useSelector(
    (storeState) => storeState.stationModule.stations
  )

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadStations())
  }, [])

  if (!stations) return <div className="loader"></div>

  return (
    <section className="station-index">
      <StationList stations={stations} onRemoveStation={onRemoveStation} />
    </section>
  )
}
