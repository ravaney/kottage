import React, { useEffect } from "react";
import { useState } from "react";
import { auth, database } from "../components/firebase";
import { ref, set } from "firebase/database";
import { getStorage, uploadBytesResumable } from "firebase/storage";
import { ref as imageRef } from "firebase/storage";

const AddProperty = () => {
  const [propertyName, setPropertyName] = useState("");
  const [phone, setPhone] = useState("");
  const [rooms, setRooms] = useState("");
  const [image, setImage] = useState("");

  const [description, setDescription] = useState("");
  const storageRef = imageRef(getStorage(), "property-images");

  const submitForm = (e) => {
    e.preventDefault();

    const createProperty = async (values) => {
      set(
        ref(
          database,
          "users/" + auth.currentUser.uid + `/properties/ ${propertyName}`
        ),
        {
          phone: phone,
          rooms: rooms,
          description: description,
          property_name: propertyName,
        }
      );

      console.log("data written to db");

      clearFields();
    };
    createProperty();
  };
  const addImages = (e) => {
    uploadBytesResumable(storageRef, e.target.files[0])
      .then((snapshot) => {
        console.log("uploaded file");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };
  function clearFields() {
    setPhone("");
    setPropertyName("");
    setRooms("");
  }
  return (
    <>
      <form onSubmit={submitForm}>
        <label htmlFor="propertyName ">Property Name</label>
        <input
          id="property_name"
          style={{ display: "block" }}
          value={propertyName}
          onChange={(e) => setPropertyName(e.target.value)}
        />
        <label htmlFor="phone ">Phone</label>
        <input
          id="phone"
          type="tel"
          style={{ display: "block" }}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <label htmlFor="description ">Short Description</label>
        <textarea
          id="description"
          type="text"
          style={{ display: "block", height: "60px" }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label htmlFor="rooms ">Rooms</label>
        <input
          id="rooms"
          type="number"
          style={{ display: "block" }}
          value={rooms}
          onChange={(e) => setRooms(e.target.value)}
        />
        <label htmlFor="image">Images</label>
        <input
          id="image"
          type="file"
          accept="image/*"
          style={{ display: "block", paddingBottom: "10px" }}
          value={image}
          onChange={(e) => setImage(e.target.value)}
          multiple
        />
        <button
          type="submit"
          style={{ display: "block", marginBottom: "20px" }}
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default AddProperty;
