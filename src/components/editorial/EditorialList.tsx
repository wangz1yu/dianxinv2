import { cn } from "@/lib/utils";

export function EditorialList(props: { items: React.ReactNode[]; className?: string }) {
  return (
    <div className={cn("mt-4 border-t border-[rgba(20,18,14,0.12)]", props.className)}>
      {props.items.map((it, i) => (
        <div
          key={i}
          className="flex items-start gap-3 border-b border-[rgba(20,18,14,0.08)] py-3"
        >
          <span className="mt-1 size-2 rounded-full bg-[hsl(var(--primary))] shadow-[0_0_0_6px_rgba(251,193,106,0.12)]" />
          <div className="text-sm text-[rgba(20,18,14,0.82)]">{it}</div>
        </div>
      ))}
    </div>
  );
}

