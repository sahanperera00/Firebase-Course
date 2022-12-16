import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  HomeSharedLayout,
  Home,
  Login,
  Signup,
  AddDataForm,
  UpdateDataForm,
} from "./pages";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeSharedLayout />}>
          <Route index element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="home" element={<Home />} />
          <Route path="add" element={<AddDataForm />} />
          <Route path="update/:id" element={<UpdateDataForm />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
