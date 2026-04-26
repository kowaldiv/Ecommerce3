import { SpecialDealTimer } from "./SpecialDealTimer";
import { WeatherWidget } from "./WeatherWidget";
import { Filters, type FilterProps } from "./Filters";
import { ModalButton } from "./ModalButton";

export function SideBar(props: FilterProps) {
  return (
    <aside className="lg:w-3xs w-full h-full grid gap-4">
      <Filters {...props} />
      <SpecialDealTimer />
      <WeatherWidget />
      <ModalButton />
    </aside>
  );
}
