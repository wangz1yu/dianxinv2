import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/sections/Navbar";
import Footer from "@/sections/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/PageHero";
import { SectionNav } from "@/components/site/SectionNav";
import { getPageVisual } from "@/lib/siteVisual";
import { trackEvent } from "@/lib/analytics";

const multipliers: Record<string, number> = {
  外卖配送: 0.78,
  网约车: 0.81,
  物流仓配: 0.84,
  其他行业: 0.86,
};

export default function ROICalculator() {
  const [headcount, setHeadcount] = useState(2000);
  const [perCapitaAmount, setPerCapitaAmount] = useState(6500);
  const [industry, setIndustry] = useState("外卖配送");

  useEffect(() => window.scrollTo(0, 0), []);
  const visual = getPageVisual("roi");

  const result = useMemo(() => {
    const monthlyTotal = headcount * perCapitaAmount;
    const optimizedCost = monthlyTotal * (multipliers[industry] || 0.86);
    const saved = monthlyTotal - optimizedCost;
    const efficiency = Math.round((1 - multipliers[industry]) * 180);
    return {
      monthlyTotal,
      optimizedCost,
      savedRange: [saved * 0.85, saved * 1.15],
      efficiency,
    };
  }, [headcount, perCapitaAmount, industry]);

  const format = (value: number) => `¥${Math.round(value).toLocaleString('zh-CN')}`;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <PageHero
        title={
          <>
            ROI / 费用试算器
            <span className="block text-blue-700">用规模数据快速估算节省空间</span>
          </>
        }
        desc="输入业务规模与行业类型，我们会基于常见结算链路的优化系数，给出一个“管理节省区间 + 结算效率提升”的粗算参考。"
        primaryHref="/about/contact"
        primaryText="带着数据找顾问核算"
        secondaryHref="/downloads"
        secondaryText="下载资料包"
        visualSrc={visual.src}
        visualPos={visual.pos}
      />

      <SectionNav
        items={[
          { id: "inputs", label: "输入参数" },
          { id: "results", label: "试算结果" },
        ]}
      />

      <section className="py-16 bg-[#F5F7FA]" id="inputs">
        <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-2 gap-8">
          <div className="rounded-3xl p-8 border border-gray-200 bg-white shadow-sm" id="results">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">试算结果</h2>
            <div className="space-y-4 text-gray-800">
              <p>
                预估原始综合成本：
                <span className="font-semibold"> {format(result.monthlyTotal)}</span> / 月
              </p>
              <p>
                使用点薪云后预估成本：
                <span className="font-semibold text-blue-700"> {format(result.optimizedCost)}</span> / 月
              </p>
              <p>
                管理成本节省区间：
                <span className="font-semibold text-green-700">
                  {" "}
                  {format(result.savedRange[0])} ~ {format(result.savedRange[1])}
                </span>
              </p>
              <p>
                结算效率提升：<span className="font-semibold">约 {result.efficiency}%</span>
              </p>
            </div>
            <Link to="/about/contact">
              <Button
                className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white rounded-2xl"
                onClick={() =>
                  trackEvent("click_schedule_assessment", {
                    source: "roi_calculator",
                    industry,
                  })
                }
              >
                预约方案评估
              </Button>
            </Link>
          </div>

          <div className="rounded-3xl p-8 border border-gray-200 bg-white shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">输入参数</h2>
            <div className="space-y-5">
              <div>
                <label className="text-sm text-gray-600">月结算人数</label>
                <Input
                  type="number"
                  value={headcount}
                  onChange={(e) => setHeadcount(Number(e.target.value) || 0)}
                />
              </div>
              <div>
                <label className="text-sm text-gray-600">单人单月金额（元）</label>
                <Input
                  type="number"
                  value={perCapitaAmount}
                  onChange={(e) =>
                    setPerCapitaAmount(Number(e.target.value) || 0)
                  }
                />
              </div>
              <div>
                <label className="text-sm text-gray-600">行业类型</label>
                <select
                  className="w-full border rounded-2xl h-11 px-3 bg-white"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                >
                  {Object.keys(multipliers).map((it) => (
                    <option key={it}>{it}</option>
                  ))}
                </select>
              </div>
              <div className="pt-2 text-sm text-gray-500 leading-relaxed">
                提示：该试算用于快速对齐投入与节省空间，最终口径建议以你的业务规则、城市覆盖与支付/票税流程为准。
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
