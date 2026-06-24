import { AlgorithmMeta } from "./types"

export type Language = "javascript" | "python" | "cpp" | "java" | "csharp"

export interface ExtendedAlgorithmMeta extends AlgorithmMeta {
  explanation: string
}

export const ALGORITHM_META: Record<string, ExtendedAlgorithmMeta> = {
  bubble: {
    key: "bubble",
    name: "Bubble Sort",
    description: "The classic beginner algorithm. It walks through the array over and over, swapping neighbors that are out of order until everything settles into place.",
    timeComplexity: { best: "O(n)", average: "O(n²)", worst: "O(n²)" },
    spaceComplexity: "O(1)",
    stable: true,
    explanation: "Two loops: the outer one counts passes, the inner one walks through adjacent pairs. If the left value is bigger than the right, swap them. Do this enough times and the largest unsorted value bubbles to its final spot at the end of each pass.",
    notes: [
      "Best case is when the array is already sorted. It just checks once and stops.",
      "Simple to write but gets slow fast on large arrays.",
      "Sorts in place with no extra memory needed. Space complexity is O(1).",
    ],
  },
  selection: {
    key: "selection",
    name: "Selection Sort",
    description: "Finds the smallest remaining element and drops it into position, one at a time. Predictable and straightforward, but never in a hurry.",
    timeComplexity: { best: "O(n²)", average: "O(n²)", worst: "O(n²)" },
    spaceComplexity: "O(1)",
    stable: false,
    explanation: "Start at index zero, scan right to find the smallest value, then swap it into the current position. Move the boundary one step forward and repeat. You always know exactly how many swaps you will make: at most one per pass.",
    notes: [
      "Always O(n²) comparisons no matter what. No shortcuts exist.",
      "Makes very few swaps, which helps when writes are expensive.",
      "Not stable, so equal elements can end up reordered. Space complexity is O(1).",
    ],
  },
  insertion: {
    key: "insertion",
    name: "Insertion Sort",
    description: "Works like sorting cards in your hand. Pick up the next card and slide it into the right spot among the ones you are already holding.",
    timeComplexity: { best: "O(n)", average: "O(n²)", worst: "O(n²)" },
    spaceComplexity: "O(1)",
    stable: true,
    explanation: "Loop from left to right starting at index one. For each element, hold onto it and shift everything larger one slot to the right until you find its correct position, then drop it in. The left side stays sorted the whole time.",
    notes: [
      "Really fast on small or nearly sorted arrays.",
      "Can sort data as it arrives. No need to have it all upfront.",
      "Used inside Timsort, the algorithm Python and Java use in production. Space complexity is O(1).",
    ],
  },
  merge: {
    key: "merge",
    name: "Merge Sort",
    description: "Splits the array in half recursively until you are left with single elements, then carefully merges everything back together in order.",
    timeComplexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)" },
    spaceComplexity: "O(n)",
    stable: true,
    explanation: "Keep splitting down the middle until you hit individual elements. Then merge pairs back together using two pointers: compare the fronts of each half and take the smaller one. Repeat all the way up the call stack until the full array is reassembled in sorted order.",
    notes: [
      "Always O(n log n). No bad inputs can slow it down.",
      "Needs extra memory equal to the size of the array. Space complexity is O(n).",
      "Great choice for sorting linked lists or data that does not fit in memory.",
    ],
  },
  quick: {
    key: "quick",
    name: "Quick Sort",
    description: "Picks a pivot, moves everything smaller to its left and everything larger to its right, then repeats on both sides. Fast in practice, elegant in theory.",
    timeComplexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n²)" },
    spaceComplexity: "O(log n)",
    stable: false,
    explanation: "Pick a pivot (usually the last element), then walk through the subarray. Anything smaller than the pivot gets swapped to the left partition. After the loop, place the pivot between the two partitions. It is now in its final spot. Recursively sort both sides.",
    notes: [
      "Worst case hits when the pivot is always the smallest or largest, like on a sorted array.",
      "In-place and cache-friendly, which is why it is often the fastest in real life.",
      "Not stable, so equal elements may shift around. Space complexity is O(log n) for the call stack.",
    ],
  },
  heap: {
    key: "heap",
    name: "Heap Sort",
    description: "Turns the array into a max-heap where the biggest value is always at the top, then repeatedly pulls the max off and places it at the end.",
    timeComplexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)" },
    spaceComplexity: "O(1)",
    stable: false,
    explanation: "First, rearrange the array into a valid max-heap by heapifying from the last parent up to the root. Then swap the root (the max) with the last element, shrink the heap boundary by one, and heapify the root again to pull the next largest value to the top. Repeat until done.",
    notes: [
      "Guaranteed O(n log n) with no extra memory. Space complexity is O(1).",
      "Not stable, so the relative order of duplicates is not preserved.",
      "Slower than Quick Sort in practice due to poor cache behaviour.",
    ],
  },
}