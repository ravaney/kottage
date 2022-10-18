import React from "react";
import { getAuth } from "firebase/auth";

function Logout() {
  const auth = getAuth();

  const logout = () => {
    auth.signOut();
    console.log("user signed out");
  };
  return (
    <div>
      <h1>Logout</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Logout;
