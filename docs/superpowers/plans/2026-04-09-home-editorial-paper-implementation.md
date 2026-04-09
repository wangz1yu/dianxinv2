# 点薪云 v2：首页（除 Hero）画册编辑部改造 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.
>
> **Goal:** 保留原 Hero（视频+原样式/文案）与首页交互演示功能不变，将首页其余板块改造为“暖白纸感 + 品牌金（#fbc16a/#fbc779）”的画册编辑部风格。
>
> **Architecture:** 采取“视觉层重做 + 逻辑不动”的策略：不改现有 state、交互与 framer-motion 行为，只调整布局结构与 className；新增少量通用 UI 组件（SectionHeader、EditorialDivider、PaperPanel、EditorialList），让后续板块复用同一排版语言。
>
> **Tech Stack:** Vite + React 19 + TypeScript + Tailwind + shadcn/ui + framer-motion + react-router-dom(HashRouter)
>
> 设计依据：`docs/superpowers/specs/2026-04-09-home-editorial-paper-gold-redesign.md`
>
> 参考预览：`mockups/home-editorial-paper-gold.html`

---

## 0) 变更范围与文件地图

**必须保持不变**
- `src/sections/Hero.tsx`：保留原视频/原文案/原布局（仅允许做图片路径或样式兼容修复）
- 首页交互：Services tab、Pricing CTA、Clients 无限滚动、Qualifications 弹窗预览、3 个 Demo 交互、FAQ accordion 等“逻辑”不改

**主要改动文件（首页）**
- `src/pages/Home.tsx`（插入 TransitionBand，并调整各 section 顺序/容器 spacing）
- `src/sections/Services.tsx`
- `src/sections/Pricing.tsx`
- `src/sections/Clients.tsx`
- `src/sections/Qualifications.tsx`
- `src/sections/DemoSettlement.tsx`
- `src/sections/DemoContract.tsx`
- `src/sections/DemoRiskControl.tsx`
- `src/sections/FAQ.tsx`
- `src/sections/CTA.tsx`
- `src/sections/Footer.tsx`
- （可选）`src/sections/Navbar.tsx`：在 Hero 上为深色覆盖；滚动后切换为暖白画册风

**新增复用组件（首页专用）**
- `src/components/editorial/SectionHeader.tsx`
- `src/components/editorial/Divider.tsx`
- `src/components/editorial/PaperPanel.tsx`
- `src/components/editorial/EditorialList.tsx`
- `src/sections/TransitionBand.tsx`

**样式与 token**
- `src/index.css`：加入“暖白纸感” tokens（保留品牌金 utilities）
- （可选）`tailwind.config.js`：若需要扩展颜色/字体映射

---

## Task 1：落地暖白纸感 tokens（不影响 Hero）

**Files:**
- Modify: `src/index.css`

- [ ] Step 1: 为“首页除 Hero 区域”增加 paper tokens 与 utility classes

在 `src/index.css` 增加（示意，具体可在实现时微调）：

```css
:root {
  --paper: 38 55% 96%;      /* approx #fbf7ef */
  --paper-2: 38 40% 94%;    /* approx #f7f1e7 */
  --ink: 28 18% 8%;         /* approx #14120e */
  --ink-muted: 28 18% 8% / 0.72;
  --ink-dim: 28 18% 8% / 0.55;
  --stroke: 28 18% 8% / 0.12;
  --stroke-soft: 28 18% 8% / 0.08;
}

.bg-paper {
  background:
    radial-gradient(900px 520px at 18% 6%, rgba(251,193,106,0.18), transparent 62%),
    radial-gradient(900px 680px at 75% 10%, rgba(20,18,14,0.07), transparent 60%),
    linear-gradient(180deg, hsl(var(--paper)), hsl(var(--paper-2)));
}

.paper-grain::before { /* 轻纸纹 */ }
```

- [ ] Step 2: 验证 build

Run:
```bash
npm run build
```
Expected: build 成功。

- [ ] Step 3: Commit

```bash
git add src/index.css
git commit -m "feat: add warm paper tokens for editorial home"
```

---

## Task 2：新增 editorial 复用组件

**Files:**
- Create: `src/components/editorial/SectionHeader.tsx`
- Create: `src/components/editorial/Divider.tsx`
- Create: `src/components/editorial/PaperPanel.tsx`
- Create: `src/components/editorial/EditorialList.tsx`

- [ ] Step 1: 新建 `Divider`（1px 线 + 金色端点）

`src/components/editorial/Divider.tsx`：

```tsx
import { cn } from "@/lib/utils";

export function EditorialDivider({ className }: { className?: string }) {
  return (
    <div className={cn("relative mt-3 h-px w-24 bg-[rgba(20,18,14,0.24)]", className)}>
      <span className="absolute left-0 top-[-1px] h-[3px] w-6 bg-gold-grad" />
    </div>
  );
}
```

