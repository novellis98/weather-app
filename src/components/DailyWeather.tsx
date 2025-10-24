interface Props {
  data: any;
  loading: boolean;
  error: string | null;
}

function DailyWeather({ data, loading, error }: Props) {
  if (loading) return <p>Caricamento...</p>;
  if (error) return <p>Errore: {error}</p>;
  if (!data) return <p>Inserisci una città e premi invio</p>;

  return (
    <div className="max-w-md mx-auto mt-8 space-y-6">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {data.location?.name}, {data.location?.region} ({data.location?.country}
        )
      </h2>

      {data.forecast?.forecastday?.map((day: any, idx: number) => (
        <div key={idx} className="p-4 rounded-lg bg-blue-200 shadow-md">
          <h3 className="font-bold text-lg mb-2">{day.date}</h3>

          <div className="flex items-center mb-2">
            <img
              src={`https:${day.day.condition.icon}`}
              alt={day.day.condition.text}
              className="w-12 h-12 mr-4"
            />
            <p className="text-xl">{day.day.condition.text}</p>
          </div>

          <p>Temperatura max: {day.day.maxtemp_c} °C</p>
          <p>Temperatura min: {day.day.mintemp_c} °C</p>
          <p>Temperatura media: {day.day.avgtemp_c} °C</p>
          <p>Vento max: {day.day.maxwind_kph} km/h</p>
          <p>Precipitazioni: {day.day.totalprecip_mm} mm</p>
          <p>Umidità media: {day.day.avghumidity} %</p>
          <p>Probabilità di pioggia: {day.day.daily_chance_of_rain} %</p>
          <p>Indice UV: {day.day.uv}</p>
        </div>
      ))}
    </div>
  );
}

export default DailyWeather;
