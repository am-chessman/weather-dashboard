import "./weatherCard.css"
import "./weatherIcons.css"

export default function WeatherCard({city, country, time, temp, weatherDesc, windSpeed, humidity, pressure, weatherIcon}) {
    return (
        <div className="weather-card">
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
                    <div className="time">
                        {time}
                    </div>
                </div>
                <div className="card-body-wrapper">
                    <div className="temp">
                        <p>{temp}&#176;C</p>
                    </div>
                    <div className="weather-desc">
                        <p>{weatherDesc}</p>
                    </div>
                </div>
                <div className="card-footer-wrapper">
                    <div className="weather-details">
                        <div className="wind-element">
                            <div className="wind-icon">
                                <i className="bi bi-wind"></i>
                            </div>
                            <div className="wind-speed">
                                <p>{windSpeed} m/s</p>
                            </div>
                        </div>
                        <div className="humidity-element">
                            <div className="humidity-icon">
                                <i className="bi bi-droplet"></i>
                            </div>
                            <div className="humitidy-percentage">
                                <p>{humidity}%</p>
                            </div>
                        </div>
                        <div className="pressure-element">
                            <div className="pressure-icon">
                                <i className="bi bi-speedometer"></i>
                            </div>
                            <div className="pressure-value">
                                <p>{pressure} mb</p>
                            </div>
                        </div>     
                    </div>      
                    <div className="weather-icon">
                        {weatherIcon}
                    </div>      
                </div>
            </div>
        </div>
    )
}
