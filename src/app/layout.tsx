import './globals.css'

type Props = {
  children: React.ReactNode
}

export default function RootLayout({
  children,
}: Props) {
  return (
    <html lang="en">
      <body className="bg-zinc-50 text-zinc-900 antialiased">
        {children}
      </body>
    </html>
  )
}