import type React from "react";
import { Link } from "react-router-dom";
import { CASES, type CaseTag } from "@/content/cases";

export function CaseEvidence(props: {
  tag: CaseTag;
  id?: string;
  title?: React.ReactNode;
  desc?: React.ReactNode;
}) {
  const id = props.id ?? "cases";
  const picked = CASES.filter((c) => c.tags.includes(props.tag)).slice(0, 2);
  const hasPicked = picked.length > 0;

  return (
    <section className="py-16 bg-white" id={id}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {props.title || props.desc ? (
          <div className="max-w-2xl">
            {props.title ? (
              <h2 className="text-2xl font-semibold text-gray-900">
                {props.title}
              </h2>
            ) : null}
            {props.desc ? (
              <p className="mt-2 text-gray-600 leading-relaxed">{props.desc}</p>
            ) : null}
          </div>
        ) : null}

        <div className="mt-8 grid md:grid-cols-2 gap-6">
          {hasPicked ? (
            picked.map((c) => (
              <Link
                key={c.id}
                to="/cases"
                className="block rounded-3xl border border-gray-200 bg-white p-7 shadow-sm hover:shadow-lg transition"
              >
                <div className="text-sm text-gray-500">{`客户类型：${c.customerType} · 接入时长：${c.onboarding}`}</div>
                <div className="mt-3 text-lg font-semibold text-gray-900">
                  {c.industry}
                </div>
                <div className="mt-3 text-gray-700 leading-relaxed">
                  {c.challenge}
                </div>
                <div className="mt-6 grid grid-cols-3 gap-3 pt-5 border-t border-gray-100">
                  <div>
                    <div className="text-xs text-gray-500">效率提升</div>
                    <div className="font-semibold">{c.efficiency}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">成本下降</div>
                    <div className="font-semibold">{c.cost}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">合规风险</div>
                    <div className="font-semibold">{c.compliance}</div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <Link
              to="/cases"
              className="block rounded-3xl border border-dashed border-gray-300 bg-gray-50 p-7 hover:bg-gray-100 transition md:col-span-2"
            >
              <div className="text-lg font-semibold text-gray-900">
                暂无相关案例
              </div>
              <div className="mt-2 text-gray-600 leading-relaxed">
                你可以前往案例中心查看全部案例摘要，我们也可以根据你的场景补充可参考的交付证据。
              </div>
              <div className="mt-4 text-blue-700 font-semibold">查看案例中心 →</div>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
