import { useEffect, useState } from "react";
import {
  getAuth,
  signOut,
  onAuthStateChanged,
  deleteUser,
} from "firebase/auth";
import { redirect, useNavigate } from "react-router-dom";
import { databese } from "../firebaseConfig";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import ReadDataReal from "./ReadDataReal";

function Home() {
  const [data, setData] = useState({});
  const [array, setArray] = useState([]);
  const collectionRef = collection(databese, "users");

  const auth = getAuth();
  const navigate = useNavigate();

  const handleInput = (event) => {
    let newInput = { [event.target.name]: event.target.value };
    setData({ ...data, ...newInput });
  };

  const handleGetAllData = () => {
    getDocs(collectionRef)
      .then((response) => {
        setArray(response.docs);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handleUpdateData = (id) => {
    const docToUpdate = doc(databese, "users", id);
    updateDoc(docToUpdate, {
      password: data.password,
    })
      .then(() => {
        // alert("Data Updated");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handleDeleteData = (id) => {
    const docToDelete = doc(databese, "users", id);
    deleteDoc(docToDelete)
      .then(() => {
        // alert("Data Deleted");
        // navigate("/");
        window.location.reload();
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handleSignout = async () => {
    await signOut(auth)
      .then(() => {
        //   alert("Signout Successfull");
        navigate("/");
      })
      .catch((error) => {
        alert("Signout Unsuccessfull");
      });
  };

  const handleUserAccountDelete = () => {
    let user = auth.currentUser;
    deleteUser(user)
      .then(() => {
        // alert("User Account Deleted");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  useEffect(() => {
    handleGetAllData();
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/");
      }
    });
  }, []);

  return (
    <>
      <h1>Home</h1>
      <button onClick={handleSignout}>Sign out</button>
      <button onClick={handleUserAccountDelete}>Delete Account</button>
      <button
        onClick={(e) => {
          navigate("/add");
        }}
      >
        Add Data
      </button>
      <br />
      {array.map((item) => {
        return (
          <div
            style={{
              width: "300px",
              height: "80px",
              backgroundColor: "#999999",
              margin: "10px",
            }}
          >
            <span>{item.data().email}</span>
            <br />
            <span>{item.data().password}</span>
            <br />
            <button onClick={() => handleUpdateData(item.id)}>Update</button>
            <button onClick={() => handleDeleteData(item.id)}>Delete</button>
            <br />
          </div>
        );
      })}
      <ReadDataReal />
    </>
  );
}

export default Home;
