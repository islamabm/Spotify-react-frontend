import { storageService } from './storage.service'

export const userService = {
  signup,
  getLoggedinUser,
  login,
  logout,
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
