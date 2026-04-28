import type { Weather } from "./WeatherWidget";

export function WeatherInfo({
  weather,
  weatherError,
}: {
  weather?: Weather;
  weatherError?: string | null;
}) {
  if (!weather && !weatherError) return null;

  return (
    <div>
      <span className="font-medium text-xl">{weather?.city}</span>
      <div className="flex items-center justify-between">
        <p className="text-5xl font-medium px-8">
          {weather ? Math.round(weather?.temp) + "°" : ""}
        </p>
        {weather?.icon && (
          <img
            src={`https://openweathermap.org/payload/api/media/file/${weather.icon}.png`}
            alt=""
          />
        )}
      </div>
      <p className="text-center text-2xl font-medium">{weather?.description}</p>
      <p className="text-center">{weatherError}</p>
    </div>
  );
}
