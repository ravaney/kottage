import galleryStyles from "../styles/Gallery.module.css";
import Carousel from "react-bootstrap/Carousel";
import { Typography } from "@mui/material";

const Gallery = () => {
  return (
    <>
      <Typography className={galleryStyles.heading}>
        Get inspired by our most Poplar Cabins
      </Typography>

      <Carousel
        // indicators={false}
        interval={4000}
        variant="dark"
        className={galleryStyles.carousel}
      >
        <Carousel.Item>
          <img
            //className="d-block w-100"
            className={galleryStyles.image}
            src="beach.jpg"
            aria-label="family on beach"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img className={galleryStyles.image} src="bedroom.jpg" />
        </Carousel.Item>
      </Carousel>
    </>
  );
};

export default Gallery;
