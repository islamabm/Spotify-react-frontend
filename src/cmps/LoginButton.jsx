import React from "react";
// import { GoogleLogin } from "react-google-login";
// const clientId = "574173385565-9vnc14nd5rlg32r4ojmqcvhhkq8sfb0d.apps.googleusercontent.com";


// const onSuccess = (res) => {
//     console.log("LOGIN SUCCESS! Current user: ", res.profileObj)
// }
// const onFailure = (res) => {
//     console.log("LOGIN Failed! res: ", res)
// }

export function LoginButton() {
  return (
    <div className="signInButton">
      {/* <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
      /> */}
    </div>
  );
}
