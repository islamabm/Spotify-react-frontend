import React, { useState } from 'react'
import { getSpotifySvg } from '../services/SVG.service'

export function SortModal({ onSelectOption }) {
  const [selected, setSelected] = useState(null)

  const options = ['Recents', 'Recently Added', 'Alphabetical', 'Creator']

  const onSelect = (option) => {
    setSelected(option)
    onSelectOption(option)
  }

  console.log('onSelectOption', onSelectOption)

  return (
    <div className="sort-modal">
      <div>
        <p>sort</p>
      </div>
      {options.map((option) => (
        <div onClick={() => onSelect(option)} className="pointer" key={option}>
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
