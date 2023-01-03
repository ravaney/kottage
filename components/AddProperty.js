import React, { useEffect } from "react";
import { useState } from "react";
import { auth, database, storage } from "../components/firebase";
import { ref, set } from "firebase/database";
import { getDownloadURL, ref as ref2 } from "firebase/storage";
import { uploadBytesResumable, ref as imgRef } from "firebase/storage";
import { v4 } from "uuid"; // random id generator
import { firestore } from "../components/firebase";
import { setDoc, doc } from "firebase/firestore";

const AddProperty = () => {
  const [propertyName, setPropertyName] = useState("");
  const [phone, setPhone] = useState("");
  const [rooms, setRooms] = useState("");
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState("");
  const [thumb, setThumbnail] = useState("");

  const [id, setId] = useState("");
  var time = Date.now();

  const submitForm = (e) => {
    e.preventDefault();
    const createProperty = async (values) => {
      console.log(id);
      set(
        ref(
          database,
          "users/" + auth.currentUser.uid + `/properties/ ${propertyName}`
        ),
        {
          Phone: phone,
          Rooms: rooms,
          Description: description,
          Name: propertyName,
          Id: v4(),
          thumbnail: thumb,
        }
      );

      console.log("data written to db");

      clearFields();
    };

    const addImages = async () => {
      console.log("inside upload images ");
      images.forEach((image) => {
        const imageName = v4() + "_" + image.name;
        const storageRef = ref2(
          storage,
          "users/" + auth.currentUser.uid + `/${propertyName}/${imageName}`
        );
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadBytesResumable(storageRef, image).on(
          "state_changed",
          (snapshot) => {},
          (err) => alert(err),
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async (imageUrl) => {
              try {
                setThumbnail(imageUrl);
                await setDoc(
                  doc(firestore, propertyName + "-" + id, imageName),
                  {
                    url: imageUrl,
                  }
                );
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
    createProperty();
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
          onChange={(e) => {
            setDescription(e.target.value);
            setId(v4());
          }}
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
