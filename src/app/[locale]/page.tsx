'use client'

import { useTranslation } from "@/hooks/useTranslation"
import { InputLocale } from "../_components/InputLocale"
import { useState } from "react"

export default function HomePage() {
  const t = useTranslation()

  const [local, setLocal] = useState('')

  function setSearch(content: string) {
    if (content) setLocal(content)
  }

  return (
    <main>
      <h1>{t.condition.excellent}</h1>
      <h2>{local}</h2>
      <InputLocale onSearch={setSearch} />
    </main>
  )
}