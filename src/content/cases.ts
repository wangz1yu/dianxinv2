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
    id: "insurance",
    industry: "即时用工保障",
    customerType: "多城市运营团队",
    onboarding: "按方案协同",
    challenge: "临时用工人员流动快，保障配置与理赔协同缺乏统一口径。",
    efficiency: "投保流程更顺畅",
    cost: "保障成本更可控",
    compliance: "理赔留痕更完整",
    tags: ["services/insurance"],
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
  {
    id: "housekeeping",
    industry: "家政服务",
    customerType: "区域连锁服务平台",
    onboarding: "按阶段接入",
    challenge: "多岗位、多服务形态并行，结算口径与材料留存缺少统一流程。",
    efficiency: "对账协作更顺畅",
    cost: "结算成本更可控",
    compliance: "争议处理证据链更完整",
    tags: ["solutions/housekeeping", "services/settlement"],
  },
];
