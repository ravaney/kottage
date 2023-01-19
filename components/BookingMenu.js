import {
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  Rating,
} from "@mui/material";
import { InfoOutlined } from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React from "react";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PropertyStyles from "../styles/ViewProperty.module.css";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Box, getValue } from "@mui/system";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import UseAnimations from "react-useanimations";
import alertOctagon from "react-useanimations/lib/alertOctagon";
import { ref, get } from "firebase/database";
import { database } from "./firebase";

export default function BookingMenu({ property }) {
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs());
  const [avgRating, setAvgRating] = useState(0);
  const [weights, setWeights] = useState([]);
  const [values, setValues] = useState([]);
  const ratings = {
    1: "Very Poor",
    2: "Poor+",
    3: "Ok",
    4: "Good",
    5: "Excellent!",
  };

  const getAvgRef = ref(
    database,
    "ratings/" + "ce31b1be-656e-42bc-a44d-75f20230466a"
  );

  useEffect(() => {
    const getAllRatings = async () => await await (await get(getAvgRef)).val();
    getAllRatings().then((ratings) => {
      setWeights(ratings ? Object.values(ratings) : []);
    });
    calculateAvgRating();
    const i = 3;
    // console.log(Object.values(weights));
  }, []);

  const calculateAvgRating = () => {
    const sum = 0;
    9;
    console.log(
      weights.forEach((w) => {
        console.log(w);
      })
    );
  };

  return (
    <>
      <div className={PropertyStyles.container}>
        <div className={PropertyStyles.price}>
          <Typography
            variant="h5"
            style={{
              justifyContent: "space-between",
              // textAlign: "center",
              alignItems: "center",
              display: "flex",
              color: "hotpink",
            }}
          >
            {property?.Name}
            <IconButton
              aria-label="save to favourites"
              style={{ margin: "0% 0% 0% 0%", color: "hotpink" }}
            >
              <FavoriteBorderIcon fontSize="large" />
            </IconButton>
          </Typography>

          <Typography>
            <span style={{ fontSize: "32px" }}>$300</span>{" "}
            <span style={{ lineHeight: "50%", fontSize: "14px" }}>
              avg/night
            </span>
          </Typography>
          <div style={{ display: "flex", margin: "0px" }}>
            <Rating
              name="controlled"
              value={property?.Rating}
              defaultValue={4}
              readOnly
              precision={1}
              icon={
                <FavoriteIcon fontSize="inherit" style={{ color: "hotpink" }} />
              }
              emptyIcon={<FavoriteIcon fontSize="inherit" />}
            />
            <Box sx={{ m1: 2, fontSize: 16, marginLeft: "5px" }}>
              <a style={{ color: "blue", marginRight: "30px" }}>(14 reviews)</a>
            </Box>
          </div>

          <div style={{ display: "flex", marginTop: "32px" }}>
            <InfoOutlined style={{ color: "red" }} />
            {/* <UseAnimations animation={alertOctagon} size={40} /> */}
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
            aria-label="Check Availability button"
            className={PropertyStyles.searchButton}
          >
            Book property
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
            <b>Property # {property.Id}</b>
          </Typography>
        </div>
      </div>
    </>
  );
}
