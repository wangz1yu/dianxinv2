# 首页补强（图片/动效/点击 & Demo 修复）Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.
>
> **Goal:** 在不改任何文案（锁定 25e2cf0）且不改 Demo 内部交互逻辑的前提下，补足首页图片承载、增强 hover/click/滚动动效节奏，并修复 Demo 区域按钮不可点击问题。
>
> **Architecture:** 以现有 `Home.tsx` 新结构为基础，优先修复 `DemosStory` 的叠层点击拦截；随后为 ProblemStrip / SolutionOverview / SuccessCases 引入“产品界面图”承载（复用 `public/images/hero-dashboard.jpg` 与现有 service 图片），并添加不引入新文案的点击交互（滚动到锚点）。
>
> **Tech Stack:** React 19 + TypeScript + Tailwind + framer-motion + Vite + react-router-dom(HashRouter)
>
> 设计稿：`docs/superpowers/specs/2026-04-10-home-polish-images-interactions.md`

---

## 0) 文件地图（改哪些）

**Fix**
- `src/sections/DemosStory.tsx`（修复点击拦截 + 进度指示可点）

**Images / interactions**
- `src/sections/SolutionOverview.tsx`（加产品主视觉图 + chips 可点）
- `src/sections/ProblemStrip.tsx`（卡片加产品纹理图 + 可点跳转到 Cases）
- `src/sections/SuccessCases.tsx`（卡片加产品纹理图/角标 + 整卡可点）

**Anchors**
- `src/sections/Services.tsx`（加 `id="services"`）
- `src/sections/SuccessCases.tsx`（加 `id="cases"`）

**Helpers（如需要）**
- `src/lib/scroll.ts`（可选：封装 `scrollIntoView` 带 offset）

---

## Task 1：修复 Demo 区按钮点击无效（P0）

**Files:**
- Modify: `src/sections/DemosStory.tsx`

- [ ] Step 1: 写一个最小“遮挡层排查”修复

将透明占位层改为不接收事件，并且明确激活层 z-index：

```tsx
// 透明撑高层：必须 pointer-events-none
<div className="opacity-0 pointer-events-none" aria-hidden>
  <DemoSettlement embedded />
</div>

// 激活层：加 z-10，且 pointer-events-auto
className={`absolute inset-0 z-10 ${active === idx ? "pointer-events-auto" : "pointer-events-none"}`}
```

- [ ] Step 2: 在进度条上加“可点击切换段落”（不加任何文字）

点击第 n 段时，滚动到该段对应的 scroll position（仍由 scroll 驱动 active，但点击能把用户带到对应位置）：

```tsx
const jumpTo = (idx: number) => {
  const el = sectionRef.current;
  if (!el) return;
  const rect = el.getBoundingClientRect();
  const top = window.scrollY + rect.top;
  const segment = (el.offsetHeight - window.innerHeight) / 3;
  window.scrollTo({ top: top + segment * idx, behavior: "smooth" });
};
```

- [ ] Step 3: 本地验证

Run:
```bash
npm run dev
```
Expected:
- sticky 模式下 3 个 demo 的主按钮均可点击触发流程
- 进度条点击能跳转到对应 demo 段落

- [ ] Step 4: Commit

```bash
git add src/sections/DemosStory.tsx
git commit -m "fix: restore demo interactions by removing overlay click interception"
```

---

## Task 2：SolutionOverview 加“产品主视觉图”+ chips 可点（P1）

**Files:**
- Modify: `src/sections/SolutionOverview.tsx`
- Modify: `src/sections/Services.tsx`（加锚点 id）

- [ ] Step 1: 在 Services section 顶层容器加锚点（不改文案）

```tsx
<section id="services" className="py-24 ...">
```

- [ ] Step 2: SolutionOverview 改成“左文案 + 右图（hero-dashboard.jpg）”

不新增文字，仅改布局并加入图片：

```tsx
import { assetUrl } from "@/lib/assets";

<img
  src={assetUrl("images/hero-dashboard.jpg")}
  alt=""
  aria-hidden
  className="w-full rounded-3xl border border-gray-200 shadow-xl object-cover"
/>
```

