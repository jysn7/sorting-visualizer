import { ArrayBar, SortStep } from "./types"

export function bubbleSort(input: ArrayBar[]): SortStep[] {
  const steps: SortStep[] = []
  const arr = input.map(b => ({ ...b }))
  let comparisons = 0
  let swaps = 0

  const snapshot = () =>
    steps.push({ array: arr.map(b => ({ ...b })), comparisons, swaps })

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      arr[j].state = "comparing"
      arr[j + 1].state = "comparing"
      comparisons++
      snapshot()

      if (arr[j].value > arr[j + 1].value) {
        ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
        swaps++
        arr[j].state = "swapping"
        arr[j + 1].state = "swapping"
        snapshot()
      }

      arr[j].state = "default"
      arr[j + 1].state = "default"
    }
    arr[arr.length - i - 1].state = "sorted"
    snapshot()
  }

  return steps
}