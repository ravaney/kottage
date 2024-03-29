import { AuthUserProvider, useAuth } from "./contexts/userContext";
import { useState, useEffect } from "react";
import { ref, get } from "firebase/database";
import { database } from "../components/firebase";
import { Card, CardMedia, CardContent, CardActionArea } from "@mui/material";
import cardStyles from "../styles/ShowCabins.module.css";

export default function MyProperties() {
  const { user } = useAuth();
  const myPropertiesRef = ref(database, "users/" + user?.uid + "/Properties");
  const [allProperties, setAllProperties] = useState([]);
  const getProperties = async () => (await get(myPropertiesRef)).val();

  useEffect(() => {
    getProperties().then((properties) => {
      setAllProperties(properties ? Object.keys(properties) : []);
    });
  }, []);

  return (
    <AuthUserProvider>
      <>
        <div>
          <span>testing all properties</span>
          {allProperties.map((property) => (
            <Card
              key={property.Id}
              className={cardStyles.card}
              sx={{ maxWidth: 320, m: 1, p: 0 }}
            >
              <CardActionArea>
                <CardMedia
                  style={{ maxHeight: "14vh", minHeight: "14vh" }}
                  className={cardStyles.img}
                  component="img"
                  key={property.Id}
                  image={property?.thumbnail}
                  alt={"Picture of Cottage"}
                />
                <CardContent>
                  <div
                    style={{
                      color: "black",
                      margin: "0px",
                      padding: "0px",
                      textShadow: "none",
                      bottom: "-1rem",
                    }}
                    className={cardStyles.description}
                  >
                    <p>{property.Name}</p>
                  </div>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </div>
      </>
    </AuthUserProvider>
  );
}
