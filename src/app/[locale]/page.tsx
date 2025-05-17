'use client'

import { useTranslation } from "@/hooks/useTranslation"

export default function HomePage() {
  const t = useTranslation()
  return (
    <main>
      <h1>{t.condition.excellent}</h1>
    </main>
  )
}