import type React from "react";
import { assetUrl } from "@/lib/assets";

export type TrustEvidenceItem = {
  id: string;
  title: React.ReactNode;
  thumbSrc: string;
};

const DEFAULT_ITEMS: TrustEvidenceItem[] = [
  {
    id: "q1",
    title: "软件著作权",
    thumbSrc: assetUrl("images/qualifications/qualification-1-thumb.svg"),
  },
  {
    id: "q2",
    title: "信息系统安全等级保护",
    thumbSrc: assetUrl("images/qualifications/qualification-2-thumb.svg"),
  },
  {
    id: "q3",
    title: "互联网信息服务相关资质",
    thumbSrc: assetUrl("images/qualifications/qualification-3-thumb.svg"),
  },
];

export function TrustEvidence(props: {
  id?: string;
  title?: React.ReactNode;
  desc?: React.ReactNode;
  items?: TrustEvidenceItem[];
}) {
  const items = props.items?.length ? props.items : DEFAULT_ITEMS;

  return (
    <section
      className="relative overflow-hidden py-16 bg-gray-50"
      id={props.id ?? "trust"}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-multiply"
        aria-hidden
        style={{
          backgroundImage: [
            `url(${assetUrl("images/qualifications/qualification-1-thumb.svg")})`,
            `url(${assetUrl("images/qualifications/qualification-2-thumb.svg")})`,
          ].join(", "),
          backgroundRepeat: "no-repeat, no-repeat",
          backgroundSize: "520px auto, 460px auto",
          backgroundPosition: "110% 18%, -10% 82%",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {items.map((it) => (
            <div
              key={it.id}
              className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <img
                  src={it.thumbSrc}
                  alt={typeof it.title === "string" ? it.title : ""}
                  className="h-24 w-full object-contain"
                  loading="lazy"
                />
              </div>
              <div className="mt-4 text-base font-semibold text-gray-900">
                {it.title}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

