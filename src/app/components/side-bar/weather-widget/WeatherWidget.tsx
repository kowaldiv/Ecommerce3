import { images } from "@/src/assets";
import { Button } from "../../Button";
import { useEffect, useRef, useState } from "react";
import { Spinner } from "../../Spinner";
import { WeatherInfo } from "./WeatherInfo";
import { SearchSection } from "./SearchSection";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

export interface Weather {
  city: string;
  temp: number;
  description: string;
  icon: string;
}

async function getLatAndLenOfCity(
  city: string,
  signal?: AbortSignal,
): Promise<
  | { isSuccess: true; data: { lat: number; lon: number } }
  | { isSuccess: false; message: string }
> {
  try {
    const response = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`,
      { signal },
    );

    if (!response.ok) throw new Error();

    const json = await response.json();

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

async function getWeather(
  {
    lat,
    lon,
  }: {
    lat: number;
    lon: number;
  },
  signal?: AbortSignal,
): Promise<
  { isSuccess: true; data: Weather } | { isSuccess: false; message: string }
> {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
      { signal },
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

const getPosition = () =>
  new Promise<GeolocationPosition>((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("timeout")), 5000);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        clearTimeout(timer);
        resolve(pos);
      },
      (err) => {
        clearTimeout(timer);
        reject(err);
      },
    );
  });

async function getUserCoords(): Promise<
  { isSuccess: true; data: { lat: number; lon: number } } | { isSuccess: false }
> {
  try {
    const position = await getPosition();
    return {
      isSuccess: true,
      data: { lat: position.coords.latitude, lon: position.coords.longitude },
    };
  } catch {
    return { isSuccess: false };
  }
}

export function WeatherWidget() {
  const abortControllerRef = useRef<AbortController | null>(null);
  const [isWeatherWidgetClose, setIsWeatherWidgetClose] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [city, setCity] = useState("Тюмень");
  const [geoError, setGeoError] = useState<string | null>(null);
  const [weatherError, setWeatherError] = useState<string | null>(null);
  const [failedCities, setFailedCities] = useState<Set<string>>(new Set());
  const [weather, setWeather] = useState<Weather>();

  async function handleGetWeather(city: string) {
    let controller: AbortController | null = null;

    try {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      controller = new AbortController();
      abortControllerRef.current = controller;

      setGeoError(null);
      setWeatherError(null);
      setIsLoading(true);

      const result1 = await getLatAndLenOfCity(city, controller.signal);
      if (!result1.isSuccess) {
        setGeoError(result1.message);
        setFailedCities((prevSet) => new Set(prevSet).add(city));
        setCity("");
        setIsLoading(false);
        return;
      }
      const { lat, lon } = result1.data;

      const result2 = await getWeather({ lat, lon }, controller.signal);
      if (!result2.isSuccess) {
        setWeatherError(result2.message);
        setFailedCities((prevSet) => new Set(prevSet).add(city));
        setWeather(undefined);
        setIsLoading(false);
        return;
      }

      setWeather(result2.data);
      setIsLoading(false);
    } catch (err) {
      if ((err as Error).name === "AbortError") {
        return;
      }

      // Непредвиденная ошибка
      setWeatherError("Что-то пошло не так");
      setIsLoading(false);
    } finally {
      if (controller && abortControllerRef.current === controller) {
        abortControllerRef.current = null;
      }
    }
  }

  useEffect(() => {
    async function fetchData() {
      const userCoords = await getUserCoords();
      const result1 = userCoords.isSuccess
        ? userCoords
        : await getLatAndLenOfCity("Тюмень");

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

  const handleCityChange = (city: string) => {
    setCity(city);
    setGeoError(null); // очищаем ошибку при печати
  };

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
          <div className="grid gap-3">
            <WeatherInfo weather={weather} weatherError={weatherError} />
            <SearchSection
              city={city}
              isLoading={isLoading}
              geoError={geoError}
              failedCities={failedCities}
              onCityChange={handleCityChange}
              onSearch={handleGetWeather}
            />
          </div>
        </>
      )}
    </div>
  );
}
