import React from "react";

function TemperatureUnitToggle({ isFahrenheit, onToggle }) {
  
  return (
    <div className={`mt-16 w-[80%]  flex items-center justify-center px-4 py-2 rounded-xl bg-yellow-500
    xs:mt-20
    sm:w-[60%] sm:py-3 sm:text-2xl
    lg:w-[40%]
    xl:w-[30%]
     `}>
      <button 
      className="w-full font-bold text-gray-800 cursor-pointer"
      onClick={onToggle}>
        Switch to {isFahrenheit ? "Celsius" : "Fahrenheit"}
      </button>
    </div>
  );
}

export default TemperatureUnitToggle;

// F = C(9⁄5) + 32
// C = (F − 32) × 5⁄9
