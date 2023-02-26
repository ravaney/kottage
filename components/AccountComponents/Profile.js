import { Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import profileStyles from "../../styles/Profile.module.css";
import UpdatePfp from "./UpdatePfp";
import UpdateEmailAndPassword from "./UpdateEmailAndPassword";
export default function Profile({ userInfo }) {
  return (
    <>
      <Paper className={profileStyles.head}>
        <Typography variant="h6">
          Name: {userInfo?.first_name} {userInfo?.last_name}
        </Typography>
        <Typography variant="h6">Address: {userInfo?.address}</Typography>
        <Typography variant="h6">Email: {userInfo?.email}</Typography>
        <Typography variant="h6">Phone: {userInfo?.phone}</Typography>
      </Paper>
      <div>
        <UpdatePfp />
        <UpdateEmailAndPassword />
      </div>
    </>
  );
}
