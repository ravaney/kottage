import React from "react";
import { useState } from "react";
// import { emailRegex } from "../components/Utilities/validations";
import { useAuth } from "../../components/contexts/userContext";
import { useRouter } from "next/router";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const [loading2, setLoading] = useState(false);

  const router = useRouter();

  // const validate = (values) => {
  //   const errors = {};

  //   if (!values.email) {
  //     errors.email = "email required";
  //   }

  //   if (!emailRegex.test(values.email)) {
  //     errors.email = "Invalid email";
  //   }

  //   if (!values.password) {
  //     errors.password = "password required";
  //   }

  //   return errors;
  // };

  // function login(email, password) {
  //   return auth
  //     .setPersistence(browserLocalPersistence)
  //     .then(() => {
  //       signInWithEmailAndPassword(auth, email, password).catch((error) => {
  //         const errorCode = error.code;
  //         const errorMessage = error.message;
  //         console.log(error);
  //       });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }

  const handleSubmit = async (e) => {
    // validate(e.values);
    e.preventDefault();
    setLoading(true);

    try {
      const authUser = await login(email, password);
      const user = authUser.user;
      console.log("logged in " + user.email);
      router.push("/");
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          id="email"
          type="email"
          name="email"
        />

        <div style={{ display: "block" }}>
          <label htmlFor="password">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            id="password"
            name="password"
          />
        </div>

        <button type="submit" disabled={loading2}>
          Login
        </button>
        <a
          style={{ display: "block", margin: 40, color: "blue" }}
          href="/Authentication/Signup"
        >
          Sign up for an Account
        </a>
      </form>
    </div>
  );
};

export default Login;
