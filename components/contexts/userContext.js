import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, database } from "../firebase";
import { get, ref } from "firebase/database";

const authUserContext = createContext({});

export const AuthUserProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState();
  const propertyRef = ref(database, "properties");

  const [allProperties, setAllProperties] = useState([]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  useEffect(() => {
    const getProperties = async () => (await get(propertyRef)).val();

    const getAllProperties = async () => {
      const properties = await getProperties();
      const data = await properties;
      setAllProperties(data ? Object.values(data) : []);
    };
    getAllProperties();
  }, []);

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    setUser(null);
    await auth.signOut();
  };

  return (
    <authUserContext.Provider
      value={{ user, login, signup, logout, allProperties }}
    >
      {loading ? null : children}
    </authUserContext.Provider>
  );
};

export const useAuth = () => useContext(authUserContext);
