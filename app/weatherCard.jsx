import "./weatherCard.css"

export default function WeatherCard({city, country, time, temp, weatherDesc, windSpeed, humidity, pressure}) {
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
                                <p>{pressure}mb</p>
                            </div>
                        </div>     
                    </div>      
                    <div className="weather-icon">
                        <svg
                            width="64"
                            height="64"
                            viewBox="0 0 64 64">
                            <defs>
                                <filter id="blur" width="200%" height="200%">
                                    <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
                                    <feOffset dx="0" dy="4" result="offsetblur"/>
                                    <feComponentTransfer>
                                        <feFuncA type="linear" slope="0.05"/>
                                    </feComponentTransfer>
                                    <feMerge> 
                                        <feMergeNode/>
                                        <feMergeNode in="SourceGraphic"/> 
                                    </feMerge>
                                </filter>
                            </defs>
                            <g filter="url(#blur)" id="cloudy">
                                <g transform="translate(20,10)">
                                    <g className="am-weather-cloud-1">
                                        <path d="M47.7,35.4     c0-4.6-3.7-8.2-8.2-8.2c-1,0-1.9,0.2-2.8,0.5c-0.3-3.4-3.1-6.2-6.6-6.2c-3.7,0-6.7,3-6.7,6.7c0,0.8,0.2,1.6,0.4,2.3     c-0.3-0.1-0.7-0.1-1-0.1c-3.7,0-6.7,3-6.7,6.7c0,3.6,2.9,6.6,6.5,6.7l17.2,0C44.2,43.3,47.7,39.8,47.7,35.4z" fill="#91C0F8" stroke="white" strokeLinejoin="round" strokeWidth="1.2" transform="translate(-10,-8), scale(0.6)"/>
                                    </g>
                                    <g className="am-weather-cloud-2">
                                        <path d="M47.7,35.4     c0-4.6-3.7-8.2-8.2-8.2c-1,0-1.9,0.2-2.8,0.5c-0.3-3.4-3.1-6.2-6.6-6.2c-3.7,0-6.7,3-6.7,6.7c0,0.8,0.2,1.6,0.4,2.3     c-0.3-0.1-0.7-0.1-1-0.1c-3.7,0-6.7,3-6.7,6.7c0,3.6,2.9,6.6,6.5,6.7l17.2,0C44.2,43.3,47.7,39.8,47.7,35.4z" fill="#57A0EE" stroke="#FFFFFF" strokeLinejoin="round" strokeWidth="1.2" transform="translate(-20,-11)"/>
                                    </g>
                                </g>
                            </g>
                        </svg>
                    </div>      
                </div>
            </div>
        </div>
    )
}