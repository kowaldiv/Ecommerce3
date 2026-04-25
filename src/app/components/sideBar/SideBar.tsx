import { Dropdown } from "../Dropdown";
import { Input } from "../Input";
import { Button } from "../Button";
import { useCallback, useState } from "react";
import { SpecialDealTimer } from "./SpecialDealTimer";
import { WeatherWidget } from "./WeatherWidget";

interface SideBarProps {
  brands: string[];
  onApplyFilters: (filters: {
    brand: string;
    minPrice: number;
    maxPrice: number;
  }) => void;

  initialBrand?: string;
  initialMinPrice?: number;
  initialMaxPrice?: number;
}

export function SideBar({
  brands,
  onApplyFilters,
  initialBrand = "all",
  initialMinPrice = 0,
  initialMaxPrice = Infinity,
}: SideBarProps) {
  const [draftBrand, setDraftBrand] = useState(initialBrand);
  const [draftMinPrice, setDraftMinPrice] = useState(initialMinPrice);
  const [draftMaxPrice, setDraftMaxPrice] = useState(initialMaxPrice);

  const brandOptions = brands.map((brand) => ({
    label: brand === "all" ? "All Brands" : brand,
    value: brand,
  }));

  const handleApply = () => {
    onApplyFilters({
      brand: draftBrand,
      minPrice: draftMinPrice,
      maxPrice: draftMaxPrice,
    });
  };

  const handleMinPriceChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setDraftMinPrice(e.target.value ? Number(e.target.value) : 0);
    },
    [],
  );

  const handleMaxPriceChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setDraftMaxPrice(e.target.value ? Number(e.target.value) : Infinity);
    },
    [],
  );

  return (
    <aside className="lg:w-3xs w-full h-full grid gap-4">
      <div className="p-4 border border-border rounded-xl grid gap-4">
        <p className="font-medium text-xl">Filters</p>
        <div className="grid gap-6">
          <div className="grid gap-6">
            <div className="grid gap-2">
              <p className="text-base font-medium">Brand</p>
              <Dropdown
                options={brandOptions}
                onChange={setDraftBrand}
                className="w-full"
              />
            </div>
            <div className="grid gap-2">
              <p className="text-base font-medium">Price Range</p>
              <div className="flex gap-2">
                <Input
                  onChange={handleMinPriceChange}
                  placeholder={initialMinPrice.toString()}
                  type="number"
                />
                <Input
                  onChange={handleMaxPriceChange}
                  placeholder={initialMaxPrice.toString()}
                  type="number"
                />
              </div>
            </div>
          </div>
          <Button
            title="Apply Filters"
            onClick={handleApply}
            variant="primary"
            className="w-full"
          />
        </div>
      </div>
      <SpecialDealTimer />
      <WeatherWidget />
    </aside>
  );
}
