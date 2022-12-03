import { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  deleteUser,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

function Authentication() {
  const [data, setData] = useState({});
  const googleProvider = new GoogleAuthProvider();
  const auth = getAuth();

  const handleInput = (event) => {
    let newInput = { [event.target.name]: event.target.value };
    setData({ ...data, ...newInput });
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

  const handleGoogleSignin = () => {
    if (auth.currentUser == null) {
      signInWithPopup(auth, googleProvider)
        .then(() => {
          alert("Google Signin Successfull");
        })
        .catch((error) => {
          alert(error.message);
        });
    } else {
      alert("Already Signed in");
    }
  };

  return (
    <>
      <h3>Authentication</h3>
      <h4>
        Authenticate with Firebase using Email and Password Based Accounts
      </h4>
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
      <button onClick={handleSignup}>Create Account</button>
      <button onClick={handleSignin}>Sign in</button>
      <button onClick={handleSignout}>Sign out</button>
      <button onClick={handleUserAccountDelete}>Delete Account</button>

      <h4>Authenticate with Firebase using Google</h4>
      <button onClick={handleGoogleSignin}>Sign in</button>
      <button onClick={handleSignout}>Sign out</button>
    </>
  );
}

export default Authentication;
