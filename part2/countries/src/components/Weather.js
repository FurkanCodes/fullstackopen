import React from "react";

function Weather({ weatherData, country }) {
  return (
    <div>
      Weather in is {country.capital} {weatherData.main.temp} Celcius and Wind
      speed is {weatherData.wind.speed} metre/sec
      <img
        src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
        alt=""
      />
    </div>
  );
}

export default Weather;
