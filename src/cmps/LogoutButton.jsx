import React from "react";
import { GoogleLogout } from "react-google-login";
const clientId = "574173385565-9vnc14nd5rlg32r4ojmqcvhhkq8sfb0d.apps.googleusercontent.com";
const onSuccess = (res) => {
  console.log("LOGIN SUCCESS! Current user: ", res.profileObj);
};

export function LogoutButton() {
  return (
    <div className="signOutButton">
      <GoogleLogout
        clientId={clientId}
        buttonText={"Logout"}
        onSuccess={onSuccess}
      />
    </div>
  );
}
