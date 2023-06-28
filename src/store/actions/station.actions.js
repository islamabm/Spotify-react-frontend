import { stationService } from '../../services/station.service'
import {
  REMOVE_STATION,
  SET_FILTER_BY,
  SET_STATIONS,
  SET_SEARCH_STATIONS,
  SET_CURR_STATION,
  SET_CURR_GRADIENT,
  ADD_STATION,
  UPDATE_STATION,
  LOAD_USER_STATIONS,
  ADD_SONG_TO_STATION,
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

export function loadUserStations() {
  return async (dispatch, getState) => {
    try {
      const stations = await stationService.getUserStations()
      const action = {
        type: LOAD_USER_STATIONS,
        stations,
      }
      dispatch(action)
    } catch (error) {
      console.log('error:', error)
    }
  }
}

export function addStation(name) {
  return async (dispatch) => {
    try {
      const station = await stationService.createNewStation(name)
      const action = { type: ADD_STATION, station }
      dispatch(action)
      const action2 = { type: SET_CURR_STATION, station }
      console.log('hi after dispatch2')
      dispatch(action2)
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

export function addSongToStation(stationId, song) {
  console.log('song action ', song)
  return async (dispatch) => {
    try {
      const updatedStation = await stationService.addSongToStation(
        stationId,
        song
      )
      const action = {
        type: ADD_SONG_TO_STATION,
        station: updatedStation,
      }
      dispatch(action)
    } catch (error) {
      console.log('error:', error)
    }
  }
}

export function removeSongFromStation(stationId, songId) {
  return async (dispatch) => {
    try {
      const updatedStation = await stationService.removeSongFromStation(
        stationId,
        songId
      )
      const action = {
        type: UPDATE_STATION,
        station: updatedStation,
      }
      dispatch(action)
    } catch (error) {
      console.log('error:', error)
    }
  }
}
export function setCurrGradient(bgStyle) {
  return (dispatch) => {
    dispatch({ type: SET_CURR_GRADIENT, bgStyle })
  }
}

export function setFilterBy(filterBy) {
  return (dispatch) => {
    dispatch({ type: SET_FILTER_BY, filterBy })
  }
}

export function updateStation(stationId, songs) {
  return async (dispatch) => {
    try {
      const updatedStation = await stationService.updateStation(
        stationId,
        songs
      )
      const action = {
        type: UPDATE_STATION,
        station: updatedStation,
      }
      dispatch(action)
      return 'Updated!'
    } catch (error) {
      console.log('error:', error)
    }
  }
}
