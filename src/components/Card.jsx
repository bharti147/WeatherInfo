import React from 'react'

function Card({day,high,low,icon,desc,isFahrenheit}) {
  
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
console.log('textcolor',textColor)

  return (
    <div 
      style={{ backgroundColor: "rgba(176, 199, 229, 0.8)" }} 
    className={`py-4 bg-none border border-gray-400 text-lg w-[70%] h-auto flex flex-col items-center rounded-xl  mt-5 
    sm-md:w-[45%] sm-md:h-64 sm-md:px-6 sm-md:justify-around sm-md:mx-2
    sm:w-[40%] sm:mx-2 
    md:w-[30%] md:mb-5
    xl:w-[15%]
 
    `}>
    <h1 className={`text-thunderstorm font-bold text-base 
    xs:text-xl
    
    `}>{day}</h1>
    <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="weather icon"/>
    <p className={`text-sm text-thunderstorm font-thin xs:text-base`}>{desc}</p>
    <p className={`text-thunderstorm font-semibold text-base xs:text-lg`}>H:{high}{`${isFahrenheit?'º F':'º C'}`} | L:{low}{`${isFahrenheit?'º F':'º C'}`}</p>

    </div>
  )
}

export default Card
