import galleryStyles from "../styles/Gallery.module.css";
import Carousel from "react-bootstrap/Carousel";

const Gallery = () => {
  return (
    <>
      <h3 className={galleryStyles.heading}>
        Get inspired by our most Poplar Cabins
      </h3>

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
