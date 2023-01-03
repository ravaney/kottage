import { database } from "../../components/firebase";
import { ref, get } from "firebase/database";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const usersRef = ref(database, "users");
  const [allProperties, setAllProperties] = useState([]);

  const getUsers = async () => (await get(usersRef)).val();

  useEffect(() => {
    getUsers().then((users) => {
      setAllProperties(
        Object.values(users).flatMap(({ properties }) =>
          properties ? Object.values(properties) : []
        )
      );
    });
  }, []);

  return (
    <>
      <div>All Properties </div>
      <div>
        {allProperties.map((property) => (
          <div key={property.Id}>
            <h1>{property?.Name}</h1>
            <p>{property?.Description}</p>
            <p>Rooms: {property?.Rooms}</p>
            <p>Contact: {property?.Phone}</p>
          </div>
        ))}
      </div>
    </>
  );
}
