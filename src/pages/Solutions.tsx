import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Truck, Zap, Home, Bike, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/sections/Navbar';
import Footer from '@/sections/Footer';

const solutions = [
  {
    id: 'delivery',
    title: '同城配送',
    icon: Truck,
    color: 'from-[#fbc16a] to-[#fbc779]',
    path: '/solutions/delivery',
    description: '覆盖全城的配送网络，快速匹配专业配送人员，确保订单及时交付，提升客户满意度。',
    features: ['实时订单处理', '专业配送团队', '溯源追踪系统', '保险保障'],
  },
  {
    id: 'housekeeping',
    title: '家政保洁',
    icon: Home,
    color: 'from-[#fbc779] to-[#fbc16a]',
    path: '/solutions/housekeeping',
    description: '连接优质家政人员与家庭用户，提供上门保洁、家务帮手等多项服务，让生活更便利。',
    features: ['严格人员审核', '灵活服务时间', '服务评价体系', '安全责任保险'],
  },
  {
    id: 'ride',
    title: '通勤拼车',
    icon: Bike,
    color: 'from-[#fbc16a] to-[#fbc16a]',
    path: '/solutions/ride',
    description: '为企业员工提供便利的通勤服务，智能匹配拼车方案，降低企业交通成本，提升员工体验。',
    features: ['智能路线规划', '企业团体方案', '费用透明计算', '安全担保机制'],
  },
  {
    id: 'logistics',
    title: '物流仓储',
    icon: Zap,
    color: 'from-[#fbc779] to-[#fbc779]',
    path: '/solutions/logistics',
    description: '全链路物流解决方案，从仓储、分拣到配送，借助人工智能和灵活用工模式实现降本增效。',
    features: ['智能仓储管理', '分拣优化算法', '快速配送网络', '数据分析报告'],
  },
];

export default function Solutions() {
  return (
    <div className="min-h-screen bg-[hsl(var(--background))] text-foreground">
      <Navbar />
      
      <section className="relative pt-32 pb-20 bg-[hsl(var(--background))] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -left-32 top-[-35%] h-[42rem] w-[42rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(251,193,106,0.16),transparent_60%)] blur-2xl" />
          <div className="absolute -right-28 top-[-20%] h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_60%)] blur-2xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold font-display text-foreground mb-6">行业解决方案</h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              覆盖多个行业场景，为企业数字化转型提供完整解决方案
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-[hsl(var(--background))]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {solutions.map((solution, index) => {
              const Icon = solution.icon;
              return (
                <motion.div
                  key={solution.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-[hsl(var(--card))] rounded-3xl border border-white/10 shadow-[0_18px_60px_rgba(0,0,0,0.55)] hover:shadow-[0_22px_80px_rgba(0,0,0,0.65)] transition-all duration-300 overflow-hidden group"
                >
                  <div className={`h-32 bg-gradient-to-br ${solution.color}`} />
                  <div className="p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${solution.color} flex items-center justify-center`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-foreground">{solution.title}</h3>
                    </div>
                    
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {solution.description}
                    </p>

                    <div className="space-y-2 mb-8">
                      {solution.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-foreground/80">
                          <div className="w-1.5 h-1.5 rounded-full bg-[rgba(251,193,106,0.9)]" />
                          {feature}
                        </div>
                      ))}
                    </div>

                    <Link to={solution.path} className="block">
                      <Button className="w-full rounded-xl group">
                        查看方案
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
