"use client";
import React, { useState, useRef, useEffect } from "react";
import Overlay from "./overlay.jsx";
import WeatherCard from "./weatherCard.jsx";
import weatherConditions from "./weatherIcons.jsx";

export default function Page() {
  const buttonRef = useRef(null);
  const overlayRef = useRef(null);
  const [overlay, setOverlay] = useState(false);
  const [selectedCities, setSelectedCities] = useState([]);
  const [weatherInfo, setWeatherInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const ApiKey = "93c9563c219fd26bcf5872a459d436c0";

  const handleOverlay = () => {
    setOverlay(true);
  };

  const closeOverlay = () => {
    setOverlay(false);
  };

  useEffect(() => {
    if (overlay) {
      overlayRef.current.classList.remove("hidden");
    } else {
      overlayRef.current.classList.add("hidden");
    }
  }, [overlay]);

  useEffect(() => {
    let weatherData = [];
    const storedCities = JSON.parse(localStorage.getItem("cities"));
    if (storedCities) {
      setSelectedCities(storedCities);
      fetchWeatherData(storedCities); // Fetch weather for stored cities initially
    }
  }, []);

  useEffect(() => {
    if (selectedCities.length > 0) {
      localStorage.setItem("cities", JSON.stringify(selectedCities));
      fetchWeatherData(selectedCities); // Fetch weather when selectedCities is updated
    }
  }, [selectedCities]);

  function fetchWeatherData(cities) {
    let weatherData = [];
    Promise.all(
      cities.map((city) =>
        fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city.city}&appid=${ApiKey}`)
          .then((response) => response.json())
          .catch((error) => console.error("Error fetching data:", error))
      )
    )
    .then((data) => {
      Promise.all(
        data.map((city) =>
          fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${city[0].lat}&lon=${city[0].lon}&appid=${ApiKey}`)
            .then((response) => response.json())
            .catch((error) => console.error("Error fetching data:", error))
        )
      ).then((weather) => {
        console.log("Weather data for cities:", weather);
        weather.forEach((weatherItem) => {
          weatherData.push([
            {
              currentTemp: (weatherItem.main.temp - 273.15).toFixed(0),
              pressure: weatherItem.main.pressure,
              humidity: weatherItem.main.humidity,
              weatherStatus: weatherItem.weather[0].main,
              windSpeed: weatherItem.wind.speed,
            },
          ]);
        });
        setWeatherInfo(weatherData);
        setLoading(false);
      });
    });
  }

  function chooseCity(city) {
    setSelectedCities((prevCities) => {
      const updatedCities = [...prevCities, city];
      fetchWeatherData(updatedCities); // Fetch weather immediately after adding a new city
      return updatedCities;
    });
  }

  const currentTime = "15:00";

  const noLoading = loading && selectedCities.length > 0; 
  return (
    <>
      <div className="flex justify-center">
        <div className="h-20 flex justify-between items-center bg-amber-400 rounded-b-2xl px-5 w-[80%] mx-auto max-w-[80%]">
          <h1 className="text-3xl">Weather Dashboard</h1>
          <div className="hover:cursor-pointer">
            <button
              onClick={handleOverlay}
              ref={buttonRef}
              className="ml-auto bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600"
            >
              Add Country
            </button>
          </div>
        </div>
      </div>

      {noLoading && <div className="text-center mt-5">Loading...</div>}

      {selectedCities && (
        <div className="mt-5 w-[80%] mx-auto max-w-[80%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {selectedCities.map((city, cityIndex) => (
            <div key={`city-${cityIndex}`} className="flex justify-center">
              {weatherInfo[cityIndex]?.map((weather, weatherIndex) => (
                <WeatherCard
                  key={`weather-${cityIndex}-${weatherIndex}`}  
                  city={city.city}
                  country={city.country}
                  time={currentTime}
                  temp={weather.currentTemp}
                  weatherDesc={weather.weatherStatus}
                  windSpeed={weather.windSpeed}
                  humidity={weather.humidity}
                  pressure={weather.pressure}
                  weatherIcon={weatherConditions.map((condition, index) => (
                    <div key={index}>{condition.name.toLowerCase() === weather.weatherStatus.toLowerCase() && condition.icon}</div>
                    ))
                  }
                  />
              ))}
            </div>
          ))}
        </div>
      )}

      <div ref={overlayRef} className="fixed inset-0 backdrop-blur-sm z-10 hidden">
        <button
          onClick={closeOverlay}
          className="absolute top-20 left-240 bg-blue-400 p-2 hover:bg-blue-600 cursor-pointer z-30 rounded-tr-2xl rounded-bl-2xl"
        >
          <img src="icons8-close.svg" alt="Close Icon" className="w-6" />
        </button>
        <div className="fixed inset-0 flex justify-center items-center z-20">
          <Overlay setCity={chooseCity} />
        </div>
      </div>
    </>
  );
}
