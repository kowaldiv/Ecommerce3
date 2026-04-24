import { products, type ProductCategoryType } from "@/src/data/products";
import { Dropdown } from "../components/Dropdown";
import { ProductCard } from "../components/ProductCard";
import { SideBar } from "../components/SideBar";
import { useMemo, useState } from "react";

type SortOrder = "lowToHigh" | "highToLow";

export function Listing({
  category,
  setCart,
  cart,
}: {
  category: ProductCategoryType;
  setCart: React.Dispatch<React.SetStateAction<Map<number, number>>>;
  cart: Map<number, number>;
}) {
  const [appliedFilters, setAppliedFilters] = useState({
    brand: "all",
    minPrice: 0,
    maxPrice: 5000,
  });

  const [sortOrder, setSortOrder] = useState<SortOrder>("lowToHigh");

  const categoryProducts = useMemo(
    () => products.filter((p) => p.category === category),
    [category],
  );

  const brands = useMemo(() => {
    const unique = new Set(categoryProducts.map((p) => p.brand));
    return ["all", ...Array.from(unique)];
  }, [categoryProducts]);

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

  const handleApplyFilters = (filters: {
    brand: string;
    minPrice: number;
    maxPrice: number;
  }) => {
    setAppliedFilters(filters);
  };

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
    <div className="max-w-360 flex-1 w-full h-full mx-auto my-8 px-8 flex flex-col lg:flex-row gap-6">
      <SideBar
        brands={brands}
        onApplyFilters={handleApplyFilters}
        initialBrand={appliedFilters.brand}
        initialMinPrice={appliedFilters.minPrice}
        initialMaxPrice={appliedFilters.maxPrice}
      />
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
    </div>
  );
}
