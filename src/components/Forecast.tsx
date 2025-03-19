import { FC } from 'react';
import { ForecastDay } from '../utils/api';

interface ForecastProps {
  dailyForecasts: ForecastDay[];
}

const Forecast: FC<ForecastProps> = ({ dailyForecasts }) => {
  // Helper function to get weather icon URL
  const getWeatherIconUrl = (iconNumber: number) => {
    return `https://developer.accuweather.com/sites/default/files/${
      iconNumber < 10 ? '0' + iconNumber : iconNumber
    }-s.png`;
  };

  // Format date to display day of week
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">5-Day Forecast</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {dailyForecasts.map((day, index) => (
          <div
            key={index}
            className="flex flex-col items-center p-3 border rounded-lg hover:shadow-md transition-shadow w-full"
          >
            <h3 className="font-medium">{formatDate(day.Date)}</h3>
            <img
              src={getWeatherIconUrl(day.Day.Icon)}
              alt={day.Day.IconPhrase}
              className="my-2"
            />
            <p className="text-sm text-gray-600 truncate w-full text-center">
              {day.Day.IconPhrase}
            </p>
            <div className="mt-2 flex justify-between w-full">
              <span className="text-blue-500">
                {Math.round(day.Temperature.Minimum.Value)}°
              </span>
              <span className="text-red-500">
                {Math.round(day.Temperature.Maximum.Value)}°
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
