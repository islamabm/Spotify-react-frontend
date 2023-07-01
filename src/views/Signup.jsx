import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { doSignup } from "../store/actions/user.actions";
import { useNavigate, Link } from "react-router-dom";
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
    <section className="spotify-signup-page flex align-center justify-center">
      <div className="signup-main-container">
        <Link to="/">
        <span
          className="flex align-center justify-center"
          dangerouslySetInnerHTML={{
            __html: getSpotifySvg("SignupHeaderLogo"),
          }}
        ></span>
        </Link>
        <h1 className="flex align-center justify-center">Sign up for free to start listening.</h1>
        <div className="separator">
          <div className="signupW flex column align-center">
            <button className="fb-btn">Sign up with Facebook</button>
            <button className="google-btn">Sign up with Google</button>
          </div>
          <div className="line flex align-center">
            <span className="divider">-------</span>
            <span>or</span>
            <span className="divider">-------</span>
          </div>
        </div>
        <h3 className="flex align-center justify-center">Sign up with your email address</h3>
        <form onSubmit={handleSignup}>
          <div className="form-group flex column">
            <span className="label">What's your email?</span>
            <input
              type="text"
              // value={signupCred.fullname}
              // onChange={(e) =>
              //   setSignupCred({ ...signupCred, fullname: e.target.value })
              // }
              // placeholder="Your full name"
              placeholder="Enter your email."
              required
            />
          </div>

          <div className="form-group flex column">
            <span className="label">Create a password</span>
            <input
              type="password"
              // value={signupCred.username}
              // onChange={(e) =>
              //   setSignupCred({ ...signupCred, username: e.target.value })
              // }
              placeholder="Create a password."
              required
            />
          </div>

          <div className="form-group flex column">
            <span className="label">What should we call you?</span>
            <input
              type="text"
              // value={signupCred.password}
              // onChange={(e) =>
              //   setSignupCred({ ...signupCred, password: e.target.value })
              // }
              placeholder="Enter a profile name."
              required
            />
            <small>This appears on your profile.</small>
          </div>

          <button className="pointer flex align-center justify-center">Sign up</button>
        </form>
        <div className="go-to-login flex align-center justify-center">
          <span>Have an account?</span>
          <Link to="login">Log in</Link>
        </div>
      </div>
    </section>
  );
}
