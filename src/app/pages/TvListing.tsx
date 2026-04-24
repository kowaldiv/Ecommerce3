import { Listing } from "@/src/app/components/Listing";

export function TvListing(props: {
  setCart: React.Dispatch<React.SetStateAction<Map<number, number>>>;
  cart: Map<number, number>;
}) {
  return <Listing category="tv" {...props} />;
}