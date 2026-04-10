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
  // 与 ProblemStrip 使用不同裁切，避免“重复素材感”
  switch (industry) {
    case "外卖配送":
      return { src: assetUrl("images/service-settlement.jpg"), pos: "48% 55%" };
    case "网约车":
      return { src: assetUrl("images/hero-dashboard.jpg"), pos: "72% 18%" };
    case "物流仓配":
      return { src: assetUrl("images/service-recruitment.jpg"), pos: "35% 60%" };
  }
}

