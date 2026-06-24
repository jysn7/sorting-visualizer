import { useState, useCallback } from "react"
import { ArrayBar } from "@/lib/algorithms/types"

export function useArray(size: number = 50) {
  const generate = useCallback((): ArrayBar[] =>
    Array.from({ length: size }, () => ({
      value: Math.floor(Math.random() * 90) + 10,
      state: "default" as const,
    })), [size])

  const [array, setArray] = useState<ArrayBar[]>(generate)

  const reset = useCallback(() => setArray(generate()), [generate])

  return { array, setArray, reset }
}