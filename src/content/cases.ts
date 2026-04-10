export type CaseTag =
  | "services/settlement"
  | "services/insurance"
  | "services/recruitment"
  | "solutions/delivery"
  | "solutions/ride"
  | "solutions/housekeeping"
  | "solutions/logistics";

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
