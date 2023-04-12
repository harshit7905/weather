import React, { useState, useEffect } from "react";
import ReactAnimatedWeather from "react-animated-weather";
function Forcast(props) {
  const [query, setQuery] = useState("Jhansi");
  const [weather, setWeather] = useState(null);
  const [xtra, setXtra] = useState(null);

  useEffect(() => {
    const fetchApi = async () => {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=3b5dff11d499be41cc445a0bc4453383`;
      const response = await fetch(url);
      const resJson = await response.json();
      setWeather(resJson.main);
      setXtra(resJson);
    };
    fetchApi();
  }, [query]);

  const defaults = {
    color: "white",
    size: 112,
    animate: true,
  };

  return (
    <div className="forecast">
      <div className="forecast-icon">
        <ReactAnimatedWeather
          icon={props.icon}
          color={defaults.color}
          size={defaults.size}
          animate={defaults.animate}
        />
      </div>
      <div className="today-weather">
        <h3>{props.weather}</h3>{" "}
      </div>
      <div className="search-box">
        <input
          type="text"
          className="search-bar"
          placeholder="Search any city"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {!weather ? (
        <div className="no_data">
          <p>No data found</p>
        </div>
      ) : (
        <div className="today-weather">
          <ul>
            {" "}
            <li className="cityHead">
              <p>
                {xtra.name}, {xtra.sys.country}
              </p>
              <img
                alt="dumm"
                className="temp"
                src={`https://openweathermap.org/img/wn/${xtra.weather[0].icon}.png`}
              />
            </li>
            <li>
              Temperature <span className="temp">{weather.temp}°c</span>
            </li>
            <li>
              Humidity
              <span className="temp">{weather.humidity}%</span>
            </li>
            <li>
              Visibility <span className="temp">{xtra.visibility} mi</span>
            </li>
            <li>
              Wind Speed <span className="temp">{xtra.wind.speed} Km/h</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Forcast;
