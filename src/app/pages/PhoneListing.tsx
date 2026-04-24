import { Listing } from "@/src/app/components/Listing";

export function PhoneListing(props: {
  setCart: React.Dispatch<React.SetStateAction<Map<number, number>>>;
  cart: Map<number, number>;
}) {
  return <Listing category="phone" {...props} />;
}