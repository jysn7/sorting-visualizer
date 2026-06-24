import { AlgorithmMeta } from "@/lib/algorithms/types"
import { Tag } from "./Tag"
import { Row } from "./Row"

export function ComplexityView({ meta }: { meta: AlgorithmMeta }) {
  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3 flex-wrap">
          <h2 className="text-xl font-bold">{meta.name}</h2>
          <Tag accent={meta.stable}>{meta.stable ? "Stable" : "Unstable"}</Tag>
        </div>
        <p className="text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
          {meta.description}
        </p>
      </div>

      <div className="rounded-2xl overflow-hidden" style={{ background: "var(--card)" }}>
        <div className="px-5 py-3.5 border-b" style={{ borderColor: "var(--border)" }}>
          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--muted-foreground)" }}>
            Complexity
          </span>
        </div>
        <div className="px-5">
          <Row label="Best case" value={meta.timeComplexity.best} />
          <Row label="Average case" value={meta.timeComplexity.average} highlight />
          <Row label="Worst case" value={meta.timeComplexity.worst} />
          <Row label="Space" value={meta.spaceComplexity} />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--muted-foreground)" }}>
          Notes
        </span>
        <ul className="flex flex-col gap-2.5">
          {meta.notes.map((note, i) => (
            <li key={i} className="flex gap-3 text-sm items-start" style={{ color: "var(--muted-foreground)" }}>
              <span className="mt-2 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "var(--primary)" }} />
              {note}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}