import React from "react";
import { useState } from "react";
import { getStorage } from "../components/firebase";
import AddImage from "./AddImage";

const AddProperty = () => {
  const [propertyName, setPropertyName] = useState("");

  return (
    <>
      <form>
        <label htmlFor="propertyName ">Property Name</label>
        <input
          id="property_name"
          value={propertyName}
          onChange={(e) => setPropertyName(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>
      <AddImage />
    </>
  );
};

export default AddProperty;
