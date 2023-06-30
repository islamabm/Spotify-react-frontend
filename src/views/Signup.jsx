import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { doSignup } from '../store/actions/user.actions'

import { useNavigate } from 'react-router-dom'
export function Signup() {
  const [signupCred, setSignupCred] = useState({
    username: '',
    password: '',
    fullname: '',
    imgUrl: '',
    stations: [],
    likedSongs: [],
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()

  function handleSignup(e) {
    e.preventDefault()

    if (!signupCred.fullname || !signupCred.password || !signupCred.username) {
      return
    }

    dispatch(doSignup(signupCred))
    navigate(`/`)
  }

  return (
    <section className="signup-section">
      <div id="signup-page">
        <div className="signup-header">
          <div className="black-logo-container">
            <img
              className="black-logo"
              src="./../assets/img/logo-black.png"
              alt="Logo"
            />
            <span className="muzikay-logo">Muzikay</span>
          </div>
          <h1>Sign up for free to start listening.</h1>
        </div>

        <div className="separator">
          <span>or</span>
        </div>

        <h3 className="signup-email-h2">Sign up with a new account</h3>

        <form onSubmit={handleSignup}>
          <div className="form-group">
            <label className="label-dark" htmlFor="email">
              What's your fullname?
            </label>
            <input
              className="square-inputs"
              type="text"
              id="email"
              value={signupCred.fullname}
              onChange={(e) =>
                setSignupCred({ ...signupCred, fullname: e.target.value })
              }
              placeholder="Your full name"
              required
            />
          </div>

          <div className="form-group">
            <label className="label-dark" htmlFor="confirm-email">
              Enter your username
            </label>
            <input
              className="square-inputs"
              type="text"
              id="confirm-email"
              value={signupCred.username}
              onChange={(e) =>
                setSignupCred({ ...signupCred, username: e.target.value })
              }
              placeholder="Username"
              required
            />
            <small>This appears on your profile.</small>
          </div>

          <div className="form-group">
            <label className="label-dark" htmlFor="password">
              Create a password
            </label>
            <input
              className="square-inputs"
              type="password"
              id="password"
              value={signupCred.password}
              onChange={(e) =>
                setSignupCred({ ...signupCred, password: e.target.value })
              }
              placeholder="Password"
              required
            />
          </div>

          <input type="submit" value="Sign Up" />
        </form>
      </div>
    </section>
  )
}
