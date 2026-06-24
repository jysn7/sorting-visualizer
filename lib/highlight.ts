import { createHighlighter } from "shiki"

let highlighterPromise: ReturnType<typeof createHighlighter> | null = null

export async function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ["vesper"],
      langs: ["javascript", "python", "cpp", "java", "csharp"],
    })
  }
  return highlighterPromise
}

export async function highlight(code: string, lang: string): Promise<string> {
  const highlighter = await getHighlighter()
  return highlighter.codeToHtml(code, {
    lang,
    theme: "vesper",
  })
}