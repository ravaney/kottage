import { Grid, IconButton, InputAdornment, TextField } from "@mui/material";
import React, { Component } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";
import { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SearchIcon from "@mui/icons-material/Search";
import searchStyles from "../styles/Search.module.css";
import dayjs from "dayjs";

const Search = () => {
  const [value, setValue] = useState();
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs());
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid className={searchStyles.container}>
        <h3 className={searchStyles.heading}>Find a Vacation Kottage</h3>
        <div className={searchStyles.inputContainer}>
          <TextField
            className={searchStyles.inputField}
            placeholder="Portland"
            label="Where do you want to go ?"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationOnIcon />
                </InputAdornment>
              ),
            }}
          />
          <div className={searchStyles.dates}>
            <DatePicker
              // className={searchStyles.inputField}
              label="Check-in"
              openTo="day"
              value={startDate}
              onChange={(newValue) => {
                setStartDate(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
            <DatePicker
              // className={searchStyles.inputField}
              label="Check-out"
              openTo="day"
              views={["year", "month", "day"]}
              value={endDate}
              onChange={(newValue) => {
                setEndDate(newValue);
              }}
              minDate={startDate}
              renderInput={(params) => <TextField {...params} />}
            />
          </div>
          <TextField
            className={searchStyles.inputField}
            label="Guests"
            placeholder="1"
            type="number"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PeopleAltIcon />
                </InputAdornment>
              ),
            }}
          />
          <IconButton aria-label="search" className={searchStyles.searchIcon}>
            <SearchIcon sx={{ color: "#007ba7" }} fontSize="large" />
            Search
          </IconButton>
        </div>
      </Grid>
    </LocalizationProvider>
  );
};

export default Search;
