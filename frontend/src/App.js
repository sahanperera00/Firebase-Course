import "./index.css";
import { useState } from "react";
import { app, databese } from "./firebaseConfig";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";

function App() {
  let auth = getAuth();
  let googleProvider = new GoogleAuthProvider();
  const [data, setData] = useState({});

  const handleInput = (event) => {
    let newInput = { [event.target.name]: event.target.value };
    setData({ ...data, ...newInput });
  };

  const handleSignup = () => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((response) => {
        console.log(response.user);
      })
      .catch((error) => {
        alert(error);
      });
  };

  const handleSignin = () => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((response) => {
        alert(response.user.email);
      })
      .catch((error) => {
        alert(error);
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
      <button onClick={handleSignup}>Signup</button>
      <button onClick={handleSignin}>Signin</button>
    </div>
  );
}

export default App;
