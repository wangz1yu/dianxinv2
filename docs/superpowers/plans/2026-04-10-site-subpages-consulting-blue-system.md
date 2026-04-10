# 子页面统一重设计（咨询叙事 + 偏蓝主视觉体系）Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.
>
> **Goal:** 将所有子页面统一为“咨询/解决方案化叙事 + 偏蓝主视觉体系”，并实现 CTA 主次分层（预约演示/联系顾问为主，下载方案为次）以及每个服务/行业页 1-2 条案例摘要模块。
>
> **Architecture:** 新增一套可复用页面级组件（PageHero/BlueVisualFrame/CaseEvidence/ProcessSteps/TrustEvidence/SectionNav），然后按路由分三类模板（服务详情 T1、行业详情 T2、内容/信任 T3）逐页迁移。视觉映射集中在 `src/lib/siteVisual.ts`，避免同图复用。
>
> **Tech Stack:** React 19 + TypeScript + Tailwind + framer-motion + react-router-dom(HashRouter) + Vite
>
> Spec: `docs/superpowers/specs/2026-04-10-site-subpages-consulting-blue-system-design.md`

---

## 0) 文件地图（最终将涉及）

**Create (components / lib / content)**
- `src/lib/siteVisual.ts`
- `src/lib/scroll.ts`
- `src/content/cases.ts`（从 HOME25_CASES 迁移/扩展）
- `src/components/site/PageHero.tsx`
- `src/components/site/BlueVisualFrame.tsx`
- `src/components/site/SectionNav.tsx`
- `src/components/site/ProcessSteps.tsx`
- `src/components/site/CaseEvidence.tsx`
- `src/components/site/TrustEvidence.tsx`

**Modify (pages)**
- `src/pages/Services.tsx`
- `src/pages/services/Settlement.tsx`
- `src/pages/services/Insurance.tsx`
- `src/pages/services/Recruitment.tsx`
- `src/pages/Solutions.tsx`
- `src/pages/solutions/Delivery.tsx`
- `src/pages/solutions/Ride.tsx`
- `src/pages/solutions/Housekeeping.tsx`
- `src/pages/solutions/Logistics.tsx`
- `src/pages/Cases.tsx`
- `src/pages/ComplianceCenter.tsx`
- `src/pages/Downloads.tsx`
- `src/pages/Insights.tsx`
- `src/pages/about/Company.tsx`
- `src/pages/about/History.tsx`
- `src/pages/about/Contact.tsx`
- `src/pages/ROICalculator.tsx`
- `src/pages/NotFound.tsx`

---

## Task 1：建立“案例数据源”与路由匹配工具（CaseEvidence 基础）

**Files:**
- Create: `src/content/cases.ts`

- [ ] Step 1: 创建 `CASES` 常量（先复用 HOME25_CASES）

```ts
export type CaseTag = "services/settlement" | "services/insurance" | "services/recruitment" | "solutions/delivery" | "solutions/ride" | "solutions/housekeeping" | "solutions/logistics";

export type CaseItem = {
  id: string;
  industry: string;
  customerType: string;
  onboarding: string;
  challenge: string;
  efficiency: string;
  cost: string;
  compliance: string;
  tags: CaseTag[];
};

export const CASES: CaseItem[] = [
  {
    id: "delivery",
    industry: "外卖配送",
    customerType: "全国连锁平台",
    onboarding: "10个工作日",
    challenge: "高峰期骑手结算压力大，人工对账易出错。",
    efficiency: "+65%",
    cost: "-19%",
    compliance: "劳务纠纷率 -41%",
    tags: ["services/settlement", "solutions/delivery"],
  },
  {
    id: "ride",
    industry: "网约车",
    customerType: "多城市运力服务商",
    onboarding: "14个工作日",
    challenge: "跨区域主体管理复杂，支付与票据规则不统一。",
    efficiency: "+58%",
    cost: "-23%",
    compliance: "票据合规率 99.2%",
    tags: ["services/settlement", "solutions/ride"],
  },
  {
    id: "logistics",
    industry: "物流仓配",
    customerType: "仓配一体化企业",
    onboarding: "7个工作日",
    challenge: "临时用工波峰明显，招聘结算链路长。",
    efficiency: "+72%",
    cost: "-16%",
    compliance: "留痕覆盖 100%",
    tags: ["services/recruitment", "solutions/logistics"],
  },
];
```

- [ ] Step 2: Build 验证

```bash
npm run build
```

- [ ] Step 3: Commit

```bash
git add src/content/cases.ts
git commit -m "feat: add shared cases content source for subpages"
```

---

## Task 2：建立子页通用视觉映射（避免同图复用）

**Files:**
- Create: `src/lib/siteVisual.ts`

- [ ] Step 1: 为每类页面定义主视觉（src + objectPosition + overlays）

