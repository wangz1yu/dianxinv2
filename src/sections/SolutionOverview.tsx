import { motion } from "framer-motion";
import { HOME25_ECOSYSTEM } from "@/content/home25.copy";
import { assetUrl } from "@/lib/assets";

export default function SolutionOverview() {
  const { title, description, items } = HOME25_ECOSYSTEM;

  return (
    <section className="py-24 bg-[#F5F7FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {title}
            </h2>
            <p className="text-gray-600 max-w-2xl">
              {description}
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {items.map((it, i) => (
                <motion.button
                  key={it.id}
                  type="button"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.04 }}
                  onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
                  className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-gray-800 hover:shadow-md hover:border-gray-300 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  {it.label}
                </motion.button>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="lg:col-span-7"
          >
            <div className="relative overflow-hidden rounded-3xl border border-gray-200 shadow-xl bg-white">
              <img
                src={assetUrl("images/hero-dashboard.jpg")}
                alt=""
                aria-hidden
                className="h-[360px] w-full object-cover"
                loading="lazy"
              />
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(245,247,250,0.0), rgba(245,247,250,0.55) 82%, rgba(245,247,250,0.85))",
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
