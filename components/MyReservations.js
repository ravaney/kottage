import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Typography, Paper } from "@mui/material";

export default function Reservations(userInfo) {
  const [reservations, setReservations] = useState([]);
  console.log(userInfo?.user?.Reservations);
  useEffect(() => {
    setReservations(userInfo ? Object.values(userInfo) : []);
    console.log(reservations);
  }, []);
  return (
    <Container style={{ display: "flex" }}>
      <Container
        id="sidebar"
        style={{
          maxWidth: "10vw",
          height: "100vh",
          marginLeft: "0px",
          paddingLeft: "0px",
          borderRight: "1px solid black",
        }}
      >
        <Typography variant="h1">Your Reservations</Typography>
        {/* {user?.user?.Reservations.forEach((map) => {
          <div key={res?.PropertyId}>{res?.PropertyName}</div>;
        })} */}
      </Container>
    </Container>
  );
}
