export const SET_CURR_SONG = 'SET_CURR_SONG'
const INITIAL_STATE = {
  currSong: null,
}

export function songReducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case SET_CURR_SONG:
      return {
        ...state,
        currSong: action.song,
      }
    default:
      return state
  }
}
