import { get, ref } from "firebase/database";
import React, { useState, useEffect } from "react";
import BigGallery from "../../components/BigGallery";
import BookingMenu from "../../components/BookingMenu";
import { database } from "../../components/firebase";
import PropertyStyles from "../../styles/ViewProperty.module.css";
import { collection, query, getDocs } from "firebase/firestore";
import { firestore } from "../../components/firebase";
import propertyStyles from "../../styles/ShowCabins.module.css";

const ViewProperty = ({ property }) => {
  const [photosUrl, setPhotosUrl] = useState([]);
  const photosCollection = property.Name + "-" + property.Id;
  console.log(photosCollection);

  const photosCollectionRef = collection(firestore, photosCollection);

  useEffect(() => {
    const getPhotos = async () => {
      const data = await getDocs(photosCollectionRef);
      setPhotosUrl(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getPhotos();
  }, []);

  return (
    <>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css"
          integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor"
          crossOrigin="anonymous"
        />
      </head>
      <div className={propertyStyles.topContainer}>
        <BigGallery images={photosUrl} />

        <BookingMenu />
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
      params: { id: property.Id.toString() },
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
  const property = await data;
  console.log(property);

  if (!property) return { notFound: true };
  return {
    props: { property },
  };
};
