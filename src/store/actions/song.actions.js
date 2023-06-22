import { stationService } from '../../services/station.service'
import { SET_CURR_SONG, SET_CURR_SONG_INDEX } from '../reducers/song.reducer'

export function setCurrSong(stationId, songId) {
  return async (dispatch, getState) => {
    try {
      const song = await stationService.getSongById(stationId, songId)
      const action = {
        type: SET_CURR_SONG,
        song,
      }
      dispatch(action)
    } catch (error) {
      console.log('error:', error)
    }
  }
}
export function setCurrSongIndex(stationId, songId) {
  return async (dispatch, getState) => {
    try {
      const index = await stationService.getCurrIndex(stationId, songId)
      const action = {
        type: SET_CURR_SONG_INDEX,
        index,
      }
      dispatch(action)
    } catch (error) {
      console.log('error:', error)
    }
  }
}
export function getRandomSong(stationId) {
  return async (dispatch, getState) => {
    try {
      const song = await stationService.getRandomSong(stationId)
      const action = {
        type: SET_CURR_SONG,
        song,
      }
      dispatch(action)
    } catch (error) {
      console.log('error:', error)
    }
  }
}
export function setPrevSong(stationId, songId) {
  return async (dispatch, getState) => {
    try {
      const song = await stationService.getPrevSong(stationId, songId)
      const action = {
        type: SET_CURR_SONG,
        song,
      }
      dispatch(action)
    } catch (error) {
      console.log('error:', error)
    }
  }
}
export function setNextSong(stationId, songId) {
  return async (dispatch, getState) => {
    try {
      const song = await stationService.getNextSong(stationId, songId)
      const action = {
        type: SET_CURR_SONG,
        song,
      }
      dispatch(action)
    } catch (error) {
      console.log('error:', error)
    }
  }
}
