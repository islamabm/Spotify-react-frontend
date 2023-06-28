import { useCallback, useEffect } from 'react'
import { StationList } from '../cmps/StationList'
import { useDispatch, useSelector } from 'react-redux'
import { loadStations, removeStation } from '../store/actions/station.actions'

export function StationIndex() {
  const station = useSelector(
    (storeState) => storeState.stationModule.currStation
  )
  console.log('station', station)

  const stations = useSelector(
    (storeState) => storeState.stationModule.stations
  )
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadStations())
  }, [])

  const onRemoveStation = useCallback(async (stationId) => {
    try {
      dispatch(removeStation(stationId))
    } catch (error) {
      console.log('error:', error)
    }
  }, [])

  if (!stations) return <div>Loading...</div>

  return (
    <section className="station-index">
      {/* <Link to="/station/edit">Add Station</Link> */}

      <StationList stations={stations} onRemoveStation={onRemoveStation} />
    </section>
  )
}
