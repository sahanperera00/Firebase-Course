import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomeSharedLayout, Home, Login } from "./pages";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeSharedLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
