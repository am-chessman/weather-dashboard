"use client"
import React, {useState, useEffect} from "react";
import cities from "./countriesCities.jsx"
import "./globals.css"

export default function Overlay({setCity}) {
    const [searchText, setSearchText] = useState("");
    const [filteredCities, setFilteredCities] = useState([])

    function handleSearchTextChange(event) {
        setSearchText(event.target.value)
        searchedText(event.target.value)
    }

    function searchedText(searchText) {
        const filtered = cities.flatMap(country => {
            return country["cityNames"]
                .filter(city => city.toLowerCase().startsWith(searchText.toLowerCase()))
                .map(city => ({
                    city: city,
                    country: country.country // Include country name
                }));
        });

        setFilteredCities(filtered.slice(0, 5));
    }
    
    return (
        <>
            <div className="bg-red-400 p-5 h-135 md:w-150 md:h-135 sm:w-50 sm:h-75 rounded-3xl flex flex-row items-start justify-center absolute top-20 left-100">
                <div>
                    <div className="flex justify-center">
                        <h1 className="text-2xl">Add Country</h1>
                    </div>
                    <input
                        onChange={handleSearchTextChange}
                        value={searchText}
                        type="text" 
                        className=" w-90 border border-gray-300  px-3 py-2 mt-2 outline-none rounded-xl" 
                        placeholder="Country"
                    />
            
                    {searchText &&
                        <div>
                            {filteredCities.map((city, index) => (
                                <div className="contentHolder mt-1 w-full h-20 bg-orange-600 text-amber-50 flex flex-row justify-between items-center flex-wrap hover:bg-gray-500" key={index}>
                                    <div className="pl-2 pr-2 w-50">
                                        {city.city}, {city.country}
                                    </div>
                                    <button className="svgParent w-15 h-full flex justify-center items-center bg-[#111] cursor-pointer h:bg-[#333]" onClick={() => setCity(city)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="svgChild" viewBox="0 0 24 24" width="24px" height="24px" fillRule="evenodd" fill="#ffff"><path fillRule="evenodd" d="M 11 2 L 11 11 L 2 11 L 2 13 L 11 13 L 11 22 L 13 22 L 13 13 L 22 13 L 22 11 L 13 11 L 13 2 Z"/></svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                    }
                </div>
            </div>
        </>
    );
}

