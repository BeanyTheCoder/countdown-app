import React, { useState, useEffect } from "react";
import "./Countdown.css";

export default function Countdown() {
  const calculateTimeLeft = () => {
    const targetDate = new Date('January 1, 2025 00:00:00').getTime();
    const currentDate = new Date().getTime();
    const difference = targetDate - currentDate;

    return difference > 0
      ? {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / (1000 * 60)) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        }
      : null;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!timeLeft) {
    return (
      <div className="celebration">
        <h1 className="celebration-message">🎉 YAAY! It's 2025! 🥳</h1>
        <h2 className="footnote">PS: you can leave now, it's over 😕</h2>
      </div>
    );
  }

  return (
    <div className="countdown-container">
      <h1>Countdown to 2025!</h1>
      <div className="countdown">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit} className="time-unit">
            <span>{value}</span>
            <p>{unit.charAt(0).toUpperCase() + unit.slice(1)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
