import { get, ref } from "firebase/database";
import React from "react";
import BookingMenu from "../../components/BookingMenu";
import { database } from "../../components/firebase";
import PropertyStyles from "../../styles/ViewProperty.module.css";
import { useState } from "react";

const ViewProperty = (props) => {
  const [allProperties, setAllProperties] = useState();
  return (
    <>
      <div style={{ display: "flex" }}>
        <div className={PropertyStyles.album}>Property id {props.id}</div>
        <BookingMenu />
      </div>
    </>
  );
};

export default ViewProperty;
export async function getServerSideProps(context) {
  console.log("hello" + context.query);
  return {
    props: {
      id: context.query.id,
    },
  };
}

// export const getStaticPaths = async () => {
//   const propertyRef = ref(database, "properties");
//   await get(propertyRef)
//     .val()
//     .then((test) => console.log());
// };
