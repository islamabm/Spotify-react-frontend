export const SET_STATIONS = 'SET_STATIONS'
export const SET_SEARCH_STATIONS = 'SET_SEARCH_STATIONS'
export const ADD_STATION = 'ADD_STATION'
export const REMOVE_STATION = 'REMOVE_STATION'
export const UPDATE_STATION = 'UPDATE_STATION'
export const SET_FILTER_BY = 'SET_FILTER_BY'
export const SET_CURR_STATION = 'SET_CURR_STATION'
export const SET_CURR_GRADIENT = 'SET_CURR_GRADIENT'
export const LOAD_USER_STATIONS = 'LOAD_USER_STATIONS'
export const ADD_SONG_TO_STATION = 'ADD_SONG_TO_STATION'
export const REMOVE_SONG_FROM_STATION = 'REMOVE_SONG_FROM_STATION'
export const EDIT_STATION = 'EDIT_STATION'
export const SET_CURR_CATEGORY_BY = 'SET_CURR_CATEGORY_BY'
export const ADD_TO_USER_STATIONS = 'ADD_TO_USER_STATIONS'
export const SET_SEARCH_LIST = 'SET_SEARCH_LIST'
const INITIAL_STATE = {
  currStationImg: '',
  stations: null,
  searchStations: null,
  filterBy: 'Alphabetical',
  currStation: null,
  currStationId: null,
  currStationGradientColor: 'black',
  userStations: [],
  categoryBy: '',
  searchList: null,
}

export function stationReducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case SET_STATIONS:
      return {
        ...state,
        stations: action.stations,
      }
    case SET_SEARCH_LIST:
      return {
        ...state,
        searchList: action.list,
      }
    case ADD_TO_USER_STATIONS:
      return {
        ...state,
        loggedInUser: {
          ...state.loggedInUser,
          stations: [...state.loggedInUser.stations, action.station],
        },
      }
    case LOAD_USER_STATIONS:
      return {
        ...state,
        userStations: action.stations,
      }
    case SET_CURR_GRADIENT:
      return {
        ...state,
        currStationGradientColor: { ...action.bgStyle },
      }
    case SET_CURR_CATEGORY_BY:
      return {
        ...state,
        categoryBy: action.category,
      }
    case SET_CURR_STATION:
      return {
        ...state,
        currStation: action.station,
        currStationId: action.station._id,
        currStationImg: action.station.imgUrl,
      }
    case ADD_SONG_TO_STATION:
      return {
        ...state,
        stations: state.stations.map((station) =>
          station._id === action.stationId
            ? { ...station, songs: [...station.songs, action.updateSong] }
            : station
        ),
        userStations: state.userStations.map((station) =>
          station._id === action.stationId
            ? { ...station, songs: [...station.songs, action.updateSong] }
            : station
        ),
      }
    case SET_SEARCH_STATIONS:
      return {
        ...state,
        searchStations: action.stations,
      }
    case ADD_STATION:
      return {
        ...state,
        stations: [...state.stations, action.station],
        userStations: [...state.userStations, action.station],
      }
    case REMOVE_STATION:
      return {
        ...state,
        stations: state.stations.filter((station) => station._id !== action.id),
        userStations: state.userStations.filter(
          (station) => station._id !== action.id
        ),
      }
    case SET_FILTER_BY:
      return {
        ...state,
        filterBy: action.filterBy,
        userStations: action.filteredStations,
      }
    case UPDATE_STATION:
      return {
        ...state,
        stations: state.stations.map((station) =>
          station._id === action.station._id ? action.station : station
        ),
        userStations: state.userStations.map((station) =>
          station._id === action.station._id ? action.station : station
        ),
      }
    case EDIT_STATION:
      return {
        ...state,
        stations: state.stations.map((station) =>
          station._id === action.station._id ? action.station : station
        ),
        userStations: state.userStations.map((station) =>
          station._id === action.station._id ? action.station : station
        ),
      }
    case REMOVE_SONG_FROM_STATION:
      return {
        ...state,
        stations: state.stations.map((station) =>
          station._id === action.stationId
            ? {
                ...station,
                songs: station.songs.filter((song) => song._id !== action.id),
              }
            : station
        ),
        userStations: state.userStations.map((station) =>
          station._id === action.stationId
            ? {
                ...station,
                songs: station.songs.filter((song) => song._id !== action.id),
              }
            : station
        ),
      }
    default:
      return state
  }
}
