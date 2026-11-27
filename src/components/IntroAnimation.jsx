import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'

// Deterministic pseudo-positions so SSR / hydration stay stable
const SYMBOLS = [
  { char: '{', x: 12, y: 18, size: 14, delay: 0 },
  { char: '()', x: 28, y: 72, size: 11, delay: 0.08 },
  { char: '=>', x: 55, y: 15, size: 12, delay: 0.14 },
  { char: '</>', x: 72, y: 68, size: 13, delay: 0.06 },
  { char: '}', x: 88, y: 25, size: 14, delay: 0.1 },
  { char: '[]', x: 8, y: 52, size: 10, delay: 0.18 },
  { char: ';', x: 42, y: 85, size: 15, delay: 0.04 },
  { char: '&&', x: 65, y: 44, size: 11, delay: 0.12 },
  { char: '#', x: 82, y: 82, size: 10, delay: 0.16 },
  { char: '=', x: 20, y: 36, size: 13, delay: 0.09 },
]

const PARTICLES = [
  { x: 22, y: 28 }, { x: 45, y: 15 }, { x: 68, y: 35 },
  { x: 15, y: 60 }, { x: 50, y: 55 }, { x: 80, y: 20 },
  { x: 35, y: 78 }, { x: 70, y: 75 }, { x: 90, y: 50 },
  { x: 5,  y: 42 }, { x: 58, y: 88 }, { x: 92, y: 68 },
]

const SESSION_KEY = 'anshid_intro_played'

// Compute once on module evaluation — before any render
function shouldSkip() {
  if (typeof window === 'undefined') return true
  return Boolean(sessionStorage.getItem(SESSION_KEY))
}

export default function IntroAnimation({ onComplete }) {
  const shouldReduceMotion = useReducedMotion()

  // If reduced-motion or already played → start as hidden; never show overlay
  const skip = shouldReduceMotion || shouldSkip()
  const [phase, setPhase] = useState('particles')
  const [visible, setVisible] = useState(!skip)

  useEffect(() => {
    if (skip) {
      onComplete?.()
      return
    }

    // Phase 1: particles + symbols fade in (0 → 0.9s)
    // Phase 2: assemble/converge (0.9s → 1.7s)
    // Phase 3: overlay fades out (1.7s → 2.2s)
    const t1 = setTimeout(() => setPhase('assemble'), 900)
    const t2 = setTimeout(() => {
      setPhase('done')
      setVisible(false)
      sessionStorage.setItem(SESSION_KEY, '1')
      onComplete?.()
    }, 2200)

    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [skip, onComplete])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro"
          aria-hidden="true"  // decorative overlay — not blocking content
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-background"
        >
          {/* Ambient center glow */}
          <motion.div
            animate={
              phase === 'assemble'
                ? { scale: [1, 1.4, 0.6], opacity: [0.5, 0.8, 0] }
                : { scale: [0.8, 1, 0.8], opacity: [0.3, 0.5, 0.3] }
            }
            transition={
              phase === 'assemble'
                ? { duration: 0.8, ease: 'easeInOut' }
                : { duration: 2, repeat: Infinity, ease: 'easeInOut' }
            }
            className="absolute h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(182,255,92,0.22)_0%,transparent_70%)] blur-3xl"
          />

          {/* Floating particles */}
          {PARTICLES.map((p, i) => (
            <motion.span
              key={`p-${i}`}
              initial={{ opacity: 0, scale: 0 }}
              animate={
                phase === 'assemble'
                  ? { opacity: 0, scale: 0, x: '50vw', y: '50vh' }
                  : { opacity: [0, 0.7, 0.5], scale: [0, 1, 0.8] }
              }
              transition={{
                duration: phase === 'assemble' ? 0.5 : 0.6,
                delay: phase === 'assemble' ? i * 0.015 : i * 0.05,
                ease: 'easeInOut',
              }}
              className="absolute h-1 w-1 rounded-full bg-accent"
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
            />
          ))}

          {/* Code symbols */}
          {SYMBOLS.map((s, i) => (
            <motion.span
              key={`s-${i}`}
              initial={{ opacity: 0, y: 12 }}
              animate={
                phase === 'assemble'
                  ? { opacity: 0, scale: 1.6, y: -8 }
                  : { opacity: [0, 0.45, 0.3], y: [12, 0, 4] }
              }
              transition={{
                duration: phase === 'assemble' ? 0.4 : 0.7,
                delay: phase === 'assemble' ? i * 0.02 : s.delay,
                ease: 'easeInOut',
              }}
              className="pointer-events-none absolute select-none font-mono text-accent/70"
              style={{
                left: `${s.x}%`,
                top: `${s.y}%`,
                fontSize: `${s.size}px`,
              }}
            >
              {s.char}
            </motion.span>
          ))}

          {/* Central brand text */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={
              phase === 'assemble'
                ? { opacity: [1, 1, 0], scale: [1, 1.08, 0.95] }
                : { opacity: 1, scale: 1 }
            }
            transition={
              phase === 'assemble'
                ? { duration: 0.8, times: [0, 0.5, 1], ease: 'easeInOut' }
                : { duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }
            }
            className="relative flex flex-col items-center gap-2"
          >
            <span className="font-mono text-xs tracking-[0.4em] text-white/40 uppercase">
              Loading Experience
            </span>
            <span className="text-3xl font-bold tracking-[0.2em] text-foreground sm:text-4xl">
              ANSHID
              <span className="ml-1 inline-block h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_12px_rgba(182,255,92,0.8)]" />
            </span>
            <span className="font-mono text-xs tracking-widest text-accent/80">
              {'</ dev >'}
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
