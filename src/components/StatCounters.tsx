"use client";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { stiffness: 60, damping: 20 });

  useEffect(() => {
    if (inView) motionValue.set(value);
  }, [inView, motionValue, value]);

  useEffect(() => {
    const unsub = spring.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${Math.round(latest).toLocaleString()}${suffix}`;
      }
    });
    return unsub;
  }, [spring, suffix]);

  return <span ref={ref} className="stat-number" />;
}

const stats = [
  { value: 6, suffix: "+", label: "Branches & departments covered" },
  { value: 24, suffix: "/7", label: "Tip line intake for families" },
  { value: 100, suffix: "%", label: "Independent — no command filter" },
  { value: 1, suffix: "", label: "Family at a time we refuse to abandon" },
];

export function StatCounters() {
  return (
    <section className="relative border-y border-ink/10 bg-paper-deep texture-paper">
      <div className="absolute inset-x-0 top-0 hairline" />
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4 md:px-8 md:py-16">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="relative border border-ink/10 bg-paper/80 p-5 shadow-[var(--shadow-edge)]"
          >
            <Counter value={stat.value} suffix={stat.suffix} />
            <p className="mt-3 text-sm leading-snug text-slate">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
