export type BarState = "default" | "comparing" | "swapping" | "sorted" | "pivot"

export interface ArrayBar {
  value: number
  state: BarState
}

export interface SortStep {
  array: ArrayBar[]
  comparisons: number
  swaps: number
}

export type ViewMode = "visualizer" | "complexity"

export interface AlgorithmMeta {
  key: string
  name: string
  description: string
  timeComplexity: {
    best: string
    average: string
    worst: string
  }
  spaceComplexity: string
  stable: boolean
  notes: string[]
}