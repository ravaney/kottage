import galleryStyles from "../styles/BigGallery.module.css";
import Carousel from "react-bootstrap/Carousel";
const BigGallery = ({ images }) => {
  return (
    <>
      <Carousel
        interval={8000}
        // variant="dark"
        controls="false"
        className={galleryStyles.carousel}
      >
        {images.map((image) => (
          <Carousel.Item key={image.url}>
            <img src={image.url} className={galleryStyles.img} />
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  );
};

export default BigGallery;
