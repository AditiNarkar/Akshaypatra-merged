import "./Navbar.css";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const onLogInClick = useCallback(() => {
    navigate("/login");
  }, [navigate]);


  return (
    <header className="navbar1">
      <img className="logo-1-icon10" alt="" src="../logo-1@2x.png" />
      <nav className="home-group">
        <b className="home2">Home</b>
        <b className="home2">About</b>
        <b className="home2">Contact</b>
        <button className="log-in-frame" onClick={onLogInClick}>
          <b className="log-in3">Log In</b>
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
