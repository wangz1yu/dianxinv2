import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import DemoSettlement from "@/sections/DemoSettlement";
import DemoContract from "@/sections/DemoContract";
import DemoRiskControl from "@/sections/DemoRiskControl";

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function DemosStory() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState(0);

  const steps = useMemo(() => [0, 1, 2], []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const viewH = window.innerHeight || 1;
        const total = rect.height - viewH;
        const progressed = clamp((viewH * 0.2 - rect.top) / (total || 1), 0, 0.9999);
        const idx = Math.floor(progressed * 3);
        setActive(idx);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-white" style={{ height: "320vh" }}>
      <div className="sticky top-24 h-[calc(100vh-6rem)] flex items-center">
        <div className="w-full">
          {/* indicator (no text, no copy changes) */}
          <div className="mx-auto mb-6 flex max-w-7xl items-center justify-center gap-2">
            {steps.map((s) => (
              <span
                key={s}
                className={`h-1.5 w-8 rounded-full transition-colors ${
                  active === s ? "bg-blue-600" : "bg-gray-200"
                }`}
              />
            ))}
          </div>

          <div className="relative">
            {[0, 1, 2].map((idx) => (
              <motion.div
                key={idx}
                initial={false}
                animate={{
                  opacity: active === idx ? 1 : 0,
                  y: active === idx ? 0 : 16,
                  filter: active === idx ? "blur(0px)" : "blur(2px)",
                }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className={`absolute inset-0 ${active === idx ? "pointer-events-auto" : "pointer-events-none"}`}
              >
                {idx === 0 ? <DemoSettlement embedded /> : null}
                {idx === 1 ? <DemoContract embedded /> : null}
                {idx === 2 ? <DemoRiskControl embedded /> : null}
              </motion.div>
            ))}
            {/* Spacer to give the absolute children height context */}
            <div className="opacity-0">
              <DemoSettlement embedded />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

