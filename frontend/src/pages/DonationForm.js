import HeaderTop from "../components/HeaderTop";
import "./DonationForm.css";
import React, { useState } from 'react';

const DonationForm = () => {

  const [activeIndex, setActiveIndex] = useState(null);

  const handleClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const [cards, setCards] = useState([]);
  const [counter, setCounter] = useState(0);

  const handleRemoveDish = (indexToRemove) => {
    setCards(prevCards => prevCards.filter((_, index) => index !== indexToRemove));
  };

  const addDish = () => {
    const newDish = (
      <div key={counter} className="frame-parent9">
        <div className="frame-child20" style={{ cursor:"pointer"}} onClick={() => handleRemoveDish(counter)}>
          Delete
        </div>
        <div className="frame-child16" />
        <input style={{ border: "none" }} className="frame-child22" />
        <div className="frame-child16" />
        <input style={{ border: "none" }} className="frame-child24" />
        <div className="frame-child16" />
        <input style={{ border: "none" }} className="frame-child26" />
        <div className="frame-child16" />
        <input style={{ border: "none" }} className="frame-child28" />
      </div>
    );
    setCards(prevCards => [...prevCards, newDish]);
    setCounter(prevCounter => prevCounter + 1);
  };


  return (
    <div className="donation-form">
      <HeaderTop />
      <div className="logo-1-parent4">
        <img className="logo-1-icon7" alt="" src="/logo-1@2x.png" />
        <b className="donation-details">Donation Details</b>
        <div className="frame-child15" />
        <b className="select-pickup-address">Select Pickup Address</b>

        <div className="frame-parent7">

            
              {[...Array(5)].map((_, index) => (
                <div
                  key={index}
                  className={`${index === activeIndex ? 'frame-wrapper-active' : 'frame-wrapper1'}`}
                  onClick={() => handleClick(index)}
                >
                  <div className="resto1-container">
                    <b className="resto12"> {index+1} . Resto</b>
                    <i className="resto12">ID</i>
                    <div className="near-abc-soc2">Near abc soc</div>
                  </div>
                </div>
              ))}
            

          {/* <div className="frame-wrapper1">
            <div className="resto1-container">
              <b className="resto12">Resto1</b>
              <i className="resto12">ID</i>
              <div className="near-abc-soc2">Near abc soc</div>
            </div>
          </div>

          <div className="frame-wrapper1">
            <div className="resto1-container">
              <b className="resto12">Resto1</b>
              <i className="resto12">ID</i>
              <div className="near-abc-soc2">Near abc soc</div>
            </div>
          </div> */}


          <img className="add-icon" alt="" src="/add@2x.png" />

        </div>

        <b className="select-pickup-address">Food Details</b>
        <div className="frame-parent8">
          <div className="no-parent">
            <b className="no"> Delete </b>
            <div className="frame-child16" />
            <b className="dish">Dish</b>
            <div className="frame-child16" />
            <b className="vegnon-veg">Veg/Non-veg</b>
            <div className="frame-child16" />
            <b className="prepared-before-hrs">Prepared Before (hrs)</b>
            <div className="frame-child16" />
            <b className="quantity-kg">Quantity (kg)</b>
          </div>

          {cards.map(card => card)}

          {/* <div className="frame-parent9">
            <input style={{ border:"none" }} className="frame-child20" />
            <div className="frame-child16" />
            <input style={{ border:"none" }} className="frame-child22" />
            <div className="frame-child16" />
            <input style={{ border:"none" }} className="frame-child24" />
            <div className="frame-child16" />
            <input style={{ border:"none" }} className="frame-child26" />
            <div className="frame-child16" />
            <input style={{ border:"none" }} className="frame-child28" />
          </div> */}

          
          <div className="add-container" >
            <img className="add-icon" alt="" src="/add@2x.png" onClick={addDish}/>
          </div>
        </div>
        <div className="confirm-pickup-wrapper">
          <b className="confirm-pickup">Confirm Pickup</b>
        </div>
      </div>
    </div>
  );
};

export default DonationForm;
