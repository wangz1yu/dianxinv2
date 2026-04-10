import { useEffect } from "react";
import { Award, Globe, Rocket, TrendingUp, Users } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/sections/Navbar";
import Footer from "@/sections/Footer";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/PageHero";
import { SectionNav } from "@/components/site/SectionNav";
import { getPageVisual } from "@/lib/siteVisual";

const milestones = [
  {
    year: "2023-01",
    title: "公司成立",
    desc: "聚焦灵活用工场景，开始构建可复制的结算与合规交付方法。",
    icon: Rocket,
  },
  {
    year: "2023-03",
    title: "结算链路完善",
    desc: "上线核心结算能力，并补齐风控、异常复核、留痕材料等关键环节。",
    icon: TrendingUp,
  },
  {
    year: "2023-06",
    title: "行业场景拓展",
    desc: "在外卖配送、网约车等高峰场景中验证批量结算与对账协同能力。",
    icon: Users,
  },
  {
    year: "2023-09",
    title: "合规体系强化",
    desc: "建立资质/票税/审计口径的证据链，形成更清晰的风险边界与处置机制。",
    icon: Award,
  },
  {
    year: "2024-03",
    title: "能力生态补全",
    desc: "从结算出发，扩展到招聘、保险等周边能力，形成更完整的用工解决方案组合。",
    icon: Globe,
  },
  {
    year: "2025+",
    title: "持续交付迭代",
    desc: "以更多城市与业务线为样本持续复盘，提升规则配置效率与运营稳定性。",
    icon: TrendingUp,
  },
];

export default function History() {
  useEffect(() => window.scrollTo(0, 0), []);
  const visual = getPageVisual("about/history");

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <PageHero
        title={
          <>
            发展历程
            <span className="block text-blue-700">从产品到交付方法论的迭代</span>
          </>
        }
        desc="我们更关心的是：每一次迭代是否让交付更可复制、让合规与风控更可解释。下面是关键节点的摘要。"
        primaryHref="/about/contact"
        primaryText="获取交付建议"
        secondaryHref="/downloads"
        secondaryText="下载资料包"
        visualSrc={visual.src}
        visualPos={visual.pos}
      />

      <SectionNav
        items={[
          { id: "timeline", label: "里程碑" },
          { id: "principles", label: "经验沉淀" },
          { id: "cta", label: "下一步" },
        ]}
      />

      <section className="py-16 bg-white border-b border-gray-100" id="timeline">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold text-gray-900">关键里程碑</h2>
            <p className="mt-2 text-gray-600 leading-relaxed">
              每个节点都对应一次“规则/流程/证据链”的补齐，帮助团队更快推进上线与规模化运营。
            </p>
          </div>

          <div className="mt-10 relative">
            <div className="absolute left-5 top-0 bottom-0 w-px bg-blue-200" />
            <div className="space-y-6">
              {milestones.map((m) => (
                <div key={`${m.year}-${m.title}`} className="relative pl-16">
                  <div className="absolute left-0 top-3 h-10 w-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow">
                    <m.icon className="h-5 w-5" />
                  </div>
                  <div className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm hover:shadow-lg transition">
                    <div className="text-sm font-semibold text-blue-700">
                      {m.year}
                    </div>
                    <div className="mt-1 text-xl font-semibold text-gray-900">
                      {m.title}
                    </div>
                    <div className="mt-2 text-gray-600 leading-relaxed">
                      {m.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#F5F7FA] border-b border-gray-100" id="principles">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5">
              <h2 className="text-2xl font-semibold text-gray-900">我们学到的 3 件事</h2>
              <p className="mt-2 text-gray-600 leading-relaxed">
                规模化的关键不是“跑得快”，而是让流程、口径与风控能被持续复用。
              </p>
            </div>
            <div className="lg:col-span-7 grid gap-6">
              {[
                {
                  title: "口径一致性要写进规则",
                  desc: "把城市/主体差异显式建模，减少“人肉对账”与跨部门解释成本。",
                },
                {
                  title: "风控必须可解释",
                  desc: "异常阈值、复核流程与材料留痕需要同步设计，否则高峰期只能“凭经验”。",
                },
                {
                  title: "交付节奏要可复制",
                  desc: "从试点到复制，明确角色分工与清单，才能在更多业务线快速复用。",
                },
              ].map((it) => (
                <div
                  key={it.title}
                  className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm hover:shadow-lg transition"
                >
                  <div className="text-lg font-semibold text-gray-900">
                    {it.title}
                  </div>
                  <div className="mt-2 text-gray-600 leading-relaxed">
                    {it.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-blue-700 to-indigo-800" id="cta">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-white/10 border border-white/15 p-10 md:flex md:items-center md:justify-between gap-8">
            <div className="text-white">
              <div className="text-2xl font-semibold">需要对齐你的交付路径？</div>
              <div className="mt-2 text-white/80 leading-relaxed">
                给我们你的业务规模与城市覆盖，我们会提供一份适配的上线节奏与风险边界建议。
              </div>
            </div>
            <div className="mt-8 md:mt-0 flex flex-wrap gap-3">
              <Link to="/about/contact">
                <Button className="rounded-full px-8">联系顾问</Button>
              </Link>
              <Link to="/downloads">
                <Button variant="outline" className="rounded-full px-8 bg-white/90">
                  下载资料包
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
