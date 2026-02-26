# Weather Dashboard

A responsive multi-city weather dashboard built with Next.js.

This app lets you search for cities, add them to a personal dashboard, and see current conditions (temperature, humidity, wind speed, and pressure) in clean, card-based UI.

---

## Features

- **Multi-city tracking** with local persistence (`localStorage`)
- **Fast city search** using bundled city/country dataset
- **Current weather cards** with animated weather icons
- **Add/remove city management** with robust duplicate handling
- **Responsive layout** for desktop/tablet/mobile
- **Graceful error states** for invalid/unavailable weather lookups

---

## Tech Stack

- **Framework:** Next.js (App Router)
- **UI:** React 19 + Tailwind CSS + custom CSS
- **Icons:** Bootstrap Icons + custom animated SVG icon set
- **Weather API:** OpenWeather (Geocoding + Current Weather)
- **Analytics:** Vercel Analytics

---

## Quick Start

### 1) Clone

```bash
git clone https://github.com/am-chessman/weather-dashboard.git
cd weather-dashboard
```

### 2) Install dependencies

```bash
npm install
```

### 3) Configure environment

Create a `.env.local` file:

```bash
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_openweather_api_key
```

> If no env var is set, the project currently falls back to an existing key in code for compatibility. For production use, set your own key and remove fallback behavior.

### 4) Run locally

```bash
npm run dev
```

Open `http://localhost:3000`.

---

## Available Scripts

- `npm run dev` — start development server
- `npm run build` — create production build
- `npm run start` — run production server
- `npm run lint` — run ESLint checks

---

## Project Structure

```text
app/
  layout.jsx                # Root layout + metadata + analytics
  page.jsx                  # Main dashboard page, state, data fetch
components/
  overlay.jsx               # City search + add modal
  weatherCard.jsx           # Weather card component
assets/
  countriesCities.jsx       # Static city dataset
  weatherIcons.jsx          # Animated weather icon definitions
styles/
  globals.css               # Global styles
  weatherCard.css           # Weather card styling
  weatherIcons.css          # Icon animations
```

---

## Architecture Notes

- **State ownership:** `app/page.jsx` owns city list, weather map, loading/error states.
- **Persistence:** selected cities are saved to `localStorage` under `cities`.
- **Data flow:**
  1. City added from `Overlay`
  2. State updates and persists
  3. Weather fetched via OpenWeather geocoding + weather endpoints
  4. Results normalized into a `weatherByCity` map and rendered in `WeatherCard`
- **Removal flow:** removing a city updates UI state **and** persistence immediately.

---

## Known Limitations / Issues

- Weather is currently fetched in **Kelvin then converted to °C** client-side.
- Large bundled city dataset can increase initial bundle size.
- No backend cache/rate-limit protection (all calls are client-side).
- Some OpenWeather condition labels may not map to a custom icon (falls back to `N/A`).

---

## Roadmap

- [ ] Add unit/integration tests (React Testing Library / Playwright)
- [ ] Add API route proxy for server-side key protection + caching
- [ ] Support temperature unit toggle (°C / °F)
- [ ] Add reorderable cards and favorite cities
- [ ] Improve accessibility (keyboard + screen reader UX audit)

---

## Contributing

Contributions are welcome.

1. Fork the repo
2. Create a feature branch
3. Commit your changes
4. Open a pull request with context + screenshots (if UI changes)

Please keep PRs focused and include validation steps (`lint`, `build`, etc.).

---

## License

No license file is currently included in the repository.

If you are the maintainer, add a `LICENSE` file (e.g. MIT) and update this section.
