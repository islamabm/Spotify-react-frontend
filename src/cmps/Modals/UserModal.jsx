import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { doLogout } from '../../store/actions/user.actions'

export function UserModal({ onClose }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  function goTouserProfile() {
    navigate('/user')
    onClose()
  }

  function handleLogout() {
    dispatch(doLogout())
    onClose()
  }

  return (
    <div className="user-modal">
      <div className="user-actions-modal pointer" onClick={goTouserProfile}>
        <p>Profile</p>
      </div>
      <div className="line"></div>
      <div className="user-actions-modal pointer" onClick={handleLogout}>
        <p>Log out</p>
      </div>
    </div>
  )
}
