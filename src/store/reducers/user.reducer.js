export const SPEND_BALANCE = 'SPEND_BALANCE'
export const SIGNUP = 'SIGNUP'
export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'

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
    case LOGOUT:
      return {
        ...state,
        loggedInUser: null,
      }

    default:
      return state
  }
}
