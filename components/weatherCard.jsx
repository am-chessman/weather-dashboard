"use client";

import "../styles/weatherCard.css";
import "../styles/weatherIcons.css";

export default function WeatherCard({ city, country, time, weather, weatherIcon, onRemove }) {
  if (!weather) {
    return (
      <article className="weather-card">
        <div className="card-content-wrapper">
          <div className="card-header-wrapper">
            <div className="location">
              <div className="city">
                <p>{city}</p>
              </div>
              <div className="country">
                <p>{country}</p>
              </div>
            </div>
            <div className="time">{time}</div>
          </div>
          <p className="text-sm text-slate-500">Loading weather...</p>
        </div>
      </article>
    );
  }

  if (weather.error) {
    return (
      <article className="weather-card">
        <div className="card-content-wrapper">
          <div className="card-header-wrapper">
            <div className="location">
              <div className="city">
                <p>{city}</p>
              </div>
              <div className="country">
                <p>{country}</p>
              </div>
            </div>
            <button onClick={() => onRemove(city)} className="text-sm text-rose-600 hover:underline">
              Remove
            </button>
          </div>
          <p className="text-sm text-rose-600">{weather.error}</p>
        </div>
      </article>
    );
  }

  return (
    <article className="weather-card">
      <div className="card-content-wrapper">
        <div className="card-header-wrapper">
          <div className="location">
            <div className="city">
              <p>{city}</p>
            </div>
            <div className="country">
              <p>{country}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="time">{time}</div>
            <button
              aria-label={`Remove ${city}`}
              onClick={() => onRemove(city)}
              className="rounded-md bg-slate-200 px-2 py-1 text-xs text-slate-700 transition hover:bg-slate-300"
            >
              Remove
            </button>
          </div>
        </div>

        <div className="card-body-wrapper">
          <div className="temp">
            <p>{weather.currentTemp}&#176;C</p>
          </div>
          <div className="weather-desc">
            <p>{weather.weatherStatus}</p>
          </div>
        </div>

        <div className="card-footer-wrapper">
          <div className="weather-details">
            <div className="wind-element">
              <i className="bi bi-wind" />
              <p>{weather.windSpeed} m/s</p>
            </div>
            <div className="humidity-element">
              <i className="bi bi-droplet" />
              <p>{weather.humidity}%</p>
            </div>
            <div className="pressure-element">
              <i className="bi bi-speedometer" />
              <p>{weather.pressure} mb</p>
            </div>
          </div>
          <div className="weather-icon">{weatherIcon || <span className="text-sm text-slate-500">N/A</span>}</div>
        </div>
      </div>
    </article>
  );
}
