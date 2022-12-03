import "./index.css";
import Authentication from "./components/Authentication";
import FirestoreDatabase from "./components/FirestoreDatabase";

function App() {
  return (
    <div className="App">
      <h3>Firebase Basics</h3>
      <Authentication />
      <FirestoreDatabase />
    </div>
  );
}

export default App;
