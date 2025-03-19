# Vite Weather App

A weather application built using Vite, React, TypeScript, and Tailwind CSS v3.4.17, integrating with the AccuWeather API.

## Features

- Search for locations worldwide
- View current weather conditions
- See 5-day weather forecasts
- Responsive design

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository

   ```bash
   git clone <repository-url>
   cd vite-weather-app
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Set up your AccuWeather API key

   - Sign up for a free API key at [AccuWeather Developer Portal](https://developer.accuweather.com/)
   - Open `src/config.ts` and replace `YOUR_ACCUWEATHER_API_KEY` with your actual API key

4. Start the development server

   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## Build for Production

```bash
npm run build
```

The build will be created in the `dist` directory.

## Technologies Used

- [Vite](https://vitejs.dev/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS v3.4.17](https://tailwindcss.com/)
- [AccuWeather API](https://developer.accuweather.com/)
- [Axios](https://axios-http.com/)

## License

This project is licensed under the MIT License.
