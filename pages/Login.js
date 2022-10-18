import React from "react";
import { auth } from "../components/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useFormik } from "formik";
import { emailRegex } from "../components/Utilities/validations";

const Login = () => {
  const validate = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = "email required";
    }

    if (!emailRegex.test(values.email)) {
      errors.email = "Invalid email";
    }

    if (!values.password) {
      errors.password = "password required";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: (values) => {
      console.log("onSubmit", values);
      signInWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("user logger in");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    },
  });
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          onChange={formik.handleChange}
          value={formik.values.email}
          id="email"
          type="email"
          name="email"
        />
        {formik.errors.email ? (
          <div style={{ color: "red" }}>{formik.errors.email}</div>
        ) : null}
        <div style={{ display: "block" }}>
          <label htmlFor="password">Password</label>
          <input
            onChange={formik.handleChange}
            value={formik.values.password}
            type="password"
            id="password"
            name="password"
          />
          {formik.errors.password ? (
            <div style={{ color: "red" }}>{formik.errors.password}</div>
          ) : null}
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
