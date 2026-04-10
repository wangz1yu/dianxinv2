import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Users, Wallet } from "lucide-react";
import Navbar from "@/sections/Navbar";
import Footer from "@/sections/Footer";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/PageHero";
import { ProcessSteps, type ProcessStepItem } from "@/components/site/ProcessSteps";
import { TrustEvidence } from "@/components/site/TrustEvidence";
import { CaseEvidence } from "@/components/site/CaseEvidence";
import { getPageVisual } from "@/lib/siteVisual";

const SERVICE_CARDS: Array<{
  id: string;
  title: string;
  desc: string;
  href: string;
  Icon: typeof Wallet;
  highlights: string[];
}> = [
  {
    id: "settlement",
    title: "灵工结算",
    desc: "把结算、对账与税务处理放进一套可追溯的流程里，帮助财务与业务在高峰期也能稳态运行。",
    href: "/services/settlement",
    Icon: Wallet,
    highlights: ["结算规则可配置", "对账与留痕可追溯", "多渠道支付与对接", "风险控制与异常处理"],
  },
  {
    id: "insurance",
    title: "日结保险",
    desc: "面向灵活用工的短周期保障配置与理赔协同，降低用工风险暴露，让保障更贴近业务节奏。",
    href: "/services/insurance",
    Icon: Shield,
    highlights: ["按场景选择保障组合", "投保与名单自动化", "理赔协同与材料指引", "保费与风险结构可解释"],
  },
  {
    id: "recruitment",
    title: "用工招聘",
    desc: "覆盖多城市、多岗位的用工需求，把招募、筛选、到岗与结算衔接到同一套交付路径中。",
    href: "/services/recruitment",
    Icon: Users,
    highlights: ["需求拆解与画像", "多渠道触达与筛选", "到岗与用工合规衔接", "运营节奏与质量复盘"],
  },
];

const SERVICES_PROCESS: ProcessStepItem[] = [
  { title: "澄清目标", desc: "对齐业务边界、结算口径与合规约束。" },
  { title: "梳理流程", desc: "整理数据、角色与关键节点，明确接入方式。" },
  { title: "配置方案", desc: "把规则、风险控制与交付节奏落到可执行清单。" },
  { title: "接入上线", desc: "联调、验收与运营支持，持续优化效率与体验。" },
];

export default function Services() {
  useEffect(() => window.scrollTo(0, 0), []);
  const visual = getPageVisual("services");

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <PageHero
        title={
          <>
            服务能力
            <span className="block text-blue-700">用咨询式交付把方案落地</span>
          </>
        }
        desc="围绕灵活用工的“招—用—算—保—控”，提供可拆解、可追溯、可持续优化的服务组合，帮助业务快速上线并长期稳态运营。"
        primaryHref="/about/contact"
        primaryText="预约沟通"
        secondaryHref="/downloads"
        secondaryText="下载方案资料"
        visualSrc={visual.src}
        visualPos={visual.pos}
      />

      <section className="py-16 bg-white" id="services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold text-gray-900">三条服务入口</h2>
            <p className="mt-2 text-gray-600 leading-relaxed">
              按你的业务重点选择模块，或组合为一条完整交付链路。
            </p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {SERVICE_CARDS.map(({ id, title, desc, href, Icon, highlights }) => (
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
                      查看详情
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
        title="交付路径（简版）"
        desc="把关键动作拆成可执行的步骤，便于你的团队评估投入与节奏。"
        steps={SERVICES_PROCESS}
      />

      <TrustEvidence
        title="合规与安全背书"
        desc="从资质、留痕与安全能力出发，支撑企业在灵活用工场景下的长期运营。"
      />

      <CaseEvidence
        tag="services/settlement"
        title="案例摘要"
        desc="以下为与结算/对账链路相关的真实交付场景摘要，可点击查看更多案例。"
      />

      <section className="py-16 bg-gradient-to-br from-blue-700 to-indigo-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-white/10 border border-white/15 p-10 md:flex md:items-center md:justify-between gap-8">
            <div className="text-white">
              <div className="text-2xl font-semibold">想先判断是否适配你的业务？</div>
              <div className="mt-2 text-white/80 leading-relaxed">
                我们可以基于你的组织结构、结算口径与风险要求，给出一份可落地的接入建议。
              </div>
            </div>
            <div className="mt-8 md:mt-0 flex flex-wrap gap-3">
              <Link to="/about/contact">
                <Button className="rounded-full px-8">联系顾问</Button>
              </Link>
              <Link to="/downloads">
                <Button
                  variant="outline"
                  className="rounded-full px-8 bg-white/90"
                >
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
