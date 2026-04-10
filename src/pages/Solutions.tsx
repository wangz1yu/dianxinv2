import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Bike, Car, Home, Package, Truck } from "lucide-react";
import Navbar from "@/sections/Navbar";
import Footer from "@/sections/Footer";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/PageHero";
import { ProcessSteps, type ProcessStepItem } from "@/components/site/ProcessSteps";
import { TrustEvidence } from "@/components/site/TrustEvidence";
import { getPageVisual } from "@/lib/siteVisual";

const SOLUTION_CARDS: Array<{
  id: string;
  title: string;
  desc: string;
  href: string;
  Icon: typeof Truck;
  highlights: string[];
}> = [
  {
    id: "delivery",
    title: "外卖配送",
    desc: "围绕骑手招募、结算与保障等关键环节，梳理一条可上线、可追溯的交付链路，支撑高峰期稳定运营。",
    href: "/solutions/delivery",
    Icon: Bike,
    highlights: ["多城市/多团队结算口径梳理", "批量结算与对账协同", "短周期保障与理赔指引", "留痕与风险控制机制"],
  },
  {
    id: "ride",
    title: "网约车出行",
    desc: "面向跨城市主体与多种收入结构，形成可配置的结算与合规处理路径，降低运营协作成本。",
    href: "/solutions/ride",
    Icon: Car,
    highlights: ["组织与主体结构拆解", "结算规则与票据口径", "风控与异常复核流程", "阶段性接入与上线节奏"],
  },
  {
    id: "housekeeping",
    title: "家政服务",
    desc: "把人员管理、服务结算与保障串到同一套流程里，让平台能更清晰地管理服务质量与风险边界。",
    href: "/solutions/housekeeping",
    Icon: Home,
    highlights: ["人员档案与资质留存", "工时/项目制结算口径", "服务过程风险提示", "评价与运营复盘机制"],
  },
  {
    id: "logistics",
    title: "物流仓配",
    desc: "围绕波峰波谷用工与多岗位协同，把招募、到岗与结算衔接为可执行的交付路径，提升整体效率。",
    href: "/solutions/logistics",
    Icon: Package,
    highlights: ["需求预测与岗位拆分", "招募筛选与到岗验收", "结算与对账留痕", "大促/旺季弹性策略"],
  },
];

const SOLUTIONS_PROCESS: ProcessStepItem[] = [
  { title: "诊断场景", desc: "明确业务边界、人员结构与关键风险点。" },
  { title: "组合能力", desc: "将结算、保障、招聘等能力组合为可执行清单。" },
  { title: "接入上线", desc: "分阶段对接数据与系统，联调验收后进入运营。" },
  { title: "持续复盘", desc: "围绕效率、成本与风险指标持续优化规则与流程。" },
];

export default function Solutions() {
  useEffect(() => window.scrollTo(0, 0), []);
  const visual = getPageVisual("solutions");

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <PageHero
        title={
          <>
            行业解决方案
            <span className="block text-blue-700">从场景出发组合交付能力</span>
          </>
        }
        desc="按不同行业的业务节奏与风险边界，组合“招—用—算—保—控”的能力模块，形成可上线、可复盘、可持续优化的交付路径。"
        primaryHref="/about/contact"
        primaryText="预约沟通"
        secondaryHref="/downloads"
        secondaryText="下载方案资料"
        visualSrc={visual.src}
        visualPos={visual.pos}
      />

      <section className="py-16 bg-white" id="industries">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold text-gray-900">四个行业入口</h2>
            <p className="mt-2 text-gray-600 leading-relaxed">
              选择与你当前业务最接近的场景，查看对应的痛点与交付节奏。
            </p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {SOLUTION_CARDS.map(({ id, title, desc, href, Icon, highlights }) => (
              <div
                key={id}
                className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm hover:shadow-lg transition"
              >
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 rounded-2xl bg-blue-600/10 text-blue-700 flex items-center justify-center">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="text-lg font-semibold text-gray-900">{title}</div>
                </div>
                <p className="mt-4 text-gray-600 leading-relaxed">{desc}</p>
                <ul className="mt-5 space-y-2 text-sm text-gray-700">
                  {highlights.map((h) => (
                    <li key={h} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-blue-600/70 flex-shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-7">
                  <Link to={href}>
                    <Button variant="outline" className="rounded-full w-full">
                      查看行业详情
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ProcessSteps
        title="方法论 / 交付路径（简版）"
        desc="将“能做什么”拆成“怎么做”，便于你评估投入、节奏与风险控制点。"
        steps={SOLUTIONS_PROCESS}
      />

      <TrustEvidence
        title="合规与风险控制"
        desc="行业方案不是堆功能，而是把资质、留痕与风控机制放进交付路径里，降低组织在快速扩张时的风险暴露。"
      />

      <section className="py-16 bg-gradient-to-br from-blue-700 to-indigo-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-white/10 border border-white/15 p-10 md:flex md:items-center md:justify-between gap-8">
            <div className="text-white">
              <div className="text-2xl font-semibold">想快速评估你所在行业的可落地方案？</div>
              <div className="mt-2 text-white/80 leading-relaxed">
                提供你的组织结构、业务节奏与关键约束，我们会输出一份可执行的接入建议与阶段计划。
              </div>
            </div>
            <div className="mt-8 md:mt-0 flex flex-wrap gap-3">
              <Link to="/about/contact">
                <Button className="rounded-full px-8">联系顾问</Button>
              </Link>
              <Link to="/downloads">
                <Button variant="outline" className="rounded-full px-8 bg-white/90">
                  下载方案资料
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
