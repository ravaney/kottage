import { Divider, Typography } from "@mui/material";
import { Box, Container } from "@mui/material";
import React, { useEffect } from "react";
import HolidayVillageIcon from "@mui/icons-material/HolidayVillage";
import Star from "@mui/icons-material/AutoAwesome";
import propertyInfo from "../styles/PropertyInfo.module.css";
export default function AboutProperty({ property }) {
  const pushPin = {
    center: { address: property?.address },
    options: {
      title: property?.Name,
    },
  };

  return (
    <Container id="about" className={propertyInfo.headings}>
      <Typography style={{ marginBottom: "10px" }} variant="h4">
        About this Property
      </Typography>
      <Box style={{ display: "flex", marginBottom: "10px" }}>
        <Typography variant="subtitle2">
          <HolidayVillageIcon /> {property?.Type}
          <Star />
          {property?.Rooms > 1 ? (
            <span>{property?.Rooms} Bedrooms</span>
          ) : (
            <span>{property?.Rooms} Bedroom</span>
          )}
          <Star />
          {property?.Bathroom > 1 ? (
            <span>{property?.Bathrooms} Bathrooms</span>
          ) : (
            <span>{property?.Bathrooms} Bathroom</span>
          )}
          {property?.Pets == true ? (
            <span>
              {property?.Pets} <Star /> Pet Friendly
            </span>
          ) : null}
          {property?.Patio == true ? (
            <span>
              <Star />
              Patio
            </span>
          ) : null}
          {property?.LivingRoom == true ? (
            <span>
              <Star />
              Living Room
            </span>
          ) : null}
        </Typography>
      </Box>

      <Typography
        variant="body1"
        style={{
          marginTop: "10px",
        }}
      >
        {property?.Description}
      </Typography>
    </Container>
  );
}
