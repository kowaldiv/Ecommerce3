import { Button } from "../../Button";
import { Input } from "../../Input";

export function SearchSection({
  city,
  isLoading,
  geoError,
  failedCities,
  onCityChange,
  onSearch,
}: {
  city: string;
  isLoading: boolean;
  geoError: string | null;
  failedCities: Set<string>;
  onCityChange: (city: string) => void;
  onSearch: (city: string) => void;
}) {
  return (
    <div className="grid gap-3">
      <p className="text-center">
        {failedCities.has(city) ? `Город «${city}» ранее не найден` : ""}
      </p>
      <Input
        disabled={isLoading}
        defaultValue={city}
        onChange={(e) => onCityChange(e.target.value)}
        className="w-full text-foreground"
      />
      {geoError ? <p className="text-center">{geoError}</p> : ""}
      <Button
        disabled={isLoading}
        variant="default"
        title="Получить погоду!"
        onClick={() => onSearch(city)}
      />
    </div>
  );
}
