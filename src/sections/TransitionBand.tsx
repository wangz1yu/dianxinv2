import { motion } from "framer-motion";
import { EditorialSectionHeader } from "@/components/editorial/SectionHeader";
import { PaperPanel } from "@/components/editorial/PaperPanel";

export default function TransitionBand() {
  return (
    <section className="bg-paper paper-grain relative py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <EditorialSectionHeader
          label="TRANSITION / 过渡带"
          title={
            <>
              从视频进入画册：<span className="text-gold-grad">合规必须可追溯</span>
            </>
          }
          desc="这段用于衔接 Hero（蓝色视频）与后续暖白纸感：让用户滚动到第二屏时自然“进入画册”。"
          align="left"
        />

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <PaperPanel
            className="mt-6 p-5"
            style={{
              background:
                "radial-gradient(680px 180px at 18% 0%, rgba(251,193,106,0.16), transparent 55%), rgba(255,255,255,0.55)",
            }}
          >
            <div className="font-display text-lg tracking-[-0.01em] text-[hsl(var(--ink))]">
              把结算、合同、凭证与风控写进同一条链路里。
            </div>
            <div className="mt-2 text-sm text-[rgba(20,18,14,0.72)]">
              每一笔发薪，都能被解释；每一次用工，都有证据。
            </div>
          </PaperPanel>
        </motion.div>
      </div>
    </section>
  );
}

