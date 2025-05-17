import { Dictionary } from "@/types";
import { createContext } from "react";

const TranslationContext = createContext<Dictionary | null>(null)

export const TranslationProvider = ({
  children,
  dictionary
}: {
  children: React.ReactNode,
  dictionary: Dictionary
}) => {
  return (
    <TranslationContext.Provider value={dictionary}>
      {children}
    </TranslationContext.Provider>
  )
}