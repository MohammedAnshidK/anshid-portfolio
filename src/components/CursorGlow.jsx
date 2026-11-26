import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import { useEffect, useState } from 'react'

/**
 * CursorGlow — a single blurred radial glow that smoothly follows the mouse.
 * - Desktop/fine-pointer only (hidden on touch devices via CSS).
 * - Completely skipped when prefers-reduced-motion is set.
 * - GPU-friendly: uses transform (translate) only, not top/left.
 * - pointer-events: none so it never blocks clicks.
 */
export default function CursorGlow() {
  const shouldReduceMotion = useReducedMotion()
  const [isVisible, setIsVisible] = useState(false)

  const mouseX = useMotionValue(-400)
  const mouseY = useMotionValue(-400)

  const x = useSpring(mouseX, { stiffness: 100, damping: 20, mass: 0.5 })
  const y = useSpring(mouseY, { stiffness: 100, damping: 20, mass: 0.5 })

  useEffect(() => {
    if (shouldReduceMotion) return

    const onMove = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    const onLeave = () => setIsVisible(false)

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerleave', onLeave, { passive: true })

    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerleave', onLeave)
    }
  }, [shouldReduceMotion, mouseX, mouseY, isVisible])

  if (shouldReduceMotion) return null

  return (
    <motion.div
      aria-hidden="true"
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      // Hidden on touch / coarse-pointer devices via Tailwind's pointer:coarse variant isn't available,
      // so we use a CSS class added in globals.css via @media (pointer: coarse)
      className="cursor-glow pointer-events-none fixed left-0 top-0 z-[100] h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(182,255,92,0.07)_0%,transparent_70%)] blur-3xl will-change-transform"
      style={{ x, y }}
    />
  )
}
