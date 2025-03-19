import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import {
  Location,
  CurrentCondition,
  Forecast as ForecastType,
  getCurrentWeather,
  getForecast,
} from './utils/api';

const App = () => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );
  const [currentWeather, setCurrentWeather] = useState<CurrentCondition | null>(
    null
  );
  const [forecast, setForecast] = useState<ForecastType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!selectedLocation) return;

      setLoading(true);
      setError(null);

      try {
        const [weatherData, forecastData] = await Promise.all([
          getCurrentWeather(selectedLocation.Key),
          getForecast(selectedLocation.Key),
        ]);

        setCurrentWeather(weatherData);
        setForecast(forecastData);
      } catch (err) {
        setError('Failed to fetch weather data. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [selectedLocation]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-800 mb-2">
            Weather Forecast
          </h1>
          <p className="text-gray-600">
            Search for a city to get the current weather and 5-day forecast
          </p>
        </header>

        <div className="flex justify-center mb-8">
          <SearchBar onSelectLocation={setSelectedLocation} />
        </div>

        {loading && (
          <div className="flex justify-center p-10">
            <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {currentWeather && selectedLocation && (
          <CurrentWeather
            data={currentWeather}
            locationName={selectedLocation.LocalizedName}
          />
        )}

        {forecast && forecast.DailyForecasts && (
          <Forecast dailyForecasts={forecast.DailyForecasts} />
        )}
      </div>
    </div>
  );
};

export default App;
