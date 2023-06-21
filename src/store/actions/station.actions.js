import { stationService } from '../../services/station.service'
import {
  REMOVE_STATION,
  SET_FILTER_BY,
  SET_STATIONS,
  SET_SEARCH_STATIONS,
  SET_CURR_STATION,
} from '../reducers/station.reducer'

export function loadStations() {
  return async (dispatch, getState) => {
    try {
      const stations = await stationService.query()
      const action = {
        type: SET_STATIONS,
        stations,
      }
      dispatch(action)
    } catch (error) {
      console.log('error:', error)
    }
  }
}
export function loadSearchStations() {
  return async (dispatch, getState) => {
    try {
      const stations = await stationService.searchQuery()
      const action = {
        type: SET_SEARCH_STATIONS,
        stations,
      }
      dispatch(action)
    } catch (error) {
      console.log('error:', error)
    }
  }
}
export function setCurrStation(id) {
  return async (dispatch, getState) => {
    try {
      const station = await stationService.getById(id)
      const action = {
        type: SET_CURR_STATION,
        station,
      }
      dispatch(action)
    } catch (error) {
      console.log('error:', error)
    }
  }
}

export function removeStation(stationId) {
  return async (dispatch) => {
    try {
      await stationService.remove(stationId)
      const action = { type: REMOVE_STATION, stationId }
      dispatch(action)
      return 'Removed!'
    } catch (error) {
      console.log('error:', error)
    }
  }
}

export function setFilterBy(filterBy) {
  return (dispatch) => {
    dispatch({ type: SET_FILTER_BY, filterBy })
  }
}
