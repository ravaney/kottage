import { Typography } from "@mui/material";
import { ref, uploadBytesResumable } from "firebase/storage";
import React from "react";
import { getStorage } from "firebase/storage";

const AddImage = () => {
  const storageRef = ref(getStorage(), "property-images");
  //   const [file, setFile] = useState();

  const fileRef = ref(getStorage(), "image");
  const folderRef = ref(getStorage(), "properties/");

  const addImg = (e) => {
    // setFile(e.target.files[0]);

    uploadBytesResumable(storageRef, e.target.files[0])
      .then((snapshot) => {
        console.log("uploaded file");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };
  return (
    <>
      <Typography>Add images</Typography>
      <form onSubmit={addImg}>
        <input type="file" />
        <button type="submit">submit pic</button>
      </form>
    </>
  );
};

export default AddImage;
