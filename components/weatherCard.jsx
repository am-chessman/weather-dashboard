"use client"
import {useState, useRef} from "react"
import "../styles/weatherCard.css"
import "../styles/weatherIcons.css"

export default function WeatherCard({city, country, time, temp, weatherDesc, windSpeed, humidity, pressure, weatherIcon, setRemovedCard, getCardRemovedStatus}) {
    const closeRef = useRef(null)
    const [removeCard, setRemoveCard] = useState(false);

    const handleCardRemoval = () => {
        setRemoveCard(true)
    }

    // useEffect(() => {
    //     const closeRefBtn = closeRef.current
    //     if(removeCard != false)
    //         {
    //             closeRefBtn.classList.add("hidden")
    //         }
    // }, [removeCard])

    console.log(removeCard)
        
    return (
        <div 
        ref={closeRef}
        className={`absolute top-0 right-0 ${removeCard ? "hidden" : "weather-card"}`}>
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
                        {/* {time} */}
                    </div>
                    <div 
                    onClick={() =>{
                        handleCardRemoval();
                        setRemovedCard({
                            "city": city,
                            "country": country
                        });
                        getCardRemovedStatus(true);
                    }}
                        className={`absolute top-0 right-0 ${removeCard ? "hidden" : ""}`}
                    >
                        <div className="w-8 h-8 cursor-pointer flex justify-center items-center rounded-bl-2xl rounded-tr-2xl bg-gray-300 hover:bg-gray-500 transition-all duration-500">
                            <i className="bi bi-dash-lg"></i>
                        </div>
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
