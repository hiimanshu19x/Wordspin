'use client'

import { useRef, useEffect } from 'react'
import { Badge } from '@/components/ui/badge'
import { Prompt } from '@/lib/types'
import { cn } from '@/lib/utils'

interface WritingEditorProps {
  prompt: Prompt
  initialBody?: string
  onBodyChange: (body: string) => void
  onWordCountChange: (count: number) => void
}

export function WritingEditor({
  prompt,
  initialBody = '',
  onBodyChange,
  onWordCountChange
}: WritingEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Auto-resize
  useEffect(() => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = `${Math.max(textarea.scrollHeight, 300)}px`
    }
  }, [initialBody])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value
    onBodyChange(text)
    
    // Calculate words
    const words = text.trim().split(/\s+/).filter(w => w.length > 0)
    const count = text.trim() === '' ? 0 : words.length
    onWordCountChange(count)
    
    // Auto-resize
    e.target.style.height = 'auto'
    e.target.style.height = `${Math.max(e.target.scrollHeight, 300)}px`
  }

  const wordCount = initialBody.trim() === '' ? 0 : initialBody.trim().split(/\s+/).filter(w => w.length > 0).length

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <Badge variant="outline">{prompt.category}</Badge>
        </div>
        <h2 className="font-serif italic text-xl md:text-2xl text-muted-foreground">
          &quot;{prompt.text}&quot;
        </h2>
      </div>
      
      <textarea
        ref={textareaRef}
        value={initialBody}
        onChange={handleChange}
        placeholder="Start writing..."
        className={cn(
          "w-full bg-transparent border-b-2 outline-none resize-none font-serif text-lg md:text-xl leading-relaxed text-foreground p-0 min-h-[300px] md:min-h-[400px] transition-colors",
          wordCount > 200 ? "border-destructive" : "border-transparent focus:border-muted"
        )}
      />
    </div>
  )
}
