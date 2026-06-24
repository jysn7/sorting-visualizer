import { ArrayBar, SortStep } from "./types"

function snapshot(arr: ArrayBar[], comparisons: number, swaps: number): SortStep {
  return { array: arr.map(b => ({ ...b })), comparisons, swaps }
}

export function insertionSort(input: ArrayBar[]): SortStep[] {
  const steps: SortStep[] = []
  const arr = input.map(b => ({ ...b }))
  let comparisons = 0
  let swaps = 0

  for (let i = 1; i < arr.length; i++) {
    const key = { ...arr[i] }
    let j = i - 1

    arr[i].state = "pivot"
    steps.push(snapshot(arr, comparisons, swaps))

    while (j >= 0) {
      arr[j].state = "comparing"
      comparisons++
      steps.push(snapshot(arr, comparisons, swaps))

      if (arr[j].value > key.value) {
        arr[j + 1] = { ...arr[j], state: "swapping" }
        arr[j].state = "default"
        swaps++
        steps.push(snapshot(arr, comparisons, swaps))
        arr[j + 1].state = "default"
        j--
      } else {
        arr[j].state = "default"
        break
      }
    }

    arr[j + 1] = { ...key, state: "sorted" }
    steps.push(snapshot(arr, comparisons, swaps))

    for (let k = 0; k <= i; k++) arr[k].state = "sorted"
    steps.push(snapshot(arr, comparisons, swaps))
  }

  arr.forEach(b => (b.state = "sorted"))
  steps.push(snapshot(arr, comparisons, swaps))

  return steps
}