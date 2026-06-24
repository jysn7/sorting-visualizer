import { AlgorithmMeta } from "@/lib/algorithms/types"
import { Tag } from "./Tag"
import { ComplexityGraph } from "./ComplexityGraph"

export function ComplexityView({ meta }: { meta: AlgorithmMeta }) {
  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3 flex-wrap">
          <h2 className="text-xl font-bold">{meta.name}</h2>
          <Tag accent={meta.stable}>{meta.stable ? "Stable" : "Unstable"}</Tag>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {meta.description}
        </p>
      </div>

      <div className="rounded flex flex-col gap-4 overflow-hidden bg-card">
        <ComplexityGraph
          best={meta.timeComplexity.best}
          average={meta.timeComplexity.average}
          worst={meta.timeComplexity.worst}
        />
        
        <div className="flex items-center justify-between border-t pt-4 px-1 border-border">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Space Complexity
          </span>
          <span className="font-mono text-sm font-bold text-primary">
            {meta.spaceComplexity}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Notes
        </span>
        <ul className="flex flex-col gap-2.5">
          {meta.notes.map((note, i) => (
            <li key={i} className="flex gap-3 text-sm items-start text-muted-foreground">
              <span className="mt-2 w-1.5 h-1.5 rounded-full shrink-0 bg-primary" />
              {note}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}