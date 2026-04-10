# 子页面统一重设计（偏咨询/解决方案化叙事 + 偏蓝主视觉体系）Design Spec

**Goal：** 将除首页以外的所有子页面统一为“专业官网体系”，延续首页的 **偏蓝叙事主视觉**（差异化裁切 + 叠层），并采用 **咨询/解决方案化叙事结构**：痛点 → 方案路径 → 风控合规 → 案例证据 → CTA。

**关键结论（已确认）：**
1) 子页 **文案可改**（可重写标题/段落/说明），但不放大承诺、不写无法支撑的数据  
2) CTA 采用 **两者都要（1c）**：主 CTA=预约演示/联系顾问；次 CTA=下载方案 PDF（主次分层）  
3) 每个服务/行业页需展示 **1-2 条案例摘要（2b）**，并可点击进入 `/cases`  
4) 视觉方向选 **B（偏咨询/解决方案化）**，且整体主色偏蓝（承接首页 Hero）  

---

## 1. In-Scope 路由

来自 `src/App.tsx`：

### 1.1 服务页组（Services）
- `/services`
- `/services/settlement`
- `/services/insurance`
- `/services/recruitment`

### 1.2 解决方案页组（Solutions）
- `/solutions`
- `/solutions/delivery`
- `/solutions/ride`
- `/solutions/housekeeping`
- `/solutions/logistics`

### 1.3 信任与内容页组（Evidence / Content）
- `/cases`
- `/compliance-center`
- `/downloads`
- `/insights`

### 1.4 关于与转化页（About / Conversion）
- `/about/company`
- `/about/history`
- `/about/contact`
- `/roi-calculator`
- `*`（404）

---

## 2. 全站统一规则

### 2.1 CTA 规则（两者都要，主次分层）

**主 CTA（Primary）**：预约演示 / 联系顾问  
**次 CTA（Secondary）**：下载方案 PDF（入口到 `/downloads` 或直链 PDF，按现状链接复用）

出现位置建议：
1) **页面头 Hero 区**：Primary + Secondary 并列（Primary 更突出）
2) **证据链后（合规/案例模块之后）**：只放 Primary（减少干扰）
3) **页底 CTA 区**：Primary + Secondary 再出现一次

> 文案可改，但按钮数量与主次层级要统一：每页最多同时出现 2 个 CTA。

### 2.2 案例证据规则（每页 1-2 条摘要）

服务详情页（T1）与行业解决方案页（T2）必须包含 **CaseEvidence** 模块：
- 展示 1-2 个与该页主题匹配的案例摘要卡片
- 点击卡片 → 进入 `/cases`（可带 query/hash 作为筛选锚点，若本轮不做筛选则先跳转列表）

数据源建议：
- 复用 `src/content/home25.copy.ts` 中的 `HOME25_CASES`（后续可扩展为 `src/content/cases.ts`）

### 2.3 视觉系统（偏蓝叙事、避免“同图复用感”）

核心原则：
- 每个页面都有 **主视觉（Hero Visual）**，但通过“不同图片源/不同裁切/不同叠层模板”确保差异化
- 以现有素材深加工为主：`hero-dashboard.jpg`、`service-*.jpg`、资质 SVG 水印等
- 统一叠层语言：蓝色高光（radial）、底部渐隐（linear）、轻噪点（极低 opacity）

实现建议：
- 维护一个路由/主题到视觉资产的映射（参考已存在的 `src/lib/homeVisual.ts`，扩展为 `src/lib/siteVisual.ts` 或升级现有文件）

### 2.4 动效与交互（克制但“像官网”）
- Section reveal：标题/关键句先出现，内容后出现
- 卡片 hover：轻微上浮 + border 强化 + shadow 增强
- 可点击暗示：整卡可点（cases/insights 列表）、chips 可点（跳转/锚点）

---

## 3. 页面模板（3 套）

### T1：服务详情页模板（`/services/*`）

