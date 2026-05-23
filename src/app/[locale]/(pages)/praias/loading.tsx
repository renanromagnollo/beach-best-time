export default function Loading() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({
          length: 6,
        }).map((_, index) => (
          <div
            key={index}
            className="h-52 animate-pulse rounded-2xl bg-zinc-100"
          />
        ))}
      </div>
    </main>
  )
}