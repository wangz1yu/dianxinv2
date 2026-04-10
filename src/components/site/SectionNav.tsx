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
            className="rounded-full bg-white/70 shrink-0"
            onClick={() => scrollToId(it.id, props.offset)}
          >
            {it.label}
          </Button>
        ))}
      </div>
    </div>
  );
}

