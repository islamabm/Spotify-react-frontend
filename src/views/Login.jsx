import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { doLogin } from "../store/actions/user.actions";
import { useNavigate, Link } from "react-router-dom";
import { getSpotifySvg } from "../services/SVG.service";

export function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginCred, setLoginCred] = useState({ username: "", password: "" });

  function handleLogin(e) {
    e.preventDefault();
    if (!loginCred.username || !loginCred.password) {
      alert("Please enter username/password");
      return;
    }
    dispatch(doLogin(loginCred));
    navigate(`/`);
  }

  const handleInputChange = (e) => {
    setLoginCred({
      ...loginCred,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="spotify-login-page">
      <div className="login-header">
        <Link to="/">
          <span
            className="flex"
            dangerouslySetInnerHTML={{
              __html: getSpotifySvg("LoginHeaderLogo"),
            }}
          ></span>
        </Link>
      </div>
      <div className="login-main-container flex column align-center">
        <h2>Log in to Spotify</h2>
        <div className="continueW flex column">
          <button className="pointer">
            <span>
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2008px-Google_%22G%22_Logo.svg.png" />
            </span>
            Continue With Google
          </button>
          <button className="pointer">
            <span>
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1024px-Facebook_Logo_%282019%29.png" />
            </span>
            Continue With Facebook
          </button>
          <button className="pointer">
            <span>
              <img src="https://1000logos.net/wp-content/uploads/2016/10/apple-emblem.jpg" />
            </span>
            Continue With Apple
          </button>
        </div>
        <div className="empty-line"></div>
        <form className="spotify-login-form" onSubmit={handleLogin}>
          <div className="spotify-username flex column">
            <span className="login-form-labels">Email or username</span>
            <input
              type="text"
              placeholder="Email or username"
              onChange={handleInputChange}
              value={loginCred.username}
              id="username"
              name="username"
            />
            {/* <select
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
          </select> */}
          </div>
          <div className="spotify-password flex column">
            <span className="login-form-labels">Password</span>
            <input
              type="password"
              placeholder="Password"
              onChange={handleInputChange}
              value={loginCred.password}
              id="password"
              name="password"
            />
          </div>
          <button className="login-btn pointer">Log in</button>
        </form>
        <div className="empty-line"></div>
        <div className="go-to-signup flex justify-center">
          <span>Don't have an account?</span>
          <Link to="/signup">Sign up for Spotify</Link>
        </div>
      </div>
    </section>
  );
}
