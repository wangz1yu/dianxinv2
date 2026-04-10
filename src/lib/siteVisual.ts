import { assetUrl } from "@/lib/assets";

export type VisualKey =
  | "services"
  | "services/settlement"
  | "services/insurance"
  | "services/recruitment"
  | "solutions"
  | "solutions/delivery"
  | "solutions/ride"
  | "solutions/housekeeping"
  | "solutions/logistics"
  | "cases"
  | "compliance"
  | "downloads"
  | "insights"
  | "about/company"
  | "about/history"
  | "about/contact"
  | "roi";

export function getPageVisual(key: VisualKey) {
  switch (key) {
    case "cases":
      return { src: assetUrl("images/hero-dashboard.jpg"), pos: "62% 22%" };
    case "compliance":
      return { src: assetUrl("images/service-insurance.jpg"), pos: "55% 42%" };
    case "downloads":
      return { src: assetUrl("images/service-recruitment.jpg"), pos: "48% 30%" };
    case "insights":
      return { src: assetUrl("images/service-settlement.jpg"), pos: "60% 32%" };
    case "services/settlement":
      return { src: assetUrl("images/service-settlement.jpg"), pos: "50% 35%" };
    case "services/insurance":
      return { src: assetUrl("images/service-insurance.jpg"), pos: "50% 45%" };
    case "services/recruitment":
      return { src: assetUrl("images/service-recruitment.jpg"), pos: "45% 35%" };
    case "solutions/delivery":
      return { src: assetUrl("images/service-settlement.jpg"), pos: "55% 35%" };
    case "solutions/ride":
      return { src: assetUrl("images/hero-dashboard.jpg"), pos: "70% 20%" };
    case "solutions/logistics":
      return { src: assetUrl("images/service-recruitment.jpg"), pos: "40% 40%" };
    default:
      return { src: assetUrl("images/hero-dashboard.jpg"), pos: "60% 20%" };
  }
}
