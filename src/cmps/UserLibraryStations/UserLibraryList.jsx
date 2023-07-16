import { useDispatch, useSelector } from 'react-redux'
import { UserLibraryPreview } from './UserLibraryPreview'
import { addStation } from '../../store/actions/station.actions'
import { getSpotifySvg } from '../../services/SVG.service'
import emptyImg from '../../assets/imgs/empty-img.png'
import { useState, useEffect, useRef } from 'react'
import { SignupModal } from '../Modals/SignupModal'

export function UserLibraryList({ stations, title }) {
  const user = useSelector((storeState) => storeState.userModule.loggedInUser)
  const [showInput, setShowInput] = useState(false)
  const [stationCounter, setStationCounter] = useState(0)
  const [filter, setFilter] = useState('')
  const [showModal, setShowModal] = useState(false)

  const dispatch = useDispatch()
  const inputRef = useRef()
  const buttonRef = useRef()

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        showInput &&
        event.target !== inputRef.current &&
        event.target !== buttonRef.current
      ) {
        setShowInput(false)
      }
    }

    document.addEventListener('click', handleClickOutside)

    return () => {
      // Clean up the event listener on component unmount
      document.removeEventListener('click', handleClickOutside)
    }
  }, [showInput])

  function openInput(event) {
    event.stopPropagation()
    setShowInput(!showInput)
  }

  function handleFilterChange(e) {
    setFilter(e.target.value)
  }

  function createNewStation() {
    if (!user) {
      setShowModal(true)
      return
    }
    setStationCounter(stationCounter + 1)
    const name = `My Playlist #${stationCounter}`
    dispatch(addStation(name, [], emptyImg))
  }

  function handleCloseSignupModal() {
    setShowModal(false)
  }

  const filteredStations = stations.filter((station) =>
    station.name.toLowerCase().includes(filter.toLowerCase())
  )
  return (
    <>
      {window.innerWidth < 460 ? (
        <section className="library-mobile">
          <div className="user-library-actions">
            <div className="section-one">
              <div className="user-library-mobile-img">
                <img src={user?.imgUrl} alt="user-img" />
              </div>
              <h1>Library</h1>
            </div>
            <div className="section-two">
              <div className="input-container">
                <span
                  ref={buttonRef}
                  onClick={(event) => openInput(event)}
                  className="smaller-search pointer flex align-center justify-center title"
                  dangerouslySetInnerHTML={{
                    __html: getSpotifySvg('smallerSearchIcon'),
                  }}
                ></span>

                {showInput && (
                  <input
                    ref={inputRef}
                    className={`search-input ${showInput ? 'open' : 'close'}`}
                    type="text"
                    placeholder="Search in Your Library"
                    value={filter}
                    onChange={handleFilterChange}
                  />
                )}
              </div>
              <span
                onClick={createNewStation}
                className="title plus-library"
                dangerouslySetInnerHTML={{
                  __html: getSpotifySvg('plus'),
                }}
              ></span>
            </div>
          </div>
          <section className="station-list-user">
            <h3 className="category-tag pointer">{title}</h3>
            <section className="station-list">
              {filteredStations.map((station, idx) => (
                <UserLibraryPreview key={idx} station={station} />
              ))}
            </section>
          </section>
        </section>
      ) : (
        <section className="station-list-user">
          <h3 className="category-tag pointer">{title}</h3>
          <section className="station-list">
            {stations.map((station, idx) => (
              <UserLibraryPreview key={idx} station={station} />
            ))}
          </section>
        </section>
      )}
      {showModal && <SignupModal closeSignupModal={handleCloseSignupModal} />}
    </>
  )
}
