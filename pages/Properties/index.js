import Head from "next/head";
import Login from "../Authentication/Login";
import AddProperty from "../../components/AddProperty";
import { useEffect } from "react";
import { useRouter } from "next/router";
import {
  AuthUserProvider,
  useAuth,
} from "../../components/contexts/userContext";

const Properties = () => {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    console.log("properties home page " + user?.email);
    console.log(user);
  }, [user]);

  return (
    <AuthUserProvider>
      <>
        <Head>
          <title>Add Property</title>
          <meta name="keywords" content="web dev" />
        </Head>
        <h1>Add Property</h1>
        <p>Welcome to the add Property new</p>

        {user ? (
          <div>
            <p>Currently logged in as : {user?.email}</p>
            <AddProperty />
          </div>
        ) : (
          <div>
            <p style={{ color: "red" }}>
              You must be loggedin to add a property
            </p>{" "}
            <Login />
          </div>
        )}
      </>
    </AuthUserProvider>
  );
};

export default Properties;