```ts
import { assetUrl } from "@/lib/assets";

export type VisualKey =
  | "services"
  | "services/settlement"
  | "services/insurance"
  | "services/recruitment"
  | "solutions"
  | "solutions/delivery"
  | "solutions/ride"
  | "solutions/housekeeping"
  | "solutions/logistics"
  | "cases"
  | "compliance"
  | "downloads"
  | "insights"
  | "about/company"
  | "about/history"
  | "about/contact"
  | "roi";

export function getPageVisual(key: VisualKey) {
  switch (key) {
    case "services/settlement":
      return { src: assetUrl("images/service-settlement.jpg"), pos: "50% 35%" };
    case "services/insurance":
      return { src: assetUrl("images/service-insurance.jpg"), pos: "50% 45%" };
    case "services/recruitment":
      return { src: assetUrl("images/service-recruitment.jpg"), pos: "45% 35%" };
    case "solutions/delivery":
      return { src: assetUrl("images/service-settlement.jpg"), pos: "55% 35%" };
    case "solutions/ride":
      return { src: assetUrl("images/hero-dashboard.jpg"), pos: "70% 20%" };
    case "solutions/logistics":
      return { src: assetUrl("images/service-recruitment.jpg"), pos: "40% 40%" };
    default:
      return { src: assetUrl("images/hero-dashboard.jpg"), pos: "60% 20%" };
  }
}
```

- [ ] Step 2: Build & Commit

```bash
npm run build
git add src/lib/siteVisual.ts
git commit -m "feat: add site visual mapping for subpages"
```

---

## Task 3：滚动与锚点工具（SectionNav/CTA 跳转）

**Files:**
- Create: `src/lib/scroll.ts`

- [ ] Step 1: 添加带 offset 的滚动工具

```ts
export function scrollToId(id: string, offset = 84) {
  const el = document.getElementById(id);
  if (!el) return;
  const y = window.scrollY + el.getBoundingClientRect().top - offset;
  window.scrollTo({ top: y, behavior: "smooth" });
}
```

- [ ] Step 2: Commit

```bash
git add src/lib/scroll.ts
git commit -m "feat: add scroll helper for section navigation"
```

---

## Task 4：构建通用组件（PageHero + BlueVisualFrame）

**Files:**
- Create: `src/components/site/BlueVisualFrame.tsx`
- Create: `src/components/site/PageHero.tsx`

- [ ] Step 1: `BlueVisualFrame`（图片 + 蓝高光 + 渐隐 + 轻噪点）

```tsx
import type React from "react";

const GRAIN_SVG = encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency=".8" numOctaves="3" stitchTiles="stitch"/></filter><rect width="160" height="160" filter="url(#n)" opacity=".26"/></svg>`);

export function BlueVisualFrame({ src, pos = "50% 50%", className = "" }: { src: string; pos?: string; className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-3xl border border-gray-200 shadow-xl bg-white ${className}`}>
      <img src={src} alt="" aria-hidden className="h-full w-full object-cover" style={{ objectPosition: pos }} loading="lazy" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(700px_320px_at_18%_10%,rgba(59,130,246,0.35),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(245,247,250,0.0),rgba(245,247,250,0.55)_82%,rgba(245,247,250,0.85))]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-multiply" style={{ backgroundImage: `url(\"data:image/svg+xml,${GRAIN_SVG}\")` }} />
    </div>
  );
}
```

- [ ] Step 2: `PageHero`（标题/描述/CTA 双按钮 + 主视觉）

```tsx
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BlueVisualFrame } from "./BlueVisualFrame";

export function PageHero(props: {
  title: React.ReactNode;
  desc: React.ReactNode;
  primaryHref: string;
  primaryText: string;
  secondaryHref: string;
  secondaryText: string;
  visualSrc: string;
  visualPos?: string;
}) {
  return (
    <section className="py-16 bg-[#F5F7FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-10 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-5">
          <h1 className="text-4xl md:text-5xl font-bold font-display text-gray-900">{props.title}</h1>
          <p className="mt-5 text-gray-600 leading-relaxed">{props.desc}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to={props.primaryHref}><Button className="rounded-full px-8">{props.primaryText}</Button></Link>
            <Link to={props.secondaryHref}><Button variant="outline" className="rounded-full px-8 bg-white/70">{props.secondaryText}</Button></Link>
          </div>
        </div>
        <div className="lg:col-span-7">
          <BlueVisualFrame src={props.visualSrc} pos={props.visualPos} className="h-[360px]" />
        </div>
      </div>
    </section>
  );
}
```

- [ ] Step 3: Build & Commit

```bash
npm run build
git add src/components/site/BlueVisualFrame.tsx src/components/site/PageHero.tsx
git commit -m "feat: add subpage PageHero and BlueVisualFrame components"
```

---

## Task 5：构建证据链组件（CaseEvidence + ProcessSteps + TrustEvidence + SectionNav）

**Files:**
- Create: `src/components/site/CaseEvidence.tsx`
- Create: `src/components/site/ProcessSteps.tsx`
- Create: `src/components/site/TrustEvidence.tsx`
- Create: `src/components/site/SectionNav.tsx`

- [ ] Step 1: `CaseEvidence`（根据 tags 取 1-2 个案例摘要）

```tsx
import { Link } from "react-router-dom";
import { CASES, CaseTag } from "@/content/cases";

