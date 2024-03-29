import "./ApprovedPickupComponent.css";

const ApprovedPickupComponent = () => {
  return (
    <div className="ngo-1-on-27th-march-by-sameer-parent">
      <div className="ngo-1-on-container">
        <span className="ngo-1-on-container1">
          <p className="on-27th-march">NGO 1</p>
          <p className="on-27th-march">on 27th March</p>
          <p className="by-sameer">{`by Sameer                                                                                 `}</p>
        </span>
      </div>
      <img className="mditick-outline-icon" alt="" src="/mditickoutline.svg" />
      <div className="fish-curry-4-kg-group">
        <div className="fish-curry-container2">
          <ol className="fish-curry-4-kg2">
            <li>Fish Curry - 4 kg</li>
          </ol>
        </div>
        <div className="fish-curry-container2">
          <ol className="fish-curry-4-kg2">
            <li>Fish Curry - 4 kg</li>
          </ol>
        </div>
      </div>
      <div className="pickup1">Pickup:</div>
      <div className="donated-food1">Donated Food:</div>
    </div>
  );
};

export default ApprovedPickupComponent;
