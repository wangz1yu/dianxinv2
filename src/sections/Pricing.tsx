import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
    <section className="py-24 bg-[hsl(var(--background))]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-display text-foreground mb-4">
            费用概览
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            透明的定价体系，灵活的付费方式，让每一分钱都物有所值
          </p>
          <Link to="/about/contact">
            <Button className="mt-6 rounded-full px-8">
              立即咨询
            </Button>
          </Link>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-3xl p-8 ${
                plan.highlighted 
                  ? 'bg-[hsl(var(--card))] text-foreground shadow-[0_28px_90px_rgba(0,0,0,0.65)] scale-[1.03] border border-[rgba(251,193,106,0.35)]' 
                  : 'bg-[hsl(var(--card))] border border-white/10 text-foreground hover:shadow-[0_22px_70px_rgba(0,0,0,0.55)] transition-shadow'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gold-grad text-[hsl(var(--primary-foreground))] text-sm font-semibold rounded-full shadow-[0_20px_60px_rgba(251,193,106,0.18)]">
                  推荐方案
                </div>
              )}

              {/* Plan Name */}
              <div className="text-center mb-6">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
                  plan.highlighted ? 'bg-[rgba(251,193,106,0.14)] border border-[rgba(251,193,106,0.24)]' : 'bg-white/5 border border-white/10'
                }`}>
                  <span className={`text-2xl font-bold ${
                    plan.highlighted ? 'text-[rgba(251,193,106,0.95)]' : 'text-foreground'
                  }`}>
                    {plan.name.charAt(0)}
                  </span>
                </div>
                <h3 className={`text-xl font-bold ${
                  plan.highlighted ? 'text-foreground' : 'text-foreground'
                }`}>
                  {plan.name}
                </h3>
              </div>

              {/* Price */}
              <div className="text-center mb-6">
                <div className="flex items-baseline justify-center gap-1">
                  <span className={`text-4xl font-bold ${
                    plan.highlighted ? 'text-gold-grad' : 'text-gold-grad'
                  }`}>
                    {plan.price}
                  </span>
                  <span className={plan.highlighted ? 'text-muted-foreground' : 'text-muted-foreground'}>
                    {plan.unit}
                  </span>
                </div>
                <p className={`text-sm mt-2 ${
                  plan.highlighted ? 'text-muted-foreground' : 'text-muted-foreground'
                }`}>
                  {plan.description}
                </p>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                      plan.highlighted
                        ? 'bg-[rgba(251,193,106,0.14)] border border-[rgba(251,193,106,0.24)]'
                        : 'bg-white/5 border border-white/10'
                    }`}>
                      <Check className={`w-3 h-3 ${
                        plan.highlighted ? 'text-[rgba(251,193,106,0.95)]' : 'text-[rgba(251,193,106,0.9)]'
                      }`} />
                    </div>
                    <span className={`text-sm ${
                      plan.highlighted ? 'text-foreground/85' : 'text-foreground/80'
                    }`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Link to="/services" className="block">
                <Button 
                  className="w-full rounded-full group"
                >
                  {plan.cta}
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
