"use client";

import { useEffect, useState } from "react";

export function NepalClock() {
  const [time, setTime] = useState("--:--");
  useEffect(() => {
    const update = () =>
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          timeZone: "Asia/Kathmandu",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(new Date()),
      );
    update();
    const interval = setInterval(update, 30000);
    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <span className="local-time">{time}</span>
      <span className="muted small">Kathmandu · UTC +5:45</span>
    </>
  );
}
