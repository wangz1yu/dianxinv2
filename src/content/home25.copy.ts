/**
 * 首页文案锁定（基准：git commit 25e2cf0）
 * 规则：任何文字内容不可改动（包括标点与数字），只允许改结构/样式/动效。
 */

export const HOME25_CASES = [
  {
    industry: "外卖配送",
    customerType: "全国连锁平台",
    onboarding: "10个工作日",
    challenge: "高峰期骑手结算压力大，人工对账易出错。",
    efficiency: "+65%",
    cost: "-19%",
    compliance: "劳务纠纷率 -41%",
  },
  {
    industry: "网约车",
    customerType: "多城市运力服务商",
    onboarding: "14个工作日",
    challenge: "跨区域主体管理复杂，支付与票据规则不统一。",
    efficiency: "+58%",
    cost: "-23%",
    compliance: "票据合规率 99.2%",
  },
  {
    industry: "物流仓配",
    customerType: "仓配一体化企业",
    onboarding: "7个工作日",
    challenge: "临时用工波峰明显，招聘结算链路长。",
    efficiency: "+72%",
    cost: "-16%",
    compliance: "留痕覆盖 100%",
  },
] as const;

export const HOME25_ECOSYSTEM = {
  title: "在点薪云生态中释放潜力",
  description: "全方位的灵活用工服务生态，覆盖用工全流程",
  items: [
    { id: "settlement", label: "智能结算" },
    { id: "insurance", label: "保险保障" },
    { id: "talent", label: "人才匹配" },
    { id: "contract", label: "电子合同" },
    { id: "realtime", label: "实时到账" },
    { id: "mobile", label: "移动办公" },
    { id: "data", label: "数据分析" },
    { id: "security", label: "安全合规" },
  ],
} as const;
