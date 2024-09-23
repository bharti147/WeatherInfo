import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "./Card";

function Forecast({ convertTemperature, lat, lon, isFahrenheit }) {
  const [forecastData, setForecastData] = useState([]);
  const [error, setError] = useState("");
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  const fetchForecast = async () => {
    try{
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );

    //filter for getting first 5 days data at 00:00:00
    const filteredData = response.data.list
      .filter((item) => item.dt_txt.includes("00:00:00"))
      .slice(0, 5);

    setForecastData(filteredData);
    setError("");//Clear any previous errors
  }
  catch(error){
    setError("Error fetching forecast data. Please try again later.");
    console.log(error);// Log the error for debugging
  }
  };

  useEffect(() => {
    if (lat && lon) {
      fetchForecast();
    }
  }, [lat, lon]);

  // const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  return (
    <div 
     style={{ backgroundColor: "rgba(220, 236, 251, 0.5)" }} // Translucent background
    className={` relative z-1  mt-16 pt-6 pb-10 w-full h-auto flex  flex-col items-center border border-gray-400 rounded-xl bg-opacity-75
      sm-md:px-4
     `}>
       <h1 className="text-yellow-500 mb-5 text-xl  font-extrabold
       xs:text-2xl
       sm:text-3xl
       ">5 Day Forecast</h1>
      
      <div className="w-full flex flex-col flex-wrap  items-center
       sm-md:flex-row sm-md:justify-around
       sm:items-center sm:justify-around
       md:justify-evenly
       ">
      {error ? (
        <div className="text-red-600">{error}</div>
      ) :
      forecastData.length > 0 ? (
       
        forecastData.map((item, index) => (
          <Card
           isFahrenheit={isFahrenheit}
            key={index}
            // day={daysOfWeek[new Date(item.dt_txt).getDay()]}
            day={new Date(item.dt_txt).toDateString()}
            high={convertTemperature(item.main.temp_max)}
            low={convertTemperature(item.main.temp_min)}
            icon={item.weather[0].icon}
            desc={item.weather[0].description}
          />
        ))
      ) : (
        <div>Loading forecast...</div>
      )}
      </div>
    </div>
  );
}

export default Forecast;
