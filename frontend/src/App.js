import "./index.css";
import { useState } from "react";
import { app, databese } from "./firebaseConfig";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  deleteUser,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";

function App() {
  const auth = getAuth();
  let googleProvider = new GoogleAuthProvider();
  const [data, setData] = useState({});

  const handleInput = (event) => {
    let newInput = { [event.target.name]: event.target.value };
    setData({ ...data, ...newInput });
  };

  const handleSignup = () => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((response) => {
        handleSignout();
        alert("Signup Successfull");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handleSignin = () => {
    let user = auth.currentUser;
    if (user == null) {
      signInWithEmailAndPassword(auth, data.email, data.password)
        .then(() => {
          alert("Signin Successfull");
        })
        .catch((error) => {
          alert("Signin Unsuccessfull");
        });
    } else {
      alert("Already Signed in");
    }
  };

  const handleSignout = () => {
    let user = auth.currentUser;
    if (user != null) {
      signOut(auth)
        .then(() => {
          alert("Signout Successfull");
        })
        .catch((error) => {
          alert("Signout Unsuccessfull");
        });
    } else {
      alert("Already Signed Out");
    }
  };

  const handleUserAccountDelete = () => {
    let user = auth.currentUser;
    deleteUser(user)
      .then(() => {
        alert("User Account Deleted");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="App">
      <h3>Firebase Basics</h3>
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
      <h3>Authenticate with Firebase using Password-Based Accounts</h3>
      <button onClick={handleSignup}>Create Account</button>
      <button onClick={handleSignin}>Sign in</button>
      <button onClick={handleSignout}>Sign out</button>
      <button onClick={handleUserAccountDelete}>Delete Account</button>
    </div>
  );
}

export default App;
