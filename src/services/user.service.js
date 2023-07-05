import { httpService } from './http.service'
import { stationService } from './station.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
  login,
  logout,
  signup,
  getLoggedinUser,
  saveLocalUser,
  getUsers,
  getById,
  remove,
  update,
  getLoggedinUserDetails,
  signupGuest,
  prepareData,
  updateLatestStations,
  updateUser,
  removeSong,
}

window.userService = userService

function getUsers() {
  return httpService.get(`user`)
}

async function getById(userId) {
  const user = await httpService.get(`user/${userId}`)

  return user
}
function remove(userId) {
  return httpService.delete(`user/${userId}`)
}
async function removeSong(songId, user) {
  return httpService.put(`/user/${user._id}/removeSong`, { songId })
}

async function update(selectedSong, user) {
  const userCopy = { ...user }

  userCopy.LikedSongs = [...userCopy.LikedSongs, selectedSong]

  const savedUser = await httpService.put(`user/${userCopy._id}`, userCopy)

  if (getLoggedinUser()._id === savedUser._id) saveLocalUser(savedUser)
  return savedUser
}

async function updateUser(url, user) {
  const userCopy = { ...user }

  userCopy.imgUrl = url

  const savedUser = await httpService.put(`user/img/${userCopy._id}`, userCopy)

  if (getLoggedinUser()._id === savedUser._id) saveLocalUser(savedUser)
  return savedUser
}

async function login(userCred) {
  const user = await httpService.post('auth/login', userCred)

  return saveLocalUser(user)
}

async function signup(userCred) {
  if (!userCred.imgUrl) {
    userCred.imgUrl =
      'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg'
  }
  const user = await httpService.post('auth/signup', userCred)
  return saveLocalUser(user)
}

async function signupGuest(userCred) {
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(userCred))
}

async function logout() {
  return await httpService.post('auth/logout')
}

async function getLoggedinUserDetails() {
  const user = getLoggedinUser()

  if (!user) return null
  const userDetails = await httpService.get(`user/${user._id}`)
  return userDetails
}

function saveLocalUser(user) {
  user = {
    _id: user._id,
    username: user.username,
    email: user.email,
    stations: [],
    imgUrl:
      'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg',
    LikedSongs: [],
    latestStations: [],
  }
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
  return user
}

function getLoggedinUser() {
  const user = JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
  if (user) {
    if (user.username === 'guest') {
      return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
    } else {
      return httpService.get(`user/${user._id}`)
    }
  }
}

function prepareData(userCred) {
  return {
    email: userCred.email,
    userName: userCred.name,
    img: userCred.picture,
  }
}

async function updateLatestStations(stationId, user) {
  console.log('service', stationId)
  console.log('service', user)
  const station = await stationService.getById(stationId)
  const userCopy = { ...user }
  userCopy.latestStations = [...userCopy.latestStations, station]
  return httpService.put(`user/latest/${userCopy._id}`, userCopy)
}
