import { userService } from '../../services/user.service'
import {
  SIGNUP,
  SPEND_BALANCE,
  LOGIN,
  LOGOUT,
  UPDATE_USER,
  SET_LOGGEDIN_USER,
  ADD_SONG_TO_USER_LIKED_SONGS,
  UPDATE_LATEST,
} from '../reducers/user.reducer'

export function doSignup(userCred) {
  console.log('userCred', userCred)
  console.log('userCred in the actions ', userCred)
  return async (dispatch, getState) => {
    try {
      const user = await userService.signup(userCred)
      const action = {
        type: SIGNUP,
        user,
      }
      dispatch(action)
    } catch (error) {
      console.log('error:', error)
    }
  }
}

export function doLogin(userCred) {
  return async (dispatch, getState) => {
    try {
      const user = await userService.login(userCred)
      const action = {
        type: LOGIN,
        user,
      }
      dispatch(action)
    } catch (error) {
      console.log('error:', error)
    }
  }
}
export function getUser() {
  return async (dispatch, getState) => {
    try {
      const user = await userService.getLoggedinUser()
      const action = {
        type: SET_LOGGEDIN_USER,
        user,
      }
      dispatch(action)
    } catch (error) {
      console.log('error:', error)
    }
  }
}
export function doLogout() {
  return async (dispatch, getState) => {
    try {
      await userService.logout()
      const action = {
        type: LOGOUT,
      }
      dispatch(action)
    } catch (error) {
      console.log('error:', error)
    }
  }
}

export function updateUser(song, user) {
  console.log('song', song)
  console.log('user', user)
  return async (dispatch, getState) => {
    try {
      const updatedUser = await userService.update(song, user)
      const action = {
        type: UPDATE_USER,
        user: updatedUser,
      }
      dispatch(action)
    } catch (error) {
      console.log('error:', error)
    }
  }
}

export function removeSongFromUser(songId, user) {
  return async (dispatch) => {
    try {
      const updatedUser = await userService.removeSong(songId, user)
      dispatch({ type: UPDATE_USER, user: updatedUser })
    } catch (err) {
      console.log(err)
    }
  }
}

export function editUserImg(url, loggedInUser) {
  return async (dispatch, getState) => {
    try {
      const user = await userService.updateUser(url, loggedInUser)
      console.log('user', user)
      const action = {
        type: UPDATE_USER,
        user,
      }
      dispatch(action)
    } catch (error) {
      console.log('error:', error)
    }
  }
}

export function spendBalance(amount) {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: SPEND_BALANCE, amount })
    } catch (error) {
      console.log('error:', error)
    }
  }
}

export function updateLatestStations(stationId, user) {
  console.log('action', stationId)
  console.log('action', user)
  return async (dispatch, getState) => {
    try {
      const { value } = await userService.updateLatestStations(stationId, user)
      dispatch({ type: UPDATE_LATEST, value })
      console.log('Latest stations updated successfully:', value)
    } catch (error) {
      console.log('Error updating latest stations:', error)
    }
  }
}
