export interface WeatherData {
  location: {
    name: string;
    region: string;
    country: string;
  };
  forecast: {
    forecastday: ForecastDay[];
  };
}

export interface ForecastDay {
  date: string;
  day: {
    maxtemp_c: number;
    mintemp_c: number;
    avgtemp_c: number;
    maxwind_kph: number;
    totalprecip_mm: number;
    avghumidity: number;
    daily_chance_of_rain: number;
    uv: number;
    condition: {
      text: string;
      icon: string;
    };
  };
}
export interface City {
  id: number;
  name: string;
}
export interface CityOption {
  label: string;
  value: number;
}
