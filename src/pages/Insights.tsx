import { useEffect, useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/sections/Navbar";
import Footer from "@/sections/Footer";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/PageHero";
import { SectionNav } from "@/components/site/SectionNav";
import { getPageVisual } from "@/lib/siteVisual";

type InsightCategory = "all" | "政策解读" | "用工趋势" | "交付方法论" | "合规与风控";

type InsightItem = {
  id: string;
  title: string;
  category: Exclude<InsightCategory, "all">;
  summary: string;
  meta: string;
};

const CATEGORIES: Array<{ id: InsightCategory; label: string; hint: string }> = [
  { id: "all", label: "全部", hint: "持续更新的行业与方法论摘要" },
  { id: "政策解读", label: "政策解读", hint: "政策口径、合规要点与落地建议" },
  { id: "用工趋势", label: "用工趋势", hint: "峰谷弹性、成本结构与运营策略" },
  { id: "交付方法论", label: "交付方法论", hint: "从方案到落地：节奏、角色与清单" },
  { id: "合规与风控", label: "合规与风控", hint: "留痕、审计、异常复核与风控机制" },
];

const INSIGHTS: InsightItem[] = [
  {
    id: "policy-2026",
    title: "灵活用工政策解读（2026）",
    category: "政策解读",
    summary: "梳理多地税务与结算监管重点，给出“上线前必做项”清单与常见误区提醒。",
    meta: "更新：2026-04 · 8 分钟阅读",
  },
  {
    id: "delivery-peak",
    title: "外卖与即时配送用工趋势观察",
    category: "用工趋势",
    summary: "从旺季波峰与日常稳态两种视角，拆解成本结构、班次策略与人效指标的协同方式。",
    meta: "更新：2026-03 · 6 分钟阅读",
  },
  {
    id: "settlement-method",
    title: "从案例看结算中台搭建方法论",
    category: "交付方法论",
    summary: "聚焦“口径对齐—规则配置—异常复核—留痕归档”四段式路径，给出可复用的实施节奏。",
    meta: "更新：2026-03 · 10 分钟阅读",
  },
  {
    id: "risk-review",
    title: "批量支付风控如何做得可解释、可追溯？",
    category: "合规与风控",
    summary: "以风控阈值、复核流程与留痕材料为主线，解释如何在高峰期兼顾效率与安全。",
    meta: "更新：2026-02 · 7 分钟阅读",
  },
  {
    id: "multi-entity",
    title: "多主体、多城市结算口径统一的 3 个关键动作",
    category: "交付方法论",
    summary: "从组织边界拆解、数据映射到对账复盘，给出落地中最容易忽略的三个关键节点。",
    meta: "更新：2026-02 · 5 分钟阅读",
  },
];

export default function Insights() {
  useEffect(() => window.scrollTo(0, 0), []);
  const visual = getPageVisual("insights");
  const [category, setCategory] = useState<InsightCategory>("all");

  const filtered = useMemo(() => {
    if (category === "all") return INSIGHTS;
    return INSIGHTS.filter((p) => p.category === category);
  }, [category]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <PageHero
        title={
          <>
            行业洞察
            <span className="block text-blue-700">政策、趋势与落地方法论</span>
          </>
        }
        desc="把信息做成可执行的判断：我们持续整理政策口径、行业趋势与交付方法论摘要，帮助你更快做决策与推进落地。"
        primaryHref="/about/contact"
        primaryText="获取建议/订阅更新"
        secondaryHref="/downloads"
        secondaryText="下载资料包"
        visualSrc={visual.src}
        visualPos={visual.pos}
      />

      <SectionNav
        items={[
          { id: "filters", label: "分类筛选" },
          { id: "list", label: "洞察列表" },
          { id: "cta", label: "下一步" },
        ]}
      />

      <section className="py-10 bg-white border-b border-gray-100" id="filters">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-xl font-semibold text-gray-900">按主题浏览</h2>
            <p className="mt-2 text-gray-600 leading-relaxed">
              当前：{CATEGORIES.find((c) => c.id === category)?.hint}
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {CATEGORIES.map((c) => {
              const active = category === c.id;
              return (
                <Button
                  key={c.id}
                  type="button"
                  variant={active ? "default" : "outline"}
                  className={`rounded-full ${active ? "" : "bg-white/70"}`}
                  onClick={() => setCategory(c.id)}
                >
                  {c.label}
                </Button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#F5F7FA]" id="list">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-semibold text-gray-900">洞察摘要</h2>
              <p className="mt-2 text-gray-600 leading-relaxed">
                目前以“摘要 + 可索取全文”的形式提供。点击卡片可进入咨询表单，获取完整版或与顾问对齐口径。
              </p>
            </div>
            <div className="text-sm text-gray-500">共 {filtered.length} 条</div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {filtered.map((post) => (
              <Link
                key={post.id}
                to={`/about/contact?topic=insight&insight=${encodeURIComponent(post.id)}`}
                className="group block rounded-3xl border border-gray-200 bg-white p-7 shadow-sm hover:shadow-lg transition"
              >
                <div className="inline-flex text-xs px-2 py-1 rounded-full bg-blue-600/10 text-blue-700">
                  {post.category}
                </div>
                <div className="mt-3 text-lg font-semibold text-gray-900">
                  {post.title}
                </div>
                <div className="mt-3 text-gray-600 leading-relaxed">{post.summary}</div>
                <div className="mt-5 text-sm text-gray-500">{post.meta}</div>

                <div className="mt-6 inline-flex items-center text-sm font-medium text-blue-700 group-hover:text-blue-800">
                  索取全文/对齐口径
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-blue-700 to-indigo-800" id="cta">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-white/10 border border-white/15 p-10 md:flex md:items-center md:justify-between gap-8">
            <div className="text-white">
              <div className="text-2xl font-semibold">想把洞察转成可执行的计划？</div>
              <div className="mt-2 text-white/80 leading-relaxed">
                我们可以基于你的行业、组织结构与口径约束，把建议拆成阶段清单与实施节奏。
              </div>
            </div>
            <div className="mt-8 md:mt-0 flex flex-wrap gap-3">
              <Link to="/about/contact">
                <Button className="rounded-full px-8">联系顾问</Button>
              </Link>
              <Link to="/cases">
                <Button variant="outline" className="rounded-full px-8 bg-white/90">
                  查看案例摘要
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
