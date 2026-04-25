import { images } from "@/src/assets";
import { Button } from "../Button";
import { useEffect, useState } from "react";
import { Input } from "../Input";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

interface Weather {
  city: string;
  temp: string;
  description: string;
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

async function getWeather(
  city: string,
): Promise<
  { isSuccess: true; data: Weather } | { isSuccess: false; message: string }
> {
  try {
    const result = await getLatAndLenOfCity(city);

    if (!result.isSuccess) {
      return {
        isSuccess: false,
        message: result.message,
      };
    }

    const { lat, lon } = result.data;

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
  const [isLoading, setIsLoading] = useState(true);
  const [weather, setWeather] = useState<Weather>();
  const [isWeatherWidgetClose, setIsWeatherWidgetClose] = useState(false);
  const [city, setCity] = useState("");
  const [userMessage, setUserMessage] = useState("");

  async function handleGetWeather(city: string) {
    setIsLoading(true);
    const result = await getWeather(city);
    setIsLoading(false);
    if (!result.isSuccess) {
      setUserMessage(result.message);
      return;
    }
    setWeather(result.data);
  }

  useEffect(() => {
    // скоро вынесу в хук, но пока пусть так будет
    // eslint-disable-next-line react-hooks/set-state-in-effect
    handleGetWeather("Тюмень");
  }, []);

  return (
    <div
      className={`p-4 bg-linear-to-r from-cyan-500 to-cyan-300 rounded-xl text-background relative 
      ${isWeatherWidgetClose ? "hidden" : ""}`}
    >
      {isLoading ? (
        <div>Загрузка...</div>
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
          <span className="font-medium">Виджет погоды!</span>
          <div className="mt-5 grid gap-5">
            <p className="text-center text-3xl font-medium">{weather?.city}</p>
            <p className="text-center text-5xl font-medium">{weather?.temp}</p>
            <p className="text-center text-3xl font-medium">
              {weather?.description}
              {userMessage}
            </p>
            <div className="grid gap-3">
              <Input
                onChange={(e) => setCity(e.target.value)}
                className="w-full text-foreground"
              />
              <Button
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
