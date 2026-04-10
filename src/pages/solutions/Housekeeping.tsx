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

export default function Housekeeping() {
  useEffect(() => window.scrollTo(0, 0), []);
  const visual = getPageVisual("solutions/housekeeping");

  const combo: Array<{
    title: string;
    desc: string;
    bullets: string[];
    href?: string;
  }> = [
    {
      title: "用工招聘",
      desc: "把岗位画像、筛选与到岗验收放进交付路径，让人员补充与质量管理更可控。",
      bullets: ["岗位画像与能力拆解", "筛选与到岗验收流程", "与结算/保障链路衔接"],
      href: "/services/recruitment",
    },
    {
      title: "灵工结算",
      desc: "适配工时制/项目制等多种服务形态，把对账与材料留痕做成稳定流程。",
      bullets: ["结算口径可配置", "对账协同与异常处理", "留痕材料可追溯"],
      href: "/services/settlement",
    },
    {
      title: "日结保险",
      desc: "按场景配置保障组合，并提供材料指引与理赔协同，降低服务过程风险暴露。",
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
            家政服务
            <span className="block text-blue-700">让人员、结算与保障形成一条可追溯链路</span>
          </>
        }
        desc="面向家政服务的多岗位、多场景交付，把人员管理、结算口径与风险控制串到同一套流程里，便于平台稳定扩张与持续运营。"
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
              家政服务强调“信任与交付质量”，挑战往往来自人员流动、服务口径与风险边界。
            </p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "人员档案与资质留存分散",
                desc: "人员信息、资质与服务记录缺少统一沉淀，难以形成持续可追溯的管理闭环。",
              },
              {
                title: "工时/项目制口径复杂",
                desc: "多服务形态并行，结算规则与对账口径容易出现偏差与反复沟通。",
              },
              {
                title: "服务过程风险边界不清",
                desc: "意外与争议处理需要明确责任边界、材料留存与协同机制。",
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
              通过模块组合把关键动作拆成可执行清单，便于分阶段接入、验证与复盘。
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
        desc="建议从一个服务品类/城市开始试点，再逐步扩展。"
        steps={[
          { title: "梳理服务口径", desc: "对齐服务品类、岗位画像与结算口径边界。" },
          { title: "整理材料与流程", desc: "明确档案、资质、服务记录与角色分工。" },
          { title: "配置规则与联调", desc: "配置结算规则与留痕，并完成接口联调与验收。" },
          { title: "运营上线与复盘", desc: "分批上线，围绕质量与争议处理效率持续优化。" },
        ]}
      />

      <TrustEvidence
        title="合规与风险控制"
        desc="通过资质与安全能力、材料留存与操作留痕，把风险控制动作沉淀为可执行流程，便于审计与争议协同处理。"
      />

      <CaseEvidence
        tag="solutions/housekeeping"
        title="案例摘要"
        desc="以下为与家政服务场景相关的交付摘要（节选 1-2 条），可前往案例中心查看更多。"
      />

      <section className="py-16 bg-gradient-to-br from-blue-700 to-indigo-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-white/10 border border-white/15 p-10 md:flex md:items-center md:justify-between gap-8">
            <div className="text-white">
              <div className="text-2xl font-semibold">想先验证是否适配你的业务？</div>
              <div className="mt-2 text-white/80 leading-relaxed">
                欢迎提供你的服务品类、城市覆盖与现有流程，我们会输出一份可执行的接入建议与阶段计划。
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
