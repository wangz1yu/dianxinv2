export function scrollToId(id: string, offset = 84) {
  const el = document.getElementById(id);
  if (!el) return;
  const y = window.scrollY + el.getBoundingClientRect().top - offset;
  window.scrollTo({ top: y, behavior: "smooth" });
}
