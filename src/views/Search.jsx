import { useEffect, useRef } from 'react'
import { SearchCategoryList } from '../cmps/SearchCategory/SearchCategoryList'
import { useDispatch, useSelector } from 'react-redux'
import { loadSearchStations } from '../store/actions/station.actions'
import { eventBus } from '../services/event-bus.service'
export default function Search() {
  const categories = useSelector(
    (storeState) => storeState.stationModule.searchStations
  )
  const searchRef = useRef(null)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadSearchStations())
  }, [])

  useEffect(() => {
    const currentStationDetailsRef = searchRef.current
    const gradient = {
      background:
        'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 50%, rgba(0,0,0,1) 70%, rgba(0,0,0,1) 100%)',
    }
    const handleScroll = () => {
      const scrollPos = currentStationDetailsRef.scrollTop
      eventBus.emit('stationDetailsScroll', { scrollPos, gradient })
    }
    if (currentStationDetailsRef) {
      currentStationDetailsRef.addEventListener('scroll', handleScroll, {
        passive: true,
      })
    }
    return () => {
      if (currentStationDetailsRef) {
        currentStationDetailsRef.removeEventListener('scroll', handleScroll, {
          passive: true,
        })
      }
    }
  }, [])

  if (!categories) return <div className="loader"></div>
  return (
    <div className="categories-index" ref={searchRef}>
      <h2 className="search-header">Browse all</h2>
      <SearchCategoryList categories={categories} />
    </div>
  )
}
