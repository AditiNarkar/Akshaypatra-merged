import HeaderTop from "../components/HeaderTop";
import "./NGOAcceptance.css";
import React, { useState } from 'react';

const NGOAcceptance = () => {

  const [activeIndex, setActiveIndex] = useState(null);

  const handleClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="ngo-acceptance">
      <HeaderTop/>
      <div className="logo-1-parent6">
        <img className="logo-1-icon9" alt="" src="/logo-1@2x.png" />
        <b className="ngo-acceptance1">NGO Acceptance</b>
        <div className="frame-child39" />
        <b className="selected-restraurant">Selected Restraurant</b>
        <div className="frame-parent12">
          <div className="restaurant-name-group">
            <b style={{ justifyContent:"right"}} className="restaurant-name1">Restaurant Name:</b>
            <b style={{ justifyContent:"right"}} className="restaurant-name1"> License Number:</b>
            <b style={{ justifyContent:"right"}} className="restaurant-name1">Address:</b>
          </div>
          <div className="ocean-grill-parent">
            <div className="ocean-grill">Ocean Grill</div>
            <div className="ocean-grill">348452626265599</div>
            <div className="ocean-grill">
              blah blah bhbhfesfhjzanfoiazeowsjxzvnz
            </div>
          </div>
        </div>
        <b className="selected-restraurant">Food Details</b>
        <div className="frame-parent13">
          <div className="no-group">
            <b className="no1">No.</b>
            <div className="frame-child40" />
            <b className="dish1">Dish</b>
            <div className="frame-child40" />
            <b className="non-veg">Veg/Non-veg</b>
            <div className="frame-child40" />
            <b className="prepared-before-hrs1">Prepared Before (hrs)</b>
            <div className="frame-child40" />
            <b className="quantity-kg1">Quantity (kg)</b>
          </div>
          <div className="frame-child39" />


          <div className="parent">
            <div className="no1">1</div>
            <div className="frame-child40" />
            <div className="fish-curry">Fish Curry</div>
            <div className="frame-child40" />
            <div className="non-veg">Non-veg</div>
            <div className="frame-child40" />
            <div className="prepared-before-hrs1">4</div>
            <div className="frame-child40" />
            <div className="quantity-kg1">4</div>
          </div>


          <div className="parent">
            <div className="no1">1</div>
            <div className="frame-child40" />
            <div className="fish-curry">Fish Curry</div>
            <div className="frame-child40" />
            <div className="non-veg">Non-veg</div>
            <div className="frame-child40" />
            <div className="prepared-before-hrs1">4</div>
            <div className="frame-child40" />
            <div className="quantity-kg1">4</div>
          </div>

          
          
        </div>
        <b className="assign-food-picker">Assign Food Picker</b>
        <div className="frame-parent14">

          {/* <div 
            key={index}
            className={`${index === activeIndex ? 'frame-wrapper3-active' : 'frame-wrapper4'}`}
            onClick={() => handleClick(index)}
          >
            <div className="suresh-patil-parent">
              <b className="suresh-patil">Suresh Patil</b>
              <div className="div10">+91 9865475254</div>
            </div>
          </div>

          <div className="frame-wrapper4">
            <div className="suresh-patil-parent">
              <b className="resto15">Resto1</b>
              <div className="near-abc-soc5">Near abc soc</div>
            </div>
          </div> */}


              {[...Array(5)].map((_, index) => (
                <div
                  key={index}
                  style={{cursor:"pointer"}}
                  className={`${index === activeIndex ? 'frame-wrapper3-active' : 'frame-wrapper4'}`}
                  onClick={() => handleClick(index)}
                >
                  <div className="suresh-patil-parent">
                    <b className="suresh-patil">Suresh Patil</b>
                    <div className="div10">+91 9865475254</div>
                  </div>
                </div>
              ))}



          
        </div>
        <div style={{
          width: "1200px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          gap:"10px"}}
        >
          <input placeholder="Add Picker Name"/>
          <input placeholder="Add Picker Contact"/>
          <div>
            <button  style={{ width:"60px", margin:"0px 5px", backgroundColor: "var(--color-darkslategray-100)", color: "var(--color-khaki-200)", fontSize: "14px"}} className="add-icon2" alt="" >Add</button>
            <button  style={{ width:"60px", margin:"0px 5px", backgroundColor: "var(--color-darkslategray-100)", color: "var(--color-khaki-200)", fontSize: "14px"}}className="add-icon2" alt="" >Delete</button>
          </div>
        </div>

        <div className="confirm-acceptance-wrapper">
          <b className="ocean-grill">Confirm Acceptance</b>
        </div>
      </div>
    </div>
  );
};

export default NGOAcceptance;
