import { useState } from "react";
import axios from "axios";
import type { WeatherData } from "../interfaces/interfaces";
interface City {
  id: number;
  name: string;
}
function useData() {
  // Stato per i dati meteo
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherError, setWeatherError] = useState<string | null>(null);

  // Stato per l’autocompletamento
  const [autoData, setAutoData] = useState<City[]>([]);
  const [autoLoading, setAutoLoading] = useState(false);
  const [autoError, setAutoError] = useState<string | null>(null);

  //  previsioni meteo
  async function fetchData(url: string) {
    if (!url) return;
    setWeatherLoading(true);
    setWeatherError(null);
    try {
      const res = await axios.get(url);
      setWeatherData(res.data);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setWeatherError(err.message);
      } else if (err instanceof Error) {
        setWeatherError(err.message);
      } else {
        setWeatherError("Errore sconosciuto");
      }
    } finally {
      setWeatherLoading(false);
    }
  }
  async function autocomplete(url: string): Promise<City[]> {
    if (!url) return [];
    setAutoLoading(true);
    setAutoError(null);
    try {
      const res = await axios.get(url);
      setAutoData(res.data);
      return res.data;
    } catch (err: unknown) {
      if (err instanceof Error) setAutoError(err.message);
      else setAutoError("Errore sconosciuto");
      return [];
    } finally {
      setAutoLoading(false);
    }
  }

  return {
    weatherData,
    weatherLoading,
    weatherError,
    fetchData,
    autoData,
    autoLoading,
    autoError,
    autocomplete,
  };
}

export default useData;
