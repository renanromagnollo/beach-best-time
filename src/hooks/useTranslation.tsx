import { TranslationContext } from "@/context/translation-context"
import { useContext } from "react"

export const useTranslation = () => {
  const context = useContext(TranslationContext)
  if (!context) throw new Error('useTranslation must be used within TranslationProvider')
  return context
}