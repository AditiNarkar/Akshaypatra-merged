import Header from "../components/Header";
import "./Login.css";
import React, { useState } from 'react';

const Login = () => {

  const URL = "api/login"

  const [donor, setDonor] = useState({
    identity:"", email:"", password:""
  });


  let name, value
  const handleInputs = (e) => {
    name = e.target.name
    value = e.target.value
    setDonor({...donor,[name]:value });
  }

  const post_login = async(e) => {
    e.preventDefault()
    const {identity, email, password} = donor
    
    try {
      const response = await fetch(URL, {
          method: 'POST',
          credentials: "include",
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({identity, email, password })
      });
      
      const responseData = await response.json();
      
      if(responseData.status == 200){
        console.log("responseData.identity:", responseData.identity)

        alert(responseData.msg)

        if(responseData.identity=="donor")
          window.location.href = "http://localhost:3000/resto-donations"

        // else if(responseData.identity=="ngo")
        //   window.location.href("http://localhost:3000/my-donations")

      }
      else{
        alert("Unauthorized: ", responseData.msg)
      }
    } 
    catch (error) {
        console.error('Error sending data to the backend:', error);
    }
  }




  return (
    <div className="login">
      <Header />
      <div className="frame-parent1">
        <div className="logo-1-parent1">
          <img className="logo-1-icon4" alt="" src="/logo-1@2x.png" />
          <b className="log-in1">Log In</b>
        </div>
        <div className="who-are-you-parent">
          <b style={{ justifyContent:"right"}} className="who-are-you">Who are you? :</b>
          <b style={{ justifyContent:"right"}} className="who-are-you"> Email Id:</b>
          <b style={{ justifyContent:"right"}} className="who-are-you">Password:</b>
        </div>
        <div className="frame-parent2">
          <select name="identity" value = {donor.identity} onChange={handleInputs} style={{border:"none"}} className="frame-child3" >
            <option value="ngo">NGO Service</option>
            <option value="donor">Food Donor</option>
          </select>
          <input name="email" value = {donor.email} onChange={handleInputs}        type="email" style={{border:"none"}} className="frame-child3" />
          <input name="password" value = {donor.password} onChange={handleInputs}  type="password" style={{border:"none"}} className="frame-child3" />
        </div>
        <div style={{ cursor:"pointer" }} className="log-in-container" onClick={post_login}>
          <b className="log-in2">Log In</b>
        </div>
        <b className="dont-have-an">Don’t have an account? Signup</b>
        <div className="frame-child6" />
      </div>
    </div>
  );
};

export default Login;
