import React from "react";
import { useAuth } from "../contexts/userContext";
import { updateProfile } from "firebase/auth";
import { Typography } from "@mui/material";
import { useState } from "react";
import { getAuth } from "firebase/auth";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase";
import { useEffect } from "react";

export default function UpdatePfp() {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [image, setImage] = useState(null);
  const auth = getAuth();

  const handleUpdates = async (e) => {
    e.preventDefault();
    await addImages();

    updateProfile(auth?.currentUser, {
      displayName: name,
    })
      .then(() => {
        console.log("profile updated");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addImages = async () => {
    const imageName = image.name;
    const storageRef = ref(
      storage,
      "users/" + user?.uid + "/pfp/" + `${image}`
    );
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadBytesResumable(storageRef, image).on(
      "state_changed",
      (snapshot) => {},
      (err) => alert(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (imageUrl) => {
          updateProfile(auth?.currentUser, {
            photoURL: imageUrl,
          });
          console.log("profile pic uploaded");
        });
      }
    );
  };
  useEffect(() => {
    console.log("url updated");
  }, [url, name]);

  return (
    <div>
      <form onSubmit={handleUpdates}>
        <Typography>Update user name</Typography>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          id="name"
          type="text"
          name="name"
          placeholder={user?.displayName}
        />
        <Typography>Update Profile Picture</Typography>
        <input
          type="file"
          id="file"
          accept="image/*"
          name="file"
          onChange={(e) => {
            setImage(e.target.files[0]);
          }}
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}
