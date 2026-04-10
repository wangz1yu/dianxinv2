# 首页主视觉系统重做（偏蓝叙事 / 现有素材深加工）Design Spec

**目标：** 在 **不改任何文案** 的前提下，让 Hero 之后的模块更像“专业官网”：每个模块都有不同的主视觉构图与互动层级，避免“同一张图到处复用”的 AI 模板感。

**硬约束：**
1) **Hero 不变**（视频/样式/文案/结构都不动）
2) **互动演示区域不变**（`DemosStory` + 3 个 Demo 的视觉与交互不再调整）
3) **首页文案一字不改**（25e2cf0 锁定）
4) **图片里不放文字**

---

## 1) 总体气质：偏蓝叙事（承接 Hero）

Hero 后整体视觉偏蓝：使用深浅蓝渐变、玻璃质感、细描边、低对比噪点，营造“可信+科技感”。  
金色只作为已有系统点缀（不新增文案，不增加新的金色说明）。

---

## 2) 素材来源（仅用现有素材深加工）

来自仓库 `public/images/`：
- `hero-dashboard.jpg`
- `service-settlement.jpg`
- `service-insurance.jpg`
- `service-recruitment.jpg`
- `images/qualifications/*.svg`（作为水印/纹理）

**深加工方式（不新增图片文件也能做到“每块不一样”）：**
- 每个模块使用不同的 source 或不同裁切区域（`object-position` / `background-position`）
- 不同叠层（渐变遮罩/模糊高光/噪点层）
- 不同构图比例（大图、角标、小纹理条、背景纹理）

---

## 3) 模块级设计（Hero 后）

### 3.1 SolutionOverview（主视觉：大图 + 蓝色渐隐）
**现状：** 已加入 `hero-dashboard.jpg`，但风格偏平。  
**改造：**
- 右侧大图保留，但加：
  - 顶部蓝色高光（radial）
  - 底部渐隐（帮助承接下一屏）
  - 轻噪点层（非常低 opacity）
- 8 个 chips 保留可点击（滚到 Services），增加 hover：描边变亮 + 轻微上浮
- 图的 `object-position` 固定为一个“主视角”（不要和其它模块重复裁切）

### 3.2 ProblemStrip（主视觉：每卡不同纹理裁切 + 可点击）
**现状：** 三张卡都使用 `hero-dashboard.jpg` 背景裁切，容易“看起来一样”。  
**改造：**
- 三张卡分别使用不同 source（建议映射）：
  - 外卖配送 → `service-settlement.jpg`
  - 网约车 → `hero-dashboard.jpg`
  - 物流仓配 → `service-recruitment.jpg`
- 统一叠层：白色内容层 + 蓝色角落高光（同一风格），但底图不同
- 保留整卡 click → scroll 到 Cases（不新增按钮文字）

### 3.3 SuccessCases（主视觉：角标注图，每卡不同裁切）
**现状：** 角标图都用 `hero-dashboard.jpg`，过于重复。  
**改造：**
- 每张案例卡角标使用不同 source + 不同 `object-position`：
  - 外卖配送 → `service-settlement.jpg`（object-position: 50% 35%）
  - 网约车 → `hero-dashboard.jpg`（object-position: 60% 20%）
  - 物流仓配 → `service-recruitment.jpg`（object-position: 40% 40%）
- 卡片 hover：上浮、shadow 强化、角标轻微放大（scale 1.03）  
- 保留整卡可点进 `/cases`；保留原按钮“下载案例 PDF / 预约顾问”

### 3.4 Qualifications（主视觉：证据链水印纹理）
**改造：**
- 在资格证书区域背景加入极轻的 `qualification-*.svg` 水印（opacity 0.04~0.07）
- 保持现有结构与文案不变，只做：
  - 容器更像“证据链板块”的页面层级（分隔线 + 背景纹理）
  - hover 时缩略图更清晰（brightness/contrast 微调）

---

## 4) 可复用实现方式（建议）

新增一个小工具函数（避免每个组件手写样式，降低“AI 拼贴感”）：
- `src/lib/homeVisual.ts`
  - `getCaseAccentImage(industry)`
  - `getProblemCardImage(industry)`
  - 返回：`src` + `objectPosition` + `overlayVariant`

---

## 5) 验收标准

1) Hero 与互动演示区域完全不变  
2) ProblemStrip / SolutionOverview / SuccessCases / Qualifications：每个模块的主视觉明显不同，不再“同一张图原样复用”  
3) hover/click 暗示更像专业官网（不新增文案）  
4) 线上部署后图片不 404（使用 `assetUrl` + `public/images/`）  

