import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { app, databese } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { getDatabase, ref, set } from "firebase/database";
import { getAuth } from "firebase/auth";

function AddDataForm() {
  const [data, setData] = useState({});
  const navigate = useNavigate();
  // const auth = getAuth();
  const collectionRef = collection(databese, "users");

  // const databese = getDatabase(app);
  // const dbRef = ref(databese, "/users/");

  const handleInput = (event) => {
    let newInput = { [event.target.name]: event.target.value };
    setData({ ...data, ...newInput });
  };

  const handleAddData = () => {
    if (data.email != null && data.password != null) {
      addDoc(collectionRef, {
        email: data.email,
        password: data.password,
      })
        .then(() => {
          //   alert("Data Added");
          navigate("/");
        })
        .catch((error) => {
          console.log(error.message);
          alert(error.message);
        });
    } else {
      alert("Please fill all the fields");
    }
  };

  return (
    <>
      <h1>Add Data</h1>
      <input
        name="email"
        placeholder="Email"
        onChange={(event) => handleInput(event)}
      />
      <br />
      <input
        name="password"
        placeholder="Password"
        onChange={(event) => handleInput(event)}
      />
      <br />
      <button onClick={handleAddData}>Add Data</button>
    </>
  );
}

export default AddDataForm;
