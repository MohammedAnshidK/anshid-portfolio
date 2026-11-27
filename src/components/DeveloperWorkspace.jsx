import { Code2, Database, Layers, Server, Terminal } from 'lucide-react'
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'motion/react'

const CODE_LINES = [
  {
    num: '01',
    tokens: [
      { text: 'const ', cls: 'text-white/55' },
      { text: 'developer', cls: 'text-accent' },
      { text: ' = {', cls: 'text-white/75' },
    ],
  },
  {
    num: '02',
    tokens: [
      { text: '  name: ', cls: 'text-white/55' },
      { text: "'Mohammed Anshid'", cls: 'text-white' },
      { text: ',', cls: 'text-white/60' },
    ],
  },
  {
    num: '03',
    tokens: [
      { text: '  role: ', cls: 'text-white/55' },
      { text: "'Aspiring MERN Stack Developer'", cls: 'text-white' },
      { text: ',', cls: 'text-white/60' },
    ],
  },
  {
    num: '04',
    tokens: [
      { text: '  location: ', cls: 'text-white/55' },
      { text: "'Kerala, India'", cls: 'text-white' },
      { text: ',', cls: 'text-white/60' },
    ],
  },
  {
    num: '05',
    tokens: [
      { text: '  stack: [', cls: 'text-white/55' },
      { text: "'HTML'", cls: 'text-accent' },
      { text: ', ', cls: 'text-white/60' },
      { text: "'CSS'", cls: 'text-accent' },
      { text: ',', cls: 'text-white/60' },
    ],
  },
  {
    num: '06',
    tokens: [
      { text: '    ', cls: '' },
      { text: "'JavaScript'", cls: 'text-accent' },
      { text: ', ', cls: 'text-white/60' },
      { text: "'React'", cls: 'text-accent' },
      { text: '],', cls: 'text-white/55' },
    ],
  },
  {
    num: '07',
    tokens: [
      { text: '  learning: [', cls: 'text-white/55' },
      { text: "'Node.js'", cls: 'text-emerald-300' },
      { text: ',', cls: 'text-white/60' },
    ],
  },
  {
    num: '08',
    tokens: [
      { text: '    ', cls: '' },
      { text: "'Express.js'", cls: 'text-emerald-300' },
      { text: ', ', cls: 'text-white/60' },
      { text: "'MongoDB'", cls: 'text-emerald-300' },
      { text: '],', cls: 'text-white/55' },
    ],
  },
  {
    num: '09',
    tokens: [{ text: '}', cls: 'text-white/75' }],
  },
]

const FLOATING_BADGES = [
  {
    label: 'React',
    sublabel: 'UI Architecture',
    icon: Code2,
    position: '-top-5 right-3 sm:-top-6 sm:right-6',
    delay: 0.25,
    floatOffset: [-4, 4, -4],
    duration: 4.8,
  },
  {
    label: 'JavaScript',
    sublabel: 'ES6+ & DOM',
    icon: Terminal,
    position: '-bottom-6 left-2 sm:-bottom-7 sm:left-4',
    delay: 0.4,
    floatOffset: [4, -4, 4],
    duration: 5.4,
  },
  {
    label: 'MERN Path',
    sublabel: 'Node · Express · MongoDB',
    icon: Database,
    position: '-bottom-6 right-2 sm:-bottom-7 sm:right-6',
    delay: 0.55,
    floatOffset: [-4, 5, -4],
    duration: 5.1,
  },
]

