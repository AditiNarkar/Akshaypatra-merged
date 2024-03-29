import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  const onNGORegisterClick = useCallback(() => {
    navigate("/ngo-register");
  }, [navigate]);

  const onDonorRegisterClick = useCallback(() => {
    navigate("/donor-register");
  }, [navigate]);

  

  return (
    <div className="home">
      <section className="food1-1-parent">
        <img className="food1-1-icon" alt="" src="/food1-1@2x.png" />
        <div className="logo-1-parent">
          <img className="logo-1-icon" alt="" src="/logo-1@2x.png" />
          <i className="a-pot-that">A pot that never gets empty...</i>
          <i className="a-pot-that">Help us build a hunger-free country.</i>
          <b className="what-describes-you">What describes you?</b>
          <div className="frame-parent">
            <div
              className="ngo-service-wrapper"
              onClick={onNGORegisterClick}
            >
              <b className="ngo-service">NGO Service</b>
            </div>
            <div 
              style={{cursor:"pointer"}}
              className="food-donor-wrapper"
              onClick={onDonorRegisterClick}
            >
              <b className="ngo-service">Food Donor</b>
            </div>
          </div>
        </div>
        <Navbar />
      </section>
      <section className="about-parent">
        <h2 className="about">About</h2>
        <div className="logo-1-group">
          <img className="logo-1-icon1" alt="" src="/logo-1@2x.png" />
          <div className="frame-child" />
          <b className="welcome-to-akshaypatra-container">
            <span className="welcome-to-akshaypatra-container1">
              <p className="welcome-to-akshaypatra">
                Welcome to Akshaypatra, a revolutionary web application
                dedicated to bridging the gap between surplus food from
                restaurants and the pressing needs of underserved communities.
                At Akshaypatra, our mission is simple yet profound: to tackle
                food wastage head-on by redirecting excess food from eateries to
                NGOs for distribution among the less fortunate. We believe in
                the power of technology to drive positive social change, and our
                platform serves as a seamless conduit for restaurants to donate
                their leftover food and for NGOs to efficiently access and
                distribute these resources to those in need. With Akshaypatra,
                we aspire to not only reduce food wastage but also to alleviate
                hunger and promote social equity by ensuring that no edible
                surplus goes to waste. Join us in our journey towards a more
                sustainable and compassionate future, where every meal matters
                and no one is left behind.
              </p>
            </span>
          </b>
        </div>
      </section>
    </div>
  );
};

export default Home;
