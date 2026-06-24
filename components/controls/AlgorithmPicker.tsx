"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ALGORITHM_META } from "@/lib/algorithms/meta"

interface Props {
  value: string
  onChange: (key: string) => void
  disabled?: boolean
}

export function AlgorithmPicker({ value, onChange, disabled }: Props) {
  return (
    <Select value={value} onValueChange={onChange} disabled={disabled}>
      <SelectTrigger
        className="w-full text-sm font-medium h-10 rounded border-0"
        style={{ background: "var(--secondary)", color: "var(--foreground)" }}
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent
        className="rounded border-0 shadow-2xl"
        style={{ background: "var(--card)" }}
      >
        {Object.values(ALGORITHM_META).map((a) => (
          <SelectItem
            key={a.key}
            value={a.key}
            className="text-sm font-medium rounded"
          >
            {a.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}