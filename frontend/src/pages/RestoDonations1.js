import HeaderTop from "../components/HeaderTop";
import ApprovedPickupComponent from "../components/ApprovedPickupComponent";
import "./RestoDonations1.css";

const RestoDonations1 = () => {
  return (
    <div className="resto-donations">
      <HeaderTop />
      <div className="frame-parent11">
        <div className="logo-1-parent5">
          <img className="logo-1-icon8" alt="" src="/logo-1@2x.png" />
          <b className="my-donations">My Donations</b>
        </div>

        <div className="add-donation-wrapper">
          <b className="add-donation" style={{cursor:"pointer"}}>+ Add Donation</b>
        </div>

        <div className="frame-child38" />
        <div className="auto-approve">
          <ApprovedPickupComponent />
          <ApprovedPickupComponent />
        </div>
        <div className="approved-pickups-wrapper">
          <b className="add-donation">Approved Pickups</b>
        </div>
        <div className="auto-approve1">
          <div className="published-on27th-march-parent">
            <div className="published-on27th-march">{`Published on27th March                                                                             `}</div>
            <div className="fish-curry-4-kg-parent">
              <div className="fish-curry-container">
                <ol className="fish-curry-4-kg">
                  <li>Fish Curry - 4 kg</li>
                </ol>
              </div>
              <div className="fish-curry-container">
                <ol className="fish-curry-4-kg">
                  <li>Fish Curry - 4 kg</li>
                </ol>
              </div>
            </div>
            <div className="pickup">Pickup:</div>
            <div className="donated-food">Donated Food:</div>
            <img className="makicross-icon" alt="" src="/makicross.svg" />
          </div>
        </div>
        <div className="outdated-pickups-wrapper">
          <b className="add-donation">Outdated Pickups</b>
        </div>
      </div>
    </div>
  );
};

export default RestoDonations1;
