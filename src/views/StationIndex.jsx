import { useEffect, useRef, useState } from 'react'
import { StationList } from '../cmps/StationList'
import { useDispatch, useSelector } from 'react-redux'
import { loadStations } from '../store/actions/station.actions'
import { getGreeting } from '../services/util.service'
import { eventBus } from '../services/event-bus.service'

export function StationIndex() {
  const [headerBg, setHeaderBg] = useState({
    backgroundColor: `transparent`,
  })
  const stations = useSelector(
    (storeState) => storeState.stationModule.stations
  )

  const stationIndexRef = useRef(null)

  const user = useSelector((storeState) => storeState.userModule.loggedInUser)

  const dispatch = useDispatch()
  const currentDate = new Date()
  const greeting = getGreeting(currentDate)

  useEffect(() => {
    const currentStationIndexRef = stationIndexRef.current
    const handleScroll = () => {
      const scrollPos = currentStationIndexRef.scrollTop
      if (scrollPos > 375) {
        setHeaderBg('#1a1a1a')
      } else {
        setHeaderBg('transparent')
      }
      eventBus.emit('stationIndexScroll', { scrollPos, headerBg })
    }
    if (currentStationIndexRef) {
      currentStationIndexRef.addEventListener('scroll', handleScroll, {
        passive: true,
      })
    }
    return () => {
      if (currentStationIndexRef) {
        currentStationIndexRef.removeEventListener('scroll', handleScroll, {
          passive: true,
        })
      }
    }
  }, [headerBg])

  useEffect(() => {
    dispatch(loadStations())
  }, [])

  if (!stations) return <div className="loader"></div>

  return (
    <section className="station-index" ref={stationIndexRef}>
      {/* <h1 className="greeting">{greeting}</h1> */}
      {/* <LatestStationsIndex /> */}
      <StationList stations={stations} />
    </section>
  )
}
