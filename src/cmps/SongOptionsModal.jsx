import React from 'react'

export function SongOptionsModal() {
  return (
    <section className="song-options-modal">
      <ul>
        <li>
          <button>Save to your Liked Songs</button>
        </li>
        <li>
          <button>Remove from this playlist</button>
        </li>
        <li>
          <button>Add to playlist</button>
        </li>
      </ul>
    </section>
  )
}
