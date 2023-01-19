import React from "react";
import { Modal, Paper, Typography } from "@mui/material";
import { useState } from "react";

export default function About() {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal about me and the project"
      aria-describeby="modal about me and the project"
      style={{ padding: "20px" }}
    >
      <Paper
        style={{
          margin: "auto",
          maxWidth: "70vw",
          height: "60vh",
          padding: "20px",
          overflowY: "scroll",
        }}
      >
        <Typography variant="h5">
          {" "}
          <span>Thanks for visiting my website</span>
          <br />
          <span
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: "16px",
              borderTop: "1px solid gray",
              padding: "10px 0px 10px 0px",
            }}
          >
            Lamar Lewis{" "}
            <a
              target="_new"
              href="https://www.linkedin.com/in/lamar-lewis-ab626b49/"
            >
              <img
                style={{ width: "50px" }}
                src="https://th.bing.com/th/id/R.14f8d0d8ea255a03471032d79087fdf0?rik=Jcph23UZL08iCA&riu=http%3a%2f%2f1000logos.net%2fwp-content%2fuploads%2f2017%2f03%2fColor-of-the-LinkedIn-Logo.jpg&ehk=hT5Ibkg%2fFPa%2f7TPm%2fs2TP8Fxdd7ySQQBuZmn88xh5j0%3d&risl=&pid=ImgRaw&r=0"
              />
            </a>{" "}
            <a target="_new" href="https://github.com/ravaney">
              <img
                style={{ width: "40px" }}
                src="https://th.bing.com/th/id/R.734888c84d95d28b36728ac33186cab3?rik=EyUQGBjtSbMjVw&riu=http%3a%2f%2fpngimg.com%2fuploads%2fgithub%2fgithub_PNG80.png&ehk=sCQlSHnb7Wc8WNPgOilokXbf8jL4g20yv7QFEFpl6ko%3d&risl=&pid=ImgRaw&r=0"
              />
            </a>{" "}
            <a href="mailto:lewislamar20@Outlook.com">
              <img
                style={{ width: "40px", marginLeft: "5px" }}
                src="https://georgeschofield.com/wp-content/uploads/2016/01/email-icon-23.png"
              />
            </a>
          </span>
        </Typography>
        <Typography
          variant="body1"
          style={{ borderTop: "1px solid gray", paddingTop: "10px" }}
        >
          Kottage.com is a travel reservation website , I was inspired by
          AirBnB.com and Vrbo.com . I try to use modern technologies throughout
          the project. I adhered to best practises as much as I could. This was
          a React and Next.Js project. Next js helped me in generating dynamic
          pages for each of the properties that a user adds. I used React hooks
          to make the website as user friendly as possible and very live. As
          soon as changes happen on the backend, they show without the need to
          refresh the page.
          <br />
          <br />
          For the backkend, I used firebase. Firebase Authentication for user
          Account creation and verification. Firebase database to store user
          information such as address and phone number. Also to store the
          property information that a user adds. I used firebase storage to
          store the images that a user uploads.
          <br />
          <br />
          **This website is 100% responsive , works wonderful on Smartphones
          <br />
          <br />
          <b>Current Features which do work:</b>
          <br /> Account creation <br />
          Add a Property
          <br />
          Fetch all property information from database and show them in gallery
          <br />
          <b> Features I'm working on: </b>
          <br />
          Account deletion
          <br />
          Property update and delete
          <br />
          Leaving review on property
          <br />
          Booking a property
          <br />
          Search for property
        </Typography>
        <Typography></Typography>
      </Paper>
    </Modal>
  );
}
