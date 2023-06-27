import React from 'react'

export function StationOptionsModal({ position }) {
  return (
    <section
      className="station-options-modal"
      style={{
        top: position.top - 30,
        left: position.left,
      }}
    >
      <ul>
        <li>
          <button>Edit details</button>
        </li>
        <li>
          <button>Delete</button>
        </li>
        <li>
          <button>Copy link to playlist</button>
        </li>
        <li>
          <button>About recommendation</button>
        </li>
      </ul>
    </section>
  )
}
