export const ACCUWEATHER_API_KEY =
  import.meta.env.VITE_ACCUWEATHER_API_KEY || '';
export const ACCUWEATHER_BASE_URL = 'http://dataservice.accuweather.com';

// Endpoints
export const ENDPOINTS = {
  AUTOCOMPLETE: '/locations/v1/cities/autocomplete',
  CURRENT_CONDITIONS: '/currentconditions/v1',
  FIVE_DAY_FORECAST: '/forecasts/v1/daily/5day',
};
