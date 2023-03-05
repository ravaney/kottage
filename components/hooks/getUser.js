import { get, ref } from "firebase/database";
import { useEffect } from "react";
import { useState } from "react";
import { useAuth } from "../contexts/userContext";
import { database } from "../firebase";

async function GetUserInfo() {
  const { user } = useAuth();
  const [userInfo, setUserInfo] = useState([]);

  const userRef = ref(database, "users/" + user?.uid);
  const getUser = async () => {
    const getData = async () => (await get(userRef)).val();
    const data = await getData();
    const test = await data;
    return test;
  };
  useEffect(() => {
    getUser().then((promise) => {
      setUserInfo(promise);
    });
  }, [getUser]);

  return userInfo;
}

export { GetUserInfo };
