import { useState, useEffect } from "react";

import { firestore } from "../firebase";

const useFireStore = (collection) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const unsub = firestore.collection(collection).onSnapshot((snapshot) => {
      let documents = [];
      snapshot.forEach((doc) => {
        documents.push({ ...doc.data(), url: doc.id });
      });
      setImages(documents);
    });
    return () => unsub;
  }, [collection]);
  return { images };
};
export default useFireStore;
