import Header from "../components/Header";
import Navbar from "../components/Navbar";
import "./DonorRegister.css";
import React, { useState } from 'react';

const DonorRegister = () => {

  const registerDonorURL = "http://localhost:5000/api/registerDonor"

  const [donor, setDonor] = useState({
    donorName:"", email:"", password:""
  });


  let name, value
  const handleInputs = (e) => {
    name = e.target.name
    value = e.target.value
    // console.log("donor ", donor)
    setDonor({...donor,[name]:value });
  }

  const registerDonor = async(e) => {
    e.preventDefault()
    const {donorName, email, password} = donor
    // console.log("donorDetails: ", donorName, email, password)
    try {
      const response = await fetch(registerDonorURL, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ donorName, email, password })
      });
      
      const responseData = await response.json();
      
      if(responseData.status == 201){
        alert(responseData.msg)
        window.location.href = "http://localhost:3000/login";
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
    <div className="donor-register">
      <Header />
      <div className="frame-parent3">
        <div className="logo-1-parent2">
          <img className="logo-1-icon5" alt="" src="/logo-1@2x.png" />
          <b className="donor-registration">Donor Registration</b>
        </div>
        <div className="name-of-donor-parent">
          <b style={{ justifyContent:"right"}} className="name-of-donor">Name of Donor:</b>
          <b style={{ justifyContent:"right"}} className="name-of-donor"> Email Id:</b>
          <b style={{ justifyContent:"right"}} className="name-of-donor">Password:</b>
        </div>
        <div className="frame-parent4">
          <input name="donorName" value = {donor.donorName} onChange={handleInputs} style={{ border:"none" }} className="frame-child7" />
          <input name="email" value = {donor.email} onChange={handleInputs}         type="email" style={{ border:"none" }} className="frame-child7" />
          <input name="password" value = {donor.password} onChange={handleInputs}   type="password" style={{ border:"none" }} className="frame-child7" />
        </div>
        <div className="sign-in-container" onClick={registerDonor}>
          <b className="sign-in1">Sign In</b>
        </div>
        <b className="already-have-an1">Already have an account? Login</b>
        <div className="frame-child10" />
      </div>
    </div>
  );
};

export default DonorRegister;
