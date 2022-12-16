import { useEffect, useState } from "react";
import {
  getAuth,
  signOut,
  onAuthStateChanged,
  deleteUser,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { databese } from "../firebaseConfig";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";

function Home() {
  const [array, setArray] = useState([]);
  const collectionRef = collection(databese, "users");

  const auth = getAuth();
  const navigate = useNavigate();

  const handleGetAllData = () => {
    getDocs(collectionRef)
      .then((response) => {
        setArray(response.docs);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handleDeleteData = (id) => {
    const docToDelete = doc(databese, "users", id);
    deleteDoc(docToDelete)
      .then(() => {
        alert("Data Deleted");
        window.location.reload();
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handleSignout = async () => {
    await signOut(auth)
      .then(() => {
        alert("Signout Successfull");
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
        alert("User Account Deleted");
        window.location.reload();
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
      <br />
      <div
        style={{
          width: "70%",
          height: "450px",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "60px",
          marginBottom: "60px",
          paddingTop: "30px",
          backgroundColor: "#02020280",
        }}
      >
        <div
          style={{
            width: "90%",
            height: "80%",
            marginLeft: "auto",
            marginRight: "auto",
            overflow: "scroll",
          }}
        >
          <table className="table table-dark table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">Image</th>
                <th scope="col">Name</th>
                <th scope="col">Age</th>
                <th scope="col">Update</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {array.map((item) => {
                return (
                  <tr>
                    <td>
                      <img
                        style={{ width: "50px", height: "50px" }}
                        src={item.data().image}
                        alt="img"
                      />
                    </td>
                    <td>{item.data().name}</td>
                    <td>{item.data().age}</td>
                    <td>
                      <a
                        style={{
                          cursor: "pointer",
                        }}
                        onClick={() => navigate(`/update/${item.id}`)}
                      >
                        <span className="material-symbols-outlined">
                          update
                        </span>
                      </a>
                    </td>
                    <td>
                      <a
                        style={{
                          cursor: "pointer",
                        }}
                        onClick={() => handleDeleteData(item.id)}
                      >
                        <span className="material-symbols-outlined">
                          delete
                        </span>
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <button
          type="button"
          className="btn btn-dark"
          style={{
            marginTop: "15px",
            marginBottom: "15px",
            marginLeft: "5%",
          }}
          onClick={(e) => {
            navigate("/add");
          }}
        >
          Add Data
        </button>

        <button
          type="button"
          className="btn btn-dark"
          style={{
            marginTop: "15px",
            marginBottom: "15px",
            marginLeft: "10px",
          }}
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Profile
        </button>

        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Profile
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                  onClick={handleSignout}
                >
                  Signout
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleUserAccountDelete}
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
