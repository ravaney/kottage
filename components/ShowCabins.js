import { Card, CardMedia, CardContent, CardActionArea } from "@mui/material";
import cardStyles from "../styles/ShowCabins.module.css";
import { ref, get } from "firebase/database";
import { useState, useEffect } from "react";
import { database } from "./firebase";

const ShowCabins = ({ images }) => {
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
  }, [allProperties]);
  return (
    <>
      <h3 className={cardStyles.heading}>Rent a room or the whole place</h3>
      <div className={cardStyles.container}>
        <div className={cardStyles.album}>
          <img className={cardStyles.img} src={allProperties[3]?.thumbnail} />
          <div>
            <div className={cardStyles.description}>
              <h1>{allProperties[3]?.Name}</h1>
              <p>{allProperties[3]?.Description}</p>
            </div>
          </div>
        </div>
        <div className={cardStyles.album2}>
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
      </div>
    </>
  );
};

export default ShowCabins;
