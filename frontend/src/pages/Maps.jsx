import React, { useState, useEffect } from 'react';
import L from 'leaflet';

import 'leaflet/dist/leaflet.css';

const Maps = () => {
  const [map, setMap] = useState(null);
  const [requests, setRequests] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [foodDonations, setFoodDonations] = useState({});

  useEffect(() => {
    // Initialize map
    const mapInstance = L.map('map').setView([0, 0], 8);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapInstance);
    setMap(mapInstance);

    return () => {
      mapInstance.remove();
    };
  }, []);

  const handleAddressSubmit = (city, state, district, country, hotelName, foodAmount) => {
    const address = `${hotelName}, ${district}, ${city}, ${state}, ${country}`;
    // Use Nominatim API for geocoding
    fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json`)
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          const location = [parseFloat(data[0].lat), parseFloat(data[0].lon)];
          map.setView(location);
          // Example of adding a marker for the submitted address
          const marker = L.marker(location).addTo(map).bindPopup(`Requested Location<br>Food Donated: ${foodAmount} kg`);
          // Add the marker to the requests array for later use
          setRequests([...requests, marker]);
          
          // Search for hotels in the area
          searchHotels(hotelName, location);
          // Store the food donation amount for this location
          setFoodDonations({ ...foodDonations, [hotelName]: foodAmount });
        } else {
          alert('Address not found');
        }
      })
      .catch(error => {
        console.error('Error fetching geocoding data:', error);
        alert('Error fetching geocoding data');
      });
  };

  const searchHotels = (hotelName, location) => {
    // Use Nominatim API to search for hotels
    fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(hotelName)}&format=json&addressdetails=1&limit=5`)
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          // Add markers for each hotel found
          const hotelMarkers = data.map(hotel => {
            const hotelLocation = [parseFloat(hotel.lat), parseFloat(hotel.lon)];
            const hotelMarker = L.marker(hotelLocation).addTo(map).bindPopup(`Hotel: ${hotel.display_name}<br>Food Donated: ${foodDonations[hotelName]} kg`);
            return hotelMarker;
          });
          // Add the hotel markers to the hotels array for later use
          setHotels(hotelMarkers);
        } else {
          alert('No hotels found in the area');
        }
      })
      .catch(error => {
        console.error('Error fetching hotel data:', error);
        alert('Error fetching hotel data');
      });
  };

  return (
    <div>
      <div id="map" style={{ width: '100%', height: '400px' }}></div>
      <form onSubmit={(e) => {
        e.preventDefault();
        const city = e.target.elements.city.value;
        const state = e.target.elements.state.value;
        const district = e.target.elements.district.value;
        const country = e.target.elements.country.value;
        const hotelName = e.target.elements.hotelName.value;
        const foodAmount = parseInt(e.target.elements.foodAmount.value, 10);
        handleAddressSubmit(city, state, district, country, hotelName, foodAmount);
      }}>
        <input type="text" name="city" placeholder="Enter City" />
        <input type="text" name="state" placeholder="Enter State" />
        <input type="text" name="district" placeholder="Enter District" />
        <input type="text" name="country" placeholder="Enter Country" />
        <input type="text" name="hotelName" placeholder="Enter Hotel Name" />
        <input type="number" name="foodAmount" placeholder="Enter Food Donated" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Maps;
