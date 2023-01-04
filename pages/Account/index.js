import { database } from "../../components/firebase";
import { ref, get } from "firebase/database";
import { useState, useEffect } from "react";
import AddProperty from "../../components/AddProperty";
import { useAuth } from "../../components/contexts/userContext";
import MyProperties from "../../components/MyProperties";

export default function Dashboard() {
  const { user } = useAuth();
  const usersRef = ref(database, "users/" + user?.uid);
  const [allProperties, setAllProperties] = useState([]);
  const [addPropertyShown, setaddPropertyShown] = useState(false);
  const [myPropertyShown, setMyPropertyShown] = useState(false);
  const getUser = async () => (await get(usersRef)).val();

  // useEffect(() => {
  //   getUser().then((user) => {
  //     setAllProperties(
  //       Object.values(user).flatMap(({ properties }) =>
  //         properties ? Object.values(properties) : []
  //       )
  //     );
  //   });
  // }, []);

  useEffect(() => {
    console.log(user?.uid);
  }, [user]);
  const handleShowAddProp = (e) => {
    setaddPropertyShown((current) => !current);
  };
  const handleMPS = (e) => {
    setMyPropertyShown((current) => !current);
  };

  return (
    <>
      <div style={{ padding: 10 }}>My Account </div>
      <button onClick={handleShowAddProp}>Add Property</button>
      {addPropertyShown && <AddProperty />}
      <button onClick={handleMPS}>My properties</button>
      {myPropertyShown && <MyProperties />}
    </>
  );
}