- [ ] Step 3: 8 个能力点 chips 可点（不改文字）

chips 使用 `<button>`，点击滚动到 `#services`（或未来扩展到其它锚点）：

```tsx
<button
  type="button"
  onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
  className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm hover:shadow-md transition"
>
  {it.label}
</button>
```

- [ ] Step 4: Build & Commit

Run:
```bash
npm run build
```

Commit:
```bash
git add src/sections/SolutionOverview.tsx src/sections/Services.tsx
git commit -m "feat: add product hero image and clickable capability chips"
```

---

## Task 3：ProblemStrip 补“产品纹理图”+ 点击跳转到 Cases（P1）

**Files:**
- Modify: `src/sections/ProblemStrip.tsx`
- Modify: `src/sections/SuccessCases.tsx`（加锚点 id）

- [ ] Step 1: SuccessCases 顶层 section 加锚点（不改文案）

```tsx
<section id="cases" className="py-24 ...">
```

- [ ] Step 2: ProblemStrip 卡片加背景纹理图（不新增文字）

用 `hero-dashboard.jpg` 做裁切背景（通过 `background-position` 做差异化），并保持文字对比度：

```tsx
style={{
  backgroundImage: `linear-gradient(180deg, rgba(255,255,255,0.92), rgba(255,255,255,0.92)), url(${assetUrl("images/hero-dashboard.jpg")})`,
  backgroundSize: "cover",
  backgroundPosition: `${20 + idx * 30}% 30%`,
}}
```

- [ ] Step 3: 整卡可点击（不新增按钮）

```tsx
onClick={() => document.getElementById("cases")?.scrollIntoView({ behavior: "smooth" })}
role="button"
tabIndex={0}
onKeyDown={(e) => e.key === "Enter" && ...}
```

- [ ] Step 4: Build & Commit

```bash
npm run build
git add src/sections/ProblemStrip.tsx src/sections/SuccessCases.tsx
git commit -m "feat: add product texture and click-through to cases"
```

---

## Task 4：SuccessCases 增强“像官网”的交互与图片（P2）

**Files:**
- Modify: `src/sections/SuccessCases.tsx`

- [ ] Step 1: 整卡可点（保持原按钮/文案不变）

卡片 wrapper 改为 `Link`（或 onClick navigate），并保留现有“下载案例 PDF/预约顾问”按钮：

```tsx
<Link to="/cases" className="block">
  <motion.article ...>...</motion.article>
</Link>
```

- [ ] Step 2: 卡片加入“角落纹理图”（不新增文字）

在卡片右上角放一个 `absolute` 小图块（dashboard 裁切），`aria-hidden`：

```tsx
<div className="absolute right-4 top-4 h-12 w-20 overflow-hidden rounded-xl border border-white/10 opacity-80">
  <img src={assetUrl("images/hero-dashboard.jpg")} alt="" aria-hidden className="h-full w-full object-cover" />
</div>
```

- [ ] Step 3: hover / focus-visible

统一 hover：`translateY(-2px)`、shadow 加强、border 强化；并给键盘 focus-visible outline。

- [ ] Step 4: Build & Commit

```bash
npm run build
git add src/sections/SuccessCases.tsx
git commit -m "feat: polish cases cards with image accents and stronger interactions"
```

---

## Task 5：回归验证与推送

- [ ] Step 1: 生产构建

```bash
npm run build
```

- [ ] Step 2: 手工验收清单
1) Demo 三个演示按钮可点击、流程完整跑通  
2) SolutionOverview 出现产品主视觉图，chips 可点且能滚动到 Services  
3) ProblemStrip 卡片有产品纹理图，整卡可点跳转到 Cases  
4) SuccessCases 卡片有图像角标 + hover 更像官网  
5) 所有文案与 25e2cf0 一致（一字不改）

- [ ] Step 3: 推送到 GitHub Pages

```bash
git push origin main
```

---

## 自检（无占位/无歧义）
- 覆盖 spec 的四项：Demo bugfix / 图片策略 / 点击补强 / 动效节奏 ✅
- 未引入任何新文案（所有新增 UI 文本为 0）✅
- 复用现有图片资源（public/images/hero-dashboard.jpg + service 图片）✅

