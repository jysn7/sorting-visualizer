"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

const N = [1, 5, 10, 20, 30, 40, 50]

function compute(n: number, type: string): number {
  switch (type) {
    case "O(1)":       return 1
    case "O(n)":       return n
    case "O(n log n)": return parseFloat((n * Math.log2(n)).toFixed(2))
    case "O(n²)":      return n * n
    case "O(log n)":   return parseFloat(Math.log2(n).toFixed(2))
    default:           return n
  }
}

function buildData(best: string, average: string, worst: string) {
  return N.map(n => ({
    n,
    Best:    compute(n, best),
    Average: compute(n, average),
    Worst:   compute(n, worst),
  }))
}

interface Props {
  best: string
  average: string
  worst: string
}

const LINES = [
  { key: "Best",    color: "var(--color-pivot)", opacity: 0.4 },
  { key: "Average", color: "var(--primary)",          opacity: 1   },
  { key: "Worst",   color: "var(--destructive)",      opacity: 0.8 },
] as const

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null

  return (
    <div
      className="rounded-2xl px-4 py-3 bg-card border-border border flex flex-col gap-2 text-xs shadow-xl min-w-32.5"
    >
      <span className="font-semibold text-muted-foreground">
        n = {label}
      </span>
      <div className="h-px w-full bg-border" />
      {payload.map((p: any) => (
        <div key={p.name} className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{ backgroundColor: p.stroke, opacity: p.strokeOpacity }}
            />
            <span className="text-muted-foreground">{p.name}</span>
          </div>
          <span className="font-semibold tabular-nums" style={{ color: p.stroke, opacity: p.strokeOpacity }}>
            {p.value}
          </span>
        </div>
      ))}
    </div>
  )
}

export function ComplexityGraph({ best, average, worst }: Props) {
  const data = buildData(best, average, worst)

  return (
    <div className="flex flex-col gap-4">

      {/* Header */}
      <div
        className="flex flex-col border-border gap-3 sm:flex-row sm:items-center sm:justify-between pb-4 border-b"
      >
        <h3 className="text-sm font-semibold">Big O Complexity</h3>
        <div className="flex items-center gap-4 flex-wrap">
          {LINES.map(({ key, color, opacity }) => (
            <div key={key} className="flex items-center gap-2">
              <span
                className="w-5 h-0.5 rounded-full shrink-0"
                style={{ backgroundColor: color, opacity, display: "inline-block" }}
              />
              <span className="text-xs font-medium opacity text-muted-foreground">
                {key}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data} margin={{ top: 10, right: 10, bottom: 0, left: -25 }}>
          <XAxis
            dataKey="n"
            tick={{ fontSize: 10, fill: "var(--muted-foreground)", fontFamily: "Montserrat" }}
            axisLine={false}
            tickLine={false}
            tickMargin={10}
          />
          <YAxis
            tick={{ fontSize: 10, fill: "var(--muted-foreground)", fontFamily: "Montserrat" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{
              stroke: "var(--border)",
              strokeWidth: 1,
              strokeDasharray: "4 4",
            }}
          />
          {LINES.map(({ key, color, opacity }) => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              stroke={color}
              strokeWidth={2}
              strokeOpacity={opacity}
              dot={false}
              activeDot={{
                r: 3,
                fill: color,
                strokeWidth: 0,
                opacity,
              }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}