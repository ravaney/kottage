import { get, ref } from "firebase/database";
import React, { useState, useEffect } from "react";
import BigGallery from "../../components/BigGallery";
import BookingMenu from "../../components/BookingMenu";
import PropertyStyles from "../../styles/ViewProperty.module.css";
import { collection, getDocs } from "firebase/firestore";
import { firestore, database } from "../../components/firebase";
import propertyStyles from "../../styles/ShowCabins.module.css";
import "bootstrap/dist/css/bootstrap.css";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";
import PropertyNav from "../../components/PropertyNav";
import AboutProperty from "../../components/AboutProperty";
import Policy from "../../components/Policy";

const ViewProperty = ({ property }) => {
  const [photosUrl, setPhotosUrl] = useState([]);

  const photosCollection = property.Name + "-" + property.Id;
  console.log(property?.Rating + " rating");

  const photosCollectionRef = collection(firestore, photosCollection);
  const heartsRef = ref(database, "properties/" + property?.Id + "/rating");

  useEffect(() => {
    const getPhotos = async () => {
      const data = await getDocs(photosCollectionRef);
      setPhotosUrl(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getPhotos();
  }, []);

  return (
    <>
      <div className={propertyStyles.topContainer}>
        <Grid style={{ display: "block" }}>
          <BigGallery images={photosUrl} />
          <PropertyNav />
          <AboutProperty property={property} />
          <Policy />
        </Grid>

        <BookingMenu property={property} />
      </div>
    </>
  );
};

export default ViewProperty;

export const getStaticPaths = async () => {
  const propertyRef = ref(database, "properties");
  const allProperties = [];
  const getProperties = async () => (await get(propertyRef)).val();

  getProperties().then((properties) => {
    allProperties.push[properties ? Object.values(properties) : []];
  });

  const paths = allProperties.map((property) => {
    return {
      params: {
        id: property.Id.toString(),
      },
    };
  });

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async (context) => {
  console.log(context);
  const propertyRef = ref(database, "properties/" + context.params.id);
  const getProperties = async () => (await get(propertyRef)).val();

  const data = await getProperties();
  const property = data;
  console.log(data);

  if (!property) return { notFound: true };
  return {
    props: { property },
  };
};
