import { storageService } from './storage.service.js'
import { makeId } from './util.service.js'

export const stationService = {
    query,
    save,
    remove,
    getById,
    getEmptyStation,
    tryStation
}

const STORAGE_KEY = 'stations'

const gDefaultStations = [
    { _id: 'r2', model: 'Salad-O-Matic', batteryStatus: 80, type: 'Cooking' },
    { _id: 'r3', model: 'Dusty', batteryStatus: 100, type: 'Cleaning' },
    { _id: 'r1', model: 'Dominique Sote', batteryStatus: 100, type: 'Pleasure' },
    { _id: 'r4', model: 'DevTron', batteryStatus: 40, type: 'Office' }
]

var gStations = _loadStations()

function query(filterBy) {
    let stationsToReturn = gStations;
    console.log(filterBy);
    if (filterBy) {
        var { type, maxBatteryStatus, minBatteryStatus, model } = filterBy
        maxBatteryStatus = maxBatteryStatus || Infinity
        minBatteryStatus = minBatteryStatus || 0
        stationsToReturn = gStations.filter(station => station.type.toLowerCase().includes(type.toLowerCase()) && station.model.toLowerCase().includes(model.toLowerCase())
            && (station.batteryStatus < maxBatteryStatus)
            && station.batteryStatus > minBatteryStatus)
    }
    return Promise.resolve([...stationsToReturn]);
}
function tryStation(id) {
    const station = gStations.find(station => station._id === id)
    station.batteryStatus -= 10
    return Promise.resolve()
}
function getById(id) {
    const station = gStations.find(station => station._id === id)
    return Promise.resolve({ ...station })
}

function remove(id) {
    const idx = gStations.findIndex(station => station._id === id)
    gStations.splice(idx, 1)
    if (!gStations.length) gStations = gDefaultStations.slice()
    storageService.store(STORAGE_KEY, gStations)
    return Promise.resolve()
}

function save(stationToSave) {
    if (stationToSave._id) {
        const idx = gStations.findIndex(station => station._id === stationToSave._id)
        gStations.splice(idx, 1, stationToSave)
    } else {
        stationToSave._id = makeId()
        stationToSave.batteryStatus = 100
        gStations.push(stationToSave)
    }
    storageService.store(STORAGE_KEY, gStations)
    return Promise.resolve(stationToSave);
}


function getEmptyStation() {
    return {
        model: '',
        type: ''
    }
}

function _loadStations() {
    let stations = storageService.load(STORAGE_KEY)
    if (!stations || !stations.length) stations = gDefaultStations
    storageService.store(STORAGE_KEY, stations)
    return stations
}

