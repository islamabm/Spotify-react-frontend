import { storageService } from './storage.service'

export const userService = {
  signup,
  getLoggedinUser,
  login,
  logout,
  updateUser,
}

function getLoggedinUser() {
  return storageService.load('loggedinUser')
}

function signup(userCred) {
  console.log('userCred', userCred)
  storageService.store('loggedinUser', userCred)
  return { ...userCred }
}

function logout() {
  storageService.store('loggedinUser', {})
}

function login(userCred) {
  console.log('userCred', userCred)
  storageService.store('loggedinUser', userCred)
  return { ...userCred }
}
function updateUser(url) {
  const user = storageService.load('loggedinUser')
  user.imgUrl = url
  storageService.store('loggedinUser', user)
  return { ...user }
}
