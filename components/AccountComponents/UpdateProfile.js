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
  const [image, setImage] = useState(null);
  const [pfpUpdated, setPfpUpdated] = useState(false);
  const [userUpdated, setUserUpdated] = useState(false);
  const auth = getAuth();

  const handleUpdates = async (e) => {
    e.preventDefault();

    updateProfile(auth?.currentUser, {
      displayName: name,
    })
      .then(() => {
        setUserUpdated(true);
        console.log("Username updated");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updatePfp = async (e) => {
    e.preventDefault();
    await addImages();
  };

  const addImages = async () => {
    const storageRef = ref(
      storage,
      "users/" + user?.uid + "/pfp/" + `${image}`
    );
    const uploadTask = uploadBytesResumable(storageRef, image);
    await uploadBytesResumable(storageRef, image).on(
      "state_changed",
      (snapshot) => {},
      (err) => alert(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (imageUrl) => {
          updateProfile(auth?.currentUser, {
            photoURL: imageUrl,
          });
          setPfpUpdated(true);
          console.log("profile pic uploaded");
        });
      }
    );
  };
  useEffect(() => {
    console.log("url updated");
  }, [name]);

  return (
    <div>
      <form onSubmit={handleUpdates}>
        <Typography>Update user name</Typography>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          id="name"
          required
          type="text"
          name="name"
          placeholder={user?.displayName}
        />
        <button type="submit">Update</button>
      </form>
      {userUpdated == true ? (
        <span style={{ color: "green" }}>Username updated !!</span>
      ) : null}
      <form onSubmit={updatePfp}>
        <Typography>Update Profile Picture</Typography>
        <input
          type="file"
          id="file"
          accept="image/*"
          required
          name="file"
          onChange={(e) => {
            setImage(e.target.files[0]);
          }}
        />
        <button type="submit">Update</button>
      </form>
      {pfpUpdated == true ? (
        <span style={{ color: "green" }}>Profile picture updated !!</span>
      ) : null}
    </div>
  );
}
