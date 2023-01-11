import {
  TextField,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { InfoOutlined } from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React from "react";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PropertyStyles from "../styles/ViewProperty.module.css";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";

export default function BookingMenu() {
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs());
  const [value, setValue] = useState();

  return (
    <>
      <div className={PropertyStyles.container}>
        <div className={PropertyStyles.price}>
          <Typography>
            <span style={{ fontSize: "32px" }}>$300</span>{" "}
            <span style={{ lineHeight: "50%", fontSize: "14px" }}>
              avg/night
            </span>
          </Typography>
          <div style={{ display: "flex", marginTop: "32px" }}>
            <InfoOutlined style={{ color: "red" }} />
            <span style={{ fontSize: "16px" }}>
              Add dates for total pricing
            </span>
          </div>
        </div>
        <div className={PropertyStyles.calContainer}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              className={PropertyStyles.cal}
              label="Check-in"
              value={startDate}
              onChange={(newValue) => {
                setStartDate(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />

            <DatePicker
              className={PropertyStyles.cal}
              label="Check-out"
              openTo="day"
              value={endDate}
              onChange={(newValue) => {
                setEndDate(newValue);
              }}
              minDate={startDate}
              renderInput={(params) => <TextField {...params} />}
            />
            <TextField
              className={PropertyStyles.guest}
              //   label="Guests"
              placeholder="1"
              type="number"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PeopleAltIcon />
                    <Typography>Guests</Typography>
                  </InputAdornment>
                ),
              }}
            />
          </LocalizationProvider>
        </div>
        <div className={PropertyStyles.searchContainer}>
          <IconButton
            aria-label="search"
            className={PropertyStyles.searchButton}
          >
            Check availability
          </IconButton>
          <div className={PropertyStyles.note}>
            <Typography
              style={{
                fontSize: ".875rem",
                display: "flex",
                // margin: "0px 0px 16px 0px",
              }}
            >
              <HelpCenterIcon style={{ color: "red" }} />
              <span>
                <b>Free cancellation</b> up to{" "}
                <span style={{ color: "blue" }}>14 days before check-in</span>
              </span>
            </Typography>
          </div>
          <div
            style={{
              borderTop: "1px solid grey",
              borderBottom: "1px solid grey",
              padding: "16px",
              display: "flex",
            }}
          >
            <Typography className={PropertyStyles.contact}>
              Contact host
            </Typography>
          </div>
          <Typography className={PropertyStyles.property}>
            <b>Property #</b>
          </Typography>
        </div>
      </div>
    </>
  );
}
