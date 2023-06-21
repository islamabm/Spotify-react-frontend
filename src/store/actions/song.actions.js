import { stationService } from '../../services/station.service'
import { SET_CURR_SONG } from '../reducers/station.reducer'

export function setCurrStation(id) {
  return async (dispatch, getState) => {
    try {
      const station = await stationService.getSongById(id)
      const action = {
        type: SET_CURR_SONG,
        station,
      }
      dispatch(action)
    } catch (error) {
      console.log('error:', error)
    }
  }
}
