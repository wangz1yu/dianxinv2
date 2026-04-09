import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, Clock, ShieldCheck, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { trackEvent } from '@/lib/analytics';
import { EditorialSectionHeader } from '@/components/editorial/SectionHeader';

const cases = [
  {
    industry: '外卖配送',
    customerType: '全国连锁平台',
    onboarding: '10个工作日',
    challenge: '高峰期骑手结算压力大，人工对账易出错。',
    efficiency: '+65%',
    cost: '-19%',
    compliance: '劳务纠纷率 -41%',
    icon: Clock,
  },
  {
    industry: '网约车',
    customerType: '多城市运力服务商',
    onboarding: '14个工作日',
    challenge: '跨区域主体管理复杂，支付与票据规则不统一。',
    efficiency: '+58%',
    cost: '-23%',
    compliance: '票据合规率 99.2%',
    icon: ShieldCheck,
  },
  {
    industry: '物流仓配',
    customerType: '仓配一体化企业',
    onboarding: '7个工作日',
    challenge: '临时用工波峰明显，招聘结算链路长。',
    efficiency: '+72%',
    cost: '-16%',
    compliance: '留痕覆盖 100%',
    icon: TrendingUp,
  },
];

export default function SuccessCases() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12"
        >
          <EditorialSectionHeader
            label="CASES / 客户成功案例"
            title={
              <>
                客户成功案例：<span className="text-gold-grad">可验证成果</span>
              </>
            }
            desc="围绕客户类型、接入时长、效率提升与合规风险，展示可验证成果。"
            align="left"
          />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {cases.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.industry}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/70 rounded-3xl p-8 border border-[rgba(20,18,14,0.12)] shadow-[0_26px_80px_rgba(20,18,14,0.10)] hover:shadow-[0_30px_90px_rgba(20,18,14,0.12)] transition-shadow"
              >
                <div className="w-11 h-11 rounded-xl bg-[rgba(251,193,106,0.14)] border border-[rgba(251,193,106,0.24)] text-[rgba(20,18,14,0.72)] flex items-center justify-center mb-5">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold font-display text-[hsl(var(--ink))] mb-3">{item.industry}</h3>
                <p className="text-sm text-[rgba(20,18,14,0.55)] mb-4">客户类型：{item.customerType} · 接入时长：{item.onboarding}</p>
                <p className="text-[rgba(20,18,14,0.82)] mb-4 leading-relaxed">{item.challenge}</p>

                <div className="grid grid-cols-3 gap-3 pt-5 border-t border-[rgba(20,18,14,0.10)]">
                  <div><p className="text-xs text-[rgba(20,18,14,0.55)]">效率提升</p><p className="text-sm font-semibold text-gold-grad">{item.efficiency}</p></div>
                  <div><p className="text-xs text-[rgba(20,18,14,0.55)]">成本下降</p><p className="text-sm font-semibold text-gold-grad">{item.cost}</p></div>
                  <div><p className="text-xs text-[rgba(20,18,14,0.55)]">合规风险</p><p className="text-sm font-semibold text-[rgba(20,18,14,0.82)]">{item.compliance}</p></div>
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
