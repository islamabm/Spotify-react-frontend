import React, { useState, useEffect } from "react"
import { getSpotifySvg } from "../services/SVG.service"
import { SortModal } from "./Modals/SortModal"
import { useDispatch } from "react-redux"
import { UserStationsIndex } from "./UserStations/UserStationsIndex"
import { addStation } from "../store/actions/station.actions"

export function UserLibrary() {
  const [showSortModal, setShowSortModal] = useState(false)
  const [selectedOption, setSelectedOption] = useState("Recents")
  const [stationCounter, setStationCounter] = useState(0)
  const [filterUserStations, setFilterUserStations] = useState("")
  // const [newStationCreated, setNewStationCreated] = useState(false)
  const dispatch = useDispatch()

  function onShowSortModal() {
    setShowSortModal(true)
  }

  function onSelectOption(ev, option) {
    ev.stopPropagation()
    setSelectedOption(option)
    setShowSortModal(false)
  }

  function createNewStation() {
    setStationCounter(stationCounter + 1)
    const name = `My Playlist #${stationCounter}`
    dispatch(addStation(name, [], ""))
    // setNewStationCreated(true)
  }

  // useEffect(() => {
  //   if (newStationCreated) {
  //     const gradient = {
  //       background:
  //         'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 50%, rgba(0,0,0,1) 70%, rgba(0,0,0,1) 100%)',
  //     }
  //     eventBus.emit('newStationCreated', gradient)

  //     setNewStationCreated(false)
  //   }
  // }, [newStationCreated])

  return (
    <>
      <section className="user-library">
        <section className="library-header-wrapper">
          <div className="flex align-center library-header">
            <div className="flex align-center your-library pointer">
              <span
                dangerouslySetInnerHTML={{
                  __html: getSpotifySvg("libraryIconActive"),
                }}
              ></span>
              <span>Your Library</span>
            </div>
            <span
              title="Create Playlist"
              onClick={createNewStation}
              className="plus-icon flex align-center justify-center pointer title create"
              dangerouslySetInnerHTML={{
                __html: getSpotifySvg("plus"),
              }}
            ></span>
          </div>
          <div className="your-library-btns flex align-center">
            <button className="library-btn pointer">Playlists</button>
            <button className="library-btn pointer">Artists</button>
            <button className="library-btn pointer">Albums</button>
          </div>
        </section>
        <section className="filter-and-list">
          <div className="library-filter">
            <div className="input-container">
              <span
                title="Search in Your Library"
                className="smaller-search pointer flex align-center justify-center title"
                dangerouslySetInnerHTML={{
                  __html: getSpotifySvg("smallerSearchIcon"),
                }}
              ></span>
              <input
                className="search-input"
                type="text"
                placeholder="Search for songs"
                value={filterUserStations}
                onChange={(e) => setFilterUserStations(e.target.value)}
              />
            </div>
            <div onClick={onShowSortModal} className="sort-by-section relative">
              <span className="sort-by-span">{selectedOption}</span>
              <span
                className="pointer arrow"
                dangerouslySetInnerHTML={{
                  __html: getSpotifySvg("bottomArrowIcon"),
                }}
              ></span>
              {showSortModal && <SortModal onSelectOption={onSelectOption} />}
            </div>
          </div>
          <UserStationsIndex filterUserStations={filterUserStations} />
        </section>
      </section>
    </>
  )
}
