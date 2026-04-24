import { products } from "@/src/data/products";
import { Button } from "../components/Button";
import { images } from "@/src/assets";
import type { PageType } from "../components/Container";

export function Cart({
  setPageType,
  setCart,
  cart,
}: {
  setPageType: (pageType: PageType) => void;
  setCart: React.Dispatch<React.SetStateAction<Map<number, number>>>;
  cart: Map<number, number>;
}) {
  const cartItems = Array.from(cart.entries())
    .map(([id, quantity]) => {
      const product = products.find((p) => p.id === id);
      return { ...product, quantity };
    })
    .filter((item) => item.id);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.price ? item.price : 0) * item.quantity,
    0,
  );

  const tax = Math.round(subtotal * 0.08 * 100) / 100;

  const total = subtotal + tax;

  const formatPrice = (price: number) => {
    return price.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const addToCart = (productId: number) => {
    setCart((prevCart) => {
      const newCart = new Map(prevCart);
      const currentCount = newCart.get(productId) || 0;
      newCart.set(productId, currentCount + 1);
      return newCart;
    });
  };

  const decrementCartItem = (productId: number) => {
    setCart((prevCart) => {
      const newCart = new Map(prevCart);
      const currentCount = newCart.get(productId) || 0;

      if (currentCount <= 1) {
        // Если осталась 1 единица, удаляем товар из корзины
        newCart.delete(productId);
      } else {
        // Иначе уменьшаем количество на 1
        newCart.set(productId, currentCount - 1);
      }

      return newCart;
    });
  };

  const deleteCartItem = (productId: number) => {
    setCart((prevCart) => {
      const newCart = new Map(prevCart);
      newCart.delete(productId);
      return newCart;
    });
  };

  return (
    <div className="max-w-300 flex-1 w-full h-full mx-auto my-8 px-8 flex flex-col gap-6">
      <h1 className="text-2xl font-medium">Shopping Cart</h1>
      {cartItems.length ? (
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 grid gap-4 h-fit">
            {cartItems.map((product) => {
              return (
                <div className="w-full p-4 border border-border rounded-lg">
                  <div className="flex justify-between">
                    <div className="flex gap-4">
                      <img
                        src={product.images ? product.images[0] : ""}
                        alt="product"
                        className="w-24 h-24 rounded-lg"
                      />
                      <div className="grid gap-2">
                        <div>
                          <p className="text-sm text-grayText">
                            {product?.brand}
                          </p>
                          <p className="text-lg">{product?.model}</p>
                        </div>
                        <div className="flex justify-between max-w-32 items-center">
                          <Button
                            onClick={() =>
                              product
                                ? decrementCartItem(
                                    product.id ? product?.id : 0,
                                  )
                                : {}
                            }
                            variant="default"
                            title="-"
                            className="w-8 h-8 flex justify-center items-center"
                          />
                          <span>{product.quantity}</span>
                          <Button
                            onClick={() =>
                              product
                                ? addToCart(product.id ? product?.id : 0)
                                : {}
                            }
                            variant="primary"
                            title="+"
                            className="w-8 h-8 flex justify-center items-center"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col justify-between items-end">
                      <Button
                        onClick={() =>
                          product
                            ? deleteCartItem(product.id ? product?.id : 0)
                            : {}
                        }
                      >
                        <img src={images.icons.bin} alt="bin" />
                      </Button>
                      <p className="text-xl">${product?.price}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="lg:max-w-90 w-full h-fit border border-border rounded-xl p-6">
            <div className="grid gap-6">
              <div className="grid gap-4">
                <p className="font-medium text-xl">Order Summary</p>
                <div className="grid gap-3">
                  <div className="grid gap-3">
                    <div className="flex justify-between">
                      <p className="text-grayText">Subtotal</p>
                      <p>${formatPrice(subtotal)}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-grayText">Tax (8%)</p>
                      <p>${formatPrice(tax)}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-grayText">Shopping</p>
                      <p>Calculated at checkout</p>
                    </div>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-t-border">
                    <p>Total</p>
                    <p className="text-xl">${formatPrice(total)}</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <Button
                  variant="primary"
                  title="Proceed to Checkout"
                  className="pt-2.75! pb-3.25!"
                />
                <Button
                  onClick={() => setPageType("tv")}
                  title="Continue Shopping"
                  className="pt-2.75! pb-3.25! border border-border"
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mx-auto flex flex-col items-center gap-4 mt-24">
          <p className="text-grayText">Your cart is empty</p>
          <Button
            onClick={() => setPageType("tv")}
            title="Continue Shopping"
            variant="primary"
            className="pt-2.75! pb-3.25! px-5!"
          />
        </div>
      )}
    </div>
  );
}
