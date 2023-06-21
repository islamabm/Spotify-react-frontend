import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { getSpotifySvg } from '../services/SVG.service'
import { SortModal } from './SortModal'

export function UserLibrary() {
  const [showSortModal, setShowSortModal] = useState(false)
  const [selectedOption, setSelectedOption] = useState('Recents')

  function onShowSortModal() {
    setShowSortModal(true)
  }

  function onSelectOption(option) {
    setSelectedOption(option)
    setShowSortModal(false)
    console.log('showSortModal', showSortModal)
  }

  useEffect(() => {
    console.log('showSortModal', showSortModal)
  }, [showSortModal])

  return (
    <section className="user-library">
      <div className="flex align-center library-header">
        <div className="flex align-center your-library pointer">
          <span
            dangerouslySetInnerHTML={{
              __html: getSpotifySvg('libraryIconActive'),
            }}
          ></span>
          <span>Your Library</span>
        </div>
        <span
          className="plus-icon flex align-center justify-center pointer"
          dangerouslySetInnerHTML={{
            __html: getSpotifySvg('plus'),
          }}
        ></span>
      </div>
      <div className="your-library-btns flex align-center">
        <button className="library-btn">Playlists</button>
        <button className="library-btn">Artists</button>
        <button className="library-btn">Albums</button>
      </div>
      <div className="library-filter">
        <span
          className="pointer"
          dangerouslySetInnerHTML={{
            __html: getSpotifySvg('searchIcon'),
          }}
        ></span>
        <div onClick={onShowSortModal} className="sort-by-section relative">
          <span className="sort-by-span">{selectedOption}</span>
          <span
            className="pointer arrow"
            dangerouslySetInnerHTML={{
              __html: getSpotifySvg('bottomArrowIcon'),
            }}
          ></span>
          {showSortModal && <SortModal onSelectOption={onSelectOption} />}
        </div>
      </div>
    </section>
  )
}
