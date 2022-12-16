import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { databese, storage } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

function AddDataForm() {
  const [data, setData] = useState({});
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const collectionRef = collection(databese, "users");

  const handleInput = (event) => {
    let newInput = { [event.target.name]: event.target.value };
    setData({ ...data, ...newInput });
  };

  const handleAddData = (downloadURL) => {
    addDoc(collectionRef, {
      name: data.name,
      age: data.age,
      image: downloadURL,
    })
      .then(() => {
        alert("Data Added");
        navigate("/");
      })
      .catch((error) => {
        console.log(error.message);
        alert(error.message);
      });
  };

  const handleUpload = () => {
    if (data.name != null && data.age != null && file != null) {
      const storageRef = ref(storage, `images/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
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
            handleAddData(downloadURL);
          });
        }
      );
    } else {
      alert("Please fill all the fields");
    }
  };

  return (
    <div
      style={{
        width: "350px",
        backgroundColor: "#FFE080",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "60px",
        marginBottom: "60px",
      }}
    >
      <div
        style={{
          width: "70%",
          marginLeft: "auto",
          marginRight: "auto",
          padding: "35px 0px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <h1>Add Data</h1>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            name="name"
            type="text"
            placeholder="Name"
            onChange={(event) => handleInput(event)}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Age</label>
          <input
            name="age"
            type="number"
            placeholder="Age"
            onChange={(event) => handleInput(event)}
            className="form-control"
          />
          <br />
          <input
            className="form-control"
            type="file"
            onChange={(event) => {
              setFile(event.target.files[0]);
            }}
          />
        </div>
        <br />
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleUpload}
        >
          Add Data
        </button>
        <br />
      </div>
    </div>
  );
}

export default AddDataForm;
