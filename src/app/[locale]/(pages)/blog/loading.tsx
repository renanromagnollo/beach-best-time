export default function Loading() {
  return (
    <div
      className="
        container
        mx-auto
        px-4
        py-10
      "
    >
      <div
        className="
          h-10
          w-64
          animate-pulse
          rounded
          bg-zinc-200
        "
      />

      <div
        className="
          mt-10
          grid
          gap-6
          md:grid-cols-2
          lg:grid-cols-3
        "
      >
        {Array.from({ length: 6 }).map(
          (_, index) => (
            <div
              key={index}
              className="
                overflow-hidden
                rounded-2xl
                border
              "
            >
              <div
                className="
                  aspect-[16/9]
                  animate-pulse
                  bg-zinc-200
                "
              />

              <div className="p-5">
                <div
                  className="
                    h-6
                    w-full
                    animate-pulse
                    rounded
                    bg-zinc-200
                  "
                />

                <div
                  className="
                    mt-3
                    h-4
                    w-3/4
                    animate-pulse
                    rounded
                    bg-zinc-200
                  "
                />
              </div>
            </div>
          )
        )}
      </div>
    </div>
  )
}