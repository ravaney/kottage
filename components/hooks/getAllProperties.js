import React from "react";
import { useState } from "react";
import { get } from "firebase/database";

const getAllProperties = (propertyRef) => {
  const getProperties = async () => (await get(propertyRef)).val();
  //   const [propp, setAllProperties] = useState([]);
  const propp = [];
  getProperties().then((properties) => {
    Object.values(properties).forEach(({ property }) => propp.push[property]);
    console.log(propp + "inside hook");
  });
  return { propp };
};

export default getAllProperties;
