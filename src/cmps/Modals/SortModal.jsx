import React, { useState } from 'react'
import { getSpotifySvg } from '../../services/SVG.service'
import { useDispatch, useSelector } from 'react-redux'
import { setFilterBy } from '../../store/actions/station.actions'

export function SortModal({ onSelectOption }) {
  const [selected, setSelected] = useState(null)
  const dispatch = useDispatch()

  const options = ['Recently Added', 'Alphabetical', 'Creator']
  const userStations = useSelector(
    (storeState) => storeState.stationModule.userStations
  )
  const currFilterBy = useSelector(
    (storeState) => storeState.stationModule.filterBy
  )

  function onSelect(ev, option) {
    setSelected(option)
    onSelectOption(ev, option)
    dispatch(setFilterBy(userStations, option))
  }

  return (
    <div className="sort-modal">
      <p className="sort-by">Sort by</p>

      {options?.map((option, idx) => (
        <div
          onClick={(ev) => onSelect(ev, option)}
          className="pointer"
          key={idx}
        >
          <p className={currFilterBy === option ? 'green' : ''}>{option}</p>
          <span
            className={currFilterBy === option ? 'active' : ''}
            dangerouslySetInnerHTML={{
              __html: getSpotifySvg('choosed'),
            }}
          ></span>
        </div>
      ))}
    </div>
  )
}
