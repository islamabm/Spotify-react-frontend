export const SET_CURR_SONG = 'SET_CURR_SONG'
export const SET_CURR_SONG_ACTION = 'SET_CURR_SONG_ACTION'
export const SET_CURR_SONG_INDEX = 'SET_CURR_SONG_INDEX'
const INITIAL_STATE = {
  currSong: null,
  currSongId: null,
  currIndex: 0,
  currSongAction: null,
}

export function songReducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case SET_CURR_SONG:
      return {
        ...state,
        currSong: action.song,
        currSongId: action.song._id,
      }
    case SET_CURR_SONG_ACTION:
      return {
        ...state,
        currSongAction: action.song,
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
