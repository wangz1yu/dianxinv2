import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Wallet, Shield, Users, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { assetUrl } from '@/lib/assets';
import { EditorialSectionHeader } from '@/components/editorial/SectionHeader';
import { PaperPanel } from '@/components/editorial/PaperPanel';
import { EditorialList } from '@/components/editorial/EditorialList';

const services = [
  {
    id: 'settlement',
    icon: Wallet,
    title: '灵工结算',
    subtitle: 'T+0极速发薪',
    href: '/services/settlement',
    description: '为企业提供合规、高效的灵活用工结算服务，支持多种支付方式，资金实时到账，降低用工成本30%以上。',
    features: ['T+0极速到账', '合规税务处理', '多支付方式支持', '智能风控系统'],
    color: 'from-[#fbc16a] to-[#fbc779]',
  },
  {
    id: 'insurance',
    icon: Shield,
    href: '/services/insurance',
    title: '日结保险',
    subtitle: '按天计费，次日生效',
    description: '专为灵活用工场景设计的保险产品，按实际工作天数计费，次日自动生效，全面保障用工安全。',
    features: ['按天灵活计费', '次日自动生效', '工伤意外保障', '在线快速理赔'],
    color: 'from-[#fbc779] to-[#fbc16a]',
  },
  {
    id: 'recruitment',
    icon: Users,
    title: '用工招聘',
    href: '/services/recruitment',
    subtitle: '500万+人才库',
    description: '覆盖全国的灵活用工人才网络，智能匹配算法快速找到合适人才，从发布需求到人员到岗最快24小时。',
    features: ['500万+人才库', '智能匹配算法', '24小时快速到岗', '全流程服务'],
    color: 'from-[#fbc16a] to-[#fbc16a]',
  },
];

export default function Services() {
  const [activeService, setActiveService] = useState(0);

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
            label="SERVICES / 产品服务"
            title={
              <>
                目录式呈现：<span className="text-gold-grad">少卡片</span>，多秩序
              </>
            }
            desc="保留原有切换交互，但把呈现方式改成画册版心：更克制、更像白皮书摘要。"
          />
        </motion.div>

        <div className="mt-8 grid lg:grid-cols-12 gap-8">
          {/* Left Menu (keep tab logic) */}
          <div className="lg:col-span-5">
            <div className="border-t border-[rgba(20,18,14,0.12)]">
              {services.map((service, index) => {
                const isActive = activeService === index;
                return (
                  <motion.button
                    key={service.id}
                    onClick={() => setActiveService(index)}
                    initial={{ opacity: 0, x: -14 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
                    className="relative w-full text-left py-4"
                  >
                    <div className="flex items-baseline justify-between gap-4 border-b border-[rgba(20,18,14,0.12)] pb-4">
                      <div className="flex items-baseline gap-3">
                        <span className="text-xs tracking-[0.18em] text-[rgba(20,18,14,0.55)]">
                          {(index + 1).toString().padStart(2, '0')}
                        </span>
                        <span
                          className={`font-display text-lg tracking-[-0.01em] ${
                            isActive ? 'text-[hsl(var(--ink))]' : 'text-[rgba(20,18,14,0.86)]'
                          }`}
                        >
                          {service.title}
                        </span>
                      </div>
                      <span className="text-xs tracking-[0.16em] text-[rgba(20,18,14,0.55)]">
                        {service.subtitle}
                      </span>
                    </div>
                    {isActive ? (
                      <span className="absolute left-0 -bottom-px h-[3px] w-24 bg-gold-grad" />
                    ) : null}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Right Panel */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <PaperPanel className="p-6 sm:p-7">
                  <div className="text-xs tracking-[0.22em] uppercase text-[rgba(20,18,14,0.55)]">
                    {services[activeService].id.toUpperCase()} / {services[activeService].subtitle}
                  </div>
                  <h3 className="mt-2 font-display text-[1.4rem] tracking-[-0.02em] text-[hsl(var(--ink))]">
                    {services[activeService].title}
                  </h3>

                  <div className="mt-4 overflow-hidden rounded-[14px] border border-[rgba(20,18,14,0.10)] bg-white/60">
                    <img
                      src={assetUrl(`images/service-${services[activeService].id}.jpg`)}
                      alt={services[activeService].title}
                      className="h-44 w-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  <p className="mt-4 text-sm leading-[1.75] text-[rgba(20,18,14,0.72)]">
                    {services[activeService].description}
                  </p>

                  <EditorialList
                    items={services[activeService].features.map((f) => (
                      <span key={f}>{f}</span>
                    ))}
                  />

                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <Link to={services[activeService].href}>
                      <Button className="rounded-full px-5">
                        查看更多 <ArrowRight className="ml-2 size-4" />
                      </Button>
                    </Link>
                    <Link to="/about/contact">
                      <Button variant="outline" className="rounded-full px-5 bg-white/60">
                        预约演示
                      </Button>
                    </Link>
                  </div>
                </PaperPanel>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
