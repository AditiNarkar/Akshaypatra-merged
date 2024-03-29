import Header from "../components/Header";
import Navbar from "../components/Navbar";
import "./DonorRegister.css";
import React, { useState, useNavigate } from 'react';

const DonorRegister = () => {

  const registerDonorURL = "http://localhost:5000/api/registerDonor"

  const [donor, setDonor] = useState({
    donorName:"", email:"", password:""
  });

  const navigate = useNavigate()

  let name, value
  const handleInputs = (e) => {
    name = e.target.name
    value = e.target.value
    setDonor({...donor,[name]:value });
  }

  const registerDonor = async(e) => {
    e.preventDefault()
    const {donorName, email, password} = donor

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
        navigate("/login")
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
          <b style={{ justifyContent:"right"}} name="donorName" value = {donor.donorName} onChange={handleInputs} className="name-of-donor">Name of Donor:</b>
          <b style={{ justifyContent:"right"}} name="email" value = {donor.email} onChange={handleInputs} className="name-of-donor"> Email Id:</b>
          <b style={{ justifyContent:"right"}} name="password" value = {donor.password} onChange={handleInputs} className="name-of-donor">Password:</b>
        </div>
        <div className="frame-parent4">
          <input style={{ border:"none" }} className="frame-child7" />
          <input type="email" style={{ border:"none" }} className="frame-child7" />
          <input type="password" style={{ border:"none" }} className="frame-child7" />
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
