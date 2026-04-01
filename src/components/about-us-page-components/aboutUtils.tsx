// components/about/aboutUtils.tsx
"use client";
import { useEffect, useRef, useState } from "react";

/* ── Scroll-reveal hook ── */
export function useScrollReveal(threshold = 0.1) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, visible };
}

/* ── Animated number counter ── */
export function AnimatedCounter({ target, suffix = "" }: { target: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  const numeric = parseInt(target.replace(/\D/g, ""));
  const hasPlus = target.includes("+");

  useEffect(() => {
    const el = ref.current;
    if (!el || isNaN(numeric)) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const steps = 50;
          const inc = numeric / steps;
          let cur = 0;
          const timer = setInterval(() => {
            cur += inc;
            if (cur >= numeric) { setCount(numeric); clearInterval(timer); }
            else setCount(Math.floor(cur));
          }, 1800 / steps);
        }
      },
      { threshold: 0.5 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [numeric]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {hasPlus ? "+" : ""}
      {suffix}
    </span>
  );
}