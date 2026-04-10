import { useEffect } from "react";
import { ArrowRight, Download } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/sections/Navbar";
import Footer from "@/sections/Footer";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/PageHero";
import { SectionNav } from "@/components/site/SectionNav";
import { trackEvent } from "@/lib/analytics";
import { assetUrl } from "@/lib/assets";
import { getPageVisual } from "@/lib/siteVisual";

type ResourceItem = {
  id: string;
  title: string;
  desc: string;
  meta: string;
  href: string;
  external?: boolean;
};

const SOLUTION_PDF =
  "https://oss.dianxin.love/%E7%82%B9%E8%96%AA%E7%81%B5%E5%B7%A5%E4%B8%80%E7%AB%99%E5%BC%8F%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88.pdf";
const DEMO_VIDEO = "https://oss.dianxin.love/video/cjrw.mp4";

const PACKS: ResourceItem[] = [
  {
    id: "solution-pack",
    title: "点薪灵工一站式解决方案（资料包）",
    desc: "包含业务场景拆解、交付路径、风险边界与上线节奏，适合用于内部评审与需求对齐。",
    meta: "PDF · 更新：2026-04",
    href: SOLUTION_PDF,
    external: true,
  },
  {
    id: "delivery-checklist",
    title: "上线交付清单（示例）",
    desc: "从主体校验、数据对接到验收与留痕归档的关键动作清单，便于你评估投入与排期。",
    meta: "清单 · 需索取",
    href: "/about/contact?topic=download&item=delivery-checklist",
  },
  {
    id: "case-demo-video",
    title: "案例演示视频（结算与风控流程）",
    desc: "用短视频演示“批量结算—异常复核—留痕归档”的典型路径，便于业务与财务同步理解。",
    meta: "MP4 · 3-5 分钟",
    href: DEMO_VIDEO,
    external: true,
  },
];

const TEMPLATES: ResourceItem[] = [
  {
    id: "settlement-rule-template",
    title: "结算规则配置模板",
    desc: "用于梳理不同城市/业务线的结算口径、计费规则与异常处理方式，帮助快速完成“口径对齐”。",
    meta: "XLSX · 需索取",
    href: "/about/contact?topic=download&item=settlement-rule-template",
  },
  {
    id: "tax-ticket-materials",
    title: "税票材料清单模板",
    desc: "整理申报、票据与留痕材料清单，便于法务与财务做尽调或审计准备。",
    meta: "DOCX · 需索取",
    href: "/about/contact?topic=download&item=tax-ticket-materials",
  },
];

const LICENSES: ResourceItem[] = [
  {
    id: "qualification-1",
    title: "软件著作权（示例）",
    desc: "用于尽调材料展示与内部存档示例。",
    meta: "SVG · 可直接打开",
    href: assetUrl("images/qualifications/qualification-1.svg"),
    external: true,
  },
  {
    id: "qualification-2",
    title: "信息系统安全等级保护（示例）",
    desc: "用于合规中心展示与内部留档示例。",
    meta: "SVG · 可直接打开",
    href: assetUrl("images/qualifications/qualification-2.svg"),
    external: true,
  },
  {
    id: "qualification-3",
    title: "互联网信息服务相关资质（示例）",
    desc: "用于对外尽调说明与内部归档示例。",
    meta: "SVG · 可直接打开",
    href: assetUrl("images/qualifications/qualification-3.svg"),
    external: true,
  },
];

function ResourceCard({ item }: { item: ResourceItem }) {
  const card = (
    <div className="group rounded-3xl border border-gray-200 bg-white p-7 shadow-sm hover:shadow-lg transition">
      <div className="flex items-start justify-between gap-6">
        <div>
          <div className="text-lg font-semibold text-gray-900">{item.title}</div>
          <div className="mt-2 text-gray-600 leading-relaxed">{item.desc}</div>
          <div className="mt-4 text-sm text-gray-500">{item.meta}</div>
        </div>
        <div className="shrink-0">
          <div className="h-11 w-11 rounded-2xl bg-blue-600/10 text-blue-700 flex items-center justify-center">
            <Download className="h-5 w-5" />
          </div>
        </div>
      </div>
      <div className="mt-6 inline-flex items-center text-sm font-medium text-blue-700 group-hover:text-blue-800">
        打开/索取
        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
      </div>
    </div>
  );

  if (item.external) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent("download_resource", { resource: item.id })}
        className="block"
      >
        {card}
      </a>
    );
  }

  return (
    <Link
      to={item.href}
      onClick={() => trackEvent("download_resource", { resource: item.id })}
      className="block"
    >
      {card}
    </Link>
  );
}

export default function Downloads() {
  useEffect(() => window.scrollTo(0, 0), []);
  const visual = getPageVisual("downloads");

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <PageHero
        title={
          <>
            下载中心
            <span className="block text-blue-700">把评估资料前置到决策前</span>
          </>
        }
        desc="统一汇总资料包、交付清单与合规证照示例。对外尽调或上线前评审时，可直接按模块下载/索取。"
        primaryHref="/about/contact"
        primaryText="索取对公资料"
        secondaryHref="/compliance-center"
        secondaryText="查看合规中心"
        visualSrc={visual.src}
        visualPos={visual.pos}
      />

      <SectionNav
        items={[
          { id: "packs", label: "资料包" },
          { id: "templates", label: "模板" },
          { id: "licenses", label: "证照示例" },
          { id: "cta", label: "下一步" },
        ]}
      />

      <section className="py-16 bg-white" id="packs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold text-gray-900">资料包</h2>
            <p className="mt-2 text-gray-600 leading-relaxed">
              用于方案评审、内部对齐或前期沟通的基础材料。
            </p>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {PACKS.map((it) => (
              <ResourceCard key={it.id} item={it} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#F5F7FA]" id="templates">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold text-gray-900">交付模板</h2>
            <p className="mt-2 text-gray-600 leading-relaxed">
              将“能做什么”落为“怎么做”，帮助你在上线前完成口径对齐与材料准备。
            </p>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {TEMPLATES.map((it) => (
              <ResourceCard key={it.id} item={it} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white" id="licenses">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold text-gray-900">资质证照示例</h2>
            <p className="mt-2 text-gray-600 leading-relaxed">
              这里提供示例文件用于展示；如需对公盖章版本或完整材料包，请联系顾问索取。
            </p>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {LICENSES.map((it) => (
              <ResourceCard key={it.id} item={it} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-blue-700 to-indigo-800" id="cta">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-white/10 border border-white/15 p-10 md:flex md:items-center md:justify-between gap-8">
            <div className="text-white">
              <div className="text-2xl font-semibold">想拿到与你场景匹配的资料包？</div>
              <div className="mt-2 text-white/80 leading-relaxed">
                留下行业、人员规模与结算口径，我们会发送更贴近的资料与实施建议。
              </div>
            </div>
            <div className="mt-8 md:mt-0 flex flex-wrap gap-3">
              <Link to="/about/contact">
                <Button className="rounded-full px-8">联系顾问</Button>
              </Link>
              <Link to="/cases">
                <Button variant="outline" className="rounded-full px-8 bg-white/90">
                  查看案例摘要
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
