import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { doSignup } from "../store/actions/user.actions";
import { useNavigate } from "react-router-dom";
import { getSpotifySvg } from "../services/SVG.service";

export function Signup() {
  const [signupCred, setSignupCred] = useState({
    username: "",
    password: "",
    fullname: "",
    imgUrl: "",
    stations: [],
    likedSongs: [],
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSignup(e) {
    e.preventDefault();

    if (!signupCred.fullname || !signupCred.password || !signupCred.username) {
      return;
    }

    dispatch(doSignup(signupCred));
    navigate(`/`);
  }

  return (
    <section className="spotify-signup-page">
      <div className="signup-main-container">
        <span
          className="flex"
          dangerouslySetInnerHTML={{
            __html: getSpotifySvg("SignupHeaderLogo"),
          }}
        ></span>
        <h1>Sign up for free to start listening.</h1>
        <div className="separator">
          <div className="signupW flex column">
            <button className="fb-btn">Sign up with Facebook</button>
            <button className="google-btn">Sign up with Google</button>
          </div>
          <div className="line">
            <span className="divider"></span>
            <span>or</span>
            <span className="divider"></span>
          </div>
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
  );
}
