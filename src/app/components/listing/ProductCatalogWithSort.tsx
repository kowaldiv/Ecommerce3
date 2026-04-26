import { useMemo, useState } from "react";
import { Dropdown } from "../Dropdown";
import { ProductCard } from "../ProductCard";
import type { AppliedFilters } from "./Listing";
import type { Product } from "@/src/data/products";

type SortOrder = "lowToHigh" | "highToLow";

export function ProductCatalogWithSort({
  categoryProducts,
  setCart,
  cart,
  appliedFilters,
}: {
  categoryProducts: Product[];
  setCart: React.Dispatch<React.SetStateAction<Map<number, number>>>;
  cart: Map<number, number>;
  appliedFilters: AppliedFilters;
}) {
  const [sortOrder, setSortOrder] = useState<SortOrder>("lowToHigh");

  const filteredProducts = useMemo(() => {
    return categoryProducts.filter((product) => {
      if (
        appliedFilters.brand !== "all" &&
        product.brand !== appliedFilters.brand
      )
        return false;
      if (product.price < appliedFilters.minPrice) return false;
      if (product.price > appliedFilters.maxPrice) return false;
      return true;
    });
  }, [categoryProducts, appliedFilters]);

  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];
    if (sortOrder === "lowToHigh") {
      sorted.sort((a, b) => a.price - b.price);
    } else {
      sorted.sort((a, b) => b.price - a.price);
    }
    return sorted;
  }, [filteredProducts, sortOrder]);

  const sortOptions = [
    { value: "lowToHigh", label: "Price: Low to High" },
    { value: "highToLow", label: "Price: High to Low" },
  ];

  const handleSortChange = (value: string) => {
    setSortOrder(value as SortOrder);
  };

  return (
    <div className="flex-1 flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <p className="text-grayText">{sortedProducts.length} products</p>{" "}
        <div className="flex items-center gap-2">
          <p>Sort by:</p>
          <Dropdown
            className="w-44!"
            options={sortOptions}
            value={sortOrder}
            onChange={handleSortChange}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {sortedProducts.map((product) => {
          return (
            <ProductCard
              setCart={setCart}
              cart={cart}
              key={product.id}
              product={product}
            />
          );
        })}
      </div>
    </div>
  );
}
