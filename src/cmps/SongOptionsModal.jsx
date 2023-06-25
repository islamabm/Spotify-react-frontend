import React from 'react'
import { getSpotifySvg } from '../services/SVG.service'
export function SongOptionsModal({ position }) {
  return (
    <section
      className="song-options-modal"
      style={{
        top: position.top + 20,
        left: position.left - 220,
      }}
    >
      <ul>
        <li>
          <button>Save to your Liked Songs</button>
        </li>
        <li>
          <button>Remove from this playlist</button>
        </li>
        <li className="special-li">
          <button>Add to playlist</button>
          <span
            dangerouslySetInnerHTML={{
              __html: getSpotifySvg('listIcon'),
            }}
          ></span>
        </li>
      </ul>
    </section>
  )
}
