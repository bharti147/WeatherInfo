import React from "react";

function WeatherDisplay({city,icon,temperature,desc,highTemp,lowTemp,isFahrenheit}) {
 if(!city || !icon || temperature === undefined){
  return <div className="text-red-600">Weather data is unavailable.</div>;
 }

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
    <div className={`w-full h-auto flex flex-col items-center mt-10  
    xs:mt-16 
    md:flex-row md:w-[60%] md:justify-center rounded-xl pt-8 pb-12 px-5 md:border md:border-gray-600 md:shadow-lg
     lg:w-[50%]
     xl:w-[40%] 
     
     `}>

<div className="w-full h-auto flex flex-col items-center md:mr-5
lg:mr-0
">
      <h1 className={`text-2xl ${textColor} font-bold
      xs:text-3xl 
      sm:text-4xl
      md:hidden
       `}>{city}</h1>
      <img 
       className="w-full
       sm-md:w-1/2
       md:w-[60%]
       "
       src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="weather icon"/>
       
      <h1 className={`text-2xl ${textColor} font-bold hidden
      xs:text-3xl 
      sm:text-4xl sm:hidden
      md:inline-block 
      lg:text-[2.5rem]
     
       `}>{city}</h1>
       </div>
      <div className="w-full h-auto flex items-center justify-around 
      md:flex-col md:mt-8 
      ">
        <h1 className={`text-[2.15rem]  tracking-tight font-semibold ${textColor}
        xs:text-5xl
        md:mb-5 md:text-[2.5rem] md:font-normal
        lg:font-semibold lg:text-5xl
        `}>{temperature}{`${isFahrenheit?'º F':'º C'}`}</h1>
        <div className={`w-auto h-auto text-sm px-2 flex flex-col  ${textColor} md:items-center`}>
          <p className="xs:text-base sm-md:text-base sm:text-lg md:text-xl lg:text-xl">{desc}</p>
          <p className="xs:text-base sm-md:text-base sm:text-lg md:text-xl lg:text-xl">H:{highTemp}{`${isFahrenheit?'º F':'º C'}`} | L:{lowTemp}{`${isFahrenheit?'º F':'º C'}`}</p>
        </div>
      </div>
    </div>
  );
}

export default WeatherDisplay;


// "main": "Clear",
// "description": "clear sky",