'use client'

import { FormEvent, useCallback, useRef } from "react"

interface InputLocationProps {
  onSearch: (locale: string) => void
}

export function InputLocation({ onSearch }: InputLocationProps) {

  //#TODO: Aplicar meganismo de sugestão de nomes ao começar a digitar

  const inputContent = useRef<HTMLInputElement | null>(null)

  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault()
    const content = inputContent.current?.value
    if (content?.trim()) {
      onSearch(content.trim())
    }
  }, [onSearch])

  return (
    <form onSubmit={handleSubmit} className="flex gap-4 justify-center">
      <input
        className="border px-2 w-1/2"
        type="text"
        placeholder="Digite o nome do lugar (ex: Guarapari)"
        ref={inputContent}
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Buscar
      </button>
    </form>
  )
}