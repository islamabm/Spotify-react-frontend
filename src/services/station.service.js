import { storageService } from './storage.service.js'
import { utilService } from './util.service.js'
import { httpService } from './http.service.js'
import { userService } from './user.service.js'
import axios from 'axios'
export const stationService = {
  query,
  save,
  remove,
  getById,
  searchQuery,
  getSongById,
  getCurrIndex,
  getVideos,
  getRandomSong,
  getPrevSong,
  getNextSong,
  createNewStation,
  userQuery,
  addSongToStation,
  stationNameClass,
  songNameClass,
  updateStation,
  editStation,
  getRecommendedSongs,
  removeSongFromStation,
  filterUserStations,
  setVideoIdCache,
  getVideoIdCache,
}

const gSearchCategories = [
  [
    {
      img: 'https://i.scdn.co/image/ab67fb8200005cafa862ab80dd85682b37c4e768',
      title: 'Pop',
      color: '#E13300',
    },
    {
      img: 'https://i.scdn.co/image/ab67fb8200005cafcc70a3c2e4c71398708bdc4a',
      title: 'Folk & Acoustic',
      color: '#7358FF',
    },
    {
      img: 'https://i.scdn.co/image/ab67fb8200005cafae7e69beb88f16969641b53e',
      title: 'Rock',
      color: '#1E3264',
    },
    {
      img: 'https://i.scdn.co/image/ab67fb8200005caf271f9d895003c5f5561c1354',
      title: 'Mood',
      color: '#E8115B',
    },
    {
      img: 'https://i.scdn.co/image/ab67706f000000029249b35f23fb596b6f006a15',
      title: 'Workout',
      color: '#148A08',
    },
    {
      img: 'https://i.scdn.co/image/ab67fb8200005cafa1a252e3a815b65778d8c2aa',
      title: 'Indie',
      color: '#BC5900',
    },
    {
      img: 'https://i.scdn.co/image/ab67706f00000002e4eadd417a05b2546e866934',
      title: 'Focus',
      color: '#E91429',
    },
    {
      img: 'https://i.scdn.co/image/ab67fb8200005cafda178a834e4f87371e9fa543',
      title: 'Alternative',
      color: '#E1118C',
    },
    {
      img: 'https://i.scdn.co/image/ab67fb8200005caff005a355830c374754d32868',
      title: 'Decades',
      color: '#8D67AB',
    },
    {
      img: 'https://i.scdn.co/image/ab67fb8200005cafe914a07d20cec7a65e2e5dad',
      title: 'At Home',
      color: '#D84000',
    },
    {
      img: 'https://i.scdn.co/image/ab67fb8200005caf4b36a2c31432ace68d90c4f2',
      title: 'Travel',
      color: '#E13300',
    },
    {
      img: 'https://i.scdn.co/image/ab67fb8200005cafcbf80f8ea695536eace4fd2c',
      title: 'Party',
      color: '#7358FF',
    },
    {
      img: 'https://i.scdn.co/image/ab67fb8200005caf7e11c8413dc33c00740579c1',
      title: 'Hip-Hop',
      color: '#1E3264',
    },
    {
      img: 'https://i.scdn.co/image/ab67fb8200005cafdfdaac1cf9574a196ca25196',
      title: 'Dance-Electronic',
      color: '#148A08',
    },
    {
      img: 'https://i.scdn.co/image/ab67fb8200005caf47e942f5bea637f4f4760170',
      title: 'Chill',
      color: '#E1118C',
    },
    {
      img: 'https://i.scdn.co/image/ab67706f00000002b70e0223f544b1faa2e95ed0',
      title: 'Sleep',
      color: '#BC5900',
    },
  ],
]

const API_KEYS = [
  'AIzaSyC490pBZv2nkY2Q7-GGhdVxBCJM7UQ_ugE',
  'AIzaSyBbbMTD4v2nXglhlgF7OQ4HJoq6FefNEZ4',
  'AIzaSyBtANk4rTUDYVNW_dNRfFo2oSdTmakG5VM',
  'AIzaSyDVkfIVegJhAmuINQ8GpBs5lUyLTTbM3r0',
  'AIzaSyD3NO_363qJfF-A1Yv6q-s1LaYYq5vnWtI',
]
let keyIndex = 0

