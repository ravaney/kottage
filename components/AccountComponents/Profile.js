import { Paper, Typography } from "@mui/material";
import React from "react";

export default function Profile({ userInfo }) {
  return (
    <Paper style={{ paddingLeft: "20px" }}>
      <div>Template </div>
      <Typography variant="h6">
        Name: {userInfo?.first_name} {userInfo?.last_name}
      </Typography>
      <Typography variant="h6">Address: {userInfo?.address}</Typography>
      <Typography variant="h6">Email: {userInfo?.email}</Typography>
      <Typography variant="h6">Phone: {userInfo?.phone}</Typography>
    </Paper>
  );
}
