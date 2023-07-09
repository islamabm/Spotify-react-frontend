import React, { useState } from 'react'
import { generateImageFromText } from '../../services/ai.service'
import { useDispatch } from 'react-redux'
import { getSpotifySvg } from '../../services/SVG.service'

export default function AIImageGenerator({ closeAiModal, onImageGenerated }) {
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    try {
      const url = await generateImageFromText(prompt)
      onImageGenerated && onImageGenerated(url)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
      closeAiModal()
    }
  }
  return (
    <div className="ai-modal-back-drop">
      <div className="ai-modal">
        {/* <button onClick={toggleModal} className="close-ai-modal"> */}
        <button className="close-ai-modal">
          {' '}
          <span
            onClick={closeAiModal}
            dangerouslySetInnerHTML={{
              __html: getSpotifySvg('x'),
            }}
          ></span>
        </button>
        <form onSubmit={handleSubmit}>
          <h1>Create AI Image</h1>
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter description..."
          />
          <button className="btn-generate" type="submit">
            <span>Create image</span>
          </button>
        </form>
        {loading && <span className="loader"></span>}
      </div>
    </div>
  )
}