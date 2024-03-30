import "./NGORegister.css";
import Navbar from "../components/Navbar";
import React, { useState } from 'react';


const NGORegister = () => {

  const registerNGOURL = "http://localhost:5000/api/registerNgo"

  const [ngoName, setngoName] = useState("")
  const [ngoAddress, setngoAddress] = useState("")
  const [foundationId, setfoundationId] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")

  const registerNGO = async(e) => {
    e.preventDefault()

    try {
      const response = await fetch(registerNGOURL, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ ngoName, ngoAddress, foundationId, email, password })
      });
      
      if (!response.ok) {
          throw new Error('Failed to send data to the backend');
      }

      const responseData = await response.json();
      
      if(responseData.status == 201){
        alert(responseData.msg)
        window.location.href("http://localhost:3000/login")
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
    <div className="ngo-register">
      <Navbar />
      {/* <div className="navbar">
        <img className="logo-1-icon2" alt="" src="/logo-13@2x.png" />
        <div className="home-parent">
          <b className="contact">Home</b>
          <b className="contact">About</b>
          <b className="contact">Contact</b>
          <button className="log-in-wrapper">
            <b className="log-in">Log In</b>
          </button>
        </div>
      </div> */}
      <section className="frame-group">
        <div className="logo-1-container">
          <img className="logo-1-icon3" alt="" src="/logo-1@2x.png" />
          <h2 className="ngo-registration">NGO Registration</h2>
        </div>
        <div className="name-of-ngo-parent">
        {/* ngoName, ngoAddress, foundationId, email, password */}
          <b style={{ justifyContent:"right"}}  className="name-of-ngo">Name of NGO:</b>
          <b style={{ justifyContent:"right"}}    className="name-of-ngo">Address:</b>
          <b style={{ justifyContent:"right"}}    className="name-of-ngo">NGO Foundation Id:</b>
          <b style={{ justifyContent:"right"}}        className="name-of-ngo">NGO Email Id:</b>
          <b style={{ justifyContent:"right"}}    className="name-of-ngo">Password:</b>
        </div>
        <div className="frame-container">
          <input value={ngoName} onChange={(e) => setngoName(e.target.value)} name="ngoName"                 style={{ border:"none"}} className="frame-item" />
          <input value={ngoAddress} onChange={(e) => setngoAddress(e.target.value)} name="ngoAddress"        style={{ border:"none"}} className="frame-item" />
          <input value={foundationId} onChange={(e) => setfoundationId(e.target.value)} name="foundationId"  style={{ border:"none"}} className="frame-item" />
          <input value={email} onChange={(e) => setemail(e.target.value)} name="email"                       type="email" style={{ border:"none"}} className="frame-item" />
          <input value={password} onChange={(e) => setpassword(e.target.value)} name="password"              type="password" style={{ border:"none"}} className="frame-item" />
        </div>
        <button className="sign-in-wrapper" onClick={registerNGO}>
          <b className="log-in">Sign In</b>
        </button>
        <b className="already-have-an">Already have an account? Login</b>
        <div className="line-div" />
      </section>
    </div>
  );
};

export default NGORegister;
