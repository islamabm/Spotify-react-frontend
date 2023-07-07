import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { doSignup } from '../store/actions/user.actions'
import { useNavigate, Link } from 'react-router-dom'
import { getSpotifySvg } from '../services/SVG.service'
import jwtDecode from 'jwt-decode'
import { userService } from '../services/user.service'
import { LoginSocialFacebook } from 'reactjs-social-login'
import { FacebookLoginButton } from 'react-social-login-buttons'

export function Signup() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const google = window.google

  function handleCallbackResponse(response) {
    const userObject = jwtDecode(response.credential)

    const user = userService.prepareData(userObject)

    dispatch(doSignup(user))
    navigate(`/`)
  }

  useEffect(() => {
    google.accounts.id.initialize({
      client_id:
        '574173385565-5e20ddsrolqlbdrsk5shsfodsfp36pfh.apps.googleusercontent.com',
      callback: handleCallbackResponse,
    })

    google.accounts.id.renderButton(document.getElementById('signIn-div'), {
      theme: 'outline',
      size: 'large',
    })
  }, [])

  const [signupCred, setSignupCred] = useState({
    username: '',
    password: '',
    email: '',
    imgUrl: '',
    stations: [],
    likedSongs: [],
    latestStations: [],
  })

  function handleSignup(e) {
    e.preventDefault()

    if (!signupCred.email || !signupCred.password || !signupCred.username)
      return

    dispatch(doSignup(signupCred))

    navigate(`/`)
  }

  return (
    <section className="spotify-signup-page flex align-center justify-center">
      <div className="signup-main-container">
        <Link to="/">
          <span
            className="flex align-center justify-center"
            dangerouslySetInnerHTML={{
              __html: getSpotifySvg('SignupHeaderLogo'),
            }}
          ></span>
        </Link>
        <h1 className="flex align-center justify-center">
          Sign up for free to start listening.
        </h1>
        <div className="signupW flex column align-center">
          <LoginSocialFacebook
            appId="278384431355097"
            onResolve={(response) => {}}
            onReject={(error) => {
              console.log(error)
            }}
          >
            <FacebookLoginButton />
          </LoginSocialFacebook>

          {/* <button className="fb-btn pointer">
            Sign up with Facebook
            {/* <span>
                <img src="https://www.freeiconspng.com/uploads/facebook-f-logo-white-background-21.jpg" />
              </span> */}
          {/* </button>  */}

          {/* Google Sign in */}
          <div id="signIn-div"></div>

          <div className="divider">
            <div className="line"></div>
            <span>or</span>
            <div className="line"></div>
          </div>
        </div>
        <h3 className="flex align-center justify-center">
          Sign up with your email address
        </h3>
        <form onSubmit={handleSignup}>
          <div className="form-group flex column">
            <span className="label">What's your email?</span>
            <input
              type="email"
              value={signupCred.email}
              onChange={(e) =>
                setSignupCred({ ...signupCred, email: e.target.value })
              }
              placeholder="Enter your email."
              required
            />
          </div>

          <div className="form-group flex column">
            <span className="label">Create a password</span>
            <input
              type="password"
              value={signupCred.password}
              onChange={(e) =>
                setSignupCred({ ...signupCred, password: e.target.value })
              }
              placeholder="Create a password."
              required
            />
          </div>

          <div className="form-group flex column">
            <span className="label">What should we call you?</span>
            <input
              type="text"
              value={signupCred.username}
              onChange={(e) =>
                setSignupCred({ ...signupCred, username: e.target.value })
              }
              placeholder="Enter a profile name."
              required
            />
            <small>This appears on your profile.</small>
          </div>

          <button className="pointer flex align-center justify-center">
            Sign up
          </button>
        </form>
        <div className="go-to-login flex align-center justify-center">
          <span>Have an account?</span>
          <Link to="/login">Log in</Link>
        </div>
      </div>
    </section>
  )
}
