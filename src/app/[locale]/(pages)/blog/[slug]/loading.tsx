export default function Loading() {
  return (
    <div
      className="
        container
        mx-auto
        max-w-4xl
        px-4
        py-10
      "
    >
      <div
        className="
          aspect-[16/9]
          animate-pulse
          rounded-3xl
          bg-zinc-200
        "
      />

      <div
        className="
          mt-8
          h-14
          w-full
          animate-pulse
          rounded
          bg-zinc-200
        "
      />

      <div
        className="
          mt-5
          h-6
          w-2/3
          animate-pulse
          rounded
          bg-zinc-200
        "
      />
    </div>
  )
}