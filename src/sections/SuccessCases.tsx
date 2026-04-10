import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, Clock, ShieldCheck, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { trackEvent } from '@/lib/analytics';
import { HOME25_CASES } from '@/content/home25.copy';

const iconMap = {
  外卖配送: Clock,
  网约车: ShieldCheck,
  物流仓配: TrendingUp,
} as const;

export default function SuccessCases() {
  return (
    <section id="cases" className="py-24 bg-[hsl(var(--background))]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-display text-foreground mb-4">客户成功案例</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">围绕客户类型、接入时长、效率提升与合规风险，展示可验证成果。</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {HOME25_CASES.map((item, index) => {
            const Icon = iconMap[item.industry];
            return (
              <motion.article
                key={item.industry}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[hsl(var(--card))] rounded-3xl p-8 border border-white/10 shadow-[0_18px_60px_rgba(0,0,0,0.55)] hover:shadow-[0_22px_80px_rgba(0,0,0,0.65)] transition-shadow"
              >
                <div className="w-11 h-11 rounded-xl bg-[rgba(251,193,106,0.14)] border border-[rgba(251,193,106,0.24)] text-[rgba(251,193,106,0.95)] flex items-center justify-center mb-5">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{item.industry}</h3>
                <p className="text-sm text-muted-foreground mb-4">客户类型：{item.customerType} · 接入时长：{item.onboarding}</p>
                <p className="text-foreground/85 mb-4 leading-relaxed">{item.challenge}</p>

                <div className="grid grid-cols-3 gap-3 pt-5 border-t border-white/10">
                  <div><p className="text-xs text-muted-foreground">效率提升</p><p className="text-sm font-semibold text-gold-grad">{item.efficiency}</p></div>
                  <div><p className="text-xs text-muted-foreground">成本下降</p><p className="text-sm font-semibold text-gold-grad">{item.cost}</p></div>
                  <div><p className="text-xs text-muted-foreground">合规风险</p><p className="text-sm font-semibold text-foreground">{item.compliance}</p></div>
                </div>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-12 text-center flex justify-center gap-4 flex-wrap">
          <Link to="/downloads">
            <Button variant="outline" className="rounded-full px-8" onClick={() => trackEvent('download_casebook_entry')}>
              <Download className="w-4 h-4 mr-2" />下载案例 PDF
            </Button>
          </Link>
          <Link to="/about/contact">
            <Button className="rounded-full px-8 group">
              预约顾问
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