- [ ] Step 2: 新建 `SectionHeader`（Label / Title / Divider / Desc）

`src/components/editorial/SectionHeader.tsx`：

```tsx
import { cn } from "@/lib/utils";
import { EditorialDivider } from "./Divider";

export function EditorialSectionHeader(props: {
  label: string;
  title: React.ReactNode;
  desc?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  const align = props.align ?? "left";
  return (
    <div className={cn(align === "center" ? "text-center" : "text-left", props.className)}>
      <div className="text-[11px] tracking-[0.26em] uppercase text-[rgba(20,18,14,0.55)]">{props.label}</div>
      <div className="mt-2 font-display text-[2rem] leading-[1.06] tracking-[-0.02em] text-[hsl(var(--ink))]">
        {props.title}
      </div>
      <div className={align === "center" ? "flex justify-center" : ""}>
        <EditorialDivider />
      </div>
      {props.desc ? (
        <div className="mt-4 text-sm leading-[1.85] text-[rgba(20,18,14,0.72)]">{props.desc}</div>
      ) : null}
    </div>
  );
}
```

- [ ] Step 3: 新建 `PaperPanel`（浅纸面板容器）

`src/components/editorial/PaperPanel.tsx`：

```tsx
import { cn } from "@/lib/utils";

export function PaperPanel({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "rounded-[18px] border border-[rgba(20,18,14,0.12)] bg-white/70 shadow-[0_26px_80px_rgba(20,18,14,0.10)]",
        className
      )}
      {...props}
    />
  );
}
```

- [ ] Step 4: 新建 `EditorialList`（分隔线列表）

`src/components/editorial/EditorialList.tsx`：

```tsx
import { cn } from "@/lib/utils";

export function EditorialList(props: { items: React.ReactNode[]; className?: string }) {
  return (
    <div className={cn("mt-4 border-t border-[rgba(20,18,14,0.12)]", props.className)}>
      {props.items.map((it, i) => (
        <div key={i} className="flex items-start gap-3 border-b border-[rgba(20,18,14,0.08)] py-3">
          <span className="mt-1 size-2 rounded-full bg-[hsl(var(--primary))] shadow-[0_0_0_6px_rgba(251,193,106,0.12)]" />
          <div className="text-sm text-[rgba(20,18,14,0.82)]">{it}</div>
        </div>
      ))}
    </div>
  );
}
```

- [ ] Step 5: Build + Commit

Run:
```bash
npm run build
```

Commit:
```bash
git add src/components/editorial
git commit -m "feat: add editorial components for home redesign"
```

---

## Task 3：新增 TransitionBand（Hero → 画册过渡）

**Files:**
- Create: `src/sections/TransitionBand.tsx`
- Modify: `src/pages/Home.tsx`

- [ ] Step 1: 创建 TransitionBand 组件

`src/sections/TransitionBand.tsx`（示意）：

