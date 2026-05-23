import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface Props {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
}

export function AnimatedCounter({ value, prefix = "", suffix = "", decimals = 0, duration = 1.2, className = "" }: Props) {
  const [display, setDisplay] = useState(0);
  const counterRef = useRef({ val: 0 });

  useEffect(() => {
    gsap.to(counterRef.current, {
      val: value,
      duration,
      ease: "power2.out",
      onUpdate: () => setDisplay(counterRef.current.val),
    });
  }, [value, duration]);

  const formatted = display.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span className={className}>
      {prefix}{formatted}{suffix}
    </span>
  );
}
