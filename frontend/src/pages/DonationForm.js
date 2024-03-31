import HeaderTop from "../components/HeaderTop";
import "./DonationForm.css";
import React, { useState, useEffect } from 'react';

const DonationForm = () => {

  const [activeIndex, setActiveIndex] = useState(null);

  const handleClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  // const [cards, setCards] = useState([]);
  // const [counter, setCounter] = useState(0);

  // const handleRemoveDish = (indexToRemove) => {
  //   setCards(prevCards => prevCards.filter((_, index) => index !== indexToRemove));
  // };

  const [donation, setDonation] = useState([{
    dish:"", veg_nonveg:"", prepHours:"", quantity:"", status:"Fresh", pickedUp:"No"
  }]);


  
  const handleDeleteFrame = (index) => {
    setDonation(prevDonation => {
        const updatedDonation = [...prevDonation];
        updatedDonation.splice(index, 1);
        return updatedDonation;
    });
  };




  

 


  const handleInputChange = (index, fieldName, value) => {
    setDonation(prevDonation => {
        const updatedDonation = [...prevDonation];
        updatedDonation[index] = {
            ...updatedDonation[index],
            [fieldName]: value
        };
        return updatedDonation;
    });
    console.log("donation:", donation)
  };


  const handleAddFrame = () => {
    setDonation(prevDonation => [
        ...prevDonation,
        {
            dish: "", veg_nonveg: "", prepHours: "", quantity: ""
        }
    ]);
  } ;


  const add_donation_URL = "http://localhost:5000/api/addDonation"

  const addDonation = async(e) => {
    e.preventDefault()
    try {
      const response = await fetch(add_donation_URL, {
          method: 'POST',
          credentials: 'include',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ restoID: activeIndex, donation })
      });
      
      const responseData = await response.json();
      
      if(responseData.status == 201){
        alert(responseData.msg)
      }
      else{
        alert(responseData.msg)
      }
    } 
    catch (error) {
        console.error('Error sending data to the backend:', error);
    }
  }



  const URL = "http://localhost:5000/api/pickupRestaurant"
  const [restos, setrestos] = useState()

  const getData = async () => {
    try{
      const res = await fetch(URL,{
        method: "GET", 
        credentials: 'include',
        headers:{
          Accept: "application/json",
          "Content-Type": "application/json"
        },
      })

      const data = await res.json()
      
      if( data.status==201)
      {
        setrestos(data.restos)
        // console.log("restos: ", data.restos)
      }
      else
        alert(data.msg)
    }
    
    catch(e){
      console.log(e)
    }
  }

  useEffect(()=> { getData() } , [])




  // const addDish = () => {
  //   const newDish = (
  //     <div key={counter} className="frame-parent9">
  //       <div className="frame-child20" style={{ cursor:"pointer"}} onClick={() => handleRemoveDish(counter)}>
  //         Delete
  //       </div>
  //       <div className="frame-child16" />
  //       <input style={{ border: "none" }} className="frame-child22" />
  //       <div className="frame-child16" />

  //       <select style={{ border: "none" }} className="frame-child24" >
  //         <option value="veg">Veg</option>
  //         <option value="non-veg">Non-Veg</option>
  //       </select>

  //       <div className="frame-child16" />
  //       <input type="range" min={2} max={48}  step={1} value={24} style={{ border: "none" }} className="frame-child26" />
  //         {/* <div></div> */}

  //       <div className="frame-child16" />

  //       <input type="number" step={1} min={1} style={{ border: "none" }} className="frame-child28" />
  //     </div>
  //   );
  //   setCards(prevCards => [...prevCards, newDish]);
  //   setCounter(prevCounter => prevCounter + 1);
  // };


  return (
    <div className="donation-form">
      <HeaderTop />
      <div className="logo-1-parent4">
        <img className="logo-1-icon7" alt="" src="/logo-1@2x.png" />
        <b className="donation-details">Donation Details</b>
        <div className="frame-child15" />
        <b className="select-pickup-address">Select Pickup Address</b>

        <div className="frame-parent7">

            
              {
              
              (restos != null && restos != undefined) ?
              restos.map(( resto) => {
                return(
                <>
                <div
                  
                  className={`${resto._id === activeIndex ? 'frame-wrapper-active' : 'frame-wrapper1'}`}
                  onClick={() => handleClick(resto._id)}
                >
                  <div className="resto1-container">
                    <b className="resto12"> {resto.name.toUpperCase()}</b>
                    <i className="resto12">{ resto.licenseNumber}</i>
                    <div className="near-abc-soc2">{resto.address}</div>
                  </div>
                </div>
                </>
                )
              })  
              :
              <div>No Address added.</div>
              
              }
            

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


          <img className="add-icon" alt="" src="/add@2x.png" onClick={() => window.location.href="http://localhost:3000/donor-add-address"} />

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
            <b className="prepared-before-hrs">Fresh Before (hrs)</b>
            <div className="frame-child16" />
            <b className="quantity-kg">Quantity (kg)</b>
          </div>

          {/* {cards.map(card => card)} */}

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


          {
          donation.map((item, index) => (

          <div key={index} className="frame-parent9">
            <div className="frame-child20" style={{ cursor:"pointer"}} onClick={() => handleDeleteFrame(index)}>
              Delete
            </div>

            <div className="frame-child16" />
            <input 
              value={item.dish}
              onChange={e => handleInputChange(index, 'dish', e.target.value)}
              style={{ border: "none" }} 
              className="frame-child22" />
            <div className="frame-child16" />

            <select 
              value={item.veg_nonveg}
              onChange={e => handleInputChange(index, 'veg_nonveg', e.target.value)}
              style={{ border: "none" }} 
              className="frame-child24" >
              <option value="veg">Veg</option>
              <option value="non-veg">Non-Veg</option>
            </select>

            <div className="frame-child16" />
            <input type="range" min={2} max={48}  step={1} style={{ border: "none" }} className="frame-child26"
              value={item.prepHours}
              onChange={e => handleInputChange(index, 'prepHours', e.target.value)}
            />
              {/* <div></div> */}

            <div className="frame-child16" />

            <input type="number" step={1} min={1} style={{ border: "none" }} className="frame-child28" 
              value={item.quantity}
              onChange={e => handleInputChange(index, 'quantity', e.target.value)}
            />
          </div>
          ))
          }


          
          <div className="add-container" >
            <img className="add-icon" alt="" src="/add@2x.png" onClick={handleAddFrame}/>
          </div>
        </div>
        <div style={{cursor:"pointer"}} className="confirm-pickup-wrapper" onClick={addDonation}>
          <b className="confirm-pickup">Confirm Pickup</b>
        </div>
      </div>
    </div>
  );
};

export default DonationForm;
