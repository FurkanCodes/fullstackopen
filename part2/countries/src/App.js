import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Country from "./components/Country";

function App() {
  const [countryName, setCountryName] = useState("");
  const [country, setCountry] = useState([]);

  const [isLoading, setLoading] = useState(true);
  const wApi = process.env.REACT_APP_W_API;
  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      if (countryName) {
        const response = await axios.get(
          `https://restcountries.com/v3.1/name/${countryName}`
        );

        setCountry(response.data);
      }
    };

    getData();
    setLoading(false);
  }, [countryName]);

  const handleChange = (e) => {
    e.preventDefault();
    setCountryName(e.target.value);
  };

  return (
    <>
      <div className="App">
        {isLoading ? (
          <p>...Loading</p>
        ) : (
          <>
            <form>
              <h1>find countries</h1>

              <input value={countryName} onChange={handleChange} />
            </form>
            <div>
              {country.length >= 3 ? (
                <div>Too many matches, specify another filter</div>
              ) : (
                <div>
                  {country.map((country, key) => (
                    <Country key={key} country={country} />
                  ))}
                  <ul></ul>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
