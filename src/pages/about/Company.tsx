import { useEffect } from "react";
import { Award, Shield, TrendingUp, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/sections/Navbar";
import Footer from "@/sections/Footer";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/PageHero";
import { SectionNav } from "@/components/site/SectionNav";
import { getPageVisual } from "@/lib/siteVisual";

const STATS = [
  { value: "8年+", label: "行业深耕" },
  { value: "3000+", label: "服务企业" },
  { value: "20万+", label: "服务人才" },
  { value: "多场景", label: "行业覆盖" },
];

const VALUES = [
  {
    icon: Award,
    title: "专业交付",
    desc: "以“口径对齐—规则配置—异常复核—留痕归档”为主线，把方案做成可执行清单。",
  },
  {
    icon: Shield,
    title: "合规优先",
    desc: "围绕资质、票税与风控机制建立证据链，帮助你在审计与监管口径下稳态运行。",
  },
  {
    icon: TrendingUp,
    title: "效率可量化",
    desc: "用数据口径与流程拆解明确“节省在哪里”，让管理节省与人效提升可解释、可追溯。",
  },
  {
    icon: Users,
    title: "长期共建",
    desc: "从试点到规模化运营，持续复盘指标、规则与流程，保持交付稳定性与扩展性。",
  },
];

const DELIVERY_STEPS = [
  {
    title: "对齐口径与边界",
    desc: "梳理主体、城市、工种与票税口径，明确规则与异常处理边界。",
  },
  {
    title: "配置与联调",
    desc: "建立结算规则、风控阈值与留痕材料清单，并完成数据对接与验收。",
  },
  {
    title: "试点上线与复盘",
    desc: "以小规模场景验证流程与指标，稳定后再逐步复制到更多城市/业务线。",
  },
];

export default function Company() {
  useEffect(() => window.scrollTo(0, 0), []);
  const visual = getPageVisual("about/company");

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <PageHero
        title={
          <>
            关于点薪云
            <span className="block text-blue-700">把灵活用工做成“可落地的交付体系”</span>
          </>
        }
        desc="我们聚焦灵活用工的结算、票税与风控场景，通过数字化工具与咨询式交付，把复杂链路拆解为可执行的流程与证据链。"
        primaryHref="/about/contact"
        primaryText="联系顾问"
        secondaryHref="/downloads"
        secondaryText="下载资料包"
        visualSrc={visual.src}
        visualPos={visual.pos}
      />

      <SectionNav
        items={[
          { id: "overview", label: "概览" },
          { id: "values", label: "价值观" },
          { id: "delivery", label: "交付方式" },
          { id: "cta", label: "下一步" },
        ]}
      />

      <section className="py-16 bg-white border-b border-gray-100" id="overview">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold text-gray-900">公司概览</h2>
            <p className="mt-2 text-gray-600 leading-relaxed">
              从业务、财务到法务，点薪云希望用同一套口径把“用工—结算—合规—留痕”串起来，减少跨部门沟通与反复对账。
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm hover:shadow-lg transition"
              >
                <div className="text-3xl font-semibold text-blue-700">
                  {s.value}
                </div>
                <div className="mt-2 text-sm text-gray-600">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#F5F7FA] border-b border-gray-100" id="values">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold text-gray-900">我们坚持的交付原则</h2>
            <p className="mt-2 text-gray-600 leading-relaxed">
              不追求堆功能，而是让每一笔结算、每一次异常复核都能被解释、被追溯。
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v) => (
              <div
                key={v.title}
                className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm hover:shadow-lg transition"
              >
                <div className="h-12 w-12 rounded-2xl bg-blue-600/10 text-blue-700 flex items-center justify-center">
                  <v.icon className="h-6 w-6" />
                </div>
                <div className="mt-5 text-lg font-semibold text-gray-900">
                  {v.title}
                </div>
                <div className="mt-2 text-gray-600 leading-relaxed text-sm">
                  {v.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white" id="delivery">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-semibold text-gray-900">
                我们如何把方案落到系统与流程
              </h2>
              <p className="mt-2 text-gray-600 leading-relaxed">
                适配不同城市与业务线，优先跑通“可复制”的最小闭环，再逐步扩大覆盖。
              </p>
            </div>
            <Link to="/roi-calculator" className="text-sm font-medium text-blue-700 hover:text-blue-800">
              先做费用试算
              <ArrowRight className="inline-block ml-2 h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {DELIVERY_STEPS.map((step, i) => (
              <div
                key={step.title}
                className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-lg transition"
              >
                <div className="text-sm font-semibold text-blue-700">
                  第 {i + 1} 步
                </div>
                <div className="mt-2 text-xl font-semibold text-gray-900">
                  {step.title}
                </div>
                <div className="mt-3 text-gray-600 leading-relaxed">
                  {step.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="py-16 bg-gradient-to-br from-blue-700 to-indigo-800"
        id="cta"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-white/10 border border-white/15 p-10 md:flex md:items-center md:justify-between gap-8">
            <div className="text-white">
              <div className="text-2xl font-semibold">
                想把你的场景拆成一份可执行计划？
              </div>
              <div className="mt-2 text-white/80 leading-relaxed">
                留下行业与规模信息，我们会回传一份“交付节奏 + 风险边界 + 口径对齐清单”。
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
                  下载资料包
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
