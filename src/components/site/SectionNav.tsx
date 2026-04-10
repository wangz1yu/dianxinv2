import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { scrollToId } from "@/lib/scroll";

export type SectionNavItem = {
  id: string;
  label: string;
};

export function SectionNav(props: {
  items: SectionNavItem[];
  offset?: number;
  className?: string;
}) {
  if (!props.items?.length) return null;

  const offset = props.offset ?? 92;
  const ids = useMemo(() => props.items.map((i) => i.id), [props.items]);
  const [activeId, setActiveId] = useState<string>(props.items[0]?.id ?? "");

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    if (!sections.length) return;

    // Scrollspy：高亮当前视口中最接近顶部的 section
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              Math.abs((a.boundingClientRect?.top ?? 0) - offset) -
              Math.abs((b.boundingClientRect?.top ?? 0) - offset)
          )[0];
        if (visible?.target?.id) setActiveId(visible.target.id);
      },
      {
        root: null,
        // 提前触发：sticky nav 下方开始进入视口就切换
        rootMargin: `-${offset}px 0px -60% 0px`,
        threshold: [0.01, 0.1, 0.25],
      }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [ids, offset]);

  return (
    <div
      className={`sticky top-20 z-30 bg-white/70 backdrop-blur border-y border-gray-200 ${props.className ?? ""}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex gap-2 overflow-x-auto">
        {props.items.map((it) => (
          <Button
            key={it.id}
            type="button"
            variant="outline"
            className={`rounded-full bg-white/70 shrink-0 transition ${
              activeId === it.id
                ? "border-blue-200 bg-blue-50 text-blue-800"
                : "hover:bg-white"
            }`}
            onClick={() => {
              setActiveId(it.id);
              scrollToId(it.id, offset);
            }}
          >
            {it.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
