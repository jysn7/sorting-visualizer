import { SortStep } from "@/lib/algorithms/types"
import { StatCard } from "./StatCard";

export function StatsBar({ step, progress }: { step: SortStep; progress?: number }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3">
        <StatCard label="Comparisons" value={step.comparisons} />
        <StatCard label="Swaps" value={step.swaps} />
      </div>
      {progress !== undefined && (
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-medium" style={{ color: "var(--muted-foreground)" }}>
              Progress
            </span>
            <span className="text-xs font-semibold" style={{ color: "var(--primary)" }}>
              {progress}%
            </span>
          </div>
          <div
            className="h-1.5 w-full rounded-full overflow-hidden"
            style={{ background: "var(--muted)" }}
          >
            <div
              className="h-full rounded-full transition-all duration-100"
              style={{ width: `${progress}%`, background: "var(--primary)" }}
            />
          </div>
        </div>
      )}
    </div>
  )
}