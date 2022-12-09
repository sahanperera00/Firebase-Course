import { useEffect } from "react";
import {
  getAuth,
  signOut,
  onAuthStateChanged,
  deleteUser,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Home() {
  const auth = getAuth();
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
      <button onClick={handleUserAccountDelete}>Delete Account</button>
    </>
  );
}

export default Home;
