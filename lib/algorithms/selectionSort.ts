import { ArrayBar, SortStep } from "./types"

function snapshot(arr: ArrayBar[], comparisons: number, swaps: number): SortStep {
  return { array: arr.map(b => ({ ...b })), comparisons, swaps }
}

export function selectionSort(input: ArrayBar[]): SortStep[] {
  const steps: SortStep[] = []
  const arr = input.map(b => ({ ...b }))
  let comparisons = 0
  let swaps = 0

  const n = arr.length

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i

    for (let j = i + 1; j < n; j++) {
      arr[j].state = "comparing"
      arr[minIdx].state = "comparing"
      comparisons++
      steps.push(snapshot(arr, comparisons, swaps))

      arr[j].state = "default"
      arr[minIdx].state = "default"

      if (arr[j].value < arr[minIdx].value) {
        minIdx = j
      }
    }

    if (minIdx !== i) {
      arr[i].state = "swapping"
      arr[minIdx].state = "swapping"
      steps.push(snapshot(arr, comparisons, swaps))

      const temp = arr[i]
      arr[i] = arr[minIdx]
      arr[minIdx] = temp

      swaps++
      steps.push(snapshot(arr, comparisons, swaps))

      arr[minIdx].state = "default"
    }

    arr[i].state = "sorted"
    steps.push(snapshot(arr, comparisons, swaps))
  }

  arr[n - 1].state = "sorted"
  steps.push(snapshot(arr, comparisons, swaps))

  return steps
}