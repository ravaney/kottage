import { AuthUserProvider, useAuth } from "./contexts/userContext";
import {
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Typography,
} from "@mui/material";
import cardStyles from "../styles/ShowCabins.module.css";
import { auth } from "./firebase";
import Link from "next/link";

export default function MyProperties() {
  //const { user } = useAuth();
  //const myPropertiesRef = ref(database, "users/" + user?.uid + "/Properties");
  const { allProperties } = useAuth();
  return (
    <AuthUserProvider>
      <>
        <span>Showing my properties</span>
        <div
          style={{
            height: "100%",
            overflow: "scroll",
            display: "flex",
            flexWrap: "wrap",
            width: "100%",
            justifyContent: "center",
            padding: "0px 10px 0px 10px",
          }}
        >
          {allProperties.map((property) => {
            console.log(property);
            if (property?.OwnerId == auth?.currentUser?.uid) {
              return (
                <Card
                  key={property.Id}
                  className={cardStyles.propertiesCard}
                  sx={{ maxWidth: 420, m: 1, p: 2 }}
                >
                  <Link href={"/Properties/" + property.Id} key={property.Id}>
                    <CardActionArea>
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
                            {property.Name}
                          </Typography>
                        </div>
                      </CardContent>
                    </CardActionArea>
                  </Link>
                </Card>
              );
            }
          })}
        </div>
      </>
    </AuthUserProvider>
  );
}
