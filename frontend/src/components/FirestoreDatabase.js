import { useEffect, useState } from "react";
import { app, databese } from "../firebaseConfig";

import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

const FirestoreDatabase = () => {
  const [data, setData] = useState({});
  const [array, setArray] = useState([]);
  const collectionRef = collection(databese, "users");

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
          alert("Data Added");
        })
        .catch((error) => {
          console.log(error.message);
          alert(error.message);
        });
    } else {
      alert("Please fill all the fields");
    }
  };

  const handleGetAllData = () => {
    getDocs(collectionRef)
      .then((response) => {
        // alert("Check the console");
        // response.docs.map((item) => {
        //   console.log(item.data());
        // });

        // console.log(response.docs);
        setArray(response.docs);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handleUpdateData = (id) => {
    const docToUpdate = doc(databese, "users", id); // add UID manually
    updateDoc(docToUpdate, {
      password: data.password,
    })
      .then(() => {
        alert("Data Updated");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handleDeleteData = (id) => {
    const docToDelete = doc(databese, "users", id); // add UID manually
    deleteDoc(docToDelete)
      .then(() => {
        alert("Data Deleted");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  useEffect(() => {
    handleGetAllData();
  }, [array]);

  return (
    <>
      <h3>Firestore Database</h3>
      <input
        name="email"
        placeholder="Email"
        onChange={(event) => handleInput(event)}
      />
      <input
        name="password"
        placeholder="Password"
        onChange={(event) => handleInput(event)}
      />
      <br />
      <button onClick={handleAddData}>Add Data</button>
      {/* <button onClick={handleGetAllData}>Get Data</button> */}
      {/* <button onClick={handleUpdateData}>Update Data</button> */}
      {/* <button onClick={handleDeleteData}>Delete Data</button> */}
      <br />

      {array.map((item) => {
        return (
          <>
            <span>{item.data().email + " " + item.data().password}</span>{" "}
            <button onClick={() => handleUpdateData(item.id)}>Update</button>
            <button onClick={() => handleDeleteData(item.id)}>Delete</button>
            <br />
          </>
        );
      })}
    </>
  );
};

export default FirestoreDatabase;
