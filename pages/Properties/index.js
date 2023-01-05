import Head from "next/head";
import cardStyles from "../../styles/ShowCabins.module.css";
import { ref, get } from "firebase/database";
import { database } from "../../components/firebase";
import {
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Typography,
} from "@mui/material";
import { AuthUserProvider } from "../../components/contexts/userContext";
import { CardHeader } from "@mui/material";
import { useState, useEffect } from "react";

const Properties = () => {
  const [allProperties, setAllProperties] = useState([]);
  const usersRef = ref(database, "users");

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
    <AuthUserProvider>
      <>
        <Head>
          <title>All Properties</title>
          <meta name="keywords" content="web dev" />
        </Head>
        <h1>All Properties</h1>

        <div
          // className={cardStyles.album2}
          style={{
            display: "flex",
            flexWrap: "wrap",
            width: "100%",
            justifyContent: "center",
            padding: "0px 10px 0px 10px",
          }}
        >
          {allProperties.map((property) => (
            <Card
              key={property.Id}
              className={cardStyles.propertiesCard}
              sx={{ maxWidth: 520, m: 1, p: 2 }}
              // style={{ width: "25vw" }}
            >
              <CardActionArea>
                <CardHeader title={property?.Name} />
                <CardMedia
                  style={{ maxHeight: "50vh", minHeight: "14vh" }}
                  className={cardStyles.propertiesImg}
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
                      height: "40px",
                    }}
                  >
                    <Typography vaiant="body2" color="text.secondary">
                      {property?.Description}
                    </Typography>
                  </div>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </div>
      </>
    </AuthUserProvider>
  );
};

export default Properties;
