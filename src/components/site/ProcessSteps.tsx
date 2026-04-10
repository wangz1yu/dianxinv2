import type React from "react";

export type ProcessStepItem = {
  title: React.ReactNode;
  desc?: React.ReactNode;
};

const DEFAULT_STEPS: ProcessStepItem[] = [
  { title: "沟通目标", desc: "对齐范围、边界与关键约束。" },
  { title: "梳理现状", desc: "整理现有流程、数据与接口情况。" },
  { title: "方案与计划", desc: "形成阶段性计划与交付清单。" },
  { title: "实施与交付", desc: "按节奏推进接入、联调与验收。" },
];

export function ProcessSteps(props: {
  id?: string;
  title?: React.ReactNode;
  desc?: React.ReactNode;
  steps?: ProcessStepItem[];
}) {
  const steps = props.steps?.length ? props.steps : DEFAULT_STEPS;

  return (
    <section className="py-16 bg-[#F5F7FA]" id={props.id ?? "process"}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {props.title ? (
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold text-gray-900">
              {props.title}
            </h2>
            {props.desc ? (
              <p className="mt-2 text-gray-600 leading-relaxed">{props.desc}</p>
            ) : null}
          </div>
        ) : null}

        <ol className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, idx) => (
            <li
              key={idx}
              className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-blue-600/10 text-blue-700 flex items-center justify-center font-semibold">
                  {idx + 1}
                </div>
                <div className="text-base font-semibold text-gray-900">
                  {s.title}
                </div>
              </div>
              {s.desc ? (
                <div className="mt-3 text-sm text-gray-600 leading-relaxed">
                  {s.desc}
                </div>
              ) : null}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

