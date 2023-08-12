import React, { useEffect, useRef } from "react";

const Clock = () => {
  const clockRef = useRef();

  useEffect(() => {
    const timer = setInterval(() => {
      clockRef.current.textContent = new Date().toLocaleTimeString();
    }, []);
    return () => clearInterval(timer);
  }, []);

  return <span ref={clockRef}></span>;
};

export default Clock;
