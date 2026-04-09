import { cn } from "@/lib/utils";

export function PaperPanel({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "rounded-[18px] border border-[rgba(20,18,14,0.12)] bg-white/70 shadow-[0_26px_80px_rgba(20,18,14,0.10)]",
        className
      )}
      {...props}
    />
  );
}

