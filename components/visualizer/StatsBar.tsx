import { SortStep } from "@/lib/algorithms/types"

export function StatsBar({ step, progress }: { step: SortStep; progress?: number }) {
  return (
    <div className="flex flex-col gap-2 p-1">
      {progress !== undefined && (
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-end text-[11px] font-medium text-muted-foreground">
            <div className="flex gap-3">
              <span>
                Ops: <span className="font-mono font-bold text-foreground">{step.comparisons + step.swaps}</span>
              </span>
              <span>•</span>
              <span>
                Swaps: <span className="font-mono font-bold text-foreground">{step.swaps}</span>
              </span>
            </div>
            <span className="font-mono font-bold text-primary text-xs">
              {progress}%
            </span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden">
            <div
              className="h-full rounded-full bg-primary transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  )
}