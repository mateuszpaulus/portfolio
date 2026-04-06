import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const locale = searchParams.get('locale') ?? 'pl'
  const title = searchParams.get('title')
  const isEn = locale === 'en'

  const mainTitle = title ?? 'Mateusz Paulus'
  const role = isEn ? 'Fullstack Developer' : 'Fullstack Developer'
  const stack = 'Next.js · TypeScript · Node.js · PostgreSQL'

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: '#0a0a0a',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
        }}
      >
        {/* Gradient orb */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99,102,241,0.3) 0%, transparent 70%)',
          }}
        />

        {/* Domain badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '48px',
          }}
        >
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#6366f1',
            }}
          />
          <span style={{ color: '#6b7280', fontSize: '18px' }}>
            mateuszpaulus.dev
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: mainTitle.length > 20 ? '56px' : '80px',
            fontWeight: 700,
            color: '#ffffff',
            lineHeight: 1.1,
            marginBottom: '16px',
            letterSpacing: '-2px',
          }}
        >
          {mainTitle}
        </div>

        {/* Role */}
        <div
          style={{
            fontSize: '32px',
            color: '#6366f1',
            marginBottom: '24px',
            fontWeight: 500,
          }}
        >
          {role}
        </div>

        {/* Stack */}
        <div
          style={{
            fontSize: '20px',
            color: '#9ca3af',
            letterSpacing: '1px',
          }}
        >
          {stack}
        </div>

        {/* Bottom rule */}
        <div
          style={{
            position: 'absolute',
            bottom: '80px',
            left: '80px',
            right: '80px',
            height: '1px',
            background: 'rgba(255,255,255,0.1)',
          }}
        />
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
