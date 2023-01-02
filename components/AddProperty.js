import React, { useEffect } from "react";
import { useState } from "react";
import { auth, database, storage } from "../components/firebase";
import { ref, set } from "firebase/database";
import { getDownloadURL, ref as ref2 } from "firebase/storage";
import {
  getStorage,
  uploadBytesResumable,
  ref as imgRef,
} from "firebase/storage";
import { v4 } from "uuid"; // random id generator

const AddProperty = () => {
  const [propertyName, setPropertyName] = useState("");
  const [phone, setPhone] = useState("");
  const [rooms, setRooms] = useState("");
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState("");
  const [propertyId, setPropertyId] = useState("");
  var time = Date.now();

  const submitForm = (e) => {
    e.preventDefault();

    const createProperty = async (values) => {
      setPropertyId(v4);
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
          property_id: propertyId,
        }
      );

      console.log("data written to db");

      clearFields();
    };
    createProperty();

    const addImages = async () => {
      console.log("inside upload images ");
      images.forEach((image) => {
        console.log("property name oii" + propertyName);
        const imageName = v4() + "_" + image.name;
        const storageRef = ref2(
          storage,
          "users/" + auth.currentUser.uid + `/${propertyId}/${imageName}`
        );
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadBytesResumable(storageRef, image).on(
          "state_changed",
          (snapshot) => {},
          (err) => alert(err),
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((imageUrl) => {
              try {
                console.log("success");
              } catch (err) {
                alert(err);
              }
            });
          }
        );
      });
    };
    addImages();
  };

  function onImageChange(images) {
    setImages([...images.target.files]);
  }

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
          required
          id="property_name"
          style={{ display: "block" }}
          value={propertyName}
          onChange={(e) => setPropertyName(e.target.value)}
        />
        <label htmlFor="phone ">Phone</label>
        <input
          required
          id="phone"
          type="tel"
          style={{ display: "block" }}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <label htmlFor="description ">Short Description</label>
        <textarea
          required
          id="description"
          type="text"
          style={{ display: "block", height: "60px" }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label htmlFor="rooms ">Rooms</label>
        <input
          required
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
          onChange={onImageChange}
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
