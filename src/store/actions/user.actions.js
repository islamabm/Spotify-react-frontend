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
  return async (dispatch, getState) => {
    try {
      const updatedUser = await userService.update(song, user)
      console.log('updatedUser', updatedUser)
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
  console.log('Action',stationId)
  console.log('Action',user)
  return async (dispatch, getState) => {
    try {
      const response = await userService.updateLatestStations(stationId,user)
      console.log('alo',response)
      dispatch({ type: UPDATE_LATEST, user })
      console.log('Latest stations updated successfully:', response)
    } catch (error) {
      console.log('Error updating latest stations:', error)
    }
  }
}
