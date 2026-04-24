import { Button } from "./Button";
import { images } from "@/src/assets";
import type { PageType } from "./Container";

const stores: {
  title: string;
  storeName: PageType;
}[] = [
  {
    title: "TV",
    storeName: "tv",
  },
  {
    title: "Phone",
    storeName: "phone",
  },
  {
    title: "Laptop",
    storeName: "laptop",
  },
];

export function Header({
  pageType,
  setPageType,
  cartLength,
}: {
  pageType: PageType;
  setPageType: (pageType: PageType) => void;
  cartLength: number;
}) {
  return (
    <header className="sticky top-0 z-10 bg-background w-full border-b border-b-border">
      <div className="max-w-360 w-full mx-auto sm:px-8 px-4">
        <div
          className={`w-full h-16 flex justify-between items-center ${pageType !== "cart" ? "border-b border-b-border" : ""} sm:border-0`}
        >
          <div className="flex gap-6 items-center">
            <Button
              onClick={() => setPageType("tv")}
              className="font-medium text-xl sm:text-2xl"
            >
              TechStore
            </Button>
            {pageType !== "cart" ? (
              <div className="hidden sm:block">
                <div className="flex gap-2">
                  {stores.map((store, index) => {
                    return (
                      <Button
                        key={index}
                        title={store.title}
                        onClick={() => setPageType(store.storeName)}
                        className={`font-medium  
                        ${pageType === store.storeName ? "text-foreground" : "text-grayText"}`}
                      />
                    );
                  })}
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => setPageType("cart")}
              className="p-1! relative"
            >
              <img src={images.icons.cart} alt="cart" className="p-2!" />
              <div className="absolute bg-foreground text-background w-4.5 h-4.5 flex text-xs items-center justify-center rounded-2xl right-0 top-0">
                {cartLength}
              </div>
            </Button>
            <Button className="p-1!">
              <img src={images.icons.profile} alt="profile" className="p-2!" />
            </Button>
          </div>
        </div>
      </div>
      {pageType !== "cart" ? (
        <div className="flex justify-between sm:hidden py-3 px-4">
          {stores.map((store) => {
            return (
              <Button
                key={store.title}
                title={store.title}
                onClick={() => setPageType(store.storeName)}
                className={`font-medium flex-1 h-10 
                  ${pageType === store.storeName ? "text-foreground" : "text-grayText"}`}
              />
            );
          })}
        </div>
      ) : (
        ""
      )}
    </header>
  );
}
