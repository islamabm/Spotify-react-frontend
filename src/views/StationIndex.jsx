import { useEffect, useRef, useState } from 'react'
import { StationList } from '../cmps/StationList'
import { useDispatch, useSelector } from 'react-redux'
import { loadStations } from '../store/actions/station.actions'

import { eventBus } from '../services/event-bus.service'

export function StationIndex() {
  const [headerBg, setHeaderBg] = useState({
    backgroundColor: `transparent`,
  })

  const stations = useSelector(
    (storeState) => storeState.stationModule.stations
  )

  const dispatch = useDispatch()

  const stationIndexRef = useRef(null)
  const width = window.innerWidth

  useEffect(() => {
    if (width > 460) {
      const currentStationIndexRef = stationIndexRef.current
      const handleScroll = () => {
        const scrollPos = currentStationIndexRef.scrollTop
        if (scrollPos > 375) {
          setHeaderBg({ backgroundColor: '#1a1a1a' })
        } else {
          setHeaderBg({ backgroundColor: 'transparent' })
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
    }
    return
  }, [headerBg])

  useEffect(() => {
    dispatch(loadStations())
  }, [])

  if (!stations) return <div className="loader"></div>

  return (
    <section className="station-index" ref={stationIndexRef}>
      <StationList stations={stations} />
    </section>
  )
}
