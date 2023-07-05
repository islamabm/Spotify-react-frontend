
export const SPEND_BALANCE = 'SPEND_BALANCE'
export const SIGNUP = 'SIGNUP'
export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const UPDATE_USER = 'UPDATE_USER'
export const SET_LOGGEDIN_USER = 'SET_LOGGEDIN_USER'
export const UPDATE_LATEST = 'UPDATE_LATEST'
export const UPDATE_USER_LIKED_SONGS = 'UPDATE_USER_LIKED_SONGS'
const INITIAL_STATE = {
  loggedInUser: null,
  users: [],
}

export function userReducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case SPEND_BALANCE:
      const { loggedInUser } = state
      return {
        ...state,
        loggedInUser: {
          ...loggedInUser,
          balance: loggedInUser.balance - action.amount,
        },
      }
    case SIGNUP:
      return {
        ...state,
        loggedInUser: action.user,
        users: [...state.users, action.user],
      }
    case LOGIN:
      return {
        ...state,
        loggedInUser: action.user,
      }
    case SET_LOGGEDIN_USER:
      return {
        ...state,
        loggedInUser: action.user,
      }

    case LOGOUT:
      return {
        ...state,
        loggedInUser: null,
      }
    case UPDATE_USER:
      return {
        ...state,
        loggedInUser: action.user,
      }
    case UPDATE_LATEST:
      return {
        ...state,
        loggedInUser: action.value,
      }

    default:
      return state
  }
}
