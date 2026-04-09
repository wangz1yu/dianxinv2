import { cn } from "@/lib/utils";

export function EditorialDivider({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative mt-3 h-px w-24 bg-[rgba(20,18,14,0.24)]",
        className
      )}
    >
      <span className="absolute left-0 top-[-1px] h-[3px] w-6 bg-gold-grad" />
    </div>
  );
}

