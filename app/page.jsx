"use client";

import { useEffect, useMemo, useState } from "react";
import Overlay from "../components/overlay.jsx";
import WeatherCard from "../components/weatherCard.jsx";
import weatherConditions from "../assets/weatherIcons.jsx";

const STORAGE_KEY = "cities";
const OPEN_WEATHER_API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY || "93c9563c219fd26bcf5872a459d436c0";

export default function Page() {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [selectedCities, setSelectedCities] = useState([]);
  const [weatherByCity, setWeatherByCity] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const weatherIconMap = useMemo(() => {
    const map = {};
    weatherConditions.forEach((condition) => {
      map[condition.name.toLowerCase()] = condition.icon;
    });
    return map;
  }, []);

  const currentTime = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  useEffect(() => {
    try {
      const storedCities = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      if (Array.isArray(storedCities)) {
        setSelectedCities(storedCities);
      }
    } catch {
      setSelectedCities([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedCities));
  }, [selectedCities]);

  useEffect(() => {
    let isCancelled = false;

    async function fetchWeatherData(cities) {
      if (!cities.length) {
        setWeatherByCity({});
        return;
      }

      setIsLoading(true);
      setErrorMessage("");

      const entries = await Promise.all(
        cities.map(async ({ city, country }) => {
          try {
            const geoResponse = await fetch(
              `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(`${city},${country}`)}&limit=1&appid=${OPEN_WEATHER_API_KEY}`
            );
            const geoData = await geoResponse.json();

            if (!Array.isArray(geoData) || !geoData[0]) {
              return [city, { error: "Location not found" }];
            }

            const { lat, lon } = geoData[0];
            const weatherResponse = await fetch(
              `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_API_KEY}`
            );
            const weather = await weatherResponse.json();

            if (!weather?.main || !weather?.weather?.[0]) {
              return [city, { error: "Weather unavailable" }];
            }

            return [
              city,
              {
                currentTemp: (weather.main.temp - 273.15).toFixed(0),
                pressure: weather.main.pressure,
                humidity: weather.main.humidity,
                weatherStatus: weather.weather[0].main,
                windSpeed: weather.wind?.speed ?? 0,
              },
            ];
          } catch {
            return [city, { error: "Request failed" }];
          }
        })
      );

      if (!isCancelled) {
        setWeatherByCity(Object.fromEntries(entries));
        setIsLoading(false);
      }
    }

    fetchWeatherData(selectedCities);

    return () => {
      isCancelled = true;
    };
  }, [selectedCities]);

  const handleAddCity = (cityData) => {
    setSelectedCities((prevCities) => {
      const exists = prevCities.some(
        (c) => c.city.toLowerCase() === cityData.city.toLowerCase() && c.country.toLowerCase() === cityData.country.toLowerCase()
      );

      if (exists) {
        setErrorMessage(`${cityData.city}, ${cityData.country} is already added.`);
        return prevCities;
      }

      setErrorMessage("");
      return [...prevCities, cityData];
    });

    setIsOverlayOpen(false);
  };

  const handleRemoveCity = (cityName) => {
    setSelectedCities((prevCities) => prevCities.filter((city) => city.city !== cityName));
    setWeatherByCity((prev) => {
      const next = { ...prev };
      delete next[cityName];
      return next;
    });
  };

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      <div className="mx-auto w-[95%] max-w-6xl py-6">
        <header className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white px-5 py-4 shadow-sm">
          <div>
            <h1 className="text-2xl font-semibold">Weather Dashboard</h1>
            <p className="text-sm text-slate-500">Track multiple cities at a glance.</p>
          </div>
          <button
            onClick={() => setIsOverlayOpen(true)}
            className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            Add City
          </button>
        </header>

        {errorMessage && <p className="mt-4 rounded-lg bg-amber-100 px-3 py-2 text-sm text-amber-800">{errorMessage}</p>}

        {isLoading && selectedCities.length > 0 && <p className="mt-4 text-sm text-slate-600">Loading weather data...</p>}

        {!selectedCities.length ? (
          <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
            No cities added yet. Click <span className="font-medium">Add City</span> to get started.
          </div>
        ) : (
          <section className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {selectedCities.map(({ city, country }) => {
              const weather = weatherByCity[city];
              return (
                <WeatherCard
                  key={`${city}-${country}`}
                  city={city}
                  country={country}
                  time={currentTime}
                  weather={weather}
                  weatherIcon={weather ? weatherIconMap[weather.weatherStatus?.toLowerCase()] : null}
                  onRemove={handleRemoveCity}
                />
              );
            })}
          </section>
        )}
      </div>

      {isOverlayOpen && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <Overlay setCity={handleAddCity} onClose={() => setIsOverlayOpen(false)} />
        </div>
      )}
    </main>
  );
}
