'use client'

const ORBIT_DEGREES = [0, 60, 120, 180, 240, 300]

export default function CssSphereBackground() {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 20%, var(--background) 75%)',
        }}
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center"
        aria-hidden="true"
      >
        <div
          style={{
            width: 'min(80vw, 420px)',
            height: 'min(80vw, 420px)',
            borderRadius: '50%',
            position: 'relative',
            border: '1px solid rgba(99,102,241,0.2)',
            background:
              'radial-gradient(circle at 35% 35%, rgba(99,102,241,0.1), transparent 65%)',
            animation: 'spin-slow 30s linear infinite',
            opacity: 0.7,
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: '8%',
              borderRadius: '50%',
              border: '1px solid rgba(99,102,241,0.15)',
              animation: 'spin-slow 20s linear infinite reverse',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: '20%',
              borderRadius: '50%',
              border: '1px solid rgba(99,102,241,0.1)',
              animation: 'spin-slow 15s linear infinite',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: '35%',
              borderRadius: '50%',
              border: '1px solid rgba(99,102,241,0.08)',
              animation: 'spin-slow 10s linear infinite reverse',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: '46%',
              borderRadius: '50%',
              background: 'rgba(99,102,241,0.25)',
              animation: 'pulse-glow 3s ease-in-out infinite',
            }}
          />
          {ORBIT_DEGREES.map(deg => (
            <div
              key={deg}
              style={{
                position: 'absolute',
                width: 4,
                height: 4,
                borderRadius: '50%',
                background: 'rgba(99,102,241,0.4)',
                top: '50%',
                left: '50%',
                transform: `rotate(${deg}deg) translateX(min(38vw, 195px)) translate(-50%, -50%)`,
                animation: `pulse-glow ${2 + deg / 100}s ease-in-out infinite`,
              }}
            />
          ))}
        </div>
      </div>
    </>
  )
}
