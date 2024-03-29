import { useEffect } from "react";
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import NGORegister from "./pages/NGORegister";
import Login from "./pages/Login";
import DonorRegister from "./pages/DonorRegister";
import DonorAddAddress from "./pages/DonorAddAddress";
import RestoDonations1 from "./pages/RestoDonations1";
import NGOAcceptance from "./pages/NGOAcceptance";
import DonationForm from "./pages/DonationForm";

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "";
        metaDescription = "";
        break;
      case "/ngo-register":
        title = "";
        metaDescription = "";
        break;
      case "/login":
        title = "";
        metaDescription = "";
        break;
      case "/donor-register":
        title = "";
        metaDescription = "";
        break;
      case "/donor-add-address":
        title = "";
        metaDescription = "";
        break;
      case "/resto-donations":
        title = "";
        metaDescription = "";
        break;
      case "/ngo-acceptance":
        title = "";
        metaDescription = "";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/ngo-register" element={<NGORegister />} />
      <Route path="/login" element={<Login />} />
      <Route path="/donor-register" element={<DonorRegister />} />
      <Route path="/donor-add-address" element={<DonorAddAddress />} />
      <Route path="/donation-form" element={<DonationForm />} />
      <Route path="/resto-donations" element={<RestoDonations1 />} />
      <Route path="/ngo-acceptance" element={<NGOAcceptance />} />
    </Routes>
  );
}
export default App;
