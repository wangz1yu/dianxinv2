import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Navbar from "@/sections/Navbar";
import Footer from "@/sections/Footer";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/PageHero";
import { ProcessSteps } from "@/components/site/ProcessSteps";
import { TrustEvidence } from "@/components/site/TrustEvidence";
import { CaseEvidence } from "@/components/site/CaseEvidence";
import { getPageVisual } from "@/lib/siteVisual";

export default function Logistics() {
  useEffect(() => window.scrollTo(0, 0), []);
  const visual = getPageVisual("solutions/logistics");

  const combo: Array<{
    title: string;
    desc: string;
    bullets: string[];
    href?: string;
  }> = [
    {
      title: "用工招聘",
      desc: "围绕波峰波谷用工，把需求拆解、筛选与到岗验收做成可复用流程。",
      bullets: ["需求拆解与岗位画像", "筛选与到岗验收流程", "与结算链路衔接"],
      href: "/services/recruitment",
    },
    {
      title: "灵工结算",
      desc: "适配多岗位、多班次的结算口径，把对账、异常处理与留痕串成稳定链路。",
      bullets: ["结算口径可配置", "对账协同与异常复核", "审计材料留痕可追溯"],
      href: "/services/settlement",
    },
    {
      title: "日结保险",
      desc: "根据岗位风险与业务节奏配置保障组合，协同投保、名单与理赔材料。",
      bullets: ["保障组合与边界说明", "投保/名单流程自动化", "理赔协同与留痕沉淀"],
      href: "/services/insurance",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <PageHero
        title={
          <>
            物流仓配
            <span className="block text-blue-700">应对旺季波峰的弹性用工交付路径</span>
          </>
        }
        desc="在仓配多岗位协作与旺季波峰场景下，把招募、到岗、结算与保障串成可执行的交付链路，降低用工协作成本并提升运营稳定性。"
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
              物流仓配的压力通常集中在旺季扩容、跨岗位协作与结算留痕。
            </p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "旺季扩容节奏紧",
                desc: "人员需求在短周期内放大，招募、到岗与排班协同容易产生断点。",
              },
              {
                title: "岗位/班次口径复杂",
                desc: "多岗位、多班次与计件口径并行，结算与对账容易出现偏差。",
              },
              {
                title: "材料留存与审计压力",
                desc: "合同、票据与支付结果需要一致留痕，便于审计与争议处理。",
              },
            ].map((p) => (
              <div
                key={p.title}
                className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm"
              >
                <div className="text-lg font-semibold text-gray-900">{p.title}</div>
                <div className="mt-3 text-gray-600 leading-relaxed">{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#F5F7FA]" id="combination">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold text-gray-900">方案组合（能力拼装）</h2>
            <p className="mt-2 text-gray-600 leading-relaxed">
              以交付链路为核心，把旺季扩容的关键动作拆成模块组合，便于按阶段上线与复盘。
            </p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {combo.map((m) => (
              <div
                key={m.title}
                className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm"
              >
                <div className="text-lg font-semibold text-gray-900">{m.title}</div>
                <div className="mt-3 text-gray-600 leading-relaxed">{m.desc}</div>
                <ul className="mt-5 space-y-2 text-sm text-gray-700">
                  {m.bullets.map((b) => (
                    <li key={b} className="flex gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-700 mt-0.5 flex-shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                {m.href ? (
                  <div className="mt-6">
                    <Link to={m.href}>
                      <Button variant="outline" className="rounded-full w-full">
                        查看模块详情
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      <ProcessSteps
        id="rollout"
        title="接入与上线节奏"
        desc="建议先选一个园区/仓点试点，再逐步扩展到更多岗位与区域。"
        steps={[
          { title: "梳理岗位与口径", desc: "明确岗位、班次、计件口径与数据来源。" },
          { title: "对齐流程与材料", desc: "梳理招募、到岗、排班、结算与对账节点。" },
          { title: "配置与联调验收", desc: "配置结算规则、留痕与风控，并完成接口联调验收。" },
          { title: "分批上线与复盘", desc: "按仓点/岗位分批上线，复盘效率与争议处理机制。" },
        ]}
      />

      <TrustEvidence
        title="合规与风险控制"
        desc="通过资质与安全能力、权限与操作留痕、异常复核机制，让旺季扩容的流程在合规与风险层面更可控。"
      />

      <CaseEvidence
        tag="solutions/logistics"
        title="案例摘要"
        desc="以下为与物流仓配场景相关的交付摘要（节选 1-2 条），可前往案例中心查看更多。"
      />

      <section className="py-16 bg-gradient-to-br from-blue-700 to-indigo-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-white/10 border border-white/15 p-10 md:flex md:items-center md:justify-between gap-8">
            <div className="text-white">
              <div className="text-2xl font-semibold">需要一份旺季扩容的实施节奏？</div>
              <div className="mt-2 text-white/80 leading-relaxed">
                欢迎提供你的岗位结构、旺季节奏与系统现状，我们会输出一份阶段计划与风险控制点清单。
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
