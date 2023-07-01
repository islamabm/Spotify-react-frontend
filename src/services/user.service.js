import { storageService } from './storage.service'

export const userService = {
  signup,
  getLoggedInUser,
  login,
  logout,
  updateUser,
  prepareData,
}

function getLoggedInUser() {
  return storageService.load('loggedinUser')
}

function signup(userCred) {
  storageService.store('loggedinUser', userCred)
  return { ...userCred }
}

function logout() {
  storageService.store('loggedinUser', {})
}

function login(userCred) {
  storageService.store('loggedinUser', userCred)
  return { ...userCred }
}
function updateUser(url) {
  const user = storageService.load('loggedinUser')
  user.imgUrl = url
  storageService.store('loggedinUser', user)
  return { ...user }
}

function prepareData(userCred) {
  return {
    email:userCred.email,
    userName: userCred.name,
    img: userCred.picture
  }
}