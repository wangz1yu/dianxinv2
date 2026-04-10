# 点薪云 v2：首页补强（图片 / 动效 / 点击 & Demo 修复）设计稿

**目标：** 在不改任何文案（锁定 25e2cf0）的前提下，让首页（Hero 后）更像“真实行业官网”：补足图片承载、增强可点击与动效节奏，并修复 Demo 交互演示按钮不可点击的问题。

**硬约束：**
1) Hero（视频+原样式+原文案）不动  
2) DemoSettlement / DemoContract / DemoRiskControl 的内部交互逻辑不改  
3) 首页所有文案一字不改（包括标题/副标题/按钮/标签/标点）

---

## 1. 必修 Bugfix：Demo 区域按钮点击无效

**问题判断：** `src/sections/DemosStory.tsx` 目前用一个“透明占位层”撑高（`opacity-0` 的 DemoSettlement），该层仍然会接收鼠标事件，导致遮挡上层真实可见的 demo，表现为“按钮点击没反应”。

**修复方案（不改文案、不改内部逻辑）：**
- 占位层增加 `pointer-events-none`（确保永远不拦截点击）
- 确保激活层 `pointer-events-auto` 且位于更高 z-index

验收：三个 Demo 中的“按钮/流程演示/重置”等交互在 sticky 模式下均可点击生效。

---

## 2. 图片策略（用户选择：产品界面为主）

**原则：** 不新增文案，只用图片提升“真实产品感”与“品牌官网感”。

### 2.1 复用现有素材（优先）
来自 `public/images/`：
- `hero-dashboard.jpg`：作为 SolutionOverview 的主视觉（大图）
- `service-settlement.jpg / service-insurance.jpg / service-recruitment.jpg`：作为 Services 右侧图
- 客户 logo 图：Clients 继续使用
- 资质图：Qualifications 继续使用

### 2.2 各板块加图方式（不新增文字）
- **SolutionOverview**：由“纯卡片网格”改为“左文案（原文案）+ 右主图（hero-dashboard.jpg）”，下方保留 8 个能力点（原 8 个词）。
- **ProblemStrip**：每张痛点卡加一张“产品 UI 纹理图”（可用 hero-dashboard 局部裁切作为背景/角落缩略图），不加任何图中文字。
- **SuccessCases（主展示）**：保持原卡片结构，增加“淡淡的行业图纹理/产品截图角标”（同样使用 dashboard 裁切），避免空白像模板。

---

## 3. 交互与“可点击”补强（不新增按钮文案）

### 3.1 SolutionOverview 的 8 个能力点：变为可点击 chip
**不改文字，仅给点击行为：**
- 点击后滚动到 Services（或对应的 Demo 段落）
- hover：描边/阴影/轻微位移，增加“可点”暗示

### 3.2 ProblemStrip：整卡可点
不新增按钮文字：点击任意痛点卡 → 平滑滚动到 SuccessCases（案例区），形成“痛点 → 证据”闭环。

### 3.3 Clients 下沉条带：保持入口
保留原“立即咨询”按钮（原文案不改），并增加 logo hover（亮度/对比度）以增强“可交互”感。

---

## 4. 动效节奏（避免“AI 模板感”）

**原则：** 统一节奏、减少碎弹跳；用“层级推进”替代“每块都弹”。

- Section Header：标题/分隔线先出现，内容后出现（同一 easing）
- 卡片 hover：轻微抬升 + shadow + border 强化（更像真实官网）
- DemosStory：切换时轻微推入 + 淡出 + 轻 blur；进度条更精致（无文字）

---

## 5. 验收清单
1) Demo 区三个交互演示按钮可正常点击、流程可完整跑通  
2) Hero 后：ProblemStrip/SolutionOverview/SuccessCases 视觉不再“纯文字卡片”，有明确图片承载  
3) 首页所有文案与 25e2cf0 完全一致（一字不改）  
4) 交互暗示明显（hover/click/滚动跳转）  

