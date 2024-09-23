import React, { useEffect, useState } from "react";
import axios from "axios";

function CitySearch({ onCitySelect,desc }) {
  const [citySuggestions, setcitySuggestions] = useState([]);
  const [cityInput, setCityInput] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  // Function to determine text color based on background color
  const getTextColor = () => {
    const darkBackgrounds = [
      "few clouds",
      "scattered clouds",
      "broken clouds",
      "overcast clouds",
      "shower rain",
      "rain",
      "thunderstorm",
      // "mist",
    ];
    return darkBackgrounds.includes(desc) ? "text-white" : "text-thunderstorm"; // Use thunderstorm color for light backgrounds
  };
  const textColor = getTextColor();

  const showCities = async () => {
    if (!cityInput.trim()) {
      setcitySuggestions([]);
      return;
    }

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${cityInput}&limit=5&appid=${API_KEY}`
      );

      if (response.data.length === 0) {
        setcitySuggestions([]);
        setError("Not a city name. Please try again.");
      } else {
        setcitySuggestions(response.data);
        setError(""); // Clear error on successful fetch
      }
    } catch (error) {
      console.log("Error : ", error);
      setcitySuggestions([]); // Clear suggestions on error
      setError("Failed to fetch city suggestions. Please try again."); // Set error message
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      showCities();
    }, 300); //300 ms debounce

    return () => clearTimeout(timeoutId);
  }, [cityInput, onCitySelect]);

  const handleInputChange = (e) => {
    setCityInput(e.target.value);
    setIsDropdownOpen(true);
    if (e.target.value.trim() === "") {
      setIsDropdownOpen(false);
      setcitySuggestions([]);
      setError(""); // Reset error message when input is cleared
      onCitySelect({ name: "New York" });
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleCitySelect = (city) => {
    onCitySelect({ name: city.name, lat: city.lat, lon: city.lon });
    setCityInput(city.name);
    setcitySuggestions([]);
    setIsDropdownOpen(false);
  };

  return (
    <div className="w-full h-auto flex flex-col items-center  rounded-xl relative ">
      {/* div for input and button */}
      <div
        className="w-full flex pr-2 items-center  rounded-xl border border-neutral-600  
       sm-md:w-[70%]
        sm:w-[60%]
        md:px-8
        lg:w-[40%]
      "
      >
        <input
          className={`w-full py-2 px-4 bg-inherit ${textColor} outline-none
          lg:py-3
          `}
          type="text"
          value={cityInput}
          placeholder="Search City"
          onChange={handleInputChange}
          onClick={toggleDropdown}
        />
        <button onClick={toggleDropdown}>{isDropdownOpen ? "▲" : "▼"}</button>
      </div>
      {/* list for showing dropdown only if suggestions are available */}
      {error && <div className="text-red-600">{error}</div>}{" "}
      {/* Error message */}
      {citySuggestions.length > 0 && isDropdownOpen && (
        <ul
          className="absolute  top-12 z-50 w-full bg-white border border-neutral-600 shadow-xl
           sm-md:w-[70%]
           sm:w-[60%]
           md:px-8
           lg:w-[40%]
        "
        >
          {citySuggestions.map((city, index) => (
            <li
              className="py-2 px-4 w-full border-b-2 hover:bg-gray-200 cursor-pointer"
              key={index}
              onClick={() => handleCitySelect(city)}
              role="option" // Added role for accessibility
              tabIndex={0} // Make items focusable
              onKeyDown={(e) => e.key === "Enter" && handleCitySelect(city)} // Handle keyboard selection
            >
              {city.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CitySearch;
