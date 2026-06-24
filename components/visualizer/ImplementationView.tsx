"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"
import { ExtendedAlgorithmMeta, Language } from "@/lib/algorithms/meta"
import { CODE_TEMPLATES } from "@/lib/algorithms/codeTemplates"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"

interface ImplementationViewProps {
  meta: ExtendedAlgorithmMeta
}

const LANGUAGES = [
  { key: "javascript", label: "JavaScript" },
  { key: "python", label: "Python" },
  { key: "cpp", label: "C++" },
  { key: "java", label: "Java" },
  { key: "csharp", label: "C#" }
] as const

export function ImplementationView({ meta }: ImplementationViewProps) {
  const [lang, setLang] = useState<Language>("javascript")
  const [copied, setCopied] = useState(false)
  
  const algorithmCode = CODE_TEMPLATES[meta.key] || CODE_TEMPLATES.bubble
  const code = algorithmCode[lang] || algorithmCode.javascript

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  return (
    <div className="flex flex-col gap-6 max-w-7xl">
      <div className="flex flex-col gap-3">
        <div className="flex items-center pb-4 justify-between gap-3 flex-wrap">
          <h2 className="text-xl font-bold">Implementation</h2>
          
          <Tabs value={lang} onValueChange={(value) => setLang(value as Language)}>
            <TabsList className="rounded-xl p-1" style={{ background: "var(--secondary)" }}>
                {LANGUAGES.map((l) => (
                <TabsTrigger
                    key={l.key}
                    value={l.key}
                    className="px-3 py-1 text-xs font-semibold hover:bg-primary rounded-lg transition-all cursor-pointer shadow-none data-[state=inactive]:bg-transparent"
                    style={
                    lang === l.key
                        ? { background: "var(--primary)", color: "var(--primary-foreground)" }
                        : { color: "var(--muted-foreground)" }
                    }
                >
                    {l.label}
                </TabsTrigger>
                ))}
            </TabsList>
            </Tabs>
        </div>
        <p className="text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
          {meta.explanation}
        </p>
      </div>

      <div className="rounded-lg overflow-hidden bg-background">
        <div className="px-5 py-3 border-b border-b-2 flex items-center justify-between bg-muted/20 border-b-card">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full opacity-60" style={{ background: "var(--destructive)" }} />
            <div className="w-3 h-3 rounded-full opacity-60" style={{ background: "var(--primary)" }} />
            <div className="w-3 h-3 rounded-full opacity-60" style={{ background: "var(--success, #22c55e)" }} />
            <span className="text-xs font-mono ml-2 opacity-70" style={{ color: "var(--muted-foreground)" }}>
              {meta.key}.{lang === "javascript" ? "js" : lang === "python" ? "py" : lang === "cpp" ? "cpp" : lang === "java" ? "java" : "cs"}
            </span>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCopy}
            className="h-8 w-8 opacity-70 cursor-pointer hover:opacity-100"
            aria-label="Copy code expression"
          >
            {copied ? (
              <Check className="h-3.5 w-3.5" style={{ color: "var(--primary)" }} />
            ) : (
              <Copy className="h-3.5 w-3.5" style={{ color: "var(--muted-foreground)" }} />
            )}
          </Button>
        </div>
        <pre className="p-5 text-xs font-mono overflow-auto leading-relaxed">
          <code style={{ color: "var(--foreground)" }}>{code}</code>
        </pre>
      </div>
    </div>
  )
}