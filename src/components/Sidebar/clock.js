import React, { useState, useEffect } from 'react';
import './ClockComponent.css';

function ClockComponent() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formatTime = (hours, minutes, seconds) => {
    const amPm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; // Convert 0 to 12 for AM
    return `${formattedHours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')} ${amPm}`;
  };

  return (
    <div className="clock-container">
          <p className="clock-time">{formatTime(time.getHours(), time.getMinutes(), time.getSeconds())}</p>
        </div>
  );
}

export default ClockComponent;