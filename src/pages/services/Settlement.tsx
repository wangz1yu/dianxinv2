import { useEffect } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import Navbar from "@/sections/Navbar";
import Footer from "@/sections/Footer";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/PageHero";
import { ProcessSteps, type ProcessStepItem } from "@/components/site/ProcessSteps";
import { TrustEvidence } from "@/components/site/TrustEvidence";
import { CaseEvidence } from "@/components/site/CaseEvidence";
import { getPageVisual } from "@/lib/siteVisual";

const PAIN_POINTS = [
  {
    title: "结算口径分散",
    desc: "多团队、多城市、多规则并行，导致对账周期拉长、协作成本上升。",
  },
  {
    title: "留痕与合规压力",
    desc: "合同、票据、税务处理链路不一致，难以形成统一的审计与追溯证据。",
  },
  {
    title: "高峰期稳定性不足",
    desc: "批量支付、异常处理与回滚机制不足，容易在高峰期暴露运营风险。",
  },
];

const STEPS: ProcessStepItem[] = [
  { title: "对齐口径", desc: "梳理结算对象、对账规则与数据来源。" },
  { title: "接入与配置", desc: "对接账户与业务系统，配置规则与权限。" },
  { title: "风控与留痕", desc: "建立异常识别、复核机制与审计链路。" },
  { title: "上线运营", desc: "联调验收后进入稳定运营与持续优化。" },
];

const FAQ: Array<{ q: string; a: string }> = [
  {
    q: "可以按不同城市/业务线配置不同结算规则吗？",
    a: "可以。我们会先梳理口径与边界，再把规则拆分为可配置项，支持按组织、项目、岗位等维度管理。",
  },
  {
    q: "需要对接哪些数据？",
    a: "通常包括人员信息、工时/订单、结算口径与支付结果等。具体以你的现有系统与流程为准，支持按阶段逐步接入。",
  },
  {
    q: "如何处理异常与争议？",
    a: "在结算链路中配置异常识别与复核机制，并提供留痕与对账材料，便于快速定位问题与协同处理。",
  },
  {
    q: "上线后是否有运营支持？",
    a: "支持。包含关键节点监控、对账协同与规则迭代建议，帮助业务在波峰波谷中保持稳定。",
  },
];

export default function Settlement() {
  useEffect(() => window.scrollTo(0, 0), []);
  const visual = getPageVisual("services/settlement");

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <PageHero
        title={
          <>
            灵工结算
            <span className="block text-blue-700">把结算做成可交付的系统能力</span>
          </>
        }
        desc="将对账、支付、税务处理与留痕串成一条可追溯链路，帮助企业在高峰期也能稳定、合规地完成结算。"
        primaryHref="/about/contact"
        primaryText="联系顾问"
        secondaryHref="/downloads"
        secondaryText="下载方案资料"
        visualSrc={visual.src}
        visualPos={visual.pos}
      />

      <section className="py-16 bg-white" id="pain">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold text-gray-900">常见痛点</h2>
            <p className="mt-2 text-gray-600 leading-relaxed">
              结算问题往往不是“算不出来”，而是缺少一条稳定、可追溯的交付链路。
            </p>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {PAIN_POINTS.map((p) => (
              <div
                key={p.title}
                className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm"
              >
                <div className="text-lg font-semibold text-gray-900">
                  {p.title}
                </div>
                <div className="mt-3 text-gray-600 leading-relaxed">{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ProcessSteps
        title="方案路径"
        desc="从“口径对齐”到“上线运营”，用一套可控节奏把结算能力落地。"
        steps={STEPS}
      />

      <TrustEvidence
        title="风控与合规"
        desc="结算链路需要可审计、可追溯。我们以资质与安全能力为基础，配合留痕与异常控制机制，形成稳定的证据链。"
      />

      <CaseEvidence
        tag="services/settlement"
        title="案例摘要"
        desc="以下为与结算/对账链路相关的交付场景摘要，可点击进入案例中心查看更多。"
      />

      <section className="py-16 bg-gray-50" id="faq">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold text-gray-900">FAQ</h2>
            <p className="mt-2 text-gray-600 leading-relaxed">
              如果你的问题不在列表中，欢迎直接联系顾问沟通。
            </p>
          </div>
          <div className="mt-8 grid gap-4">
            {FAQ.map((it) => (
              <details
                key={it.q}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
              >
                <summary className="cursor-pointer list-none flex items-start justify-between gap-6">
                  <span className="font-semibold text-gray-900">{it.q}</span>
                  <CheckCircle2 className="h-5 w-5 text-blue-700 flex-shrink-0 mt-0.5" />
                </summary>
                <div className="mt-3 text-gray-600 leading-relaxed">{it.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-blue-700 to-indigo-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-white/10 border border-white/15 p-10 md:flex md:items-center md:justify-between gap-8">
            <div className="text-white">
              <div className="text-2xl font-semibold">希望把结算链路做得更稳定？</div>
              <div className="mt-2 text-white/80 leading-relaxed">
                提供你的现状流程与关键约束，我们可以给出一份可落地的接入建议与实施节奏。
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
