import React from 'react'
import { getSpotifySvg } from '../../services/SVG.service'
import { useNavigate } from 'react-router-dom'
import { doLogout } from '../../store/actions/user.actions'
import { useDispatch, useSelector } from 'react-redux'
export function MobileModal({ closeModal, show }) {
  const user = useSelector((storeState) => storeState.userModule.loggedInUser)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  function goToProfile() {
    navigate('/user')
    closeModal()
  }

  function logout() {
    dispatch(doLogout())
    closeModal()
  }

  function login() {
    navigate('/login')
    closeModal()
  }
  function signup() {
    navigate('/signup')
    closeModal()
  }

  return (
    <section className={`mobile-modal ${show ? 'show' : 'hide'}`}>
      <span
        onClick={closeModal}
        className="x"
        dangerouslySetInnerHTML={{
          __html: getSpotifySvg('x'),
        }}
      ></span>
      {user ? (
        <ul>
          <li>
            <button onClick={goToProfile}>Profile</button>
          </li>
          <li>
            <button onClick={logout}>Log Out</button>
          </li>
        </ul>
      ) : (
        <ul>
          <li>
            <button onClick={login}>Log in</button>
          </li>
          <li>
            <button onClick={signup}>Sign up</button>
          </li>
        </ul>
      )}
    </section>
  )
}
