import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { doLogin } from '../store/actions/user.actions'
import { useNavigate } from 'react-router-dom'
export function Login() {
  const dispatch = useDispatch()

  const users = useSelector((storeState) => storeState.userModule.users)
  const navigate = useNavigate()
  const [loginCred, setLoginCred] = useState({ username: '', password: '' })

  function handleLogin(e) {
    e.preventDefault()
    if (!loginCred.username || !loginCred.password) {
      alert('Please enter username/password')
      return
    }
    dispatch(doLogin(loginCred))
    navigate(`/`)
  }

  const handleInputChange = (e) => {
    setLoginCred({
      ...loginCred,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section className="spotify-login-page">
      <form className="spotify-login-form" onSubmit={handleLogin}>
        <div className="spotify-form-group">
          <label className="login-form-labels" htmlFor="username">
            Username
          </label>
          <select
            className="login-form-inputs"
            id="username"
            name="username"
            value={loginCred.username}
            onChange={handleInputChange}
          >
            <option value="">Select User</option>
            {users.map((user, idx) => (
              <option key={idx} value={user.username}>
                {user.fullname}
              </option>
            ))}
          </select>
        </div>
        <div className="spotify-form-group">
          <label className="login-form-labels" htmlFor="password">
            Password
          </label>
          <input
            className="login-form-inputs"
            type="password"
            id="password"
            name="password"
            value={loginCred.password}
            placeholder="Password"
            onChange={handleInputChange}
          />
        </div>
        <button>Login</button>
      </form>
    </section>
  )
}
