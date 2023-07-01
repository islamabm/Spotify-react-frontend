import { storageService } from './storage.service'

export const userService = {
  signup,
  getLoggedInUser,
  login,
  logout,
  updateUser,
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
