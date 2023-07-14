import { useEffect, useRef, useState } from 'react'
import { SearchCategoryList } from '../cmps/SearchCategory/SearchCategoryList'
import { useDispatch, useSelector } from 'react-redux'
import { loadSearchStations } from '../store/actions/station.actions'
import { eventBus } from '../services/event-bus.service'
import { getSpotifySvg } from '../services/SVG.service'
import { stationService } from '../services/station.service'
import { SearchSongsList } from '../cmps/SearchSongs/SearchSongsList'

export default function Search() {
  const [searchText, setSearchText] = useState('')
  const [songList, setSongList] = useState([])

  const categories = useSelector(
    (storeState) => storeState.stationModule.searchStations
  )

  const dispatch = useDispatch()

  const searchRef = useRef(null)
  const width = window.innerWidth

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

  useEffect(() => {
    const timerId = setTimeout(async () => {
      const list = await stationService.getVideos(searchText)
      setSongList(list)
    }, 1000)
    return () => {
      clearTimeout(timerId)
      setSongList([])
    }
  }, [searchText])

  function handleInputChange(e) {
    setSearchText(e.target.value)
  }

  if (!categories) return <div className="loader"></div>
  return (
    <div className="categories-index" ref={searchRef}>
      {width < 440 && (
        <>
          <h2 className="search-h2">Search</h2>
          <div className="input-search-container flex">
            <span
              title="Pause"
              className="pause-button flex align-center justify-center title lyrics-play"
              dangerouslySetInnerHTML={{
                __html: getSpotifySvg('searchIcon'),
              }}
            ></span>
            <input
              type="text"
              placeholder="What do you want to listen to?"
              value={searchText}
              onChange={handleInputChange}
            />
          </div>
        </>
      )}
      <>
        {searchText.length > 0 ? (
          <SearchSongsList list={songList} />
        ) : (
          <>
            <h2 className="search-header">Browse all</h2>
            <SearchCategoryList categories={categories} />
          </>
        )}
      </>
    </div>
  )
}
