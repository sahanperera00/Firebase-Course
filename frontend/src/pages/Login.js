import { useState, useEffect } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { app } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

function Login() {
  const [data, setData] = useState({});
  const auth = getAuth(app);
  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();

  const handleInput = (event) => {
    let newInput = { [event.target.name]: event.target.value };
    setData({ ...data, ...newInput });
  };

  const handleSignin = () => {
    let user = auth.currentUser;
    if (user == null) {
      signInWithEmailAndPassword(auth, data.email, data.password)
        .then(() => {
          //   alert("Signin Successfull");
          navigate("/");
        })
        .catch((error) => {
          alert("Signin Unsuccessfull");
        });
    } else {
      alert("Already Signed in");
      navigate("/");
    }
  };

  const handleGoogleSignin = () => {
    if (auth.currentUser == null) {
      signInWithPopup(auth, googleProvider)
        .then(() => {
          //   alert("Google Signin Successfull");
        })
        .catch((error) => {
          alert(error.message);
        });
    } else {
      alert("Already Signed in");
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/");
      }
    });
  }, []);

  return (
    <>
      <h1>Login</h1>
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
      <button onClick={handleSignin}>Sign in</button>
      <button onClick={handleGoogleSignin}>Sign in with Google</button>
    </>
  );
}

export default Login;
