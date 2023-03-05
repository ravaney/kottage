import React, { useState } from "react";
import { getAuth, updatePassword, updateEmail } from "firebase/auth";
import { Typography } from "antd";

export default function UpdateEmailAndPassword() {
  const auth = getAuth();

  const user = auth?.currentUser;
  const [newPassword, setNewPassword] = useState("");
  const [email, setEmail] = useState("");
  const [pwUpdated, setPwUpdated] = useState(false);
  const [emailUpdated, setEmailUpdated] = useState(false);

  const changePassword = () => {
    updatePassword(user, newPassword)
      .then(() => {
        console.log("Password changed successfully");
        setPwUpdated(true);
      })
      .catch((error) => console.log(error));
  };
  const changeEmail = () => {
    updateEmail(user, email)
      .then(() => {
        console.log("Email updated successfully");
        setEmailUpdated(true);
      })
      .catch((error) => console.log(error));
  };
  return (
    <div>
      <form onSubmit={changePassword}>
        <Typography>Change Password</Typography>
        <input
          type="password"
          placeholder="1234"
          required
          id="password"
          onChange={(e) => {
            setNewPassword(e.target.value);
          }}
        />
        <button type="submit">Change Password</button>
      </form>
      {pwUpdated == true ? (
        <span style={{ color: "green" }}>Password updated !!</span>
      ) : null}
      <form onSubmit={changeEmail}>
        <Typography>Change Email</Typography>
        <input
          type="email"
          id="email"
          required
          placeholder={user?.email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <button type="submit">Change Email</button>
      </form>
      {emailUpdated == true ? (
        <span style={{ color: "green" }}>Email updated !!</span>
      ) : null}
    </div>
  );
}
