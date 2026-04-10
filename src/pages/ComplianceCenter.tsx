import { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/sections/Navbar";
import Footer from "@/sections/Footer";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/PageHero";
import { SectionNav } from "@/components/site/SectionNav";
import { TrustEvidence } from "@/components/site/TrustEvidence";
import { scrollToId } from "@/lib/scroll";
import { getPageVisual } from "@/lib/siteVisual";

const FLOW = [
  {
    title: "签约与主体校验",
    desc: "明确合作主体、签约关系与授权边界，避免主体混用带来的合规风险。",
  },
  {
    title: "规则配置与口径对齐",
    desc: "把结算口径、票据口径与税务处理规则拆为可配置项，便于跨城市/多团队管理。",
  },
  {
    title: "申报与票据处理",
    desc: "按政策要求完成申报与票据管理，并形成可复核的材料清单与证据链。",
  },
  {
    title: "留痕归档与审计追溯",
    desc: "关键动作与关键材料全链路留痕，支持合规审计、争议处理与回溯核验。",
  },
];

const RISK_CONTROLS = [
  {
    title: "身份与主体一致性识别",
    desc: "对关键字段进行一致性校验与异常识别，降低冒用、错配与重复结算风险。",
  },
  {
    title: "批量支付风控阈值",
    desc: "对批量支付设置风险阈值与复核机制，避免在高峰期因异常扩散影响业务稳定。",
  },
  {
    title: "高频账户/异常行为拦截",
    desc: "对高频、异常账户行为进行拦截与复核，形成处置闭环与留痕材料。",
  },
  {
    title: "税票一致性与材料复核",
    desc: "围绕“税—票—账—单”一致性建立复核点，降低票据口径不一致带来的合规风险。",
  },
];

const FAQ: Array<{ q: string; a: string }> = [
  {
    q: "是否适用于外卖、网约车、物流等高频结算行业？",
    a: "适用。我们会先诊断业务边界与结算口径，再按行业节奏配置规则与风控点，避免“套模板但不落地”。",
  },
  {
    q: "票据与税务相关材料如何管理？",
    a: "支持形成材料清单、留痕归档与复核记录，便于审计与争议处理；具体口径以你所在城市政策与组织流程为准。",
  },
  {
    q: "能否签署对公保密协议（NDA）或数据处理协议？",
    a: "支持。可按你的法务要求提供协议文本与配合流程，并在项目接入阶段同步对齐安全与权限边界。",
  },
];

export default function ComplianceCenter() {
  useEffect(() => window.scrollTo(0, 0), []);
  const visual = getPageVisual("compliance");

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <PageHero
        title={
          <>
            合规与安全中心
            <span className="block text-blue-700">把“合规”拆成可执行清单</span>
          </>
        }
        desc="从签约主体、结算口径到票税材料与留痕归档，用一套可追溯的流程与风控机制，降低企业在灵活用工场景下的风险暴露。"
        primaryHref="/about/contact"
        primaryText="对齐合规口径"
        secondaryHref="/downloads"
        secondaryText="下载合规资料包"
        visualSrc={visual.src}
        visualPos={visual.pos}
      />

      <SectionNav
        items={[
          { id: "dir", label: "目录" },
          { id: "flow", label: "合规流程" },
          { id: "risk", label: "风控策略" },
          { id: "evidence", label: "资质与FAQ" },
          { id: "cta", label: "下一步" },
        ]}
      />

      <section className="py-12 bg-white border-b border-gray-100" id="dir">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-xl font-semibold text-gray-900">快速目录</h2>
            <p className="mt-2 text-gray-600 leading-relaxed">
              如果你正在做尽调或上线前评估，可先按下面模块快速定位关键点。
            </p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              {
                id: "flow",
                title: "合规流程（从签约到留痕）",
                desc: "用 4 步把关键动作与材料固化为清单。",
              },
              {
                id: "risk",
                title: "风控策略（高峰稳态）",
                desc: "对批量支付、异常账户与税票一致性设置控制点。",
              },
              {
                id: "evidence",
                title: "资质与FAQ（尽调资料）",
                desc: "统一口径回答法务/合规常见问题，并提供证照背书。",
              },
            ].map((it) => (
              <button
                key={it.id}
                type="button"
                onClick={() => scrollToId(it.id)}
                className="text-left rounded-3xl border border-gray-200 bg-white p-7 shadow-sm hover:shadow-lg transition"
              >
                <div className="text-lg font-semibold text-gray-900">
                  {it.title}
                </div>
                <div className="mt-3 text-gray-600 leading-relaxed">{it.desc}</div>
                <div className="mt-6 inline-flex items-center text-sm font-medium text-blue-700">
                  立即查看
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#F5F7FA]" id="flow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold text-gray-900">合规流程</h2>
            <p className="mt-2 text-gray-600 leading-relaxed">
              把“合规要求”落到每个关键节点：谁做、做什么、留什么材料、如何追溯。
            </p>
          </div>

          <ol className="mt-8 grid gap-6 md:grid-cols-2">
            {FLOW.map((s, idx) => (
              <li
                key={s.title}
                className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-blue-600/10 text-blue-700 flex items-center justify-center font-semibold">
                    {idx + 1}
                  </div>
                  <div className="text-lg font-semibold text-gray-900">
                    {s.title}
                  </div>
                </div>
                <div className="mt-3 text-gray-600 leading-relaxed">{s.desc}</div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-16 bg-white" id="risk">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold text-gray-900">风控策略</h2>
            <p className="mt-2 text-gray-600 leading-relaxed">
              风控不是“拦截更多”，而是建立可复核、可解释、可回溯的处置链路。
            </p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {RISK_CONTROLS.map((s) => (
              <div
                key={s.title}
                className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm"
              >
                <div className="text-lg font-semibold text-gray-900">
                  {s.title}
                </div>
                <div className="mt-3 text-gray-600 leading-relaxed">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="bg-gray-50" id="evidence">
        <TrustEvidence
          title="资质与安全背书"
          desc="资质证照与安全能力是企业尽调的基础材料，也是在项目交付过程中承接风险边界的底层能力。"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold text-gray-900">FAQ</h2>
            <p className="mt-2 text-gray-600 leading-relaxed">
              常见法务与合规问题的统一口径。需要对公材料可到下载中心获取或联系顾问。
            </p>
          </div>
          <div className="mt-8 grid gap-4">
            {FAQ.map((it) => (
              <div
                key={it.q}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
              >
                <div className="font-semibold text-gray-900">Q：{it.q}</div>
                <div className="mt-2 text-gray-600 leading-relaxed">A：{it.a}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="py-16 bg-gradient-to-br from-blue-700 to-indigo-800" id="cta">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-white/10 border border-white/15 p-10 md:flex md:items-center md:justify-between gap-8">
            <div className="text-white">
              <div className="text-2xl font-semibold">需要合规评估清单或尽调资料？</div>
              <div className="mt-2 text-white/80 leading-relaxed">
                我们可以基于你的行业与组织结构，给出一份“上线前必做项”清单，并对齐关键口径与风险边界。
              </div>
            </div>
            <div className="mt-8 md:mt-0 flex flex-wrap gap-3">
              <Link to="/about/contact">
                <Button className="rounded-full px-8">联系顾问</Button>
              </Link>
              <Link to="/downloads">
                <Button variant="outline" className="rounded-full px-8 bg-white/90">
                  下载合规资料包
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
