import { useEffect } from "react";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { app } from "../firebaseConfig";

function Home() {
  const auth = getAuth(app);
  let user = auth.currentUser;
  const navigate = useNavigate();

  const handleSignout = () => {
    signOut(auth)
      .then(() => {
        //   alert("Signout Successfull");
        navigate("/login");
      })
      .catch((error) => {
        alert("Signout Unsuccessfull");
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/login");
      }
    });
  }, []);

  return (
    <>
      <h1>Home</h1>
      <button onClick={handleSignout}>Sign out</button>
    </>
  );
}

export default Home;
