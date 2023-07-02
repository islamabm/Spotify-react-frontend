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

  const onSelect = (ev, option) => {
    setSelected(option)
    onSelectOption(ev, option)
    dispatch(setFilterBy(userStations, option))
  }

  return (
    <div className="sort-modal">
      <div>
        <p className="sort-by">Sort by</p>
      </div>
      {options?.map((option) => (
        <div
          onClick={(ev) => onSelect(ev, option)}
          className="pointer"
          key={option}
        >
          <p className={selected === option ? 'green' : ''}>{option}</p>
          <span
            className={selected === option ? 'active' : ''}
            dangerouslySetInnerHTML={{
              __html: getSpotifySvg('choosed'),
            }}
          ></span>
        </div>
      ))}
    </div>
  )
}
