import { useState } from "react";
import { app, storage } from "../firebaseConfig";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

const Storage = () => {
  const [data, setData] = useState({});

  const handleUpload = () => {
    const storageRef = ref(storage, `images/${data.name}`);
    const uploadTask = uploadBytesResumable(storageRef, data);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
        });
      }
    );
  };

  return (
    <>
      <h3>Storage</h3>
      <input
        type="file"
        onChange={(event) => {
          setData(event.target.files[0]);
        }}
      />
      <br />
      <button onClick={handleUpload}>Upload</button>
    </>
  );
};

export default Storage;
