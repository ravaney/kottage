import Head from "next/head";
import { auth } from "../../components/firebase";
import Login from "../Login";
import AddProperty from "../../components/AddProperty";
import { useEffect } from "react";
import { useState } from "react";

const Properties = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  });

  return (
    <>
      <Head>
        <title>Add Property</title>
        <meta name="keywords" content="web dev" />
      </Head>
      <h1>Add Property</h1>
      <p>Welcome to the add Property new</p>

      {user ? (
        <AddProperty />
      ) : (
        <div>
          <p style={{ color: "red" }}>You must be loggedin to add a property</p>{" "}
          <Login />
        </div>
      )}
    </>
  );
};

export default Properties;
