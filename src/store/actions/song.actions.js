import { stationService } from '../../services/station.service'
import { SET_CURR_SONG } from '../reducers/song.reducer'

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
