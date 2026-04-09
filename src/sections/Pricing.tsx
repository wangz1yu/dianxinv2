import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EditorialSectionHeader } from '@/components/editorial/SectionHeader';

const pricingPlans = [
  {
    name: '灵工结算',
    price: '费用',
    unit: '咨询',
    description: '按实际结算金额计费',
    features: [
      'T+0极速到账',
      '合规税务处理',
      '电子合同签署',
      '基础报表分析',
      '7×12小时客服',
    ],
    cta: '查看详情',
    highlighted: false,
  },
  {
    name: '企业套餐',
    price: '定制',
    unit: '报价',
    description: '为大型企业量身定制',
    features: [
      '专属客户经理',
      'API对接服务',
      '高级数据分析',
      '定制化开发',
      '7×24小时专属服务',
      '优先技术支持',
    ],
    cta: '立即咨询',
    highlighted: true,
  },
  {
    name: '日结保险',
    price: '费用',
    unit: '咨询',
    description: '按实际工作天数计费',
    features: [
      '次日自动生效',
      '工伤意外保障',
      '在线快速理赔',
      '批量投保管理',
      '保险报告导出',
    ],
    cta: '查看详情',
    highlighted: false,
  },
];

export default function Pricing() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <EditorialSectionHeader
            label="PRICING / 费用概览"
            title={
              <>
                对比清单式：<span className="text-gold-grad">更像报价页</span>
              </>
            }
            desc="不做三张“营销卡片”，改成目录式方案清单，更符合企业采购阅读习惯。"
          />
        </motion.div>

        <div className="mt-8 border-t border-[rgba(20,18,14,0.12)]">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="grid gap-4 py-5 border-b border-[rgba(20,18,14,0.12)] lg:grid-cols-[1.45fr_.6fr_.7fr]"
            >
              <div>
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.18em] uppercase text-[rgba(20,18,14,0.76)]">
                    <span className="size-2 rounded-full bg-[hsl(var(--primary))] shadow-[0_0_0_6px_rgba(251,193,106,0.12)]" />
                    {plan.highlighted ? 'RECOMMENDED' : plan.name.toUpperCase().slice(0, 8)}
                  </span>
                  {plan.highlighted ? (
                    <span className="rounded-full border border-[rgba(251,193,106,0.45)] bg-[rgba(251,193,106,0.10)] px-3 py-1 text-xs text-[rgba(20,18,14,0.86)]">
                      推荐
                    </span>
                  ) : null}
                </div>
                <div className="mt-2 font-display text-lg tracking-[-0.01em] text-[hsl(var(--ink))]">
                  {plan.name}
                </div>
                <div className="mt-2 text-sm leading-[1.55] text-[rgba(20,18,14,0.72)]">
                  {plan.description}
                </div>
              </div>

              <div className="lg:text-right">
                <div className="font-display text-xl tracking-[-0.01em] text-gold-grad">
                  {plan.price}
                </div>
                <div className="mt-1 text-xs tracking-[0.12em] text-[rgba(20,18,14,0.55)]">
                  {plan.unit}
                </div>
              </div>

              <div className="flex items-center gap-3 lg:justify-end">
                <Link to="/services">
                  <Button
                    className={`rounded-full px-5 group ${
                      plan.highlighted ? 'border border-[rgba(251,193,106,0.35)] shadow-[0_22px_70px_rgba(251,193,106,0.12)]' : ''
                    }`}
                  >
                    {plan.cta}
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/about/contact">
                  <Button variant="outline" className="rounded-full px-5 bg-white/60">
                    咨询
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
