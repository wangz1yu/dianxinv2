# 首页偏蓝叙事主视觉系统 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.
>
> **Goal:** 在不改任何文案、且 Hero 与互动演示区域不变的前提下，用现有素材深加工为首页各模块做“偏蓝叙事”的差异化主视觉构图，消除“同图复用”的 AI 模板感。
>
> **Architecture:** 不新增文案、不改模块文案。通过一个集中映射文件 `src/lib/homeVisual.ts` 统一管理“行业→图片源→裁切位置→叠层方案”，各 section 只消费映射结果渲染图片与叠层。这样可快速迭代视觉并避免再次出现“到处用同一张图”。
>
> **Tech Stack:** React 19 + TypeScript + Tailwind + framer-motion + Vite
>
> 设计稿：`docs/superpowers/specs/2026-04-10-home-blue-narrative-imagery-design.md`

---

## 0) 文件地图

**Create**
- `src/lib/homeVisual.ts`（视觉映射：图片 src、objectPosition、overlay 方案）

**Modify**
- `src/sections/SolutionOverview.tsx`
- `src/sections/ProblemStrip.tsx`
- `src/sections/SuccessCases.tsx`
- `src/sections/Qualifications.tsx`（轻水印背景）

**No touch**
- `src/sections/Hero.tsx`（不动）
- `src/sections/DemosStory.tsx`（不动）
- `src/sections/Demo*.tsx`（不动）
- `src/content/home25.copy.ts`（不改文案）

---

## Task 1：新增主视觉映射工具（集中管理裁切/叠层）

**Files:**
- Create: `src/lib/homeVisual.ts`

- [ ] Step 1: 创建映射（industry → image）

```ts
import { assetUrl } from "@/lib/assets";

export type Industry = "外卖配送" | "网约车" | "物流仓配";

export function getProblemImage(industry: Industry) {
  switch (industry) {
    case "外卖配送":
      return { src: assetUrl("images/service-settlement.jpg"), pos: "50% 35%" };
    case "网约车":
      return { src: assetUrl("images/hero-dashboard.jpg"), pos: "60% 20%" };
    case "物流仓配":
      return { src: assetUrl("images/service-recruitment.jpg"), pos: "40% 40%" };
  }
}

export function getCaseAccent(industry: Industry) {
  // 与 ProblemStrip 不同的裁切，避免重复
  switch (industry) {
    case "外卖配送":
      return { src: assetUrl("images/service-settlement.jpg"), pos: "48% 55%" };
    case "网约车":
      return { src: assetUrl("images/hero-dashboard.jpg"), pos: "72% 18%" };
    case "物流仓配":
      return { src: assetUrl("images/service-recruitment.jpg"), pos: "35% 60%" };
  }
}
```

- [ ] Step 2: Build 验证

Run:
```bash
npm run build
```

- [ ] Step 3: Commit

```bash
git add src/lib/homeVisual.ts
git commit -m "feat: add home visual mapping for blue narrative imagery"
```

---

## Task 2：SolutionOverview 叠层升级（蓝色高光 + 渐隐 + 轻噪点）

**Files:**
- Modify: `src/sections/SolutionOverview.tsx`

- [ ] Step 1: 在主图容器上加入 3 层叠层（均 aria-hidden）

```tsx
<div className="relative overflow-hidden rounded-3xl border border-gray-200 shadow-xl bg-white">
  <img ... className="h-[360px] w-full object-cover" style={{ objectPosition: "60% 20%" }} />
  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(600px_280px_at_20%_10%,rgba(59,130,246,0.35),transparent_60%)]" />
  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(245,247,250,0.0),rgba(245,247,250,0.55)_82%,rgba(245,247,250,0.85))]" />
  <div className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-multiply [background-image:url('data:image/svg+xml,...')]" />
</div>
```

> 噪点层用同一段 SVG turbulence（跟之前纸纹类似），但 opacity 很低，避免脏。

- [ ] Step 2: chips hover 更像官网（上浮 1px + border 变亮）

- [ ] Step 3: Build & Commit

```bash
npm run build
git add src/sections/SolutionOverview.tsx
git commit -m "feat: add blue narrative overlays to solution hero visual"
```

---

## Task 3：ProblemStrip 每卡不同底图（不再都用 dashboard）

**Files:**
- Modify: `src/sections/ProblemStrip.tsx`
- Modify: `src/lib/homeVisual.ts`

- [ ] Step 1: ProblemStrip 使用 `getProblemImage(it.industry)` 作为底图

```tsx
const visual = getProblemImage(it.industry);
style={{
  backgroundImage: `linear-gradient(180deg, rgba(255,255,255,0.92), rgba(255,255,255,0.92)), url(${visual.src})`,
  backgroundPosition: visual.pos,
}}
```

- [ ] Step 2: 加一个蓝色角落高光叠层（统一风格）

用 pseudo 或额外 div：

```tsx
<div className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-blue-500/15 blur-2xl" />
```

- [ ] Step 3: Build & Commit

```bash
npm run build
git add src/sections/ProblemStrip.tsx src/lib/homeVisual.ts
git commit -m "feat: diversify problem visuals using existing product assets"
```

---

## Task 4：SuccessCases 角标注图差异化（每卡不同 src 与裁切）

**Files:**
- Modify: `src/sections/SuccessCases.tsx`
- Modify: `src/lib/homeVisual.ts`

- [ ] Step 1: 角标图使用 `getCaseAccent(item.industry)`

```tsx
const accent = getCaseAccent(item.industry);
<img src={accent.src} style={{ objectPosition: accent.pos }} ... />
```

- [ ] Step 2: hover 时角标轻微放大（scale 1.03）

用 `group`：

```tsx
<div className="group ...">
  <img className="transition-transform duration-300 group-hover:scale-[1.03]" ... />
</div>
```

- [ ] Step 3: Build & Commit

```bash
npm run build
git add src/sections/SuccessCases.tsx src/lib/homeVisual.ts
git commit -m "feat: diversify case accents to avoid repeated imagery"
```

---

## Task 5：Qualifications 背景水印（证据链质感）

**Files:**
- Modify: `src/sections/Qualifications.tsx`

- [ ] Step 1: section 加背景水印（svg 多层，opacity 极低）

使用 `assetUrl("images/qualifications/qualification-1-thumb.svg")` 等拼接 background-image。

- [ ] Step 2: Build & Commit

```bash
npm run build
git add src/sections/Qualifications.tsx
git commit -m "feat: add subtle qualification watermark background"
```

---

## Task 6：合并到 main、推送部署

- [ ] Step 1: 最终 build

```bash
npm run build
```

- [ ] Step 2: merge

```bash
git checkout main
git merge --ff-only <your-branch>
```

- [ ] Step 3: push

```bash
git push origin main
```

