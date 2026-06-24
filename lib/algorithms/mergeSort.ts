import { ArrayBar, SortStep } from "./types"

function snapshot(arr: ArrayBar[], comparisons: number, swaps: number): SortStep {
  return { array: arr.map(b => ({ ...b })), comparisons, swaps }
}

export function mergeSort(input: ArrayBar[]): SortStep[] {
  const steps: SortStep[] = []
  const arr = input.map(b => ({ ...b }))
  let comparisons = 0
  let swaps = 0

  function merge(left: number, mid: number, right: number) {
    const leftArr = arr.slice(left, mid + 1).map(b => ({ ...b }))
    const rightArr = arr.slice(mid + 1, right + 1).map(b => ({ ...b }))

    let i = 0, j = 0, k = left

    while (i < leftArr.length && j < rightArr.length) {
      arr[left].state = "comparing"
      arr[right].state = "comparing"
      comparisons++
      steps.push(snapshot(arr, comparisons, swaps))

      if (leftArr[i].value <= rightArr[j].value) {
        arr[k] = { ...leftArr[i], state: "swapping" }
        i++
      } else {
        arr[k] = { ...rightArr[j], state: "swapping" }
        j++
      }
      swaps++
      steps.push(snapshot(arr, comparisons, swaps))
      arr[k].state = "default"
      k++
    }

    while (i < leftArr.length) {
      arr[k] = { ...leftArr[i], state: "swapping" }
      swaps++
      steps.push(snapshot(arr, comparisons, swaps))
      arr[k].state = "default"
      i++; k++
    }

    while (j < rightArr.length) {
      arr[k] = { ...rightArr[j], state: "swapping" }
      swaps++
      steps.push(snapshot(arr, comparisons, swaps))
      arr[k].state = "default"
      j++; k++
    }
  }

  function divide(left: number, right: number) {
    if (left >= right) {
      arr[left].state = "sorted"
      steps.push(snapshot(arr, comparisons, swaps))
      return
    }
    const mid = Math.floor((left + right) / 2)
    divide(left, mid)
    divide(mid + 1, right)
    merge(left, mid, right)

    // Mark merged range as sorted
    for (let i = left; i <= right; i++) arr[i].state = "sorted"
    steps.push(snapshot(arr, comparisons, swaps))
  }

  divide(0, arr.length - 1)
  return steps
}