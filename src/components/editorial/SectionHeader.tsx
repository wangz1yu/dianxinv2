import { cn } from "@/lib/utils";
import { EditorialDivider } from "./Divider";

export function EditorialSectionHeader(props: {
  label: string;
  title: React.ReactNode;
  desc?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  const align = props.align ?? "left";
  return (
    <div className={cn(align === "center" ? "text-center" : "text-left", props.className)}>
      <div className="text-[11px] tracking-[0.26em] uppercase text-[rgba(20,18,14,0.55)]">
        {props.label}
      </div>
      <div className="mt-2 font-display text-[2rem] leading-[1.06] tracking-[-0.02em] text-[hsl(var(--ink))]">
        {props.title}
      </div>
      <div className={align === "center" ? "flex justify-center" : ""}>
        <EditorialDivider />
      </div>
      {props.desc ? (
        <div className="mt-4 text-sm leading-[1.85] text-[rgba(20,18,14,0.72)]">
          {props.desc}
        </div>
      ) : null}
    </div>
  );
}

