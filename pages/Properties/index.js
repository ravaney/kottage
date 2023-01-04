import Head from "next/head";
import Login from "../Authentication/Login";
import AddProperty from "../../components/AddProperty";
import { useEffect, useState } from "react";
import cardStyles from "../../styles/ShowCabins.module.css";
import { useRouter } from "next/router";
import { ref, get } from "firebase/database";
import { database } from "../../components/firebase";
import {
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Typography,
} from "@mui/material";

import {
  AuthUserProvider,
  useAuth,
} from "../../components/contexts/userContext";
import { CardHeader } from "@mui/material";

const Properties = () => {
  const [allProperties, setAllProperties] = useState([]);
  const usersRef = ref(database, "users");

  const router = useRouter();
  const { user, loading } = useAuth();
  const getUsers = async () => (await get(usersRef)).val();

  useEffect(() => {
    console.log("properties home page " + user?.email);
    console.log(user);
  }, [user]);

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

        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {allProperties.map((property) => (
            <Card
              key={property.Id}
              // className={cardStyles.card}
              sx={{ maxWidth: 320, m: 1, p: 0 }}
              style={{ width: "25vw" }}
            >
              <CardActionArea>
                <CardHeader title={property?.Name} />
                <CardMedia
                  style={{ maxHeight: "14vh", minHeight: "14vh" }}
                  // className={cardStyles.img}
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
                    // className={cardStyles.description}
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
