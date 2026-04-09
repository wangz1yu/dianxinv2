# 点薪云官网 v2（深色奢简 + 金色主题）统一改造 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.
>
> **Goal:** 在不破坏现有功能/交互/动效的前提下，把 v2 全站（首页全部 section + 所有内页）统一为「深色奢简 + 公司金色主题」视觉体系，并保留原 Hero 视频与文案。
>
> **Architecture:** 以“设计系统优先”的方式落地：先把颜色 tokens/字体/基础组件（Button、Navbar、Footer、PageHeader、SectionHeader）统一，再按页面批量迁移 className 与布局容器；所有交互逻辑与 framer-motion 逻辑尽量不动，只改呈现层。
>
> **Tech Stack:** Vite + React 19 + TypeScript + Tailwind + shadcn/ui + framer-motion + react-router-dom(HashRouter)
>
> 参照 Spec：`docs/superpowers/specs/2026-04-09-dianxin-v2-dark-lux-design.md`

---

## 0) 文件结构与改动范围（先读再改）

**主要页面入口**
- `src/App.tsx`（路由）
- `src/pages/Home.tsx`（首页：组合 sections）
- `src/pages/**/*`（内页：服务/方案/关于/案例/内容/下载/ROI/合规中心等）

**首页 sections**
- `src/sections/*.tsx`（Hero/Navbar/Services/Pricing/...）

**设计系统与基础组件**
- `index.html`（字体引入）
- `src/index.css`（CSS variables/tokens，背景纹理、默认主题）
- `tailwind.config.js`（字体映射 + tokens）
- `src/components/ui/button.tsx`（按钮 variants：Primary=金色渐变）
- `src/components/ui/*`（可选：对少数通用组件做轻量样式适配）

---

## Task 1：冻结 Hard Requirements（防止改造误伤功能）

**Files:**
- Modify: `docs/superpowers/specs/2026-04-09-dianxin-v2-dark-lux-design.md`（已包含 hard requirements，实施时以此为准）
- Create: `src/lib/v2-visual-guardrails.md`（简短清单，供实现阶段对照）

- [ ] Step 1: 新建 guardrails 文档（实现阶段每个页面改完都对照）

创建文件 `src/lib/v2-visual-guardrails.md`：

```md
# v2 视觉改造 Guardrails（不可破坏）

1) 首页所有交互与动效必须保留（Navbar/sections reveal/Services tabs/Pricing/Qualifications/FAQ/Demo）。
2) Hero 必须使用视频背景：https://oss.dianxin.love/hero.mp4
3) Hero 原文案保留：
   - 智能用工新时代
   - 灵活用工 / 智领未来
   - 为企业提供一站式灵活用工解决方案……
4) 链接保持不变（下载方案 / 观看演示）。
5) 只改视觉与布局容器；尽量不改状态管理与业务逻辑。
```

- [ ] Step 2: Commit

```bash
git add src/lib/v2-visual-guardrails.md
git commit -m "docs: add v2 visual guardrails"
```

---

## Task 2：落地深色奢简 Tokens（CSS variables + Tailwind 映射）

**Files:**
- Modify: `src/index.css`
- Modify: `tailwind.config.js`
- Modify: `index.html`（若需要增补字体/预连接）

- [ ] Step 1: 将 `:root` 默认主题切换为深色奢简（同时保留 `.dark` 分支或改为可选）

在 `src/index.css` 中更新（示例：以变量形式落地，具体值按 Spec）：

```css
:root {
  --background: 230 28% 6%; /* ink-950 */
  --foreground: 0 0% 98%;
  --card: 225 28% 9%;      /* ink-900 */
  --card-foreground: 0 0% 98%;
  --popover: 225 28% 9%;
  --popover-foreground: 0 0% 98%;

  /* brand gold */
  --primary: 42 95% 70%;              /* #fbc16a */
  --primary-foreground: 24 40% 10%;   /* deep brown-ish for text on gold */

  --secondary: 225 24% 12%;
  --secondary-foreground: 0 0% 98%;
  --muted: 225 18% 14%;
  --muted-foreground: 0 0% 70%;

  --accent: 225 18% 14%;
  --accent-foreground: 0 0% 98%;

  --border: 0 0% 100% / 0.10;
  --input: 0 0% 100% / 0.10;
  --ring: 42 95% 70%;
}
```

- [ ] Step 2: 提供金色渐变的 CSS utility（用于按钮/分隔线“擦亮”）

在 `src/index.css` 追加：

