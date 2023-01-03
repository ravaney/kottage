import React, { useEffect, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../components/firebase";
import { ref, set } from "firebase/database";
import { database } from "../../components/firebase";
import { emailRegex } from "../../components/Utilities/validations";

const Signup = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [errors, setErrors] = useState({
    email: "Invalid email",
    repassword: "Passwords do not match",
    password: "invalid Password",
  });

  useEffect(() => {
    validate();
  }, []);

  const validate = (values) => {
    const errors = {};
    if (password !== repassword) {
      errors.repassword = "passwords do not match";
    }

    if (!emailRegex.test(email)) {
      errors.email = "Invalid email";
    }
    if (phone.length > 10) {
      errors.phone = "enter valid phone number including area code";
    }

    return errors;
  };

  //
  const submitForm = (e) => {
    e.preventDefault();

    const createUserAccount = async (values) => {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
        .then((user) => {
          if (auth.currentUser.uid !== null) {
            set(ref(database, "users/" + auth.currentUser.uid), {
              first_name: fname,
              last_name: lname,
              phone: phone,
              email: email,
              address: address,
              admin: false,
            });

            console.log("data written to db");
          } else {
            console.log("empty uid");
          }
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage);
        });
      clearFields();
    };
    createUserAccount();
  };
  function clearFields() {
    setAddress("");
    setEmail("");
    setFname("");
    setLname("");
    setPassword("");
    setRepassword("");
    setPhone("");
  }

  //

  return (
    <div>
      <form onSubmit={submitForm}>
        <label
          htmlFor="first_name"
          name="first_Name"
          id="first_name"
          style={{ display: "block" }}
        >
          First Name
        </label>
        <input
          id="first_name"
          required
          type="string"
          name="first_name"
          value={fname}
          onChange={(e) => setFname(e.target.value)}
        />
        <label
          htmlFor="last_name"
          name="last_Name"
          id="last_name"
          style={{ display: "block" }}
        >
          Last Name
        </label>
        <input
          required
          id="last_name"
          type="string"
          name="last_name"
          value={lname}
          onChange={(e) => setLname(e.target.value)}
        />
        <label
          htmlFor="email"
          name="email"
          id="email"
          style={{ display: "block" }}
        >
          Email
        </label>

        <input
          required
          id="email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label
          htmlFor="password"
          name="password"
          id="password"
          style={{ display: "block" }}
        >
          Password
        </label>
        <input
          required
          id="password"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label
          htmlFor="repassword"
          name="repassword"
          id="repassword"
          style={{ display: "block" }}
        >
          Retype Password
        </label>
        <input
          required
          id="repassword"
          type="repassword"
          name="repassword"
          value={repassword}
          onChange={(e) => setRepassword(e.target.value)}
        />
        <label
          htmlFor="phone"
          name="phone"
          id="phone"
          style={{ display: "block" }}
        >
          {repassword !== password ? (
            <div style={{ color: "red" }}>{errors.repassword}</div>
          ) : null}
          Phone Number
        </label>
        <input
          id="phone"
          type="tel"
          name="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <label
          htmlFor="address"
          name="address"
          id="address"
          style={{ display: "block" }}
        >
          Address
        </label>
        <input
          required
          id="address"
          type="string"
          name="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <button type="submit" style={{ display: "block" }}>
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
