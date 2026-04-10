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

export default function Delivery() {
  useEffect(() => window.scrollTo(0, 0), []);

  const visual = getPageVisual("solutions/delivery");

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <PageHero
        title={
          <>
            外卖配送
            <span className="block text-blue-700">把高峰期用工链路做成可控交付</span>
          </>
        }
        desc="围绕骑手招募、结算口径与保障配置，形成一条可追溯的交付路径；让业务在波峰波谷中也能保持稳定协作与风险可控。"
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
              外卖业务强峰值、强时效，问题往往集中在“结算稳定性”和“风险边界”。
            </p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "结算口径与对账压力",
                desc: "多城市、多团队规则并行，峰值期间容易出现对账延迟与协作反复。",
              },
              {
                title: "保障配置与风险暴露",
                desc: "人员流动快、场景复杂，保障方案、名单变更与理赔协同缺少统一口径。",
              },
              {
                title: "异常与争议处理耗时",
                desc: "订单、工时与结算差异带来争议，需要可追溯留痕与复核流程支撑。",
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
              以平台能力为底座，把关键动作拆成模块组合，避免“一次性大改”带来的上线风险。
            </p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "灵工结算",
                desc: "把对账、支付与留痕做成可配置流程，适配多城市与多团队口径。",
                bullets: ["规则可配置（按组织/项目/岗位）", "对账与异常处理机制", "可追溯留痕与材料沉淀"],
                href: "/services/settlement",
              },
              {
                title: "日结保险",
                desc: "按场景选择保障组合，协同名单变更、材料指引与理赔留痕。",
                bullets: ["保障组合与边界说明", "投保/名单流程自动化", "理赔协同与材料清单"],
                href: "/services/insurance",
              },
              {
                title: "用工招聘",
                desc: "在峰值与扩城阶段补充运力，把招募与到岗验收对齐到交付节奏。",
                bullets: ["需求拆解与画像", "筛选与到岗验收流程", "与结算链路衔接"],
                href: "/services/recruitment",
              },
            ].map((m) => (
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
                <div className="mt-6">
                  <Link to={m.href}>
                    <Button variant="outline" className="rounded-full w-full">
                      查看模块详情
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
        id="rollout"
        title="接入与上线节奏"
        desc="以下为常见节奏示例，实际以你的组织结构、口径与系统现状为准。"
        steps={[
          { title: "澄清口径与边界", desc: "对齐骑手类型、订单口径与结算规则边界。" },
          { title: "梳理数据与流程", desc: "明确数据来源、角色分工与关键节点材料。" },
          { title: "配置规则与联调", desc: "配置结算规则、风控与留痕，并完成接口联调与验收。" },
          { title: "分批上线与复盘", desc: "按城市/团队分批上线，沉淀复盘指标并迭代规则。" },
        ]}
      />

      <TrustEvidence
        title="合规与风险控制"
        desc="把资质、留痕与安全能力落进业务链路：在结算、保障与异常处理中形成一致的证据链，降低争议与合规风险。"
      />

      <CaseEvidence
        tag="solutions/delivery"
        title="案例摘要"
        desc="以下为与外卖配送场景相关的交付摘要（节选 1-2 条），可前往案例中心查看更多。"
      />

      <section className="py-16 bg-gradient-to-br from-blue-700 to-indigo-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-white/10 border border-white/15 p-10 md:flex md:items-center md:justify-between gap-8">
            <div className="text-white">
              <div className="text-2xl font-semibold">希望把外卖用工链路做得更稳？</div>
              <div className="mt-2 text-white/80 leading-relaxed">
                欢迎提供你的城市规模、业务节奏与现有系统情况，我们可以输出一份可执行的接入建议与阶段计划。
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
