export default function LoadingBeachPage() {
  return (
    <main className="mx-auto max-w-7xl space-y-8 px-6 py-10">
      <div className="h-48 animate-pulse rounded-3xl bg-zinc-200" />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({
          length: 8,
        }).map((_, index) => {
          return (
            <div
              key={index}
              className="h-40 animate-pulse rounded-2xl bg-zinc-200"
            />
          )
        })}
      </div>
    </main>
  )
}