export const SET_CURR_SONG = 'SET_CURR_SONG'
export const SET_CURR_SONG_ACTION = 'SET_CURR_SONG_ACTION'
export const SET_CURR_SONG_INDEX = 'SET_CURR_SONG_INDEX'
export const SET_CURR_SONG_SVG = 'SET_CURR_SONG_SVG'
export const SET_CURR_SONG_LYRICS = 'SET_CURR_SONG_LYRICS'
export const SET_CURR_DIRECTION = 'SET_CURR_DIRECTION'
const INITIAL_STATE = {
  currSong: null,
  currSongId: null,
  currIndex: 0,
  currSongAction: null,
  currentSvg: '',
  currDirection: 'left',
  currSongLyrics: [],
}

export function songReducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case SET_CURR_SONG:
      return {
        ...state,
        currSong: action.song,
        currSongId: action.song._id,
      }
    case SET_CURR_SONG_SVG:
      return {
        ...state,
        currentSvg: action.svg,
      }
    case SET_CURR_DIRECTION:
      return {
        ...state,
        currDirection: action.dir,
      }
    case SET_CURR_SONG_ACTION:
      return {
        ...state,
        currSongAction: action.song,
      }
    case SET_CURR_SONG_LYRICS:
      return {
        ...state,
        currSongLyrics: action.lyrics,
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
