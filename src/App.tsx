import { useState } from "react";
import "./App.css";
import DailyWeather from "./components/DailyWeather";
import Header from "./components/Header";
import InputField from "./components/InputField";
import useData from "./hooks/useData";

function App() {
  const [cityName, setCityName] = useState("");
  const urlBase = import.meta.env.VITE_API_URL;
  const { weatherData, weatherLoading, weatherError, fetchData } = useData();

  function onChangeCityName(e: React.ChangeEvent<HTMLInputElement>) {
    setCityName(e.target.value);
  }

  function handleFetchData() {
    if (!cityName) return;
    const uri = `${urlBase}${cityName}&days=5&aqi=no&alerts=no`;
    fetchData(uri);
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-blue-400 to-blue-700">
      <Header />
      <InputField
        onChange={onChangeCityName}
        cityName={cityName}
        onFetch={handleFetchData}
      />
      <DailyWeather
        data={weatherData}
        loading={weatherLoading}
        error={weatherError}
      />
    </div>
  );
}

export default App;
