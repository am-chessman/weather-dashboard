"use client";
import React, { useState, useRef, useEffect } from "react";
import Overlay from "../components/overlay.jsx";
import WeatherCard from "../components/weatherCard.jsx";
import weatherConditions from "../assets/weatherIcons.jsx";

export default function Page() {
  const buttonRef = useRef(null);
  const overlayRef = useRef(null);
  const [overlay, setOverlay] = useState(false);
  const [selectedCities, setSelectedCities] = useState([]);
  const [weatherInfo, setWeatherInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cityAddition, setCityAddition] = useState(false);
  const [removedCities, setRemovedCities] = useState([])
  const [removeCard, setRemoveCard] = useState(false)

  const ApiKey = "93c9563c219fd26bcf5872a459d436c0";

  const handleOverlay = () => {
    setOverlay(true);
  };

  function chooseCity(city) {
    setSelectedCities((prevCities) => {
      const cityExists = prevCities.some(
        (c) => c.city.toLowerCase() === city.city.toLowerCase()
      );

      if (!cityExists) {
        const updatedCities = [...prevCities, city];
        fetchWeatherData(updatedCities); 
        setOverlay(false);
        return updatedCities;
      }
      return prevCities;
    });
  }

  useEffect(() => {
    if (removeCard && removedCities.length > 0) {
      setSelectedCities((prevCities) => {
        const updated = prevCities.filter(
          (cityObj) =>
            !removedCities.some(
              (removed) =>
                removed.city.toLowerCase() === cityObj.city.toLowerCase()
            )
        );
        // Save the updated list to localStorage manually if needed
        localStorage.setItem("cities", JSON.stringify(updated));
        return updated;
      });
      // Delay resetting to ensure state update completes
      setTimeout(() => {
        setRemoveCard(false);
        setRemovedCities([]);
      }, 0); // Schedule after render
    }
  }, [removeCard]);
  
  const closeOverlay = () => {
    setOverlay(false);
  };

  const handleCityClickedState = (state) => {
    setCityAddition(state)
    if(state) {
      setOverlay(false);
    }
  }

  useEffect(() => {
    if (overlay) {
      overlayRef.current.classList.remove("hidden");
    } else if(overlay === false || cityAddition === false) {
      overlayRef.current.classList.add("hidden");
    }
  }, [overlay]);

  useEffect(() => {
    // let weatherData = [];
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
    setLoading(true);
    Promise.all(
      cities.map((city) =>
        fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city.city}&appid=${ApiKey}`)
          .then((response) => response.json())
          .catch((error) => console.error("Error fetching location:", error))
      )
    ).then((geoData) => {
      Promise.all(
        geoData.map((city) =>
          fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${city[0].lat}&lon=${city[0].lon}&appid=${ApiKey}`)
            .then((response) => response.json())
            .catch((error) => console.error("Error fetching weather:", error))
        )
      ).then((weather) => {
        const weatherData = weather.map((weatherItem) => [
          {
            currentTemp: (weatherItem.main.temp - 273.15).toFixed(0),
            pressure: weatherItem.main.pressure,
            humidity: weatherItem.main.humidity,
            weatherStatus: weatherItem.weather[0].main,
            windSpeed: weatherItem.wind.speed,
          },
        ]);
        setWeatherInfo(weatherData);
        setLoading(false);
      });
    });
  }
  

  function getRemovedCities(city)
  {
    setRemovedCities([city])
  }

  const currentTime = "15:00";

  const noLoading = loading && selectedCities.length > 0;

  console.log(selectedCities)
  
  return (
    <>
      <div className="flex justify-center">
        <div className="h-20 flex justify-between items-center bg-amber-400 rounded-b-2xl px-5 sm:w-[90%] md:w-[80%] mx-auto max-w-full">
          <h1 className="text-2xl sm:text-2l md:text-3xl lg:text-3xl">Weather Dashboard</h1>
          <div className="hover:cursor-pointer">
            <button
              onClick={handleOverlay}
              ref={buttonRef}
              className="ml-auto sm:h-10 text-md bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 cursor-pointer"
            >
              Add City
            </button>
          </div>
        </div>
      </div>

      {noLoading && <div className="text-center mt-5">Loading...</div>}

      {selectedCities.length > 0 ? (
        <div className="mt-5 w-[80%] mx-auto max-w-[80%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {selectedCities.map((city, cityIndex) => (
            <div key={`city-${cityIndex}`} className="flex justify-center">
              {weatherInfo[cityIndex]?.map((weather, weatherIndex) => (
                <WeatherCard
                  key={`weather-${cityIndex}-${weatherIndex}`}  
                  setRemovedCard={getRemovedCities}
                  getCardRemovedStatus={setRemoveCard}
                  city={city.city}
                  country={city.country}
                  // time={currentTime}
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
      ) : <div className="flex justify-center h-100vh">
            <h1 className="absolute top-1/2 text-3xl text-gray-400 pointer-events-none">Add some countries</h1>
          </div>
      }

      <div ref={overlayRef} className="fixed inset-0 backdrop-blur-sm z-10 hidden">
        <button
          onClick={closeOverlay}
          className="absolute top-20 left-75 md:top-20 md:left-246 lg:top-10 lg:left-216 bg-blue-400 p-2 hover:bg-blue-600 cursor-pointer z-30"
        >
          <img src="icons8-close.svg" alt="Close Icon" className="w-6" />
        </button>
        <div className="fixed inset-0 flex justify-center items-center z-20">
          <Overlay 
            setCity={chooseCity}
            setCityClickedState={handleCityClickedState}
          />
        </div>
      </div>
    </>
  );
}
