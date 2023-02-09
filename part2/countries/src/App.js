import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [countryName, setCountryName] = useState("");
  const [newCountry, setNewCountry] = useState();

  useEffect(() => {
    if (countryName) {
      axios
        .get(`https://restcountries.com/v3.1/name/${countryName}`)
        .then((response) => setNewCountry(response.data));
    }
  }, [countryName]);

  const handleChange = (e) => {
    e.preventDefault();
    setCountryName(e.target.value);
  };

  return (
    <>
      <div className="App">
        <form>
          <h1>find countries</h1>

          <input value={countryName} onChange={handleChange} />
        </form>
        {newCountry?.map((country) => country.name.common)}
      </div>
    </>
  );
}

export default App;
