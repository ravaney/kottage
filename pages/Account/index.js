import { database } from "../../components/firebase";
import { ref, get } from "firebase/database";
import { useState, useEffect } from "react";
import AddProperty from "../../components/AddProperty";
import { useAuth } from "../../components/contexts/userContext";
import MyProperties from "../../components/MyProperties";
import UpdateProperty from "../../components/UpdateProperty";
import Reviews from "../../components/Reviews";

export default function Dashboard() {
  const { user } = useAuth();
  const usersRef = ref(database, "users/" + user?.uid);
  const [allProperties, setAllProperties] = useState([]);
  const [addPropertyShown, setaddPropertyShown] = useState(false);
  const [myPropertyShown, setMyPropertyShown] = useState(false);
  const [updateShown, setUpdateShown] = useState(false);
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
  const handleShowUpdate = (e) => {
    setUpdateShown((current) => !current);
  };

  return (
    <>
      <div style={{ padding: 10 }}>My Account </div>
      <div> Testing All account features here</div>
      <button onClick={handleShowAddProp}>Add Property</button>
      {addPropertyShown && <AddProperty />}
      <button onClick={handleMPS}>My properties</button>
      {myPropertyShown && <MyProperties />}
      <button onClick={handleShowUpdate}>Update Property</button>
      {updateShown && <UpdateProperty />}
      <Reviews />
    </>
  );
}
