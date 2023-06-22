export const SET_CURR_SONG = 'SET_CURR_SONG'
export const SET_CURR_SONG_INDEX = 'SET_CURR_SONG_INDEX'
const INITIAL_STATE = {
  currSong: null,
  currIndex: 0,
}

export function songReducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case SET_CURR_SONG:
      return {
        ...state,
        currSong: action.song,
      }
    case SET_CURR_SONG_INDEX:
      return {
        ...state,
        currIndex: action.index,
      }
    default:
      return state
  }
}
