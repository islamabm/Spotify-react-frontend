import { httpService } from './http.service'

export const shazamService = {
  identifySong,
}

async function identifySong(audioBlob) {
  try {
    const formData = new FormData()
    formData.append('file', audioBlob, 'recordedAudio.webm')
    const res = await httpService.post('shazam/identify', formData)
    return res
  } catch (error) {
    throw new Error('Failed to identify song')
  }
}
