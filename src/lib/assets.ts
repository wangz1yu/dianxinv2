/**
 * GitHub Pages 部署时站点通常在子路径下（例如 /dianxinv2/），
 * 直接使用 "/images/xx.png" 会指向域名根路径导致 404。
 *
 * 统一用该方法为 public/ 下静态资源加上 base 前缀。
 */
export function assetUrl(path: string) {
  const normalized = path.startsWith("/") ? path.slice(1) : path;
  return `${import.meta.env.BASE_URL}${normalized}`;
}

