import { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [data, setData] = useState({});
  const auth = getAuth();
  const navigate = useNavigate();

  const handleInput = (event) => {
    let newInput = { [event.target.name]: event.target.value };
    setData({ ...data, ...newInput });
  };

  const handleSignout = () => {
    let user = auth.currentUser;
    if (user != null) {
      signOut(auth)
        .then(() => {})
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
          navigate("/");
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
        <h1>Signup</h1>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={(event) => handleInput(event)}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={(event) => handleInput(event)}
            className="form-control"
          />
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleSignup}
        >
          Create Account
        </button>
        <br />
        <span>Already have an account?</span>
        <a
          style={{ cursor: "pointer" }}
          onClick={(e) => {
            navigate("/");
          }}
        >
          Login
        </a>
      </div>
    </div>
  );
}

export default Signup;
