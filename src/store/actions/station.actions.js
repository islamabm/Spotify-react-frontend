import { stationService } from '../../services/station.service'
import { showErrorMsg, showSuccessMsg } from '../../services/event-bus.service'
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
  REMOVE_SONG_FROM_STATION,
  EDIT_STATION,
} from '../reducers/station.reducer'

export function loadStations() {
  return async (dispatch, getState) => {
    try {
      console.log('hi')
      const stations = await stationService.query()
      console.log('stations', stations)
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
      const stations = await stationService.userQuery()
      console.log('stations', stations)

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

export function addStation(name, songs, url) {
  return async (dispatch) => {
    try {
      const station = await stationService.createNewStation(name, songs, url)
      const action = { type: ADD_STATION, station }
      dispatch(action)
      const action2 = { type: SET_CURR_STATION, station }
      dispatch(action2)
      showSuccessMsg('Playlist added')
    } catch (error) {
      showErrorMsg('Cannot add playlist')
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
      const id = await stationService.remove(stationId)
      const action = { type: REMOVE_STATION, id }
      dispatch(action)
      showSuccessMsg('Playlist removed')
    } catch (error) {
      showErrorMsg('Cannot remove Playlist')
    }
  }
}

export function addSongToStation(stationId, song) {
  return async (dispatch) => {
    try {
      const updateSong = await stationService.addSongToStation(stationId, song)
      const action = {
        type: ADD_SONG_TO_STATION,
        updateSong,
        stationId,
      }
      dispatch(action)
      showSuccessMsg(`Song added `)
    } catch (error) {
      showErrorMsg(`Cannot add song`)
    }
  }
}

export function removeSongFromStation(stationId, songId) {
  return async (dispatch) => {
    try {
      console.log('songId', songId)
      const id = await stationService.removeSongFromStation(stationId, songId)

      const action = {
        type: REMOVE_SONG_FROM_STATION,
        stationId,
        id,
      }
      dispatch(action)
      showSuccessMsg(`Song removed `)
    } catch (error) {
      showErrorMsg(`Cannot remove song`)
    }
  }
}
export function setCurrGradient(bgStyle) {
  return (dispatch) => {
    dispatch({ type: SET_CURR_GRADIENT, bgStyle })
  }
}

export function setFilterBy(userStations, filterBy) {
  const filteredStations = stationService.filterUserStations(
    userStations,
    filterBy
  )
  return (dispatch) => {
    dispatch({ type: SET_FILTER_BY, filteredStations, filterBy })
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
    } catch (error) {
      console.log('error:', error)
    }
  }
}

export function editUserStation(station) {
  return async (dispatch) => {
    try {
      const updatedStation = await stationService.editStation(station)
      console.log('updatedStation', updatedStation)
      const action = { type: EDIT_STATION, station: updatedStation }
      dispatch(action)
      const action2 = { type: SET_CURR_STATION, station: updatedStation }
      dispatch(action2)
      showSuccessMsg(`Playlist updated`)
    } catch (error) {
      showErrorMsg(`Cannot update station`)
    }
  }
}
