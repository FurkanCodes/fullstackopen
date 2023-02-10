import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Weather from "./Weather";

function Country({ country }) {
  const [show, setShow] = useState(false);
  const [weatherData, setWeatherData] = useState();
  const api_key = process.env.REACT_APP_API_KEY;
  useEffect(() => {
    const getWeather = async () => {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`
      );
      setWeatherData(response.data);
      console.log(response.data);

      console.log("api is called");
    };
    getWeather();
  }, []);

  const { name, capital, area, region, latlng, timezones, flags, population } =
    country;

  const languages = country.languages;
  const language = [];
  for (const lang in languages) {
    language.push(<li key={language.length + 1}>{languages[lang]}</li>);
  }

  const currencies = country.currencies;
  const currency = [];
  for (const curr in currencies) {
    currency.push(
      <li key={currency.length + 1}>
        {currencies[curr].name + " " + currencies[curr].symbol}
      </li>
    );
  }

  return (
    <div>
      {name.common}
      <button onClick={() => setShow(!show)}>{show ? "hide" : "show"}</button>

      <div>
        {show && (
          <ul>
            <li> Name: {name.common}</li>
            <li> Official Name: {name.official}</li>
            <li> Capital: {capital}</li>
            <li> Area Code: {area.toLocaleString("en-US")}</li>
            <li> Region: {region}</li>
            <li> Population: {population.toLocaleString("en-US")}</li>
            <li>Languages: </li>
            <ul>{language}</ul>
            <li>Currencies: </li>
            <ul>{currency}</ul>
            <li> Lat and Long:</li>
            <ul>Lat: {latlng[0]}</ul>
            <ul>Long: {latlng[1]}</ul>
            <li> Timezone: {timezones}</li>
            <div>
              <img src={flags.png} alt="countryflag" />
            </div>
            <Weather weatherData={weatherData} country={country} />
          </ul>
        )}
      </div>
    </div>
  );
}

export default Country;
