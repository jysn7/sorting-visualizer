import { SortStep } from "@/lib/algorithms/types"

export function StatsBar({ step, progress }: { step: SortStep; progress?: number }) {
  return (
    <div className="flex flex-col gap-2 p-1">
      {progress !== undefined && (
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-end text-[11px] font-semibold text-muted-foreground tracking-tight">
            <div className="flex gap-3">
              <span>
                Operations <span className="font-bold text-foreground ml-1">{step.comparisons + step.swaps}</span>
              </span>
              <span className="opacity-40">•</span>
              <span>
                Swaps <span className="font-bold text-foreground ml-1">{step.swaps}</span>
              </span>
            </div>
            <span className="font-bold text-primary text-xs tracking-tight">
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