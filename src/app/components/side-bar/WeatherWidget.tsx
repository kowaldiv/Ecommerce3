import { images } from "@/src/assets";
import { Button } from "../Button";
import { useEffect, useState } from "react";
import { Input } from "../Input";
import { Spinner } from "../Spinner";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

interface Weather {
  city: string;
  temp: number;
  description: string;
  icon: string;
}

async function getLatAndLenOfCity(
  city: string,
): Promise<
  | { isSuccess: true; data: { lat: number; lon: number } }
  | { isSuccess: false; message: string }
> {
  try {
    const response = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`,
    );

    if (!response.ok) throw new Error();

    const json = await response.json();

    console.log(JSON.stringify({ lat: json[0].lat, lon: json[0].lon }));
    return { isSuccess: true, data: { lat: json[0].lat, lon: json[0].lon } };
  } catch (err) {
    console.log(
      (err as Error).message || `Не удалось получить данные для города ${city}`,
    );
    return {
      isSuccess: false,
      message: `Не удалось получить данные для города ${city}`,
    };
  }
}

async function getWeather({
  lat,
  lon,
}: {
  lat: number;
  lon: number;
}): Promise<
  { isSuccess: true; data: Weather } | { isSuccess: false; message: string }
> {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
    );

    if (!response.ok) {
      throw new Error();
    }

    const json = await response.json();
    return {
      isSuccess: true,
      data: {
        city: json.name,
        temp: json.main.temp,
        description: json.weather[0].description,
        icon: json.weather[0].icon,
      },
    };
  } catch (err) {
    console.log((err as Error).message || `Не удалось получить данные`);
    return {
      isSuccess: false,
      message: "Не удалось получить данные",
    };
  }
}

export function WeatherWidget() {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [weather, setWeather] = useState<Weather>();
  const [isWeatherWidgetClose, setIsWeatherWidgetClose] = useState(false);
  const [city, setCity] = useState("Тюмень");
  const [geoError, setGeoError] = useState<string | null>(null);
  const [weatherError, setWeatherError] = useState<string | null>(null);
  const [failedCities, setFailedCities] = useState(new Set());

  async function handleGetWeather(city: string) {
    setGeoError(null);
    setWeatherError(null);
    setIsLoading(true);
    const result1 = await getLatAndLenOfCity(city);
    if (!result1.isSuccess) {
      setGeoError(result1.message);
      setIsLoading(false);
      setCity("");
      setFailedCities((prevSet) => {
        const newSet = new Set(prevSet);
        newSet.add(city);
        return newSet;
      });
      return;
    }
    const { lat, lon } = result1.data;

    const result2 = await getWeather({ lat, lon });
    if (!result2.isSuccess) {
      setWeatherError(result2.message);
      setIsLoading(false);
      setFailedCities((prevSet) => {
        const newSet = new Set(prevSet);
        newSet.add(city);
        return newSet;
      });
      return;
    }
    setWeather(result2.data);
    setIsLoading(false);
  }

  useEffect(() => {
    async function fetchData() {
      const result1 = await getLatAndLenOfCity("Тюмень");
      if (result1.isSuccess) {
        const result2 = await getWeather(result1.data);
        if (result2.isSuccess) {
          setWeather(result2.data);
        } else {
          setWeatherError(result2.message);
        }
      } else {
        setGeoError(result1.message);
      }
      setIsInitialLoading(false);
    }
    fetchData();
  }, []);

  return (
    <div
      className={`p-4 bg-linear-to-r from-cyan-500 to-cyan-300 rounded-xl text-background relative 
      ${isWeatherWidgetClose ? "hidden" : ""}`}
    >
      {isInitialLoading ? (
        <Spinner />
      ) : (
        <>
          <Button
            onClick={() => {
              setIsWeatherWidgetClose(true);
            }}
            className="absolute right-2 top-2"
          >
            <img src={images.icons.close} alt="" />
          </Button>
          <span className="font-medium text-xl">{weather?.city}</span>
          <div className="mt-5 grid gap-3">
            <div>
              <div className="flex items-center justify-between">
                <p className="text-5xl font-medium px-8">
                  {weather ? Math.round(weather?.temp) + "°" : ""}
                </p>
                <img
                  src={`https://openweathermap.org/payload/api/media/file/${weather?.icon}.png`}
                  alt=""
                />
              </div>
              <p className="text-center text-2xl font-medium">
                {weather?.description}
              </p>
              <p className="text-center">{weatherError}</p>
            </div>
            <div className="grid gap-3">
              <p className="text-center">
                {failedCities.has(city)
                  ? `Город «${city}» ранее не найден`
                  : ""}
              </p>
              <Input
                disabled={isLoading}
                defaultValue={city}
                onChange={(e) => {
                  setCity(e.target.value);
                  setGeoError(null);
                }}
                className="w-full text-foreground"
              />
              <p className="text-center">{geoError}</p>
              <Button
                disabled={isLoading}
                variant="default"
                title="Получить погоду!"
                onClick={() => handleGetWeather(city)}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