const STORAGE_SEARCH_KEY = 'search-stations'
const VIDEOS_KEY = 'videosIdDB'

var gSearchStations = _loadSearchStations()

const videoCache = {}

function getNextKey() {
  keyIndex = (keyIndex + 1) % API_KEYS.length
  return API_KEYS[keyIndex]
}
async function axiosGetWithKeyRotation(url, config) {
  try {
    const response = await axios.get(url, config)
    return response
  } catch (err) {
    if (err.response && err.response.status === 403) {
      // assuming 403 is for quota exceeded, adjust accordingly
      const nextKey = getNextKey()
      const nextUrl = url.replace(/key=[^&]+/, `key=${nextKey}`)
      console.log(`Switching to next API key: ${nextKey}`)
      return axiosGetWithKeyRotation(nextUrl, config)
    }
    throw err
  }
}
const gUrl = () =>
  `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${API_KEYS[keyIndex]}&q=`

async function getCachedVideos(keyword) {
  if (
    videoCache[keyword] &&
    Date.now() - videoCache[keyword].timestamp < CACHE_EXPIRATION_TIME
  ) {
    return videoCache[keyword].data
  }

  let videosIds = storageService.load(VIDEOS_KEY) || []
  const res = await axiosGetWithKeyRotation(gUrl() + keyword)
  const videos = res.data.items.map((item) => _prepareData(item))

  videoCache[keyword] = {
    timestamp: Date.now(),
    data: videos,
  }

  videosIds.push(videos[0])

  return videos
}

const CACHE_KEY = 'recommendedSongsCache'
const CACHE_EXPIRATION_TIME = 24 * 60 * 60 * 1000

async function getVideos(keyword, song = null) {
  if (Array.isArray(keyword)) {
    const cachedVideos = []
    const uncachedKeywords = []
    keyword.forEach((artist) => {
      if (
        videoCache[artist] &&
        Date.now() - videoCache[artist].timestamp < CACHE_EXPIRATION_TIME
      ) {
        cachedVideos.push(videoCache[artist].data)
      } else {
        uncachedKeywords.push(artist)
      }
    })

    const recommendedSongs = await Promise.all(
      uncachedKeywords.map(async (artist) => {
        let cachedSong = getCachedSong(artist)
        if (cachedSong) {
          return cachedSong
        } else {
          const res = await axiosGetWithKeyRotation(gUrl() + artist)
          const recommendedSong = res.data.items.map((item) =>
            _prepareData(item)
          )
          cacheSong(artist, recommendedSong[0])

          return recommendedSong[0]
        }
      })
    )

    return cachedVideos.concat(recommendedSongs)
  }

  return getCachedVideos(keyword)
}

function getCachedSong(artist) {
  const cache = getCache()
  if (
    cache &&
    cache[artist] &&
    Date.now() - cache[artist].timestamp < CACHE_EXPIRATION_TIME
  ) {
    return cache[artist].data
  }
  return null
}

function cacheSong(artist, song) {
  const cache = getCache() || {}
  cache[artist] = {
    timestamp: Date.now(),
    data: song,
  }
  setCache(cache)
}

function setVideoIdCache(song, videoId) {
  localStorage.setItem(`${song.artist} - ${song.title}`, videoId)
}

function getVideoIdCache(song) {
  return localStorage.getItem(`${song.artist} - ${song.title}`)
}

function getCache() {
  const cacheJSON = localStorage.getItem(CACHE_KEY)
  return JSON.parse(cacheJSON)
}

function setCache(cache) {
  const cacheJSON = JSON.stringify(cache)
  localStorage.setItem(CACHE_KEY, cacheJSON)
}

function _prepareData(item) {
  return {
    videoId: item.id.videoId,
    title: item.snippet.title,
    imgUrl: item.snippet.thumbnails.default.url,
    addedAt: Date.now(),
    album: item.snippet.title.slice(0, 5),
    artist: item.snippet.title.slice(2, 7),
  }
}

function searchQuery() {
  return Promise.resolve([...gSearchStations])
}

