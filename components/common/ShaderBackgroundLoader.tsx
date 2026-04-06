'use client'

import dynamic from 'next/dynamic'

const ShaderBackground = dynamic(
  () => import('@/features/experiments/ShaderBackground'),
  { ssr: false }
)

export default function ShaderBackgroundLoader() {
  return <ShaderBackground />
}
