import { images } from "@/src/assets";
import { useEffect, useState } from "react";
import { Button } from "../Button";

const initialTimeLeft = 3599;

const formatTime = (totalSeconds: number): string => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${hours.toString()}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

export function SpecialDealTimer() {
  const [isSpecialDealBlockClose, setIsSpecialDealBlockClose] = useState(false);
  const [timeLeft, setTimeLeft] = useState(initialTimeLeft);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    // тут отсчет идет
    let intervalId: number | null = null;

    if (isActive && timeLeft > 0) {
      intervalId = setInterval(() => {
        setTimeLeft((prev) => {
          const newValue = prev - 1;
          if (newValue <= 0) {
            setIsActive(false);
            return 0;
          }
          return newValue;
        });
      }, 1000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isActive, timeLeft]);

  return (
    <div
      className={`p-4 bg-linear-to-r from-[#D4183D] to-[rgba(212,24,61,0.8)] rounded-xl grid gap-2 relative 
          ${isSpecialDealBlockClose ? "hidden" : ""}`}
    >
      <Button
        onClick={() => {
          setIsSpecialDealBlockClose(true);
          setIsActive(false);
        }}
        className="absolute right-2 top-2"
      >
        <img src={images.icons.close} alt="" />
      </Button>
      <div className="flex gap-2 items-center">
        <img src={images.icons.clock} alt="clock" />
        <p className="text-background font-medium text-lg">Special Deal!</p>
      </div>
      <div className="text-background">
        <p>Register now to unlock exclusive offers and discounts</p>
        <div className="flex gap-5">
          <p>Offer expires in:</p>
          <p>{timeLeft ? formatTime(timeLeft) : "таймер истёк"}</p>
        </div>
      </div>
      <div className="grid gap-3">
        <div className="w-full flex gap-3">
          <Button
            variant="default"
            className="flex-1!"
            title="Stop"
            onClick={() => setIsActive(false)}
            disabled={!isActive || timeLeft === 0}
          />
          <Button
            variant="default"
            className="flex-1!"
            title="Resume"
            onClick={() => setIsActive(true)}
            disabled={isActive || timeLeft === 0}
          />
        </div>
        <div>
          <Button
            variant="default"
            className="w-full"
            title="Restart"
            disabled={timeLeft !== 0}
            onClick={() => {
              setTimeLeft(initialTimeLeft);
              setIsActive(true);
            }}
          />
        </div>
      </div>
    </div>
  );
}
