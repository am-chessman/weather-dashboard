"use client";

import { useMemo, useState } from "react";
import cities from "../assets/countriesCities.jsx";

export default function Overlay({ setCity, onClose }) {
  const [searchText, setSearchText] = useState("");

  const filteredCities = useMemo(() => {
    const query = searchText.trim().toLowerCase();
    if (!query) return [];

    const matched = cities.flatMap((country) =>
      country.cityNames
        .filter((city) => city.toLowerCase().startsWith(query))
        .map((city) => ({ city, country: country.country }))
    );

    return matched.slice(0, 8);
  }, [searchText]);

  return (
    <div className="w-full max-w-xl rounded-2xl bg-slate-900 p-5 text-slate-100 shadow-2xl">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Add a city</h2>
        <button
          onClick={onClose}
          className="rounded-md px-2 py-1 text-sm text-slate-300 hover:bg-slate-700 hover:text-white"
        >
          Close
        </button>
      </div>

      <input
        autoFocus
        onChange={(event) => setSearchText(event.target.value)}
        value={searchText}
        type="text"
        className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 outline-none focus:border-blue-500"
        placeholder="Start typing a city (e.g. London)"
      />

      <div className="mt-3 max-h-80 overflow-y-auto">
        {searchText && !filteredCities.length && (
          <p className="rounded-lg bg-slate-800 px-3 py-2 text-sm text-slate-400">No matching city found.</p>
        )}

        {filteredCities.map((cityData, index) => (
          <div
            className="mt-2 flex items-center justify-between rounded-xl bg-slate-800 px-3 py-2 transition hover:bg-slate-700"
            key={`${cityData.city}-${cityData.country}-${index}`}
          >
            <div>
              <p className="font-medium">{cityData.city}</p>
              <p className="text-sm text-slate-400">{cityData.country}</p>
            </div>
            <button
              className="rounded-md bg-blue-600 px-3 py-1 text-sm font-medium text-white hover:bg-blue-700"
              onClick={() => setCity(cityData)}
            >
              Add
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
