import { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { databese, storage } from "../firebaseConfig";
import { useNavigate, useParams } from "react-router-dom";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

function UpdateDataForm() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const docRef = doc(databese, "users", id);
  const [disValue, setDisValue] = useState(true);

  const getData = async () => {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setData(docSnap.data());
    } else {
      alert("No such document!");
    }
  };

  const handleInput = (event) => {
    let newInput = { [event.target.name]: event.target.value };
    setData({ ...data, ...newInput });
  };

  const handleUpdateData = (downloadURL) => {
    const docToUpdate = doc(databese, "users", id);
    if (downloadURL != null) {
      updateDoc(docToUpdate, {
        name: data.name,
        age: data.age,
        image: downloadURL,
      })
        .then(() => {
          alert("Data Updated");
          navigate("/");
        })
        .catch((error) => {
          alert(error.message);
        });
    } else {
      updateDoc(docToUpdate, {
        name: data.name,
        age: data.age,
      })
        .then(() => {
          alert("Data Updated m");
          navigate("/");
        })
        .catch((error) => {
          console.log(error.message);
          alert(error.message);
        });
    }
  };

  const handleUpload = () => {
    if (data.name == null || data.age == null) {
      alert("Please fill all the fields");
    } else {
      if (file != null) {
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
              handleUpdateData(downloadURL);
            });
          }
        );
      } else if (file == null && disValue == false) {
        alert("Please select a file");
      } else {
        handleUpdateData();
      }
    }
  };

  const handleChange = () => {
    setDisValue((disValue) => !disValue);
  };

  useEffect(() => {
    getData();
  }, []);

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
        <h1>Update Data</h1>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            name="name"
            type="text"
            defaultValue={data.name}
            onChange={(event) => handleInput(event)}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Age</label>
          <input
            name="age"
            type="number"
            defaultValue={data.age}
            onChange={(event) => handleInput(event)}
            className="form-control"
          />
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckDefault"
            onChange={() => handleChange()}
          />
          <label className="form-check-label">Image</label>
        </div>

        <input
          className="form-control"
          type="file"
          onChange={(event) => {
            setFile(event.target.files[0]);
          }}
          {...(disValue ? { disabled: true } : { disabled: false })}
        />
        <br />

        <button
          type="button"
          className="btn btn-primary"
          onClick={() => handleUpload()}
        >
          Update Data
        </button>
        <br />
      </div>
    </div>
  );
}

export default UpdateDataForm;
