'use client'

import { useEffect, useRef } from 'react'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useTheme } from '@/components/layout/ThemeProvider'

const THEME_COLORS = {
  light: { a: [0.388, 0.400, 0.945] as const, b: [0.647, 0.706, 0.988] as const },
  dark:  { a: [0.263, 0.220, 0.792] as const, b: [0.388, 0.400, 0.945] as const },
}

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
  uniform float uTime;
  uniform vec2  uMouse;
  uniform vec3  uColorA;
  uniform vec3  uColorB;
  varying vec2  vUv;

  vec3 mod289v3(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289v2(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289v3(((x * 34.0) + 1.0) * x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1  = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289v2(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m; m = m*m;
    vec3 x  = 2.0 * fract(p * C.www) - 1.0;
    vec3 h  = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 uv = vUv;
    vec2 mi = uMouse * 0.15;
    float n1 = snoise(uv * 2.5 + uTime * 0.08 + mi);
    float n2 = snoise(uv * 4.0 - uTime * 0.05 + mi * 1.5);
    float n3 = snoise(uv * 1.5 + uTime * 0.03);
    float combined = (n1 * 0.5 + n2 * 0.3 + n3 * 0.2) * 0.5 + 0.5;
    vec3 color = mix(uColorA, uColorB, combined);
    gl_FragColor = vec4(color, 0.06);
  }
`

export default function ShaderBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isTablet = useMediaQuery('(min-width: 768px)')
  const prefersReduced = useMediaQuery('(prefers-reduced-motion: reduce)')
  const { theme } = useTheme()
  const themeRef = useRef(theme)

  useEffect(() => { themeRef.current = theme }, [theme])

  useEffect(() => {
    if (!containerRef.current || !isTablet || prefersReduced) return

    let cancelled = false
    let rafId: number
    let dispose: (() => void) | null = null

    const delayTimer = setTimeout(() => {
    if (cancelled || !containerRef.current) return

    import('three').then((THREE) => {
      if (cancelled || !containerRef.current) return

      const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: 'low-power' })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setClearColor(0x000000, 0)
      containerRef.current.appendChild(renderer.domElement)

      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
      const scene  = new THREE.Scene()

      const cols = THEME_COLORS[themeRef.current]
      const uniforms = {
        uTime:   { value: 0 },
        uMouse:  { value: new THREE.Vector2(0, 0) },
        uColorA: { value: new THREE.Vector3(cols.a[0], cols.a[1], cols.a[2]) },
        uColorB: { value: new THREE.Vector3(cols.b[0], cols.b[1], cols.b[2]) },
      }

      const geometry = new THREE.PlaneGeometry(2, 2)
      const material = new THREE.ShaderMaterial({ vertexShader, fragmentShader, uniforms, transparent: true, depthWrite: false })
      scene.add(new THREE.Mesh(geometry, material))

      const mouse = { x: 0, y: 0 }
      function onMouseMove(e: MouseEvent) {
        mouse.x = (e.clientX / window.innerWidth)  *  2 - 1
        mouse.y = (e.clientY / window.innerHeight) * -2 + 1
      }
      window.addEventListener('mousemove', onMouseMove, { passive: true })

      const t0 = Date.now()
      function tick() {
        rafId = requestAnimationFrame(tick)
        uniforms.uTime.value = (Date.now() - t0) / 1000
        uniforms.uMouse.value.x += (mouse.x - uniforms.uMouse.value.x) * 0.05
        uniforms.uMouse.value.y += (mouse.y - uniforms.uMouse.value.y) * 0.05
        const c = THEME_COLORS[themeRef.current]
        uniforms.uColorA.value.set(c.a[0], c.a[1], c.a[2])
        uniforms.uColorB.value.set(c.b[0], c.b[1], c.b[2])
        renderer.render(scene, camera)
      }
      tick()

      dispose = () => {
        cancelAnimationFrame(rafId)
        window.removeEventListener('mousemove', onMouseMove)
        geometry.dispose()
        material.dispose()
        renderer.dispose()
        renderer.domElement.remove()
      }
    })

    }, 3000)

    return () => {
      cancelled = true
      clearTimeout(delayTimer)
      dispose?.()
    }
  }, [isTablet, prefersReduced])

  if (!isTablet || prefersReduced) return null

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    />
  )
}
