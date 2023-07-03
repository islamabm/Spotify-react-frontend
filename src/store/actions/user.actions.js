import { userService } from '../../services/user.service'
import {
  SIGNUP,
  SPEND_BALANCE,
  LOGIN,
  LOGOUT,
  UPDATE_USER,
  SET_LOGGEDIN_USER,
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
        type: UPDATE_USER_LIKED_SONGS,
        user: updatedUser,
      }
      dispatch(action)
    } catch (error) {
      console.log('error:', error)
    }
  }
}
// async updateUser({ commit }, { selectedSong, user }) {
//   try {
//     const updatedUser = await userService.update(selectedSong, user)
//     commit({ type: 'updateUser', song: selectedSong, updatedUser })
//   } catch (err) {
//     throw err
//   }
// },
export function editUserImg(url) {
  return async (dispatch, getState) => {
    try {
      const user = await userService.updateUser(url)
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

export function updateLatestStations(updatedLatestStations, user) {
  return async (dispatch, getState) => {
    try {
      const updatedUser = { ...user, latestStations: updatedLatestStations }
      const response = await userService.updateLatestStations(updatedUser)
      dispatch({ type: UPDATE_LATEST, user: updatedUser })
      console.log('Latest stations updated successfully:', response)
    } catch (error) {
      console.log('Error updating latest stations:', error)
    }
  }
}
