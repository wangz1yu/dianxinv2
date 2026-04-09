import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';
import { assetUrl } from '@/lib/assets';

const footerLinks = {
  company: {
    title: '公司',
    links: [
      { label: '关于我们', href: '/about/company' },
      { label: '发展历程', href: '/about/history' },
      { label: '联系我们', href: '/about/contact' },
    ],
  },
  products: {
    title: '产品',
    links: [
      { label: '灵工结算', href: '/services/settlement' },
      { label: '日结保险', href: '/services/insurance' },
      { label: '用工招聘', href: '/services/recruitment' },
    ],
  },
  solutions: {
    title: '解决方案',
    links: [
      { label: '外卖配送', href: '/solutions/delivery' },
      { label: '网约车', href: '/solutions/ride' },
      { label: '家政服务', href: '/solutions/housekeeping' },
      { label: '电商物流', href: '/solutions/logistics' },
    ],
  },
};

export default function Footer() {
  return (
    <footer className="bg-paper paper-grain relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
          {/* Logo & Description */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img 
                src={assetUrl('favicon.png')} 
                alt="点薪云" 
                className="w-8 h-8 object-contain"
              />
              <span className="text-xl font-bold font-display text-[hsl(var(--ink))]">点薪云</span>
            </Link>
            <p className="text-[rgba(20,18,14,0.72)] text-sm mb-6 max-w-xs leading-relaxed">
              社会化用工方案服务商。以合规、风控与效率为底层能力，帮助企业把用工做成可控系统。
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-[rgba(20,18,14,0.72)]">
                <Phone className="w-4 h-4" />
                <span>17340094007</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[rgba(20,18,14,0.72)]">
                <Mail className="w-4 h-4" />
                <span>wangziyu@dianxingg.com.cn</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[rgba(20,18,14,0.72)]">
                <MapPin className="w-4 h-4" />
                <span>安徽省合肥市蜀山区南七街道望江西路华润五彩国际1303室</span>
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.values(footerLinks).map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold font-display text-[hsl(var(--ink))] mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link 
                      to={link.href}
                      className="group inline-flex items-center text-sm text-[rgba(20,18,14,0.72)] hover:text-[hsl(var(--ink))] transition-colors"
                    >
                      {link.label}
                      <span className="ml-2 h-px w-10 bg-[rgba(20,18,14,0.24)] origin-left scale-x-0 group-hover:scale-x-100 transition-transform" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[rgba(20,18,14,0.12)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-6 text-sm text-[rgba(20,18,14,0.55)]">
              <span>© 2025 点薪云® 皖ICP备2024034333号</span>
            </div>
            
            {/* Language Selector */}
            <div className="flex items-center gap-4 text-sm text-[rgba(20,18,14,0.55)]">
              <span className="hover:text-[hsl(var(--ink))] cursor-pointer transition-colors">EN</span>
              <span className="hover:text-[hsl(var(--ink))] cursor-pointer transition-colors">繁體</span>
              <span className="text-[hsl(var(--ink))] cursor-pointer">简体</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
