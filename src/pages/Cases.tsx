import { useEffect, useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/sections/Navbar";
import Footer from "@/sections/Footer";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/PageHero";
import { SectionNav } from "@/components/site/SectionNav";
import { CASES, type CaseTag } from "@/content/cases";
import { getPageVisual } from "@/lib/siteVisual";

type CaseFilter = "all" | CaseTag;

const FILTERS: Array<{
  id: CaseFilter;
  label: string;
  hint: string;
}> = [
  { id: "all", label: "全部", hint: "覆盖不同服务/行业场景" },
  { id: "services/settlement", label: "灵工结算", hint: "结算、对账、票税留痕" },
  { id: "services/insurance", label: "日结保险", hint: "短周期保障与理赔协同" },
  { id: "services/recruitment", label: "用工招聘", hint: "多城市招募与到岗管理" },
  { id: "solutions/delivery", label: "外卖配送", hint: "骑手结算与高峰稳定" },
  { id: "solutions/ride", label: "网约车", hint: "跨主体票据口径统一" },
  { id: "solutions/housekeeping", label: "家政服务", hint: "多服务形态与材料留存" },
  { id: "solutions/logistics", label: "物流仓配", hint: "旺季弹性用工与链路衔接" },
];

const TAG_LABEL: Record<CaseTag, string> = {
  "services/settlement": "结算",
  "services/insurance": "保险",
  "services/recruitment": "招聘",
  "solutions/delivery": "外卖配送",
  "solutions/ride": "网约车",
  "solutions/housekeeping": "家政",
  "solutions/logistics": "物流仓配",
};

export default function Cases() {
  useEffect(() => window.scrollTo(0, 0), []);
  const visual = getPageVisual("cases");
  const [filter, setFilter] = useState<CaseFilter>("all");

  const filtered = useMemo(() => {
    if (filter === "all") return CASES;
    return CASES.filter((c) => c.tags.includes(filter));
  }, [filter]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <PageHero
        title={
          <>
            客户案例
            <span className="block text-blue-700">用可验证结果讲清“如何落地”</span>
          </>
        }
        desc="这里汇总了典型交付场景的摘要：从业务痛点、接入节奏到效率/成本/合规指标，帮助你快速判断是否适配。"
        primaryHref="/about/contact"
        primaryText="获取同类方案建议"
        secondaryHref="/downloads"
        secondaryText="下载资料包"
        visualSrc={visual.src}
        visualPos={visual.pos}
      />

      <SectionNav
        items={[
          { id: "filters", label: "筛选" },
          { id: "list", label: "案例列表" },
          { id: "cta", label: "下一步" },
        ]}
      />

      <section className="py-10 bg-white border-b border-gray-100" id="filters">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-xl font-semibold text-gray-900">按关注点筛选</h2>
            <p className="mt-2 text-gray-600 leading-relaxed">
              你可以从“服务能力”或“行业场景”切入，查看更接近的交付摘要。
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {FILTERS.map((f) => {
              const active = filter === f.id;
              return (
                <Button
                  key={f.id}
                  type="button"
                  variant={active ? "default" : "outline"}
                  className={`rounded-full ${active ? "" : "bg-white/70"}`}
                  onClick={() => setFilter(f.id)}
                >
                  {f.label}
                </Button>
              );
            })}
          </div>

          <div className="mt-3 text-sm text-gray-500">
            当前：{FILTERS.find((f) => f.id === filter)?.hint ?? "全部"}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#F5F7FA]" id="list">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-semibold text-gray-900">案例摘要列表</h2>
              <p className="mt-2 text-gray-600 leading-relaxed">
                点击任意卡片可进入咨询表单，我们会基于你的业务数据给出更贴近的实施建议。
              </p>
            </div>
            <div className="text-sm text-gray-500">
              共 {filtered.length} 条（数据源：src/content/cases.ts）
            </div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {filtered.map((c) => (
              <Link
                key={c.id}
                to={`/about/contact?topic=case&case=${encodeURIComponent(c.id)}`}
                className="group block rounded-3xl border border-gray-200 bg-white p-7 shadow-sm hover:shadow-lg transition"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <div className="text-lg font-semibold text-gray-900">
                    {c.industry}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {c.tags.map((t) => (
                      <span
                        key={t}
                        className="text-xs px-2 py-1 rounded-full bg-blue-600/10 text-blue-700"
                      >
                        {TAG_LABEL[t]}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-3 text-sm text-gray-500">{`客户类型：${c.customerType} · 接入节奏：${c.onboarding}`}</div>

                <div className="mt-4 text-gray-700 leading-relaxed">
                  {c.challenge}
                </div>

                <div className="mt-6 grid grid-cols-3 gap-3 pt-5 border-t border-gray-100">
                  <div>
                    <div className="text-xs text-gray-500">效率</div>
                    <div className="font-semibold text-gray-900">
                      {c.efficiency}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">成本</div>
                    <div className="font-semibold text-gray-900">{c.cost}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">合规</div>
                    <div className="font-semibold text-gray-900">
                      {c.compliance}
                    </div>
                  </div>
                </div>

                <div className="mt-6 inline-flex items-center text-sm font-medium text-blue-700 group-hover:text-blue-800">
                  获取同类方案建议
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
              <div className="text-2xl font-semibold">想把你的场景映射到可执行计划？</div>
              <div className="mt-2 text-white/80 leading-relaxed">
                提供组织结构、人员规模与结算口径，我们会输出一份可落地的阶段计划与风险控制建议。
              </div>
            </div>
            <div className="mt-8 md:mt-0 flex flex-wrap gap-3">
              <Link to="/about/contact">
                <Button className="rounded-full px-8">联系顾问</Button>
              </Link>
              <Link to="/downloads">
                <Button variant="outline" className="rounded-full px-8 bg-white/90">
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
