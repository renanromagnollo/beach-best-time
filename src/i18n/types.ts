export type Dictionary = {
  months: Record<string, string>

  climate: {
    perfect: string
    excellent: string
    veryGood: string
    good: string
    regular: string
    bad: string
  }

  recommendations: {
    excellent: string
    good: string
    regular: string
    bad: string
  }
}