import { useEffect, useState } from "react";

type CountUpNumberProps = {
  end: number;
  active: boolean;
  duration?: number;
  suffix?: string;
};

const formatNumber = (value: number) =>
  new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 0 }).format(value);

const easeOutCubic = (value: number) => 1 - Math.pow(1 - value, 3);

const CountUpNumber = ({
  end,
  active,
  duration = 1600,
  suffix = "",
}: CountUpNumberProps) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!active) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      setCurrent(end);
      return;
    }

    let frameId = 0;
    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      startTime ??= timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setCurrent(Math.round(end * easeOutCubic(progress)));

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameId);
  }, [active, duration, end]);

  return (
    <>
      {formatNumber(current)}
      {suffix}
    </>
  );
};

export default CountUpNumber;
