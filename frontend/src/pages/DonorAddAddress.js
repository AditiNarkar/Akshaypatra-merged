import Header from "../components/Header";
import "./DonorAddAddress.css";
import React, { useState } from 'react';

const DonorAddAddress = () => {

  const URL = "http://localhost:5000/api/pickupRestaurant"

  const [resto, setresto] = useState({
    name:"", licenseNumber:"", address:""
  });


  let name, value
  const handleInputs = (e) => {
    name = e.target.name
    value = e.target.value
    setresto({...resto,[name]:value });
  }

  const addAddress = async(e) => {
    e.preventDefault()
    const {name, licenseNumber, address} = resto
    // console.log("restoDetails: ", resto)
    try {
      const response = await fetch(URL, {
          method: 'POST',
          credentials: 'include',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({name, licenseNumber, address})
      });
      
      const responseData = await response.json();
      
      if(responseData.status == 201){
        alert(responseData.msg)
        //window.location.href = "http://localhost:3000/login";
      }
      else{
        alert(responseData.msg)
      }
    } 
    catch (error) {
        console.error('Error sending data to the backend:', error);
    }
  }







  return (
    <div className="donor-add-address">
      <Header />
      <div className="frame-parent5">
        <div className="logo-1-parent3">
          <img className="logo-1-icon6" alt="" src="/logo-1@2x.png" />
          <b className="add-pickup-restaurants">Add Pickup Restaurants</b>
        </div>
        <div className="restaurant-name-parent">
          <b style={{ justifyContent:"right"}} className="restaurant-name">Restaurant Name:</b>
          <b style={{ justifyContent:"right"}} className="restaurant-name"> License Number:</b>
          <b style={{ justifyContent:"right"}} className="restaurant-name">Address:</b>
        </div>
        <div className="frame-parent6">
        {/* {name, licenseNumber, address} */}
          <input    name="name" value = {resto.name} onChange={handleInputs} style={{border:"none"}} className="frame-child11" />
          <input    name="licenseNumber" value = {resto.licenseNumber} onChange={handleInputs}         style={{border:"none"}} className="frame-child11" />
          <textarea name="address" value = {resto.address} onChange={handleInputs}   style={{border:"none"}} className="frame-child13" />
        </div>
        <div style={{ height:"10px"}} className="add-wrapper" onClick={addAddress}>
          <b className="add">Add</b>
        </div>
        <div style={{ height:"10px", top:"480px", left:"280px"}} className="add-wrapper" onClick={()=>window.location.href("http://localhost:3000/donation-form")}>
          <b className="add">Proceed to Donate</b>
        </div>
        <div className="your-restaurants-parent">
          <b className="your-restaurants">Your Restaurants:</b>

          <div className="resto1-parent">
            <b className="id">Resto1 <button style={{ backgroundColor: "var(--color-darkslategray-100)", color: "var(--color-khaki-200)", fontSize: "14px", marginLeft:"10px"}}>Del</button></b>
            <i className="id">ID</i>
            <div className="near-abc-soc">Near abc soc zxcvbndfgudshvushvushcnhjbzscjzhsfcujhfujhfuv   </div>
          </div>

          <div className="resto1-parent">
            <b className="id">Resto1 <button style={{ backgroundColor: "var(--color-darkslategray-100)", color: "var(--color-khaki-200)", fontSize: "14px", marginLeft:"10px"}}>Del</button></b>
            <i className="id">ID</i>
            <div className="near-abc-soc">Near abc soc zxcvbndfgudshvushvushcnhjbzscjzhsfcujhfujhfuv   </div>
          </div>

        </div>
        <div className="frame-child14" />
      </div>
    </div>
  );
};

export default DonorAddAddress;
