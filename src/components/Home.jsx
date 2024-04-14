import React, { useState } from 'react';
import axios from 'axios';
import WeatherCard from './WeatherCard';

const Home = () => {
  const [cityName, setCityName] = useState('');
  const [currentWeather, setCurrentWeather] = useState(null);
  const [error, setError] = useState(null);

  const API_KEY = ''; //

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=ca6c64304dfcef7906fc660911bfd0bd&units=metric`);
      setCurrentWeather(response.data);
      setError(null);
    } catch (error) {
      setCurrentWeather(null);
      setError('Error fetching weather data');
    }
  };

  return (
    <div style={{ backgroundColor: 'black', minHeight: '100vh', color: 'white' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '50px', height: '50px', backgroundColor: '#00CED1', borderRadius: '50%' }}></div>
      <div style={{ position: 'absolute', top: 0, right: 0, width: '50px', height: '50px', backgroundColor: '#00CED1', borderRadius: '50%' }}></div>
    
      <h1 className='font-bold text-5xl text-center mx-auto block px-4 py-10'>Weather App</h1>
      <form className='text-center' onSubmit={handleSubmit}>
        <input className='bg-white text-black mx-auto block px-4 py-2 rounded' type='text' onChange={(e) => setCityName(e.target.value)} placeholder="Enter city name" />
        <button type='submit' className='bg-[#00CED1] text-white mx-auto mt-4 block px-4 py-2 rounded'>Search</button>
      </form>
      {error && <p className="text-red-500 text-center">{error}</p>}
      {currentWeather && (
        <div className="text-center mt-10 text-2xl font-bold font-sans text-white bg-[#00CED1] p-4 ml-20 mr-20">
          <h2 className="text-2xl">{currentWeather.name}</h2>
          <p>Temperature: {currentWeather.main.temp}°C</p>
          <p>Weather: {currentWeather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default Home;