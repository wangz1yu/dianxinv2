import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { assetUrl } from '@/lib/assets';

const navItems = [
  { label: '首页', href: '/' },
  { 
    label: '产品服务', 
    href: '/services',
    children: [
      { label: '灵工结算', href: '/services/settlement' },
      { label: '日结保险', href: '/services/insurance' },
      { label: '用工招聘', href: '/services/recruitment' },
    ]
  },
  { 
    label: '解决方案', 
    href: '/solutions',
    children: [
      { label: '外卖配送', href: '/solutions/delivery' },
      { label: '网约车', href: '/solutions/ride' },
      { label: '家政服务', href: '/solutions/housekeeping' },
      { label: '电商物流', href: '/solutions/logistics' },
    ]
  },
  {
    label: '客户案例',
    href: '/cases',
  },
  {
    label: '内容中心',
    href: '/insights',
    children: [
      { label: '行业洞察', href: '/insights' },
      { label: '下载中心', href: '/downloads' },
      { label: 'ROI试算器', href: '/roi-calculator' },
      { label: '合规与安全中心', href: '/compliance-center' },
    ]
  },
  { 
    label: '关于我们', 
    href: '/about/company',
    children: [
      { label: '公司介绍', href: '/about/company' },
      { label: '发展历程', href: '/about/history' },
      { label: '联系我们', href: '/about/contact' },
    ]
  },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();
  const isHome = location.pathname === '/';
  const effectiveScrolled = isScrolled || !isHome;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <nav
          className={`mt-4 flex items-center justify-between gap-3 rounded-2xl border transition-all duration-300 ${
            effectiveScrolled
              ? 'border-white/10 bg-[hsl(var(--background))]/80 shadow-[0_18px_60px_rgba(0,0,0,0.45)] backdrop-blur'
              : 'border-white/10 bg-white/5 text-white backdrop-blur'
          } px-4 py-3`}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img 
              src={assetUrl('favicon.png')} 
              alt="点薪云" 
              className="w-8 h-8 object-contain"
            />
            <span className={`font-display text-lg tracking-tight ${
              effectiveScrolled ? 'text-foreground' : 'text-white'
            }`}>
              点薪云
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div 
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to={item.href}
                  className={`group relative flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium transition-colors ${
                    effectiveScrolled
                      ? isActive(item.href)
                        ? 'text-foreground'
                        : 'text-foreground/70 hover:text-foreground'
                      : isActive(item.href)
                        ? 'text-white'
                        : 'text-white/75 hover:text-white'
                  }`}
                >
                  {item.label}
                  {item.children && (
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                      activeDropdown === item.label ? 'rotate-180' : ''
                    }`} />
                  )}
                  <span
                    className={`absolute inset-x-3 -bottom-0.5 h-px origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 ${
                      effectiveScrolled ? 'bg-[rgba(251,193,106,0.55)]' : 'bg-[rgba(251,193,106,0.45)]'
                    } ${isActive(item.href) ? 'scale-x-100' : ''}`}
                  />
                </Link>
                
                {/* Dropdown */}
                {item.children && activeDropdown === item.label && (
                  <div className="absolute top-full left-0 pt-2">
                    <div className="min-w-[200px] overflow-hidden rounded-2xl border border-white/10 bg-[hsl(var(--card))] shadow-[0_18px_70px_rgba(0,0,0,0.55)]">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          to={child.href}
                          className="block px-4 py-3 text-sm text-foreground/80 hover:bg-white/5 hover:text-foreground transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <a href="https://www.dianxingg.cn" target="_blank" rel="noopener noreferrer">
              <Button
                variant="ghost"
                className={`rounded-full ${
                  effectiveScrolled ? 'text-foreground/80 hover:text-foreground hover:bg-white/5' : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                登录结算系统
              </Button>
            </a>
            <a href="https://beta.dianxingg.cn/platform/v2/index.html" target="_blank" rel="noopener noreferrer">
              <Button className="rounded-full px-6">
                获取API接口
              </Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden p-2 rounded-xl transition-colors ${
              effectiveScrolled ? 'text-foreground hover:bg-white/5' : 'text-white hover:bg-white/10'
            }`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 rounded-3xl border border-white/10 bg-[hsl(var(--card))]/95 shadow-[0_18px_70px_rgba(0,0,0,0.55)] backdrop-blur overflow-hidden">
            <div className="p-4 space-y-2 max-h-[calc(100vh-8rem)] overflow-y-auto overscroll-contain">
              {navItems.map((item) => (
                <div key={item.label}>
                  <Link
                    to={item.href}
                    className={`block rounded-2xl px-4 py-3 text-sm font-medium ${
                      isActive(item.href) ? 'bg-white/5 text-foreground' : 'text-foreground/75 hover:bg-white/5 hover:text-foreground'
                    }`}
                    onClick={() => !item.children && setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <div className="ml-4 mt-1 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          to={child.href}
                          className="block px-4 py-2 text-sm text-foreground/65 hover:text-foreground"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-4 border-t border-white/10 flex gap-3">
                <a href="https://www.dianxingg.cn" target="_blank" rel="noopener noreferrer" className="flex-1">
                  <Button variant="outline" className="flex-1 rounded-full">
                    登录结算系统
                  </Button>
                </a>
                <Link to="/about/contact" className="flex-1">
                  <Button className="flex-1 rounded-full">
                    联系我们
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
