import { useState } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Content } from "./Content";

export type PageType = "tv" | "phone" | "laptop" | "cart";

export function Container() {
  const [pageType, setPageType] = useState<PageType>("tv");
  const [cart, setCart] = useState<Map<number, number>>(new Map());

  return (
    <div className="min-h-dvh flex flex-col">
      <Header
        pageType={pageType}
        setPageType={setPageType}
        cartLength={Array.from(cart.values()).reduce(
          (sum, count) => sum + count,
          0,
        )}
      />
      <Content
        pageType={pageType}
        cart={cart}
        setCart={setCart}
        setPageType={setPageType}
      />
      <Footer />
    </div>
  );
}
