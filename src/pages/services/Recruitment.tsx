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
    title: "需求波动大",
    desc: "旺季临时增员、淡季快速收缩，传统招聘与管理方式很难跟上节奏。",
  },
  {
    title: "到岗质量不可控",
    desc: "简历筛选、面试与到岗衔接分散，影响岗位匹配与现场稳定性。",
  },
  {
    title: "合规入职与后续结算断层",
    desc: "入职资料、用工关系与结算链路割裂，导致后续对账与风险管理成本上升。",
  },
];

const STEPS: ProcessStepItem[] = [
  { title: "拆解需求", desc: "明确岗位画像、排班节奏与验收标准。" },
  { title: "招募筛选", desc: "多渠道触达，按标准化流程筛选候选人。" },
  { title: "到岗衔接", desc: "身份与资料核验，协助完成到岗与入职动作。" },
  { title: "运营复盘", desc: "按周期复盘到岗质量与流失原因，优化供给。" },
];

const FAQ: Array<{ q: string; a: string }> = [
  {
    q: "适合哪些类型的用工需求？",
    a: "适用于多城市、多门店、多岗位的灵活用工需求，尤其在波峰波谷明显、需要快速补充人力的场景。",
  },
  {
    q: "如何保证到岗质量？",
    a: "以岗位画像与验收标准为核心，通过筛选流程与到岗核验机制，减少“到岗即不适配”的情况。",
  },
  {
    q: "招聘与结算可以一起交付吗？",
    a: "可以。招聘、入职与结算属于同一条交付链路，我们支持按你的系统现状逐步把链路连起来。",
  },
  {
    q: "上线后能否持续优化供给？",
    a: "支持。通过周期性复盘与指标看板，持续优化渠道策略、岗位画像与运营节奏。",
  },
];

export default function Recruitment() {
  useEffect(() => window.scrollTo(0, 0), []);
  const visual = getPageVisual("services/recruitment");

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <PageHero
        title={
          <>
            用工招聘
            <span className="block text-blue-700">把招募到到岗做成可交付路径</span>
          </>
        }
        desc="围绕岗位画像、筛选流程与到岗衔接，提供可复用的招聘交付能力，并支持与结算链路打通，降低运营波动。"
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
              招聘的难点往往不是“没人”，而是“招得到、到得上、留得住、算得清”。
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
        desc="把招聘过程拆解为可执行步骤，便于评估投入、节奏与交付边界。"
        steps={STEPS}
      />

      <TrustEvidence
        title="风控与合规"
        desc="招聘链路同样需要留痕与可追溯：身份核验、资料管理与关键节点记录，帮助企业降低用工与结算环节的风险。"
      />

      <CaseEvidence
        tag="services/recruitment"
        title="案例摘要"
        desc="以下为与招聘/用工交付相关的场景摘要，可点击进入案例中心查看更多。"
      />

      <section className="py-16 bg-gray-50" id="faq">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold text-gray-900">FAQ</h2>
            <p className="mt-2 text-gray-600 leading-relaxed">
              如果你希望把招聘与结算/保险一起做成完整链路，可以直接联系我们讨论组合方案。
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
              <div className="text-2xl font-semibold">想把增员做得更可控？</div>
              <div className="mt-2 text-white/80 leading-relaxed">
                我们可以基于你的岗位画像与波峰波谷节奏，给出一份可落地的招聘交付建议与运营打法。
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
