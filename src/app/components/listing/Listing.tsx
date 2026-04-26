import { products, type ProductCategoryType } from "@/src/data/products";
import { SideBar } from "../side-bar/SideBar";
import { useMemo, useState } from "react";
import { ProductCatalogWithSort } from "./ProductCatalogWithSort";

export interface AppliedFilters {
  brand: string;
  minPrice: number;
  maxPrice: number;
}

export function Listing({
  category,
  setCart,
  cart,
}: {
  category: ProductCategoryType;
  setCart: React.Dispatch<React.SetStateAction<Map<number, number>>>;
  cart: Map<number, number>;
}) {
  const [appliedFilters, setAppliedFilters] = useState<AppliedFilters>({
    brand: "all",
    minPrice: 0,
    maxPrice: 5000,
  });

  const categoryProducts = useMemo(
    () => products.filter((p) => p.category === category),
    [category],
  );

  const brands = useMemo(() => {
    const unique = new Set(categoryProducts.map((p) => p.brand));
    return ["all", ...Array.from(unique)];
  }, [categoryProducts]);

  const handleApplyFilters = (filters: {
    brand: string;
    minPrice: number;
    maxPrice: number;
  }) => {
    setAppliedFilters(filters);
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
      <ProductCatalogWithSort
        appliedFilters={appliedFilters}
        categoryProducts={categoryProducts}
        setCart={setCart}
        cart={cart}
      />
    </div>
  );
}
