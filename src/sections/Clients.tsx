import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { assetUrl } from '@/lib/assets';
import { EditorialSectionHeader } from '@/components/editorial/SectionHeader';

const clients = [
  { name: '美团', logo: assetUrl('images/logo-meituan.jpg') },
  { name: '饿了么', logo: assetUrl('images/logo-eleme.jpg') },
  { name: '滴滴', logo: assetUrl('images/logo-didi.jpg') },
  { name: '京东', logo: assetUrl('images/logo-jd.jpg') },
  { name: '顺丰', logo: assetUrl('images/logo-shunfeng.jpg') },
  { name: '盒马', logo: assetUrl('images/logo-hema.jpg') },
  { name: '叮咚买菜', logo: assetUrl('images/logo-ddmc.jpg') },
  { name: '达达', logo: assetUrl('images/logo-dada.jpg') },
  { name: '闪送', logo: assetUrl('images/logo-shansong.jpg') },
  { name: 'UU跑腿', logo: assetUrl('images/logo-uu.jpg') },
  { name: '曹操出行', logo: assetUrl('images/logo-caocao.jpg') },
  { name: 'T3出行', logo: assetUrl('images/logo-t3.jpg') },
  { name: '货拉拉', logo: assetUrl('images/logo-huolala.jpg') },
  { name: '菜鸟', logo: assetUrl('images/logo-cainiao.jpg') },
  { name: '蜂鸟众包', logo: assetUrl('images/logo-fengniao.jpg') },
];

// 复制多份确保无缝循环
const duplicatedClients = [...clients, ...clients, ...clients];

export default function Clients() {
  return (
    <section className="py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10"
        >
          <EditorialSectionHeader
            label="CLIENTS / 合作名录"
            title={
              <>
                画廊带：<span className="text-gold-grad">干净的品牌露出</span>
              </>
            }
            desc="保留原无限滚动动效，但整体容器更像“画廊展示带”。"
          />
          <div className="mt-6">
            <Button className="rounded-full px-8">立即咨询</Button>
          </div>
        </motion.div>

        {/* Client Logos - Infinite Scroll */}
        <div className="relative border-y border-[rgba(20,18,14,0.12)] py-5">
          {/* Gradient Masks */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[hsl(var(--paper))] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[hsl(var(--paper))] to-transparent z-10 pointer-events-none" />

          {/* Scrolling Container */}
          <div className="flex overflow-hidden">
            <motion.div
              animate={{ x: ['0%', '-33.33%'] }}
              transition={{
                duration: 40,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="flex gap-6"
            >
              {duplicatedClients.map((client, index) => (
                <div
                  key={`scroll-${index}`}
                  className="flex-shrink-0 w-24 h-16 bg-white rounded-xl flex items-center justify-center transition-all group border border-[rgba(20,18,14,0.10)] overflow-hidden"
                >
                  <img 
                    src={client.logo} 
                    alt={client.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Second Row - Reverse Direction */}
        <div className="relative mt-5 border-b border-[rgba(20,18,14,0.12)] pb-5">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[hsl(var(--paper))] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[hsl(var(--paper))] to-transparent z-10 pointer-events-none" />

          <div className="flex overflow-hidden">
            <motion.div
              animate={{ x: ['-33.33%', '0%'] }}
              transition={{
                duration: 45,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="flex gap-6"
            >
              {[...duplicatedClients].reverse().map((client, index) => (
                <div
                  key={`scroll-reverse-${index}`}
                  className="flex-shrink-0 w-24 h-16 bg-white rounded-xl flex items-center justify-center transition-all group border border-[rgba(20,18,14,0.10)] overflow-hidden"
                >
                  <img 
                    src={client.logo} 
                    alt={client.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
