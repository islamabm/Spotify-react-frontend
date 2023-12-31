import React, { useState, useEffect } from 'react'
import { getSpotifySvg } from '../services/SVG.service'
import { SortModal } from './Modals/SortModal'
import { useDispatch, useSelector } from 'react-redux'
import { UserStationsIndex } from './UserStations/UserStationsIndex'
import { addStation } from '../store/actions/station.actions'
import emptyImg from '../assets/imgs/empty-img.png'
import { useLocation, useNavigate } from 'react-router-dom'
import { SignupModal } from './Modals/SignupModal'

export function UserLibrary() {
  const [showSortModal, setShowSortModal] = useState(false)
  const [selectedOption, setSelectedOption] = useState('Recents')
  const [stationCounter, setStationCounter] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showInput, setShowInput] = useState(false)
  const [filterUserStations, setFilterUserStations] = useState('')

  const user = useSelector((storeState) => storeState.userModule.loggedInUser)

  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const filterAndListSection = document.querySelector('.filter-and-list')
    const checkScroll = () => {
      if (filterAndListSection.scrollTop > 0 && !isScrolled) {
        setIsScrolled(true)
      } else if (filterAndListSection.scrollTop === 0 && isScrolled) {
        setIsScrolled(false)
      }
    }

    filterAndListSection.addEventListener('scroll', checkScroll)

    return () => {
      filterAndListSection.removeEventListener('scroll', checkScroll)
    }
  }, [isScrolled])

  function onShowSortModal() {
    setShowSortModal((prevState) => !prevState)
    setShowInput(false)
  }

  function onSelectOption(ev, option) {
    ev.stopPropagation()
    setSelectedOption(option)
    setShowSortModal(false)
  }

  function createNewStation() {
    if (!user) {
      setShowModal(true)
      return
    }
    setStationCounter(stationCounter + 1)
    const name = `My Playlist #${stationCounter}`
    dispatch(addStation(name, [], emptyImg))
    // dispatch(updateUserStations(station, user))
  }

  function openInput() {
    setShowInput(true)
  }

  function handleCloseSignupModal() {
    setShowModal(false)
  }

  function goToUserLibrary() {
    navigate('/library')
  }

  return (
    <>
      <section className="user-library">
        <section className="library-header-wrapper">
          <div
            className={`flex align-center library-header ${
              isScrolled ? 'scrolled' : ''
            }`}
          >
            <div
              onClick={goToUserLibrary}
              className="flex align-center your-library pointer"
            >
              <span
                className={
                  location.pathname === '/library' ? 'icon-active' : ''
                }
                dangerouslySetInnerHTML={{
                  __html: getSpotifySvg('libraryIcon'),
                }}
              ></span>
              <span>Your Library</span>
            </div>
            <span
              onClick={createNewStation}
              className="plus-icon flex align-center justify-center pointer title create"
              dangerouslySetInnerHTML={{
                __html: getSpotifySvg('plus'),
              }}
            ></span>
          </div>
        </section>
        <section className="filter-and-list">
          <div className="library-filter">
            <div className="input-container">
              <span
                onClick={openInput}
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
                  value={filterUserStations}
                  onChange={(e) => setFilterUserStations(e.target.value)}
                />
              )}
            </div>

            <div onClick={onShowSortModal} className="sort-by-section relative">
              <span className="sort-by-span">{selectedOption}</span>
              <span
                className="pointer arrow"
                dangerouslySetInnerHTML={{
                  __html: getSpotifySvg(
                    showSortModal ? 'upperArrow' : 'bottomArrowIcon'
                  ),
                }}
              ></span>
              {showSortModal && <SortModal onSelectOption={onSelectOption} />}
            </div>
          </div>
          <UserStationsIndex filterUserStations={filterUserStations} />
          {showModal && (
            <SignupModal closeSignupModal={handleCloseSignupModal} />
          )}
        </section>
      </section>
    </>
  )
}
