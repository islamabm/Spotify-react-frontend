import { useDispatch, useSelector } from 'react-redux'
import { UserLibraryPreview } from './UserLibraryPreview'
import { addStation } from '../../store/actions/station.actions'
import { getSpotifySvg } from '../../services/SVG.service'
import emptyImg from '../../assets/imgs/empty-img.png'
import { useState } from 'react'
export function UserLibraryList({ stations, title }) {
  const user = useSelector((storeState) => storeState.userModule.loggedInUser)
  const [showInput, setShowInput] = useState(false)
  const [stationCounter, setStationCounter] = useState(0)
  const dispatch = useDispatch()
  function openInput() {
    setShowInput(true)
  }
  function createNewStation() {
    setStationCounter(stationCounter + 1)
    const name = `My Playlist #${stationCounter}`
    dispatch(addStation(name, [], emptyImg))
  }

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
              <span
                onClick={createNewStation}
                className="title"
                title="Go back"
                dangerouslySetInnerHTML={{
                  __html: getSpotifySvg('plus'),
                }}
              ></span>
              <div className="input-container">
                <span
                  onClick={openInput}
                  title="Search in Your Library"
                  className="smaller-search pointer flex align-center justify-center title"
                  dangerouslySetInnerHTML={{
                    __html: getSpotifySvg('smallerSearchIcon'),
                  }}
                ></span>
                {showInput && (
                  <input
                    className={`search-input ${showInput ? 'open' : 'close'}`}
                    type="text"
                    placeholder="Search in Your Library"
                    // value={filterUserStations}
                    // onChange={(e) => setFilterUserStations(e.target.value)}
                  />
                )}
              </div>
            </div>
          </div>
          <section className="station-list-user">
            <h3 className="category-tag pointer">{title}</h3>
            <section className="station-list">
              {stations.map((station, idx) => (
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
    </>
  )
}
