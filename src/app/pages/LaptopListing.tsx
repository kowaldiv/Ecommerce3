import { Listing } from "@/src/app/components/listing/Listing";

export function LaptopListing(props: {
  setCart: React.Dispatch<React.SetStateAction<Map<number, number>>>;
  cart: Map<number, number>;
}) {
  return <Listing category="laptop" {...props} />;
}