function DeveloperWorkspace({ scrollParallaxY }) {
  const shouldReduceMotion = useReducedMotion()

  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)

  const smoothX = useSpring(pointerX, { stiffness: 120, damping: 20 })
  const smoothY = useSpring(pointerY, { stiffness: 120, damping: 20 })

  const tiltX = useTransform(smoothY, [-0.5, 0.5], [4, -4])
  const tiltY = useTransform(smoothX, [-0.5, 0.5], [-5, 5])
  const layerShiftX = useTransform(smoothX, [-0.5, 0.5], [-10, 10])
  const layerShiftY = useTransform(smoothY, [-0.5, 0.5], [-10, 10])

  const handlePointerMove = (event) => {
    if (shouldReduceMotion) return
    const rect = event.currentTarget.getBoundingClientRect()
    const normalizedX = (event.clientX - rect.left) / rect.width - 0.5
    const normalizedY = (event.clientY - rect.top) / rect.height - 0.5
    pointerX.set(normalizedX)
    pointerY.set(normalizedY)
  }

  const handlePointerLeave = () => {
    pointerX.set(0)
    pointerY.set(0)
  }

  return (
    <motion.div
      style={shouldReduceMotion ? undefined : { y: scrollParallaxY }}
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.75, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative mx-auto w-full max-w-lg py-6 sm:px-4 sm:py-8 lg:py-10"
    >
      {/* Animated Ambient Green Glow */}
      <motion.div
        aria-hidden="true"
        animate={
          shouldReduceMotion
            ? undefined
            : {
                scale: [1, 1.08, 1],
                opacity: [0.35, 0.55, 0.35],
              }
        }
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute -inset-6 rounded-full bg-[radial-gradient(circle_at_center,rgba(182,255,92,0.18)_0%,rgba(182,255,92,0.05)_45%,transparent_72%)] blur-2xl"
      />

      {/* Layered Background Frame */}
      <motion.div
        aria-hidden="true"
        style={
          shouldReduceMotion
            ? undefined
            : { x: layerShiftX, y: layerShiftY }
        }
        className="pointer-events-none absolute inset-4 rounded-3xl border border-accent/15 bg-gradient-to-br from-accent/[0.06] via-transparent to-white/[0.02]"
      />

      {/* Floating Main Editor Window */}
      <motion.div
        style={
          shouldReduceMotion
            ? undefined
            : {
                rotateX: tiltX,
                rotateY: tiltY,
                transformPerspective: 1000,
              }
        }
        animate={shouldReduceMotion ? undefined : { y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="relative rounded-2xl border border-white/12 bg-[#101014]/90 shadow-[0_24px_80px_rgba(0,0,0,0.75)] backdrop-blur-xl"
      >
        {/* Subtle top rim highlight */}
        <div
          aria-hidden="true"
          className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent"
        />

        {/* Window Title Bar */}
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-accent/80" />
          </div>

          <span className="font-mono text-[11px] tracking-wider text-white/50">
            anshid.profile.js
          </span>

          <div className="inline-flex items-center gap-1 rounded-full border border-accent/25 bg-accent/10 px-2 py-0.5 text-[10px] font-medium text-accent">
            <Layers className="h-3 w-3" aria-hidden="true" />
            <span>MERN</span>
          </div>
        </div>

        {/* Syntax-Highlighted Code Body */}
        <div className="px-3.5 py-5 font-mono text-[11px] leading-6 sm:px-5 sm:text-[13px]">
          {CODE_LINES.map((line) => (
            <div key={line.num} className="flex items-start gap-2.5 sm:gap-4">
              <span
                aria-hidden="true"
                className="w-4 shrink-0 select-none text-right text-white/25 sm:w-5"
              >
                {line.num}
              </span>
              <code className="min-w-0 flex-1 whitespace-pre-wrap break-words">
                {line.tokens.map((token, idx) => (
                  <span key={idx} className={token.cls}>
                    {token.text}
                  </span>
                ))}
              </code>
            </div>
          ))}
        </div>

        {/* Editor Status Footer */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/10 px-4 py-2.5 text-[11px] text-white/50">
          <div className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-accent"
            />
            <span>HTML · CSS · JS · React</span>
          </div>
          <div className="flex items-center gap-1.5 text-white/60">
            <Server className="h-3 w-3 text-accent" aria-hidden="true" />
            <span>Learning Backend</span>
          </div>
        </div>
      </motion.div>

      {/* Floating Technology Badges */}
      {FLOATING_BADGES.map((badge) => {
        const BadgeIcon = badge.icon

        return (
          <motion.div
            key={badge.label}
            aria-hidden="true"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={
              shouldReduceMotion
                ? { opacity: 1, scale: 1 }
                : {
                    opacity: 1,
                    scale: 1,
                    y: badge.floatOffset,
                  }
            }
            transition={
              shouldReduceMotion
                ? { duration: 0.4, delay: badge.delay }
                : {
                    opacity: { duration: 0.45, delay: badge.delay },
                    scale: { duration: 0.45, delay: badge.delay },
                    y: {
                      duration: badge.duration,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: badge.delay,
                    },
                  }
            }
            className={`pointer-events-none absolute z-10 hidden items-center gap-2.5 rounded-xl border border-white/12 bg-[#121217]/90 px-3 py-2 shadow-[0_12px_32px_rgba(0,0,0,0.6)] backdrop-blur-md sm:flex ${badge.position}`}
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-accent/25 bg-accent/10 text-accent">
              <BadgeIcon className="h-3.5 w-3.5" />
            </div>
            <div className="leading-tight">
              <p className="text-xs font-semibold text-foreground">
                {badge.label}
              </p>
              <p className="text-[10px] text-white/55">{badge.sublabel}</p>
            </div>
          </motion.div>
        )
      })}
    </motion.div>
  )
}

export default DeveloperWorkspace