export function CaseEvidence({ tag }: { tag: CaseTag }) {
  const picked = CASES.filter((c) => c.tags.includes(tag)).slice(0, 2);
  return (
    <section className="py-16 bg-white" id="cases">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-6">
          {picked.map((c) => (
            <Link key={c.id} to="/cases" className="block rounded-3xl border border-gray-200 bg-white p-7 shadow-sm hover:shadow-lg transition">
              <div className="text-sm text-gray-500">{`客户类型：${c.customerType} · 接入时长：${c.onboarding}`}</div>
              <div className="mt-3 text-lg font-semibold text-gray-900">{c.industry}</div>
              <div className="mt-3 text-gray-700 leading-relaxed">{c.challenge}</div>
              <div className="mt-6 grid grid-cols-3 gap-3 pt-5 border-t border-gray-100">
                <div><div className="text-xs text-gray-500">效率提升</div><div className="font-semibold">{c.efficiency}</div></div>
                <div><div className="text-xs text-gray-500">成本下降</div><div className="font-semibold">{c.cost}</div></div>
                <div><div className="text-xs text-gray-500">合规风险</div><div className="font-semibold">{c.compliance}</div></div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] Step 2: `ProcessSteps`（3-5 步）
- [ ] Step 3: `TrustEvidence`（复用 Qualifications 的证照水印/缩略图）
- [ ] Step 4: `SectionNav`（锚点导航条，使用 scrollToId）
- [ ] Step 5: Build & Commit

```bash
npm run build
git add src/components/site
git commit -m "feat: add subpage evidence components and section nav"
```

---

## Task 6：迁移服务页组（T1）

**Files:**
- Modify: `src/pages/Services.tsx`
- Modify: `src/pages/services/Settlement.tsx`
- Modify: `src/pages/services/Insurance.tsx`
- Modify: `src/pages/services/Recruitment.tsx`

- [ ] Step 1: `/services` 聚合页：PageHero + 三服务卡 + 简版路径 + TrustEvidence + CaseEvidence + CTA
- [ ] Step 2: 三个服务详情页套 T1：PageHero + 痛点 + 路径 + TrustEvidence + CaseEvidence(tag) + FAQ + CTA
- [ ] Step 3: Build & Commit

```bash
npm run build
git add src/pages/Services.tsx src/pages/services
git commit -m "feat: redesign service pages with consulting narrative template"
```

---

## Task 7：迁移解决方案页组（T2）

**Files:**
- Modify: `src/pages/Solutions.tsx`
- Modify: `src/pages/solutions/*`

- [ ] Step 1: `/solutions` 聚合页：PageHero + 四行业入口 + 方法论/交付路径 + TrustEvidence + CTA
- [ ] Step 2: 四个行业详情页套 T2：痛点 → 方案组合 → 接入节奏 → 合规风控 → CaseEvidence(tag) → CTA
- [ ] Step 3: Build & Commit

```bash
npm run build
git add src/pages/Solutions.tsx src/pages/solutions
git commit -m "feat: redesign solution pages with consulting narrative template"
```

---

## Task 8：迁移内容/信任页组（T3）

**Files:**
- Modify: `src/pages/Cases.tsx`
- Modify: `src/pages/ComplianceCenter.tsx`
- Modify: `src/pages/Downloads.tsx`
- Modify: `src/pages/Insights.tsx`

- [ ] Step 1: Cases 列表页：PageHero + 列表卡片 + CTA
- [ ] Step 2: Compliance/Downloads/Insights：PageHero + 目录/列表 + CTA
- [ ] Step 3: Build & Commit

```bash
npm run build
git add src/pages/Cases.tsx src/pages/ComplianceCenter.tsx src/pages/Downloads.tsx src/pages/Insights.tsx
git commit -m "feat: redesign evidence/content pages to unified T3 template"
```

---

## Task 9：迁移 About/ROI/404（收口统一）

**Files:**
- Modify: `src/pages/about/*`
- Modify: `src/pages/ROICalculator.tsx`
- Modify: `src/pages/NotFound.tsx`

- [ ] Step 1: about 三页套 PageHero + 叙事结构 + CTA
- [ ] Step 2: ROI 保留功能，增加 PageHero 与分区层级
- [ ] Step 3: 404 套 PageHero 风格引导回首页/联系
- [ ] Step 4: Build & Commit

```bash
npm run build
git add src/pages/about src/pages/ROICalculator.tsx src/pages/NotFound.tsx
git commit -m "feat: align about/roi/404 pages with blue consulting system"
```

---

## Task 10：合并到 main，推送部署

- [ ] Step 1: 最终 build
```bash
npm run build
```

- [ ] Step 2: 合并
```bash
git checkout main
git merge --ff-only <branch>
```

- [ ] Step 3: 推送
```bash
git push origin main
```

