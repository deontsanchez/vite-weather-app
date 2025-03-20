import axios from 'axios';
import {
  ACCUWEATHER_API_KEY,
  ACCUWEATHER_BASE_URL,
  ENDPOINTS,
} from '../config';

// Types
export interface Location {
  Key: string;
  LocalizedName: string;
  Country: {
    LocalizedName: string;
  };
  AdministrativeArea: {
    LocalizedName: string;
  };
}

export interface CurrentCondition {
  WeatherText: string;
  WeatherIcon: number;
  Temperature: {
    Metric: {
      Value: number;
      Unit: string;
    };
    Imperial: {
      Value: number;
      Unit: string;
    };
  };
  RelativeHumidity: number;
  Wind: {
    Direction: {
      Degrees: number;
      Localized: string;
    };
    Speed: {
      Imperial: {
        Value: number;
        Unit: string;
      };
    };
  };
  UVIndex: number;
  Precipitation: boolean;
}

export interface ForecastDay {
  Date: string;
  Day: {
    Icon: number;
    IconPhrase: string;
    HasPrecipitation: boolean;
  };
  Temperature: {
    Minimum: {
      Value: number;
      Unit: string;
    };
    Maximum: {
      Value: number;
      Unit: string;
    };
  };
}

export interface Forecast {
  DailyForecasts: ForecastDay[];
}

// Search for locations
export const searchLocations = async (
  query: string
): Promise<{ locations: Location[]; error?: string }> => {
  try {
    const response = await axios.get(
      `${ACCUWEATHER_BASE_URL}${ENDPOINTS.AUTOCOMPLETE}`,
      {
        params: {
          apikey: ACCUWEATHER_API_KEY,
          q: query,
        },
      }
    );
    return { locations: response.data };
  } catch (error) {
    console.error('Error searching locations:', error);
    let errorMessage = 'Failed to search locations';
    if (axios.isAxiosError(error) && error.response) {
      if (error.response.status === 401) {
        errorMessage = 'Invalid API key or authorization error';
      } else if (error.response.status === 503) {
        errorMessage = 'Service unavailable, please try again later';
      } else if (error.response.data && error.response.data.Message) {
        errorMessage = error.response.data.Message;
      }
    }
    return { locations: [], error: errorMessage };
  }
};

// Get current weather
export const getCurrentWeather = async (
  locationKey: string
): Promise<CurrentCondition | null> => {
  try {
    const response = await axios.get(
      `${ACCUWEATHER_BASE_URL}${ENDPOINTS.CURRENT_CONDITIONS}/${locationKey}`,
      {
        params: {
          apikey: ACCUWEATHER_API_KEY,
          details: true,
        },
      }
    );
    return response.data[0] || null;
  } catch (error) {
    console.error('Error getting current weather:', error);
    return null;
  }
};

// Get 5-day forecast
export const getForecast = async (
  locationKey: string
): Promise<Forecast | null> => {
  try {
    const response = await axios.get(
      `${ACCUWEATHER_BASE_URL}${ENDPOINTS.FIVE_DAY_FORECAST}/${locationKey}`,
      {
        params: {
          apikey: ACCUWEATHER_API_KEY,
          metric: false,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error getting forecast:', error);
    return null;
  }
};
