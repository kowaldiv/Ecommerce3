import type { PageType } from "./Container";
import { TvListing } from "../pages/TvListing";
import { PhoneListing } from "../pages/PhoneListing";
import { LaptopListing } from "../pages/LaptopListing";
import { Cart } from "../pages/Cart";

export function Content({
  pageType,
  setPageType,
  setCart,
  cart,
}: {
  pageType: PageType;
  setPageType: (pageType: PageType) => void;
  setCart: React.Dispatch<React.SetStateAction<Map<number, number>>>;
  cart: Map<number, number>;
}) {
  return (
    <main className="flex-1">
      {pageType === "tv" ? (
        <TvListing setCart={setCart} cart={cart} />
      ) : pageType === "phone" ? (
        <PhoneListing setCart={setCart} cart={cart} />
      ) : pageType === "laptop" ? (
        <LaptopListing setCart={setCart} cart={cart} />
      ) : pageType === "cart" ? (
        <Cart setCart={setCart} cart={cart} setPageType={setPageType} />
      ) : (
        ""
      )}
    </main>
  );
}
