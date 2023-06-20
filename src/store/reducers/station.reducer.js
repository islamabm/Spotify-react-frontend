
export const SET_ROBOTS = 'SET_ROBOTS'
export const ADD_ROBOT = 'ADD_ROBOT'
export const REMOVE_ROBOT = 'REMOVE_ROBOT'
export const UPDATE_ROBOT = 'UPDATE_ROBOT'
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
        case SET_ROBOTS:
            return {
                ...state,
                stations: action.stations
            }
        case ADD_ROBOT:
            return {
                ...state,
                stations: [...state.stations, action.station]
            }
        case REMOVE_ROBOT:
            return {
                ...state,
                stations: state.stations.filter(station => station._id !== action.stationId)
            }
        case UPDATE_ROBOT:
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