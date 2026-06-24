# Sorting Visualizer

An interactive sorting algorithm visualizer built with Next.js, Tailwind CSS, and shadcn/ui.

---

## Algorithms

- Bubble Sort
- Selection Sort
- Insertion Sort
- Merge Sort
- Quick Sort
- Heap Sort

---

## Setup

```bash
git clone https://github.com/your-username/sorting-visualizer.git
cd sorting-visualizer
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Stack

- [Next.js](https://nextjs.org) — App Router
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [GSAP](https://gsap.com) — animations

---

## Project Structure

```
src/
├── app/                  # Next.js app router
├── components/
│   ├── visualizer/       # ArrayBars, StatsBar, Visualizer
│   └── controls/         # Algorithm picker, sliders
├── hooks/
│   ├── useArray.ts       # Array generation
│   └── useSorting.ts     # Playback engine
└── lib/
    └── algorithms/       # One file per algorithm + shared types
```

---

## Controls

| Control | Action |
|---|---|
| Play / Pause | Run or pause the animation |
| ← → | Step through one frame at a time |
| Randomize | Generate a new array |
| Reset | Go back to step 0 |
| Speed slider | Control animation delay between steps |

---

## Adding an Algorithm

1. Create `src/lib/algorithms/yourSort.ts`
2. Export a function `yourSort(input: ArrayBar[]): SortStep[]`
3. Push a snapshot after every comparison and swap
4. Export it from `src/lib/algorithms/index.ts`
5. Add it to the algorithm picker in `AlgorithmPicker.tsx`

---
