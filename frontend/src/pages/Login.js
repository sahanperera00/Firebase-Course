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
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then(() => {
        //   alert("Signin Successfull");
        navigate("/home");
      })
      .catch((error) => {
        alert("Signin Unsuccessfull");
      });
  };

  const handleGoogleSignin = () => {
    signInWithPopup(auth, googleProvider)
      .then(() => {
        //   alert("Google Signin Successfull");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/home");
      }
    });
  }, []);

  return (
    <div
      style={{
        width: "30%",
        backgroundColor: "#FFE080",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "50px",
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
        <h1>Login</h1>
        <div class="mb-3">
          <label class="form-label">Email</label>
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={(event) => handleInput(event)}
            class="form-control"
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Password</label>
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={(event) => handleInput(event)}
            class="form-control"
          />
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleSignin}
        >
          Sign in
        </button>
        <br />
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleGoogleSignin}
        >
          Sign in with Google
        </button>
        <br />
        <span>Don't have an account?</span>
        <a
          style={{ cursor: "pointer" }}
          onClick={(e) => {
            navigate("/signup");
          }}
        >
          Create Account
        </a>
      </div>
    </div>
  );
}

export default Login;
