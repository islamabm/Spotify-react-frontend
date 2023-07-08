import { httpService } from './http.service' // Make sure to provide the correct path to your http.service.js file

export const shazamService = {
  identifySong,
}

async function identifySong(data) {
  try {
    const res = await httpService.post('shazam/identify', data)
    return res
  } catch (error) {
    throw new Error('Failed to identify song')
  }
}
