type BeachScoreBadgeProps = {
  score: number
}

function getLabel(score: number) {
  if (score >= 9) {
    return 'Perfeito'
  }

  if (score >= 8) {
    return 'Excelente'
  }

  if (score >= 7) {
    return 'Muito Bom'
  }

  if (score >= 6) {
    return 'Bom'
  }

  if (score >= 5) {
    return 'Regular'
  }

  return 'Ruim'
}

export function BeachScoreBadge({
  score,
}: BeachScoreBadgeProps) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-sky-100 px-3 py-1 text-sm font-medium text-sky-700">
      <span>
        {score.toFixed(1)}
      </span>

      <span>
        {getLabel(score)}
      </span>
    </div>
  )
}