import React from "react";
import { Typography } from "@mui/material";
import { Container } from "@mui/material";
import propertyInfo from "../styles/PropertyInfo.module.css";

export default function Policy() {
  return (
    <Container id="policy" className={propertyInfo.headings}>
      <Typography variant="h4">Policies</Typography>
      <Typography variant="subtitle1">
        Cancellation and Refund Policy
      </Typography>
      <Typography variant="body1">
        Cancellations made 14 days or more before check in, will receive a 100%
        refund. Cancellations made within 14-7 before check in days will receive
        50% refund. Cancellations made within 7 days of check in will receive no
        refund
      </Typography>
      <Typography variant="h6">No Smoking Policy</Typography>
      <Typography variant="body1">
        Guest understands, acknowledges and agrees to abide by the no smoking
        policy that applies to all Kottage properties. All Kottage properties
        are completely smoke-free, including all guest rooms, resort buildings,
        common areas, patios and balconies, except for strictly designated
        smoking areas.
      </Typography>
    </Container>
  );
}
