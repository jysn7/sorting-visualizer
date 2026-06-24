import { AlgorithmMeta } from "./types"

export type Language = "javascript" | "python" | "cpp" | "java" | "csharp"

export interface ExtendedAlgorithmMeta extends AlgorithmMeta {
  explanation: string
}

export const ALGORITHM_META: Record<string, ExtendedAlgorithmMeta> = {
  bubble: {
    key: "bubble",
    name: "Bubble Sort",
    description:
      "A simple comparison profile that repeatedly steps through the array, compares adjacent pairs, and swaps them if they are in the wrong order. This process repeats until the entire structure is organized.",
    timeComplexity: { best: "O(n)", average: "O(n²)", worst: "O(n²)" },
    spaceComplexity: "O(1)",
    stable: true,
    explanation: "We run a nested loop through the array. The outer loop tracks our passes, while the inner loop looks at side-by-side elements up to the last unsorted index. If the left element is larger than the right, we swap them using a temporary variable or destructuring. Because of this structural comparison, the largest unsorted value in that pass naturally floats down to its correct, finalized position at the end of the line on every single iteration.",
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
      "An in-place comparison design that maintains sorted and unsorted boundaries by continuously isolating the absolute smallest element from the unsorted section and moving it to its final position.",
    timeComplexity: { best: "O(n²)", average: "O(n²)", worst: "O(n²)" },
    spaceComplexity: "O(1)",
    stable: false,
    explanation: "We start a loop at index zero and treat it as a placeholder for the sorted boundary. From that marker, we run a second loop all the way to the right end of the array to find the index holding the absolute lowest value. Once that scan finishes, if that lowest index isn't our current boundary placeholder, we swap the two values. We then step the boundary tracker forward by one position and repeat the scan.",
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
      "An adaptive sort that dynamically builds a sorted segment near the front of the list, consuming one element per iteration from the remaining data and positioning it correctly within that sorted range.",
    timeComplexity: { best: "O(n)", average: "O(n²)", worst: "O(n²)" },
    spaceComplexity: "O(1)",
    stable: true,
    explanation: "We loop through the array from left to right, starting at index one. For every new element we encounter, we store it in a variable and start a backward pointer into the sorted segment on its left. We continually shift those sorted, larger items one slot to the right until we find either the start of the array or an element that is smaller than our stored value. Finally, we drop our element into that open pocket.",
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
      "A highly predictable divide-and-conquer strategy that breaks down collections into single-unit sub-arrays before recombining those units using an ordered matching process.",
    timeComplexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)" },
    spaceComplexity: "O(n)",
    stable: true,
    explanation: "This is a recursive function that continuously calculates the middle index of its current range and splits the array into separate left and right halves. This division continues down the call stack until individual elements are isolated. As the recursion unwinds, a merge utility processes the halves side-by-side using two index pointers, appending the lower value to a temporary buffer array until both segments are completely recombined in sorted order.",
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
      "An efficient partition-based algorithm that divides data relative to a chosen baseline element, ensuring elements on either side conform to a strict high-or-low relationship.",
    timeComplexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n²)" },
    spaceComplexity: "O(log n)",
    stable: false,
    explanation: "We select a target value within our subarray boundaries—often the last item—to act as our pivot. We set up an internal boundary pointer, then loop through the segment. Every time we encounter a value smaller than or equal to the pivot, we increment our tracker and swap that value into place. After the loop, we swap the pivot into its true home at the boundary index, then recursively apply the same logic to the unsorted sections on its left and right.",
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
      "A tree-structured layout that utilizes a balanced binary heap tracking format to continually track, surface, and extract the maximum values in constant space.",
    timeComplexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)" },
    spaceComplexity: "O(1)",
    stable: false,
    explanation: "We treat our sequential array elements as a parent-child structure in a binary tree. First, we process the elements backward from the lowest parent node up to the root, running a heapify routine that shifts larger child values upward until the array forms a valid max-heap. We then enter a loop: we swap the absolute largest element at root index zero with the last item in our unsorted boundary, shrink that boundary by one, and run heapify on the root node to bubble the next largest value to the top.",
    notes: [
      "Guaranteed O(n log n) with O(1) space",
      "Not stable — relative order of equal elements not preserved",
      "Poor cache performance compared to Quick Sort in practice",
    ],
  },
}