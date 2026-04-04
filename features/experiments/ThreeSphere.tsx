'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three-stdlib'

interface ThreeSphereProps {
  interactive?: boolean
}

export default function ThreeSphere({ interactive = true }: ThreeSphereProps) {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const size = interactive ? 400 : 500

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
    camera.position.z = 5

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(size, size)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    mountRef.current.appendChild(renderer.domElement)

    // Outer wireframe sphere
    const outerGeometry = new THREE.SphereGeometry(2, 32, 32)
    const outerMaterial = new THREE.MeshBasicMaterial({
      color: 0x6366f1,
      wireframe: true,
      opacity: 0.4,
      transparent: true,
    })
    const outerSphere = new THREE.Mesh(outerGeometry, outerMaterial)
    scene.add(outerSphere)

    // Inner solid sphere
    const innerGeometry = new THREE.SphereGeometry(1.5, 16, 16)
    const innerMaterial = new THREE.MeshBasicMaterial({
      color: 0x6366f1,
      wireframe: false,
      opacity: 0.05,
      transparent: true,
    })
    const innerSphere = new THREE.Mesh(innerGeometry, innerMaterial)
    scene.add(innerSphere)

    // Orbital ring
    const ringGeometry = new THREE.TorusGeometry(2.8, 0.005, 16, 100)
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x818cf8,
      opacity: 0.3,
      transparent: true,
    })
    const ring = new THREE.Mesh(ringGeometry, ringMaterial)
    ring.rotation.x = Math.PI / 3
    scene.add(ring)

    // Particles
    const particlesGeometry = new THREE.BufferGeometry()
    const particleCount = 200
    const positions = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 2.2 + Math.random() * 0.8
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const particlesMaterial = new THREE.PointsMaterial({
      color: 0x818cf8,
      size: 0.03,
      transparent: true,
      opacity: 0.6,
    })
    const particles = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particles)

    // OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.enableZoom = interactive
    controls.enableRotate = interactive
    controls.enablePan = false
    controls.autoRotate = !prefersReduced
    controls.autoRotateSpeed = interactive ? 0.5 : 1.2

    let idleTimer: ReturnType<typeof setTimeout>

    if (interactive) {
      function onStart() { controls.autoRotate = false }
      function onEnd() {
        clearTimeout(idleTimer)
        idleTimer = setTimeout(() => { controls.autoRotate = true }, 3000)
      }
      controls.addEventListener('start', onStart)
      controls.addEventListener('end', onEnd)
    }

    let animationId: number
    function animate() {
      animationId = requestAnimationFrame(animate)
      if (!prefersReduced) {
        ring.rotation.z += 0.002
        particles.rotation.y -= 0.001
      }
      controls.update()
      renderer.render(scene, camera)
    }
    animate()

    const mount = mountRef.current

    return () => {
      cancelAnimationFrame(animationId)
      clearTimeout(idleTimer)
      controls.dispose()
      outerGeometry.dispose()
      outerMaterial.dispose()
      innerGeometry.dispose()
      innerMaterial.dispose()
      ringGeometry.dispose()
      ringMaterial.dispose()
      particlesGeometry.dispose()
      particlesMaterial.dispose()
      renderer.dispose()
      mount?.removeChild(renderer.domElement)
    }
  }, [interactive])

  const size = interactive ? 400 : 500

  return (
    <div
      ref={mountRef}
      style={{ width: size, height: size }}
      aria-hidden="true"
    />
  )
}
