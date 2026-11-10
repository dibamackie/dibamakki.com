'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, useAnimations, useGLTF } from '@react-three/drei'
import { Component, Suspense, useEffect, useRef } from 'react'
import * as THREE from 'three'

function Flamingo() {
  const group = useRef()
  const { viewport } = useThree()
  const { scene, animations } = useGLTF('/models/Flamingo.glb')
  const { actions } = useAnimations(animations, group)
  const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // Bigger on wide (landscape) screens; phones and portrait tablets keep the original size.
  const scale = viewport.aspect >= 1 ? .021 : .015
  // How far the head sticks out to the right of the bird's position, in scene units. On narrow screens the
  // bird is placed so the head stays visible and the trailing legs run off the left edge instead.
  // It is measured from the rendered bird on the first frame: the geometry's own bounding box also
  // includes every animation frame and overstates it. The head reaches ~100 model units, used until then.
  const headReach = useRef(100 * scale)
  const measured = useRef(null)

  useEffect(() => {
    const action = Object.values(actions)[0]
    action?.reset().fadeIn(.4).play()
    scene.traverse((object) => { if (object.isMesh) { object.castShadow = true; object.receiveShadow = true } })
    return () => action?.fadeOut(.2)
  }, [actions, scene])

  useFrame((state) => {
    if (!group.current) return
    if (measured.current !== scale) {
      const box = new THREE.Box3().setFromObject(group.current, true)
      if (Number.isFinite(box.max.x)) headReach.current = box.max.x - group.current.position.x
      measured.current = scale
    }
    if (reduce) return
    const t = state.clock.getElapsedTime()
    const introDuration = 3.8
    const intro = Math.min(t / introDuration, 1)
    const cruiseTime = Math.max(t - introDuration, 0)
    const halfWidth = viewport.width / 2
    const drift = Math.min(.45, Math.max(.12, viewport.width * .06))
    // Rest far enough from the right edge that the head stays on screen even at the far end of the drift.
    const restX = Math.min(halfWidth - headReach.current - drift - .15, 1.2)
    const startX = -halfWidth - headReach.current - .3
    const cruiseX = restX + Math.sin(cruiseTime * .22) * drift
    group.current.position.x = THREE.MathUtils.lerp(startX, cruiseX, easeOut(intro))
    // Sit a little lower on wide screens so the bigger wings clear the menu bar on the upstroke.
    group.current.position.y = (viewport.aspect >= 1 ? .1 : .35) + Math.sin(t * 1.15) * .16
    group.current.rotation.z = Math.sin(t * .75) * .035
  })

  const stillX = Math.min(-1, viewport.width / 2 - headReach.current - .1)
  return <group ref={group} position={reduce ? [stillX, .3, 0] : [-viewport.width / 2 - headReach.current - .3, .4, 0]} rotation={[0, Math.PI / 2, 0]} scale={scale}><primitive object={scene} /></group>
}

function CameraRig() {
  const { camera } = useThree()
  const cameraRef = useRef(camera)
  useFrame(() => {
    const scroll = window.scrollY / Math.max(document.body.scrollHeight - innerHeight, 1)
    const target = 6.3 + scroll * 1.7
    cameraRef.current.position.z = THREE.MathUtils.lerp(cameraRef.current.position.z, target, .035)
  })
  return null
}

function easeOut(x) { return 1 - Math.pow(1 - x, 3) }

export default function FlamingoCanvas() {
  return <SceneErrorBoundary><Canvas fallback={<SceneFallback />} camera={{ position: [0, .2, 6.3], fov: 36 }} dpr={[1, 1.35]} gl={{ alpha: true, antialias: true, powerPreference: 'default' }} shadows="basic">
    <hemisphereLight args={['#dff7ff', '#f29aa8', 2.5]} />
    <directionalLight position={[4, 7, 5]} intensity={3.2} color="#fff6e8" castShadow shadow-mapSize={[512, 512]} />
    <Suspense fallback={null}><Float speed={1.1} rotationIntensity={.08} floatIntensity={.2}><Flamingo /></Float></Suspense>
    <CameraRig />
  </Canvas></SceneErrorBoundary>
}

function SceneFallback() {
  return <div className="scene-fallback" aria-hidden="true"><span>✦</span></div>
}

class SceneErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { failed: false } }
  static getDerivedStateFromError() { return { failed: true } }
  componentDidCatch(error) { console.warn('The 3D scene is unavailable; using the lightweight fallback.', error) }
  render() { return this.state.failed ? <SceneFallback /> : this.props.children }
}

useGLTF.preload('/models/Flamingo.glb')
