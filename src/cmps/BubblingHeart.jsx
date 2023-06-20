import React, { useState } from 'react'

export function BubblingHeart({ songIndex }) {
  const [liked, setLiked] = useState(false)

  const toggleLike = () => {
    setLiked(!liked)
  }

  return (
    <div className={`bubbling-heart ${liked ? 'bubbling-heart--liked' : ''}`}>
      {/* <div className="bubbling-heart"> */}
      <input
        type="checkbox"
        className="heart-input"
        id={`like-${songIndex}`}
        checked={liked}
        onChange={toggleLike}
      />

      <label className="label" htmlFor={`like-${songIndex}`}>
        {/* <label className="label" htmlFor="like"> */}
        <svg
          className="heart-svg"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 189.2 87.507"
          style={{ overflow: 'visible' }}
        >
          {/* SVG Paths... */}
        </svg>
      </label>
    </div>
  )
}

// export default BubblingHeart