```css
.bg-gold-grad {
  background-image: linear-gradient(90deg, #fbc16a 0%, #fbc779 55%, #fbc16a 100%);
}
.text-gold-grad {
  background-image: linear-gradient(90deg, #fbc16a 0%, #fbc779 55%, #fbc16a 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
```

- [ ] Step 3: Tailwind 字体映射（保持 display/sans 两套）

在 `tailwind.config.js` 中确保：

```js
extend: {
  fontFamily: {
    sans: ["var(--font-sans)"],
    display: ["var(--font-display)"],
  }
}
```

- [ ] Step 4: 本地验证

Run:
```bash
npm run build
```
Expected: build 成功，无样式崩溃。

- [ ] Step 5: Commit

```bash
git add src/index.css tailwind.config.js index.html
git commit -m "feat: apply dark lux tokens and gold utilities"
```

---

## Task 3：按钮体系（Primary=金色渐变，保留现有用法）

**Files:**
- Modify: `src/components/ui/button.tsx`

- [ ] Step 1: 为 `default` variant 引入金色渐变（并保留 outline/ghost 等）

在 `buttonVariants` 的 `default` 改为：

```ts
default: "bg-gold-grad text-[hsl(var(--primary-foreground))] hover:brightness-[1.03]"
```

并确保 focus ring 使用 `--ring`。

- [ ] Step 2: 本地验证（视觉 + 构建）

Run:
```bash
npm run build
```

- [ ] Step 3: Commit

```bash
git add src/components/ui/button.tsx
git commit -m "feat: restyle primary button to brand gold gradient"
```

---

## Task 4：首页 Hero（保留视频 + 原文案 + 原 CTA 链接；只做深色奢简统一）

**Files:**
- Modify: `src/sections/Hero.tsx`

- [ ] Step 1: 把当前 image hero 替换为 video hero，但保留 v2 的排版精度（字体/间距/按钮系统）

目标结构（保留原视频与原文案）：

```tsx
<section className="relative overflow-hidden min-h-[800px] h-screen bg-[hsl(var(--background))]">
  <video src="https://oss.dianxin.love/hero.mp4" autoPlay loop muted playsInline ... />
  <div className="absolute inset-0 bg-black/65" />
  {/* 可选：金色粒子/光点（降低密度，统一为 gold） */}
  <div className="relative z-10 max-w-6xl mx-auto ...">
    <div className="inline-flex ...">智能用工新时代</div>
    <h1>灵活用工<br/><span className="text-gold-grad">智领未来</span></h1>
    <p>为企业提供一站式灵活用工解决方案...</p>
    <Button className="...">下载解决方案</Button>
    <Button variant="outline" ...>观看演示</Button>
  </div>
  {/* KPI 三列保留，可用金色小 underline */}
</section>
```

- [ ] Step 2: 验证“动效/交互未丢失”

检查点：
- 视频能播放；失败时优雅降级（保留原 onError 逻辑）
- 原文案完全一致
- CTA 链接一致
- KPI 三列与 reveal 动效仍工作

- [ ] Step 3: Commit

```bash
git add src/sections/Hero.tsx
git commit -m "feat: restore video hero copy and restyle to dark lux"
```

---

## Task 5：首页其余 sections：只改视觉，不改交互（按文件逐个迁移）

**Files:**
- Modify: `src/sections/Services.tsx`
- Modify: `src/sections/Pricing.tsx`
- Modify: `src/sections/Qualifications.tsx`
- Modify: `src/sections/CTA.tsx`
- Modify: `src/sections/Clients.tsx`
- Modify: `src/sections/SuccessCases.tsx`
- Modify: `src/sections/DemoSettlement.tsx`
- Modify: `src/sections/DemoContract.tsx`
- Modify: `src/sections/DemoRiskControl.tsx`
- Modify: `src/sections/FAQ.tsx`
- Modify: `src/sections/Footer.tsx`

迁移统一原则（对每个 section 重复执行）：
- [ ] Step A: 保留所有 state / onClick / motion 配置；仅替换背景色、边界、分隔线、字体与 hover 样式
- [ ] Step B: 把“白底 + 蓝色”替换为“深色面板 + hairline + 金色点亮”
- [ ] Step C: 卡片能删则删（但不改变交互），能改为“目录式/分隔线列表”优先
- [ ] Step D: 每改一个 section：`npm run build`（至少每 2-3 个改一次），避免堆积错误

