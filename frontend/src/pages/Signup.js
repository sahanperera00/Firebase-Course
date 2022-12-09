import { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

function Signup() {
  const [data, setData] = useState({});
  const auth = getAuth();

  const handleInput = (event) => {
    let newInput = { [event.target.name]: event.target.value };
    setData({ ...data, ...newInput });
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

  const handleSignup = () => {
    if (data.email != null && data.password != null) {
      createUserWithEmailAndPassword(auth, data.email, data.password)
        .then((response) => {
          handleSignout();
          alert("Signup Successfull");
        })
        .catch((error) => {
          alert(error.message);
        });
    } else {
      alert("Please fill all the fields");
    }
  };

  return (
    <>
      <h1>Signup</h1>
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
      <button onClick={handleSignup}>Create Account</button>
    </>
  );
}

export default Signup;
