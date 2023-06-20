
export const SET_STATIONS = 'SET_STATIONS'
export const ADD_STATION = 'ADD_STATION'
export const REMOVE_STATION = 'REMOVE_STATION'
export const UPDATE_STATION = 'UPDATE_STATION'
export const SET_FILTER_BY = 'SET_FILTER_BY'

const INITIAL_STATE = {
    stations: null,
    filterBy: {
        model: '',
        type: '',
        minBatteryStatus: '',
        maxBatteryStatus: '',
    }
}

export function stationReducer(state = INITIAL_STATE, action = {}) {

    switch (action.type) {
        case SET_STATIONS:
            return {
                ...state,
                stations: action.stations
            }
        case ADD_STATION:
            return {
                ...state,
                stations: [...state.stations, action.station]
            }
        case REMOVE_STATION:
            return {
                ...state,
                stations: state.stations.filter(station => station._id !== action.stationId)
            }
        case UPDATE_STATION:
            return {
                ...state,
                stations: state.stations.map(station => station._id === action.station._id ? action.station : station)
            }
        case SET_FILTER_BY:
            return {
                ...state,
                filterBy: { ...action.filterBy }
            }

        default:
            return state;
    }
}