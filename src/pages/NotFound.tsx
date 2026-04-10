import { Link } from "react-router-dom";
import Navbar from "@/sections/Navbar";
import Footer from "@/sections/Footer";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/PageHero";
import { getPageVisual } from "@/lib/siteVisual";

export default function NotFound() {
  const visual = getPageVisual("cases");

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <PageHero
        title={
          <>
            404
            <span className="block text-blue-700">页面不存在或已迁移</span>
          </>
        }
        desc="你访问的地址无效。你可以返回首页继续浏览，也可以直接联系顾问获取资料与建议。"
        primaryHref="/about/contact"
        primaryText="联系顾问"
        secondaryHref="/"
        secondaryText="返回首页"
        visualSrc={visual.src}
        visualPos={visual.pos}
      />

      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold text-gray-900">你可能在找这些</h2>
            <p className="mt-2 text-gray-600 leading-relaxed">
              常用入口：服务能力、行业方案、资料下载与 ROI 试算器。
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "服务能力", href: "/services" },
              { label: "行业方案", href: "/solutions" },
              { label: "资料下载", href: "/downloads" },
              { label: "ROI 试算器", href: "/roi-calculator" },
            ].map((it) => (
              <Link
                key={it.href}
                to={it.href}
                className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-lg transition"
              >
                <div className="text-lg font-semibold text-gray-900">
                  {it.label}
                </div>
                <div className="mt-3">
                  <Button variant="outline" className="rounded-full bg-white/70">
                    前往
                  </Button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
