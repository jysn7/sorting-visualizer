import { AlgorithmMeta } from "./types"

export const ALGORITHM_META: Record<string, AlgorithmMeta> = {
  bubble: {
    key: "bubble",
    name: "Bubble Sort",
    description:
      "Repeatedly steps through the list, compares adjacent elements and swaps them if out of order. The largest values bubble to the end each pass.",
    timeComplexity: { best: "O(n)", average: "O(n²)", worst: "O(n²)" },
    spaceComplexity: "O(1)",
    stable: true,
    notes: [
      "Best case occurs when the array is already sorted",
      "Simple to implement but inefficient on large lists",
      "In-place — requires no extra memory",
    ],
  },
  selection: {
    key: "selection",
    name: "Selection Sort",
    description:
      "Divides the array into a sorted and unsorted region, repeatedly selecting the minimum element from the unsorted region and moving it to the sorted region.",
    timeComplexity: { best: "O(n²)", average: "O(n²)", worst: "O(n²)" },
    spaceComplexity: "O(1)",
    stable: false,
    notes: [
      "Always performs O(n²) comparisons regardless of input",
      "Makes at most O(n) swaps — useful when writes are costly",
      "Not stable — equal elements may be reordered",
    ],
  },
  insertion: {
    key: "insertion",
    name: "Insertion Sort",
    description:
      "Builds the sorted array one element at a time by inserting each new element into its correct position among the already-sorted elements.",
    timeComplexity: { best: "O(n)", average: "O(n²)", worst: "O(n²)" },
    spaceComplexity: "O(1)",
    stable: true,
    notes: [
      "Efficient for small or nearly-sorted arrays",
      "Online algorithm — can sort as it receives data",
      "Used as a base case in hybrid sorts like Timsort",
    ],
  },
  merge: {
    key: "merge",
    name: "Merge Sort",
    description:
      "Divides the array in half recursively until single elements remain, then merges the halves back together in sorted order.",
    timeComplexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)" },
    spaceComplexity: "O(n)",
    stable: true,
    notes: [
      "Guaranteed O(n log n) in all cases",
      "Requires O(n) extra space for merging",
      "Preferred for linked lists and external sorting",
    ],
  },
  quick: {
    key: "quick",
    name: "Quick Sort",
    description:
      "Selects a pivot element and partitions the array so all smaller elements come before it and all larger elements after. Recursively sorts each partition.",
    timeComplexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n²)" },
    spaceComplexity: "O(log n)",
    stable: false,
    notes: [
      "Worst case occurs with a poorly chosen pivot on sorted input",
      "In-place with O(log n) stack space",
      "Often fastest in practice due to cache efficiency",
    ],
  },
  heap: {
    key: "heap",
    name: "Heap Sort",
    description:
      "Builds a max-heap from the array, then repeatedly extracts the maximum element to produce a sorted sequence.",
    timeComplexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)" },
    spaceComplexity: "O(1)",
    stable: false,
    notes: [
      "Guaranteed O(n log n) with O(1) space",
      "Not stable — relative order of equal elements not preserved",
      "Poor cache performance compared to Quick Sort in practice",
    ],
  },
}