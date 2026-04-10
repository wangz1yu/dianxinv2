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
    title: "保障配置难以贴合业务节奏",
    desc: "用工人员流动快、岗位风险差异大，传统保险配置难以“按场景”落地。",
  },
  {
    title: "投保与名单管理分散",
    desc: "名单变化频繁，人工操作容易遗漏，难以形成稳定、可追溯的记录。",
  },
  {
    title: "理赔协同成本高",
    desc: "材料准备、节点跟进与沟通缺少统一流程，影响体验与时效。",
  },
];

const STEPS: ProcessStepItem[] = [
  { title: "评估风险", desc: "按岗位/场景梳理风险点与保障需求。" },
  { title: "配置方案", desc: "确认保障组合、理赔流程与名单规则。" },
  { title: "接入投保", desc: "对接名单与流程，支持按节奏自动化管理。" },
  { title: "协同理赔", desc: "提供材料指引、节点跟踪与留痕记录。" },
];

const FAQ: Array<{ q: string; a: string }> = [
  {
    q: "不同岗位可以配置不同保障组合吗？",
    a: "可以。我们会按照岗位与作业场景拆分风险画像，再给出可组合的保障配置建议。",
  },
  {
    q: "名单变化频繁，如何避免漏保？",
    a: "通过接入名单来源与规则配置，将关键节点纳入流程，减少人工重复操作并保留留痕。",
  },
  {
    q: "发生理赔时，企业需要准备哪些材料？",
    a: "以具体事故类型为准。我们会提供材料清单与提交指引，并协同关键节点的沟通与跟进。",
  },
  {
    q: "如何在预算内做保障？",
    a: "建议从“风险暴露最大的场景”先做重点覆盖，再逐步扩展，确保保障结构与业务节奏匹配。",
  },
];

export default function Insurance() {
  useEffect(() => window.scrollTo(0, 0), []);
  const visual = getPageVisual("services/insurance");

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <PageHero
        title={
          <>
            日结保险
            <span className="block text-blue-700">让保障跟得上用工变化</span>
          </>
        }
        desc="以“场景化保障 + 流程化协同”为目标，把投保、名单管理与理赔流程纳入统一交付路径，降低用工风险暴露。"
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
              保险不是“买了就行”，关键在于与业务节奏、名单变化和理赔协同相匹配。
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
        desc="将保障配置与理赔协同变成可执行流程，便于企业落地与复盘。"
        steps={STEPS}
      />

      <TrustEvidence
        title="风控与合规"
        desc="保障链路同样需要可追溯：从资质与安全能力到流程留痕，帮助企业形成完整的风险管理证据链。"
      />

      <CaseEvidence
        tag="services/insurance"
        title="案例摘要"
        desc="以下为与用工保障/理赔协同相关的交付场景摘要，可点击进入案例中心查看更多。"
      />

      <section className="py-16 bg-gray-50" id="faq">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold text-gray-900">FAQ</h2>
            <p className="mt-2 text-gray-600 leading-relaxed">
              不确定如何配置？可以从你的岗位结构与风险点开始讨论。
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
              <div className="text-2xl font-semibold">
                想把保障方案做得更贴合业务？
              </div>
              <div className="mt-2 text-white/80 leading-relaxed">
                提供岗位结构与风险关注点，我们可以一起拆解出可落地的保障配置与协同流程。
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