示例（以 `Services.tsx` 为例，保留 tab 切换逻辑）：

```tsx
<section className="py-24 bg-[hsl(var(--background))]">
  <div className="max-w-6xl mx-auto ...">
    <div className="label ...">SERVICES</div>
    <h2 className="font-display ...">产品服务</h2>
    <div className="divider ..."/>
    {/* 左侧按钮：改为 outline + underline，右侧内容：深色 panel */}
  </div>
</section>
```

- [ ] Step E: Commit（建议按 2-3 个 section 一次提交）

```bash
git add src/sections/Services.tsx src/sections/Pricing.tsx
git commit -m "feat: restyle home sections to dark lux (services/pricing)"
```

---

## Task 6：内页统一：PageHeader + 目录式布局（不改路由与数据）

**Files:**
- Create: `src/components/v2/PageHeader.tsx`
- Create: `src/components/v2/SectionHeader.tsx`
- Modify: `src/pages/Services.tsx`
- Modify: `src/pages/Solutions.tsx`
- Modify: `src/pages/Cases.tsx`
- Modify: `src/pages/Downloads.tsx`
- Modify: `src/pages/Insights.tsx`
- Modify: `src/pages/ComplianceCenter.tsx`
- Modify: `src/pages/ROICalculator.tsx`
- Modify: `src/pages/about/*`
- Modify: `src/pages/services/*`
- Modify: `src/pages/solutions/*`

- [ ] Step 1: 新建 `PageHeader`（统一面包屑/标题/副标题/CTA）

`src/components/v2/PageHeader.tsx`：

```tsx
type Crumb = { label: string; href?: string };

export function PageHeader(props: {
  crumbs: Crumb[];
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}) {
  // 返回：crumb（小字+字距）+ title（衬线）+ divider（金色渐变线）+ subtitle + actions
  return null as any;
}
```

（实现阶段把 `return null` 替换为真实 JSX）

- [ ] Step 2: 新建 `SectionHeader`（label + title + divider）

`src/components/v2/SectionHeader.tsx`：

```tsx
export function SectionHeader(props: { label: string; title: string; desc?: string }) {
  return null as any;
}
```

- [ ] Step 3: 逐页接入（先从 `Services.tsx`/`Solutions.tsx` 这类列表页开始）

每页模板：
- 顶部 `PageHeader`
- 主体：左侧目录（可选）+ 右侧详情面板（深色 panel）
- 避免卡片墙：优先“分隔线列表”

- [ ] Step 4: 404/NotFound 页面同步深色主题

修改 `src/pages/NotFound.tsx`：统一背景与按钮。

- [ ] Step 5: Build 验证

```bash
npm run build
```

- [ ] Step 6: Commit（按页面组提交）

```bash
git add src/components/v2 src/pages
git commit -m "feat: add v2 page/section headers and restyle inner pages"
```

---

## Task 7：全站回归检查（视觉一致性 + GitHub Pages）

**Files:**
- Modify (if needed): `vite.config.ts`（通常不需要，当前 base='./' OK）
- Modify (if needed): `src/App.tsx`（路由不改，仅确认 hash 路由 OK）

- [ ] Step 1: 本地检查清单（人工）
1) 首页所有交互都还在（tabs、accordion、demo）
2) Hero 视频可播放 + 文案无误
3) 金色使用克制：仅 CTA/关键点
4) 所有页面背景/面板/分隔线一致

- [ ] Step 2: Build

```bash
npm run build
```

- [ ] Step 3: Commit（最终整理）

```bash
git add .
git commit -m "chore: finalize v2 dark lux visual unification"
```

---

## 计划自检（写完就做）

1) **Spec 覆盖**：hard requirements（首页动效保留、Hero 视频/文案保留、金色主题）分别对应 Task 1/4/5/7 ✅  
2) **无占位符**：每个关键步骤提供了文件路径与代码骨架，执行时需把 `return null as any` 替换为真实 JSX（这一步在 Task 6 中完成）。  
3) **一致性**：Primary 按钮统一金色渐变；背景统一 ink dark；分隔线统一 hairline + 金色端点。

---

## 选择执行方式

计划已保存到：`docs/superpowers/plans/2026-04-09-dianxin-v2-unify-dark-lux.md`

两种执行方式：
1) **Subagent-Driven（推荐）**：我按 Task 拆分派发子任务逐个实现，你每阶段验收  
2) **Inline Execution**：我在当前会话按任务顺序直接改代码并频繁给你预览文件

你选 1 还是 2？

