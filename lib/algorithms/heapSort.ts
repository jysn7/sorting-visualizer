import { ArrayBar, SortStep } from "./types"

function snapshot(arr: ArrayBar[], comparisons: number, swaps: number): SortStep {
  return { array: arr.map(b => ({ ...b })), comparisons, swaps }
}

export function heapSort(input: ArrayBar[]): SortStep[] {
  const steps: SortStep[] = []
  const arr = input.map(b => ({ ...b }))
  let comparisons = 0
  let swaps = 0

  const n = arr.length

  function heapify(size: number, rootIdx: number) {
    let largest = rootIdx
    const left = 2 * rootIdx + 1
    const right = 2 * rootIdx + 2

    if (left < size) {
      arr[left].state = "comparing"
      arr[largest].state = "comparing"
      comparisons++
      steps.push(snapshot(arr, comparisons, swaps))
      arr[left].state = "default"
      arr[largest].state = "default"

      if (arr[left].value > arr[largest].value) {
        largest = left
      }
    }

    if (right < size) {
      arr[right].state = "comparing"
      arr[largest].state = "comparing"
      comparisons++
      steps.push(snapshot(arr, comparisons, swaps))
      arr[right].state = "default"
      arr[largest].state = "default"

      if (arr[right].value > arr[largest].value) {
        largest = right
      }
    }

    if (largest !== rootIdx) {
      arr[rootIdx].state = "swapping"
      arr[largest].state = "swapping"
      steps.push(snapshot(arr, comparisons, swaps))

      const temp = arr[rootIdx]
      arr[rootIdx] = arr[largest]
      arr[largest] = temp

      swaps++
      steps.push(snapshot(arr, comparisons, swaps))

      arr[rootIdx].state = "default"
      arr[largest].state = "default"

      heapify(size, largest)
    }
  }

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(n, i)
  }

  for (let i = n - 1; i > 0; i--) {
    arr[0].state = "swapping"
    arr[i].state = "swapping"
    steps.push(snapshot(arr, comparisons, swaps))

    const temp = arr[0]
    arr[0] = arr[i]
    arr[i] = temp

    swaps++
    steps.push(snapshot(arr, comparisons, swaps))

    arr[0].state = "default"
    arr[i].state = "sorted"
    steps.push(snapshot(arr, comparisons, swaps))

    heapify(i, 0)
  }

  arr[0].state = "sorted"
  steps.push(snapshot(arr, comparisons, swaps))

  return steps
}