import React, { useState, useEffect } from 'react'

export function HoverModal({ triggerRef, message }) {
  const [isVisible, setIsVisible] = useState(false)
  const [style, setStyle] = useState({})

  useEffect(() => {
    setIsVisible(message !== '')
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect()
      setStyle({ top: `${rect.y + rect.height}px`, left: `${rect.x}px` })
    }
  }, [triggerRef, message])

  return (
    isVisible && (
      <div className="hover-modal" style={style}>
        {message}
      </div>
    )
  )
}
