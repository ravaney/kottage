import { Card, CardMedia, CardContent, CardActionArea } from "@mui/material";
import cardStyles from "../styles/ShowCabins.module.css";

const ShowCabins = ({ images }) => {
  return (
    <>
      <h3 className={cardStyles.heading}>Rent a room or the whole place</h3>
      <div className={cardStyles.container}>
        <div className={cardStyles.album}>
          <img className={cardStyles.img} src="yellowCabbin.jpg" />
          <div>
            <div className={cardStyles.description}>
              <h1>Fall Cabbin in Alaska</h1>
              <p>
                Beautiful cabin in Alaskan country side by a river. Quiet place
                and abudance of nature ready to be explored by you and your
                family
              </p>
            </div>
          </div>
        </div>
        <div className={cardStyles.album2}>
          {images.map((image) => (
            <Card
              key={image.id}
              className={cardStyles.card}
              sx={{ maxWidth: 320, m: -0.2 }}
            >
              <CardActionArea>
                <CardMedia
                  style={{ maxHeight: "14vh" }}
                  className={cardStyles.img}
                  component="img"
                  key={image.id}
                  image={image.url}
                  alt={image.id}
                />
                <CardContent>
                  <div
                    style={{
                      color: "black",
                      margin: "0px",
                      padding: "0px",
                      textShadow: "none",
                      bottom: "-1rem",
                    }}
                    className={cardStyles.description}
                  >
                    <p>{image.id}</p>
                  </div>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default ShowCabins;
