import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Hero() {
  return (
    <section className="relative overflow-hidden h-screen min-h-[800px] bg-[hsl(var(--background))]">
      {/* 视频背景（保留） */}
      <video
        src="https://oss.dianxin.love/hero.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
        onError={(e) => {
          // graceful fallback: hide video if it fails to load
          e.currentTarget.style.display = 'none';
        }}
      />

      {/* 深色遮罩（提升可读性） */}
      <div className="absolute inset-0 bg-black/70" />

      {/* 金色微光（克制，不抢视频） */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -left-24 top-[-10%] h-[42rem] w-[42rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(251,193,106,0.22),transparent_62%)] blur-2xl" />
        <div className="absolute -right-24 top-[8%] h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_60%)] blur-2xl" />
      </div>

      {/* 内容浮层（文案保留，排版统一） */}
      <div className="relative z-10 mx-auto flex min-h-[92svh] max-w-6xl items-center px-4 pb-16 pt-28 sm:px-6 lg:px-8">
        <div className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs text-white/80 backdrop-blur"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--primary))] shadow-[0_0_0_7px_rgba(251,193,106,0.12)]" />
            智能用工新时代
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 font-display text-[3rem] leading-[1.02] tracking-tight text-white sm:text-[4rem] lg:text-[5rem]"
          >
            灵活用工
            <br />
            <span className="text-gold-grad">智领未来</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-2xl text-sm leading-relaxed text-white/78 sm:text-base"
          >
            为企业提供一站式灵活用工解决方案，从用工匹配、智能结算到保险保障，
            助力企业降本增效，让用工更简单。
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-4"
          >
            <Button size="lg" className="h-11 rounded-full px-7" asChild>
              <a
                href="https://oss.dianxin.love/%E7%82%B9%E8%96%AA%E7%81%B5%E5%B7%A5%E4%B8%80%E7%AB%99%E5%BC%8F%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                下载解决方案
              </a>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-11 rounded-full px-7 border-white/25 bg-white/5 text-white hover:bg-white/10 hover:text-white"
            >
              <a href="https://oss.dianxin.love/video/cjrw.mp4" target="_blank" rel="noopener noreferrer">
                <Play className="mr-2 w-4 h-4" /> 观看演示
              </a>
            </Button>
          </motion.div>

          <div className="mt-14 grid grid-cols-1 gap-6 text-center text-white sm:grid-cols-3 sm:text-left max-w-3xl">
            {[
              { k: '3000+', v: '服务企业' },
              { k: '20万+', v: '注册人才' },
              { k: '20亿+', v: '年发薪额' },
            ].map((item, i) => (
              <motion.div
                key={item.v}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.22 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                <div className="font-display text-2xl text-white sm:text-3xl">{item.k}</div>
                <div className="mt-1 text-xs text-white/65">{item.v}</div>
                <div className="absolute -bottom-3 left-0 h-px w-10 bg-[rgba(251,193,106,0.55)]" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
