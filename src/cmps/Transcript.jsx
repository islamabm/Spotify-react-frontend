import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getSpotifySvg } from '../services/SVG.service'
import { shazamService } from '../services/shazam.service'

function Transcript() {
  const [recording, setRecording] = useState(false)
  const [audioUrl, setAudioUrl] = useState(null)
  const mediaRecorderRef = useRef(null)
  const audioChunksRef = useRef([])
  const [audioBlob, setAudioBlob] = useState(null)
  const dispatch = useDispatch()

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    mediaRecorderRef.current = new MediaRecorder(stream)

    mediaRecorderRef.current.addEventListener('dataavailable', (event) => {
      audioChunksRef.current.push(event.data)
    })

    mediaRecorderRef.current.addEventListener('stop', () => {
      const audioBlob = new Blob(audioChunksRef.current)
      const reader = new FileReader()
      reader.onloadend = async function () {
        // const audioFile = new File([reader.result], 'recordedAudio.webm', {
        //   type: audioBlob.type,
        // }) // assuming the audio type is webm
        // setAudioBlob(audioFile) // Save the file to state
        setAudioBlob(audioBlob)

        // const name = await shazamService.identifySong(audioBlob)
        // console.log('name', name)
      }
      reader.readAsArrayBuffer(audioBlob)
      audioChunksRef.current = []
    })

    mediaRecorderRef.current.start()
    setRecording(true)
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop()
      setRecording(false)
    }
  }

  useEffect(() => {
    return () => {
      stopRecording()
      if (mediaRecorderRef.current) {
        const stream = mediaRecorderRef.current.stream
        if (stream) {
          stream.getTracks().forEach((track) => track.stop())
        }
      }
    }
  }, [])

  const toggleRecording = () => {
    recording ? stopRecording() : startRecording()
  }

  return (
    <div>
      <i title="record" onClick={toggleRecording}>
        <span
          className={`mic ${recording ? 'active' : ''}`}
          dangerouslySetInnerHTML={{
            __html: getSpotifySvg('mic'),
          }}
        ></span>
      </i>
    </div>
  )
}

export default Transcript
