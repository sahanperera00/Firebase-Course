import { Outlet } from "react-router-dom";
import { Header, Footer } from "../components";

function HomeSharedLayout() {
  return (
    <div className="App">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default HomeSharedLayout;
