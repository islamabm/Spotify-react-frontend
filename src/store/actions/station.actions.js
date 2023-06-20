import { stationService } from "../../services/station.service"
import { REMOVE_ROBOT, SET_FILTER_BY, SET_ROBOTS } from "../reducers/station.reducer"

export function loadStations() {
    return async (dispatch, getState) => {
        try {
            const stations = await stationService.query(getState().stationModule.filterBy)
            const action = {
                type: SET_ROBOTS,
                stations
            }
            dispatch(action)
        } catch (error) {
            console.log('error:', error)
        }
    }
}

export function removeStation(stationId) {
    return async (dispatch) => {
        try {
            await stationService.remove(stationId)
            const action = { type: REMOVE_ROBOT, stationId }
            dispatch(action)
            return 'Removed!'
        } catch (error) {
            console.log('error:', error)
        }
    }
}

export function setFilterBy(filterBy) {
    return (dispatch) => {
        dispatch({ type: SET_FILTER_BY, filterBy })
    }
}