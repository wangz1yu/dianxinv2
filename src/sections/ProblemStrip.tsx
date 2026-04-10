import { motion } from "framer-motion";
import { HOME25_CASES } from "@/content/home25.copy";
import { assetUrl } from "@/lib/assets";

export default function ProblemStrip() {
  const items = HOME25_CASES;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          {items.map((it, idx) => (
            <motion.div
              key={it.industry}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.65,
                delay: idx * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              role="button"
              tabIndex={0}
              onClick={() => document.getElementById("cases")?.scrollIntoView({ behavior: "smooth" })}
              onKeyDown={(e) => {
                if (e.key === "Enter") document.getElementById("cases")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group cursor-pointer rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-lg transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(255,255,255,0.92), rgba(255,255,255,0.92)), url(${assetUrl(
                  "images/hero-dashboard.jpg"
                )})`,
                backgroundSize: "cover",
                backgroundPosition: `${20 + idx * 30}% 30%`,
              }}
            >
              <div className="text-xs tracking-[0.18em] text-gray-500 mb-3">{it.industry}</div>
              <div className="text-gray-800 leading-relaxed">{it.challenge}</div>
              <div className="mt-5 h-px w-10 bg-[rgba(251,193,106,0.55)] origin-left scale-x-0 group-hover:scale-x-100 transition-transform" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
