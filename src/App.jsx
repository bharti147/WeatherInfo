import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import CitySearch from "./components/CitySearch";
import WeatherDisplay from "./components/WeatherDisplay";
import TemperatureUnitToggle from "./components/TemperatureUnitToggle";
import Forecast from "./components/Forecast";

function App() {
  const [selectedCity, setSelectedCity] = useState({ name: "New York" });
  const [weatherData, setWeatherData] = useState("");
  const [isFahrenheit, setIsFahrenheit] = useState(true);
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const[desc,setDesc] = useState('')
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);


  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  const backgroundColors = {
    "clear sky": "bg-clearSky",
    "few clouds": "bg-gray-800", 
    "scattered clouds": "bg-gray-800",
    "broken clouds": "bg-gray-800",
    "overcast clouds": "bg-gray-800", 
    "shower rain": "bg-shower",
    "rain": "bg-thunderstorm",
    "thunderstorm": "bg-thunderstorm",
    "snow": "bg-white",
    "mist": "bg-gray-300",
  };


  const fetchWeatherData = async (cityName) => {
    if (!cityName) return;
    setLoading(true); // Set loading to true before fetching
    setError(""); // Reset error before fetch
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`
      );

      const data = response.data;

      setWeatherData(data);
      setLat(data.coord.lat);
      setLon(data.coord.lon);
      setDesc(data.weather[0].description)
      setError(""); //Clear error on successful fetch
    } catch (error) {
      if (error.response) {
        //City not found
        if (error.response.status === 404) {
          setError("City not found. Please try a different name.");
        } else {
          setError("Error fetching data. Please try again later.");
        }
      } else {
        //Network error or something else
        setError("Network error. Please check your connection.");
      }
    } finally {
      setLoading(false); //Set loading to false after fetch
    }
  };

  useEffect(() => {
    // Fetch weather data for the default city initially
    fetchWeatherData(selectedCity.name);
    console.log(selectedCity.name, "first");
  }, []);

  useEffect(() => {
    // Fetch weather data whenever the selected city changes
    if (selectedCity && selectedCity.name) {
      fetchWeatherData(selectedCity.name);
      console.log(selectedCity.name);
    }
  }, [selectedCity]);

  //CONVERT TEMPERATURE - Api returns temp in kelvin, change it to celsius and then into F acc to state

  const convertTemperature = (tempinKelvin) => {
    const tempInCelsius = tempinKelvin - 273.15; //convert kelvin to celsius

    if (isFahrenheit) {
      return Math.round(tempInCelsius * (9 / 5) + 32); //convert celsius to fahrenheit
    }
    return Math.round(tempInCelsius); //return celsius by default
  };

  const handleToggle = () => {
    setIsFahrenheit(!isFahrenheit);
  };

  //Background color based on weather description
  const currentBgColor = weatherData && weatherData.weather[0].description
    ? backgroundColors[weatherData.weather[0].description] || "bg-gray-200" // Default color
    : "bg-gray-200";


  return (
    <div className={`w-full h-auto px-6 py-12 flex flex-col items-center ${currentBgColor} 
    xs:px-8 
    sm-md:px-12
    `}>
      <CitySearch onCitySelect={setSelectedCity} desc={desc}/>

      {loading ? (
        <div>Loading weather data...</div>
      ) : weatherData ? (
        <WeatherDisplay
          temperature={convertTemperature(weatherData.main.temp)}
          city={weatherData.name}
          icon={weatherData.weather[0].icon}
          desc={weatherData.weather[0].description}
          highTemp={convertTemperature(weatherData.main.temp_max)}
          lowTemp={convertTemperature(weatherData.main.temp_min)}
          isFahrenheit={isFahrenheit}
        />
      ) : (
        <div className="text-red-600">{error}</div> // Show loading while fetching weather data
      )}

      <TemperatureUnitToggle
        onToggle={handleToggle}
        isFahrenheit={isFahrenheit}
      />
      <Forecast convertTemperature={convertTemperature} lat={lat} lon={lon} isFahrenheit={isFahrenheit} />
    </div>
  );
}

export default App;
