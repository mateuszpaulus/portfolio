export default function RootLayout({ children }: { children: React.ReactNode }) {
  // html/body are provided by app/[locale]/layout.tsx
  return <>{children}</>
}
