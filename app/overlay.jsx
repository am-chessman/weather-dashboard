"use client"
import React, {useState, useEffect} from "react";
import cities from "./citiesByCountry.jsx"

export default function Overlay() {
    const APIkey = "93c9563c219fd26bcf5872a459d436c0"
    let cityName = "Kiruna"
    const api = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${APIkey}`
    // fetch(api)
    // .then(response => {
    //     console.log(response);
    //     return response.json();
    // })
    // .then(data => {
    //     console.log(data);
    // })
    // .catch(error => {
    //     console.log(error);
    // });

    const [city, setCity] = useState("");

    const handleCityChange = (event) => {
        setCity(event.target.value);
    }

    cities.

    return (
        <>
            <div className="bg-red-400 p-5 rounded-lg w-150 h-130 flex flex-row items-start justify-evenly">
                <div>
                    <h1 className="text-2xl">Add Country</h1>
                    <input type="text"
                    onChange={handleCityChange}
                    value={city}
                    className="border border-gray-300 rounded px-3 py-2 mt-2" placeholder="Country" />
                </div>
                {/* <div className="flex justify-end mt-3">
                    
                </div> */}
            </div>
        </>
    );
}