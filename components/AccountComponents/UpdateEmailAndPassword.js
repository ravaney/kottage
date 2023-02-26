import React, { useState } from "react";
import { getAuth, updatePassword, updateEmail } from "firebase/auth";
import { Typography } from "antd";

export default function UpdateEmailAndPassword() {
  const auth = getAuth();

  const user = auth?.currentUser;
  const [newPassword, setNewPassword] = useState("");
  const [email, setEmail] = useState("");

  const changePassword = () => {
    updatePassword(user, newPassword)
      .then(() => console.log("Password changed successfully"))
      .catch((error) => console.log(error));
  };
  const changeEmail = () => {
    updateEmail(user, email)
      .then(() => console.log("Email updated successfully"))
      .catch((error) => console.log(error));
  };
  return (
    <div>
      <form onSubmit={changePassword}>
        <Typography>Change Password</Typography>
        <input
          type="password"
          placeholder="1234"
          id="password"
          onChange={(e) => {
            setNewPassword(e.target.value);
          }}
        />
        <button type="submit">Change Password</button>
      </form>
      <form onSubmit={changeEmail}>
        <Typography>Change Email</Typography>
        <input
          type="email"
          id="email"
          placeholder={user?.email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <button type="submit">Change Email</button>
      </form>
    </div>
  );
}