**结构：**
1) Page Hero（标题、价值主张、主视觉、CTA 双按钮）
2) 场景痛点（3 条以内）
3) 方案路径（3-5 步流程）
4) 风控与合规（机制说明 + 资质/留痕/可追溯）
5) 案例证据（1-2 条摘要卡片）
6) FAQ（可复用通用 FAQ 或该页专属）
7) Bottom CTA（双按钮）

**可改文案边界：**
- 允许重写每段标题与描述以更专业
- 不新增无法证明的硬数据/夸张承诺

### T2：行业解决方案详情页模板（`/solutions/*`）

**结构：**
1) Page Hero（行业名 + 核心问题陈述 + 主视觉 + CTA 双按钮）
2) 行业痛点清单（对号入座）
3) 点薪云方案（能力组合：结算/合同/风控/保险/招聘等）
4) 接入方式/上线节奏（流程、对接方式、上线周期）
5) 合规与风控（证据链）
6) 案例证据（1-2 条摘要卡片）
7) Bottom CTA（双按钮）

### T3：内容/信任页模板（`/cases` / `compliance-center` / `downloads` / `insights`）

**结构：**
1) Page Hero（页面标题 + 一句话定位 + 主视觉 + CTA 双按钮）
2) 导航/筛选/目录（如果不做筛选就做目录锚点）
3) 列表区（卡片列表：可点击进入详情或外链）
4) Bottom CTA（主 CTA 为主，次 CTA 可保留）

---

## 4. 路由 → 模板映射（执行清单）

### 服务页组
- `/services`：聚合页（介于 T1 与 T3 之间）  
  - 推荐结构：Hero + 3 服务入口卡 + “方案路径”简版 + 合规背书简版 + 案例摘要 + CTA
- `/services/settlement`：T1
- `/services/insurance`：T1
- `/services/recruitment`：T1

### 解决方案页组
- `/solutions`：聚合页（T3 风格）  
  - 推荐结构：Hero + 4 行业入口卡 + 方法论/交付路径简版 + 合规背书 + CTA
- `/solutions/delivery`：T2
- `/solutions/ride`：T2
- `/solutions/housekeeping`：T2
- `/solutions/logistics`：T2

### 信任与内容页组（T3）
- `/cases`：T3（案例列表，支持行业入口跳转）
- `/compliance-center`：T3（资质证据 + 规则/留痕/风控能力）
- `/downloads`：T3（资料列表 + 下载入口）
- `/insights`：T3（洞察列表）

### 关于与工具页
- `/about/company`：T3（品牌/公司介绍叙事）
- `/about/history`：T3（里程碑时间线 + 证据）
- `/about/contact`：T3（转化页：表单/联系方式/地图）
- `/roi-calculator`：保留功能，套用 Page Hero + 信息层级 + CTA
- `* (404)`：统一视觉与 CTA 引导回首页/联系

---

## 5. 组件与实现建议（为后续 Plan 准备）

建议新增/复用这些“基础块”（不限定实现细节，供下一步 implementation plan 拆任务）：

1) `PageHero`（子页通用头部：标题/描述/主视觉/CTA）
2) `BlueVisualFrame`（主视觉容器：蓝高光+渐隐+噪点叠层）
3) `CaseEvidence`（案例摘要卡片：1-2 条，可点击）
4) `ProcessSteps`（3-5 步方案路径）
5) `TrustEvidence`（合规/资质背书块：可复用 Qualifications 里的素材与水印）
6) `SectionNav`（锚点导航条：无筛选时替代筛选）

---

## 6. 验收标准

1) 所有子页：视觉风格统一（偏蓝叙事）、但每页主视觉不重复（不同裁切/不同叠层/不同素材）
2) 所有服务/行业页：均包含痛点、方案路径、合规风控、案例证据（1-2 条）与 CTA 双按钮
3) CTA 主次清晰：主 CTA 更突出，次 CTA 为辅助
4) 交互暗示明显（hover/click/锚点跳转），整体不像模板拼贴

