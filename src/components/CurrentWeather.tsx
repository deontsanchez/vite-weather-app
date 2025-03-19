import { FC } from 'react';
import { CurrentCondition } from '../utils/api';

interface CurrentWeatherProps {
  data: CurrentCondition;
  locationName: string;
}

const CurrentWeather: FC<CurrentWeatherProps> = ({ data, locationName }) => {
  // Helper function to get weather icon URL
  const getWeatherIconUrl = (iconNumber: number) => {
    return `https://developer.accuweather.com/sites/default/files/${
      iconNumber < 10 ? '0' + iconNumber : iconNumber
    }-s.png`;
  };

  console.log(data);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{locationName}</h2>
          <div className="flex items-center mt-2">
            <img
              src={getWeatherIconUrl(data.WeatherIcon)}
              alt={data.WeatherText}
              className="mr-4"
            />
            <div>
              <div className="text-4xl font-bold text-gray-900">
                {Math.round(data.Temperature.Imperial.Value)}°
                {data.Temperature.Imperial.Unit}
              </div>
              <p className="text-gray-600">{data.WeatherText}</p>
            </div>
          </div>
        </div>

        <div className="mt-4 md:mt-0 grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <span className="text-gray-500 text-sm">Humidity</span>
            <span className="font-medium">{data.RelativeHumidity}%</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500 text-sm">Wind</span>
            <span className="font-medium">
              {data.Wind.Speed.Imperial.Value} {data.Wind.Speed.Imperial.Unit}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500 text-sm">UV Index</span>
            <span className="font-medium">{data.UVIndex}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500 text-sm">Wind Direction</span>
            <span className="font-medium">{data.Wind.Direction.Localized}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
