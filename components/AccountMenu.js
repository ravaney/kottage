import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { Avatar, IconButton } from "@mui/material";
import navStyles from "../styles/Nav.module.css";
import { auth } from "./firebase";
export default function BasicPopover() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <IconButton
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
      >
        <Avatar src={auth?.currentUser?.photoURL} />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        style={{ boxSizing: "border-box" }}
      >
        <Typography style={{ maxWidth: "200px", justifyContent: "left" }}>
          <ul className={navStyles.popover}>
            <li>Login/Logout</li>
            <li>Account</li>
            <li>Your Trips</li>
            <li>Help</li>
            <li>Settings</li>
          </ul>
        </Typography>
      </Popover>
    </div>
  );
}
