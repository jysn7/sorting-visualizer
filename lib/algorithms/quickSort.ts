import { ArrayBar, SortStep } from "./types"

function snapshot(arr: ArrayBar[], comparisons: number, swaps: number): SortStep {
  return { array: arr.map(b => ({ ...b })), comparisons, swaps }
}

export function quickSort(input: ArrayBar[]): SortStep[] {
  const steps: SortStep[] = []
  const arr = input.map(b => ({ ...b }))
  let comparisons = 0
  let swaps = 0

  function partition(low: number, high: number): number {
    const pivot = arr[high]
    pivot.state = "pivot"
    steps.push(snapshot(arr, comparisons, swaps))

    let i = low - 1

    for (let j = low; j < high; j++) {
      arr[j].state = "comparing"
      comparisons++
      steps.push(snapshot(arr, comparisons, swaps))

      if (arr[j].value < pivot.value) {
        i++
        arr[i].state = "swapping"
        arr[j].state = "swapping"
        steps.push(snapshot(arr, comparisons, swaps))

        const temp = arr[i]
        arr[i] = arr[j]
        arr[j] = temp

        swaps++
        steps.push(snapshot(arr, comparisons, swaps))

        arr[i].state = "default"
      }
      arr[j].state = "default"
    }

    arr[i + 1].state = "swapping"
    arr[high].state = "swapping"
    steps.push(snapshot(arr, comparisons, swaps))

    const temp = arr[i + 1]
    arr[i + 1] = arr[high]
    arr[high] = temp

    swaps++
    steps.push(snapshot(arr, comparisons, swaps))

    arr[high].state = "default"
    arr[i + 1].state = "sorted"
    steps.push(snapshot(arr, comparisons, swaps))

    return i + 1
  }

  function sort(low: number, high: number) {
    if (low < high) {
      const pi = partition(low, high)
      sort(low, pi - 1)
      sort(pi + 1, high)
    } else if (low === high) {
      arr[low].state = "sorted"
      steps.push(snapshot(arr, comparisons, swaps))
    }
  }

  sort(0, arr.length - 1)
  
  for (let i = 0; i < arr.length; i++) {
    arr[i].state = "sorted"
  }
  steps.push(snapshot(arr, comparisons, swaps))

  return steps
}