```tsx
import { motion } from "framer-motion";
import { EditorialSectionHeader } from "@/components/editorial/SectionHeader";
import { PaperPanel } from "@/components/editorial/PaperPanel";

export default function TransitionBand() {
  return (
    <section className="bg-paper paper-grain py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <EditorialSectionHeader
          label="TRANSITION / 过渡带"
          title={
            <>
              从视频进入画册：<span className="text-gold-grad">合规必须可追溯</span>
            </>
          }
          desc="这段用于衔接 Hero（蓝色视频）与后续暖白纸感：让用户滚动到第二屏时自然“进入画册”。"
          align="left"
        />

        <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <PaperPanel className="mt-6 p-5">
            <div className="font-display text-lg tracking-[-0.01em]">把结算、合同、凭证与风控写进同一条链路里。</div>
            <div className="mt-2 text-sm text-[rgba(20,18,14,0.72)]">每一笔发薪，都能被解释；每一次用工，都有证据。</div>
          </PaperPanel>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] Step 2: 在 Home.tsx 中插入（Hero 之后）

修改 `src/pages/Home.tsx`：在 `<Hero />` 后插入 `<TransitionBand />`，并把 `main` 容器改为 paper 背景（但 Hero 自己保持暗色视频）。

- [ ] Step 3: Build + Commit

```bash
npm run build
git add src/pages/Home.tsx src/sections/TransitionBand.tsx
git commit -m "feat: add transition band after hero"
```

---

## Task 4：逐块落地首页 UI（不改交互逻辑）

> 每改完一个 section，至少跑一次 `npm run build`；每 1-2 个 section 做一次 commit，便于回滚。

### Task 4.1 Services（目录式 + 右侧画册版心）

**Files:**
- Modify: `src/sections/Services.tsx`

- [ ] Step 1: 保留原 `useState/AnimatePresence` 逻辑，只重排结构
- [ ] Step 2: 用 `EditorialSectionHeader` + `PaperPanel` + `EditorialList` 替换原卡片式呈现
- [ ] Step 3: Build + Commit

```bash
npm run build
git add src/sections/Services.tsx
git commit -m "feat: redesign services section to editorial layout"
```

### Task 4.2 Pricing（对比清单式）

**Files:**
- Modify: `src/sections/Pricing.tsx`

- [ ] Step 1: 保留 plans 数据与 CTA 行为
- [ ] Step 2: 视觉改为“表格式分隔线列表”，推荐项用金色标签 + 细金边
- [ ] Step 3: Build + Commit

```bash
npm run build
git add src/sections/Pricing.tsx
git commit -m "feat: redesign pricing section as editorial comparison list"
```

### Task 4.3 Clients（画廊带）

**Files:**
- Modify: `src/sections/Clients.tsx`

- [ ] Step 1: 保留无限滚动 motion 动效
- [ ] Step 2: 外层改为纸感背景，上下加细分隔线；logo 容器维持白底
- [ ] Step 3: Build + Commit

```bash
npm run build
git add src/sections/Clients.tsx
git commit -m "feat: redesign clients section as gallery strip"
```

### Task 4.4 Qualifications（目录 + 说明页）

**Files:**
- Modify: `src/sections/Qualifications.tsx`

- [ ] Step 1: 保留 Dialog 预览逻辑
- [ ] Step 2: 左侧目录（分隔线列表）+ 右侧说明页（PaperPanel）
- [ ] Step 3: Build + Commit

```bash
npm run build
git add src/sections/Qualifications.tsx
git commit -m "feat: redesign qualifications section to editorial split layout"
```

### Task 4.5 3 个 Demo（叙事式：左文右面板）

**Files:**
- Modify: `src/sections/DemoSettlement.tsx`
- Modify: `src/sections/DemoContract.tsx`
- Modify: `src/sections/DemoRiskControl.tsx`

- [ ] Step 1: 三个 Demo 统一 header（EditorialSectionHeader）
- [ ] Step 2: 保留原交互面板内部结构，只把外壳做成 PaperPanel
- [ ] Step 3: Build + Commit

```bash
npm run build
git add src/sections/DemoSettlement.tsx src/sections/DemoContract.tsx src/sections/DemoRiskControl.tsx
git commit -m "feat: redesign demo sections to editorial narrative layout"
```

### Task 4.6 FAQ / CTA / Footer（画册式收口）

**Files:**
- Modify: `src/sections/FAQ.tsx`
- Modify: `src/sections/CTA.tsx`
- Modify: `src/sections/Footer.tsx`

- [ ] Step 1: FAQ 改为“问答目录”外观但保留 accordion
- [ ] Step 2: CTA 收口页：单主按钮（金色）+ 清晰标题层级
- [ ] Step 3: Footer 做成出版信息式对齐布局
- [ ] Step 4: Build + Commit

```bash
npm run build
git add src/sections/FAQ.tsx src/sections/CTA.tsx src/sections/Footer.tsx
git commit -m "feat: redesign faq/cta/footer to editorial finish"
```

---

## Task 5：Pages 回归检查与部署

**Files:**
- (verify only) `src/lib/assets.ts`（静态资源 base 前缀仍生效）

- [ ] Step 1: 生产构建验证

```bash
npm run build
```

- [ ] Step 2: 关键人工检查点（本地预览或 Pages）
1) Hero 未变（视频+原样式+原文案）
2) 首页交互仍可用（tabs/accordion/demo）
3) 第二屏开始是暖白纸感画册风
4) 金色使用克制但可见
5) GitHub Pages 上图片不再 404

- [ ] Step 3: 推送到 GitHub（如需我推送，使用一次性 PAT）

---

## 计划自检（覆盖 Spec）

- Spec 的 Transition Band / Services / Pricing / Clients / Qualifications / Demo / FAQ / CTA / Footer 均有对应 Task ✅  
- 明确“不改逻辑，仅改呈现层”的实施方式 ✅  
- 验证方式以 `npm run build` 为主（项目无测试基建）✅

---

## 执行方式确认

计划已保存到：`docs/superpowers/plans/2026-04-09-home-editorial-paper-implementation.md`

两种执行方式：
1) **Subagent-Driven（推荐）**：我按 Task 分批实现，你每批验收  
2) **Inline Execution**：我在当前会话按任务顺序直接改代码并频繁阶段提交

你要我用哪一种开始执行？