async function userQuery() {
  let loggedinUser = await userService.getLoggedinUser()
  const stations = await httpService.get(`station`)
  const userStations = stations.filter(
    (station) => station.createdBy.fullname === loggedinUser.username
  )
  return userStations
}

async function query() {
  const stations = await httpService.get(`station`)
  return stations
}

async function getById(id) {
  return httpService.get(`station/${id}`)
}

async function addSongToStation(stationId, song) {
  return httpService.post(`station/${stationId}/song`, { song })
}

async function removeSongFromStation(stationId, songId) {
  return httpService.delete(`station/${stationId}/song/${songId}`)
}

async function updateStation(stationId, songs) {
  try {
    const updatedStation = await httpService.put(
      `station/songs/${stationId}`,
      songs
    )
    return updatedStation
  } catch (err) {
    console.error('Failed to update station', err)
    throw err
  }
}

async function getSongById(stationId, id) {
  const station = await getById(stationId)
  const song = station.songs.find((s) => s._id === id)
  return Promise.resolve({ ...song })
}

async function getRandomSong(stationId) {
  const station = await getById(stationId)
  const length = station.songs.length
  const idx = utilService.getRandomIntInclusive(0, length - 1)
  const song = station.songs[idx]
  return Promise.resolve({ ...song })
}

async function getPrevSong(stationId, songId) {
  let song
  const station = await getById(stationId)
  const idx = station.songs.findIndex((song) => song._id === songId)
  if (idx === 0) song = station.songs[station.length - 1]
  else song = station.songs[idx - 1]

  return Promise.resolve({ ...song })
}

async function getNextSong(stationId, songId) {
  let song
  const station = await getById(stationId)
  const idx = station.songs.findIndex((song) => song._id === songId)
  if (idx === station.length - 1) song = station.songs[0]
  else song = station.songs[idx + 1]
  return Promise.resolve({ ...song })
}

async function getCurrIndex(stationId, songId) {
  const station = await getById(stationId)
  const songIdx = station.songs.findIndex((song) => song._id === songId)
  return Promise.resolve(songIdx)
}

async function remove(stationId) {
  return httpService.delete(`station/${stationId}`)
}

async function save(station) {
  return httpService.put(`station/${station._id}`, station)
}

function filterUserStations(userStations, filterBy) {
  let filteredStations = userStations
  switch (filterBy) {
    case 'Recently Added':
      filteredStations = userStations
        .filter((station) => station.createdAt)
        .sort((a, b) => b.createdAt - a.createdAt)
      break
    case 'Alphabetical':
      filteredStations = userStations.sort((a, b) =>
        a.name.localeCompare(b.name)
      )
      break
    default:
      break
  }
  return filteredStations
}

function _loadSearchStations() {
  let stations = storageService.load(STORAGE_SEARCH_KEY)
  if (!stations || !stations.length) stations = gSearchCategories
  storageService.store(STORAGE_SEARCH_KEY, stations)
  return stations
}

async function createNewStation(name, songs, url) {
  let loggedinUser = await userService.getLoggedinUser()
  const newStation = {
    imgUrl: url,
    name: name,
    tags: [],
    createdBy: {
      _id: loggedinUser._id,
      fullname: loggedinUser.username,
      imgUrl: '',
    },
    createdAt: Date.now(),
    likedByUsers: [],
    songs,
    msgs: [
      {
        id: '',
        from: '',
        txt: '',
      },
    ],
    desc: '',
  }

  return httpService.post('station', newStation)
}

function stationNameClass(station) {
  if (!station.name) return
  const words = station.name.split(' ').length
  if (words <= 3) {
    return 'short-station-name'
  } else if (words <= 5) {
    return 'long-station-name'
  } else {
    return 'huge-station-name'
  }
}

function songNameClass(song) {
  if (!song.title) return
  const words = song.title.split(' ').length
  if (words <= 10) {
    return 'short-song-title'
  } else if (words <= 15) {
    return 'long-song-title'
  } else {
    return 'huge-song-title'
  }
}

async function editStation(station) {
  return httpService.put(`station/${station._id}`, station)
}

async function getRecommendedSongs(station) {
  const songArtists = station.map((song) => song.artist)
  const song = station.map((song) => song)
  return await getVideos(songArtists, song)
}
