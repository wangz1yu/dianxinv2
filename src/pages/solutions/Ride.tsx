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

export default function Ride() {
  useEffect(() => window.scrollTo(0, 0), []);
  const visual = getPageVisual("solutions/ride");

  const combo: Array<{
    title: string;
    desc: string;
    bullets: string[];
    href?: string;
  }> = [
    {
      title: "灵工结算",
      desc: "把司机收入结构与平台规则落到可配置口径，支撑多城市、多主体协作。",
      bullets: ["规则可配置（按主体/城市/项目）", "对账与异常复核流程", "票据/材料留痕可追溯"],
      href: "/services/settlement",
    },
    {
      title: "日结保险",
      desc: "按场景配置保障组合，并与司机名单变更、材料指引与理赔协同衔接。",
      bullets: ["保障组合与边界说明", "投保/名单流程自动化", "理赔协同与留痕沉淀"],
      href: "/services/insurance",
    },
    {
      title: "合规与风控交付",
      desc: "把关键合规动作放进交付路径，形成一致的审计与追溯证据链。",
      bullets: ["身份/资质校验与材料留存", "异常识别与复核机制", "权限与操作留痕"],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <PageHero
        title={
          <>
            网约车出行
            <span className="block text-blue-700">面向多主体的结算与合规交付路径</span>
          </>
        }
        desc="在跨城市、多主体与多种收入结构的场景下，通过可配置规则、留痕与风控机制，降低协作成本，让运营口径更统一、更可控。"
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
              网约车业务常见挑战集中在“多主体协作”与“合规口径一致性”。
            </p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "多主体口径难统一",
                desc: "多城市与多主体并行运营，结算规则、对账口径与权限边界难以一致。",
              },
              {
                title: "票据与材料处理复杂",
                desc: "票据口径、材料留存与审计要求交织，容易造成处理反复与协作成本上升。",
              },
              {
                title: "异常与争议处理缺乏证据链",
                desc: "异常订单、投诉与争议需要可追溯留痕与复核机制支撑。",
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
              以规则配置与留痕为核心，把关键动作拆成模块组合，便于分阶段接入与验证。
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
        desc="建议按主体/城市分阶段上线，降低一次性改造风险。"
        steps={[
          { title: "明确主体与口径", desc: "对齐组织结构、结算对象与规则边界。" },
          { title: "梳理材料与流程", desc: "梳理票据口径、材料留存与角色分工。" },
          { title: "配置与联调验收", desc: "配置规则、权限与风控，完成接口联调与验收。" },
          { title: "分批上线与复盘", desc: "分批上线并复盘争议/异常处理效率，持续迭代。" },
        ]}
      />

      <TrustEvidence
        title="合规与风险控制"
        desc="通过资质与安全能力、操作留痕与异常复核机制，让合规动作可执行、可审计、可追溯。"
      />

      <CaseEvidence
        tag="solutions/ride"
        title="案例摘要"
        desc="以下为与网约车场景相关的交付摘要（节选 1-2 条），可前往案例中心查看更多。"
      />

      <section className="py-16 bg-gradient-to-br from-blue-700 to-indigo-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-white/10 border border-white/15 p-10 md:flex md:items-center md:justify-between gap-8">
            <div className="text-white">
              <div className="text-2xl font-semibold">需要一份“多主体”接入建议？</div>
              <div className="mt-2 text-white/80 leading-relaxed">
                欢迎提供你的城市覆盖、主体结构与现有口径，我们会输出一份阶段计划与风险控制点清单。
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
