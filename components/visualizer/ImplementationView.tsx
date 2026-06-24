"use client"

import { useState, useEffect } from "react"
import { Check, Copy } from "lucide-react"
import { ExtendedAlgorithmMeta, Language } from "@/lib/algorithms/meta"
import { CODE_TEMPLATES } from "@/lib/algorithms/codeTemplates"
import { highlight } from "@/lib/highlight"

interface Props {
  meta: ExtendedAlgorithmMeta
}

const LANGUAGES = [
  { key: "javascript", label: "JS"     },
  { key: "python",     label: "Python" },
  { key: "cpp",        label: "C++"    },
  { key: "java",       label: "Java"   },
  { key: "csharp",     label: "C#"     },
] as const

const EXT: Record<Language, string> = {
  javascript: "js",
  python:     "py",
  cpp:        "cpp",
  java:       "java",
  csharp:     "cs",
}

export function ImplementationView({ meta }: Props) {
  const [lang, setLang]                   = useState<Language>("javascript")
  const [copied, setCopied]               = useState(false)
  const [highlightedCode, setHighlighted] = useState<string>("")
  const [loading, setLoading]             = useState(true)

  const code = (CODE_TEMPLATES[meta.key] ?? CODE_TEMPLATES.bubble)[lang]

  useEffect(() => {
    setLoading(true)
    highlight(code, lang).then((html) => {
      setHighlighted(html)
      setLoading(false)
    })
  }, [code, lang])

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code).catch(console.error)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex flex-col gap-6">

      {/* Header row */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h2 className="text-xl font-bold">Implementation</h2>

        {/* Language picker */}
        <div className="flex items-center gap-1 p-1 rounded-2xl shrink-0 bg-secondary">
          {LANGUAGES.map((l) => (
            <button
              key={l.key}
              onClick={() => setLang(l.key as Language)}
              className={`
                px-3 py-1.5 text-xs cursor-pointer hover:bg-card font-semibold rounded-xl transition-all
                ${lang === l.key
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
                }
              `}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>

      {/* Description */}
      <p className="text-sm leading-relaxed max-w-prose -mt-2 text-muted-foreground">
        {meta.explanation}
      </p>

      {/* Code block */}
      <div className="rounded-lg overflow-hidden  bg-background">
        <div className="px-4 py-3 flex items-center justify-between border-b-2 border-b-card bg-card/60">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-destructive opacity-70" />
            <span className="w-3 h-3 rounded-full bg-primary opacity-70" />
            <span className="w-3 h-3 rounded-full bg-green-400 opacity-70" />
            <span className="text-xs ml-2 font-medium text-muted-foreground">
              {meta.key}.{EXT[lang]}
            </span>
          </div>

          <button
            onClick={handleCopy}
            className={`
              flex items-center gap-1.5 text-xs cursor-pointer hover:bg-card font-medium px-2.5 py-1.5 rounded-lg transition-all
              ${copied
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:text-foreground"
              }
            `}
          >
            {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>

        {loading ? (
          <div className="p-5 flex items-center gap-2 text-xs text-muted-foreground">
            <span className="w-3 h-3 rounded-full bg-muted animate-pulse" />
            Loading...
          </div>
        ) : (
          <div
            className="
              p-5 text-xs leading-relaxed overflow-x-auto
              [&_pre]:!bg-background
              [&_pre]:!p-0
              [&_pre]:!m-0
              [&_code]:!text-xs
              [&_code]:!leading-relaxed
              [&_code]:font-mono
            "
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
          />
        )}
      </div>
    </div>
  )
}