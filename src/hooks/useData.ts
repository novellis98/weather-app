import { useState } from "react";
import axios from "axios";

function useData() {
  // Stato per i dati meteo
  const [weatherData, setWeatherData] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherError, setWeatherError] = useState<string | null>(null);

  // Stato per l’autocompletamento
  const [autoData, setAutoData] = useState(null);
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
    } catch (err: any) {
      setWeatherError("");
    } finally {
      setWeatherLoading(false);
    }
  }

  //  autocompletamento città
  async function autocomplete(url: string) {
    if (!url) return;
    setAutoLoading(true);
    setAutoError(null);
    try {
      const res = await axios.get(url);
      setAutoData(res.data);
    } catch (err: any) {
      setAutoError("Errore durante l'autocompletamento");
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
