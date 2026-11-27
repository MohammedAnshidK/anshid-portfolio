import { useEffect, useRef, useState } from 'react'
import {
  ArrowUpRight,
  Clock,
  Code2,
  HeartPulse,
  Lightbulb,
  Rocket,
  Search,
  Sparkles,
  Terminal,
  X,
} from 'lucide-react'
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react'

const EASE_OUT_EXPO = [0.22, 1, 0.36, 1]
const VIEWPORT_CONFIG = { once: true, amount: 0.15 }

const LENS_SIZE = 168
const LENS_RADIUS = LENS_SIZE / 2
const LENS_SCALE = 1.32

const SUBTITLE_WORDS = [
  'An',
  'honest',
  'showcase',
  'of',
  'what',
  "I'm",
  'building,',
  'planning,',
  'and',
  'exploring',
  'next',
  'on',
  'my',
  'path',
  'as',
  'a',
  'MERN',
  'stack',
  'developer.',
]

const STATUS_CONFIG = {
  building: {
    label: 'Currently Building',
    icon: Rocket,
    classes: 'border-accent/35 bg-accent/10 text-accent',
    dot: 'bg-accent',
  },
  planning: {
    label: 'Idea / Planning',
    icon: Lightbulb,
    classes: 'border-blue-400/35 bg-blue-500/10 text-blue-300',
    dot: 'bg-blue-400',
  },
  soon: {
    label: 'Coming Soon',
    icon: Clock,
    classes: 'border-violet-400/30 bg-violet-500/10 text-violet-200',
    dot: 'bg-violet-300',
  },
}

const PROJECTS = [
  {
    id: 'portfolio',
    number: '01',
    titleLead: 'Personal',
    titleItalic: 'Portfolio',
    status: 'building',
    description:
      'My personal developer portfolio built to showcase my skills, learning journey and projects.',
    techLabel: 'Technologies',
    tech: ['React', 'Vite', 'Tailwind CSS', 'Motion'],
    highlights: [
      'Dark futuristic interface (#09090B) with neon lime (#B6FF5C) design tokens',
      'Interactive skills inspector, terminal contact console, and smooth scroll navigation',
      'Built with accessibility, keyboard navigation, and reduced-motion support',
    ],
    icon: Code2,
    reversed: false,
    atmosphere:
      'bg-[radial-gradient(ellipse_at_top_right,rgba(88,101,242,0.2),rgba(124,131,255,0.14)_45%,transparent_75%)]',
  },
  {
    id: 'healthcare',
    number: '02',
    titleLead: 'Healthcare',
    titleItalic: 'Platform',
    status: 'planning',
    description:
      'A healthcare ecosystem concept designed to connect patients, family members, caregivers, doctors and hospitals.',
    techLabel: 'Planned Technologies',
    tech: ['MERN Stack (Planned)'],
    highlights: [
      'Concept focused on bridging communication between patients, family caregivers, and care teams',
      'Early-stage architecture planning for coordination across doctors and hospitals',
      'Planned full-stack implementation using MongoDB, Express.js, React, and Node.js',
    ],
    icon: HeartPulse,
    reversed: true,
    atmosphere:
      'bg-[radial-gradient(ellipse_at_bottom_left,rgba(124,131,255,0.2),rgba(88,101,242,0.16)_45%,transparent_75%)]',
  },
  {
    id: 'coming-soon',
    number: '03',
    titleLead: 'More Projects',
    titleItalic: 'Coming Soon',
    status: 'soon',
    description:
      'More experiments coming soon. Continuously learning and building practical web applications as I grow my MERN stack skills.',
    techLabel: 'Focus',
    tech: ['Node.js', 'Express.js', 'MongoDB'],
    highlights: [
      'Focusing on hands-on full-stack fundamentals and clean API design',
      'New practical projects will be added here as they are built',
    ],
    icon: Sparkles,
    reversed: false,
    atmosphere:
      'bg-[radial-gradient(ellipse_at_center,rgba(124,131,255,0.18),rgba(88,101,242,0.14)_45%,transparent_75%)]',
  },
]

const FLOATING_SYMBOLS = [
  { symbol: '</>', pos: 'top-4 right-4', delay: 0 },
  { symbol: '{ }', pos: 'bottom-4 left-4', delay: 0.4 },
  { symbol: '=>', pos: 'bottom-4 right-5', delay: 0.8 },
]

const HEALTHCARE_NODES = [
  { label: 'Patients', pos: 'left-4 top-4', x1: 52, y1: 42, delay: 0 },
  { label: 'Family', pos: 'right-4 top-4', x1: 188, y1: 42, delay: 0.15 },
  { label: 'Doctors', pos: 'left-4 bottom-4', x1: 52, y1: 128, delay: 0.3 },
  { label: 'Hospitals', pos: 'right-4 bottom-4', x1: 188, y1: 128, delay: 0.45 },
]

const PLACEHOLDER_PARTICLES = [
  { left: '16%', top: '24%', delay: 0 },
  { left: '78%', top: '20%', delay: 0.5 },
  { left: '26%', top: '76%', delay: 0.9 },
  { left: '82%', top: '72%', delay: 0.3 },
]

function useIsCoarsePointer() {
  const [isCoarse] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(pointer: coarse)').matches
      : false
  )
  return isCoarse
}

function MagneticCue({ children, disabled }) {
  const ref = useRef(null)
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, { stiffness: 320, damping: 22 })
  const y = useSpring(rawY, { stiffness: 320, damping: 22 })

  const handleMove = (e) => {
    if (disabled || !ref.current || e.pointerType === 'touch') return
    const rect = ref.current.getBoundingClientRect()
    rawX.set((e.clientX - (rect.left + rect.width / 2)) * 0.2)
    rawY.set((e.clientY - (rect.top + rect.height / 2)) * 0.2)
  }

  const handleLeave = () => {
    rawX.set(0)
    rawY.set(0)
  }

  return (
    <motion.span
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={disabled ? undefined : { x, y }}
      className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 font-mono text-xs font-medium text-white/85 transition-colors duration-200 group-hover:border-accent/55 group-hover:bg-accent/10 group-hover:text-accent"
    >
      {children}
    </motion.span>
  )
}

function InteractiveCard({ children, className, disablePointerFx, atmosphere }) {
  const ref = useRef(null)

  const normX = useMotionValue(0)
  const normY = useMotionValue(0)
  const pxX = useMotionValue(-400)
  const pxY = useMotionValue(-400)
  const [isHovered, setIsHovered] = useState(false)

  const smoothNormX = useSpring(normX, { stiffness: 220, damping: 26 })
  const smoothNormY = useSpring(normY, { stiffness: 220, damping: 26 })

  const rotateX = useSpring(useTransform(normY, [-0.5, 0.5], [3.5, -3.5]), {
    stiffness: 260,
    damping: 28,
  })
  const rotateY = useSpring(useTransform(normX, [-0.5, 0.5], [-4.5, 4.5]), {
    stiffness: 260,
    damping: 28,
  })

  // Multi-layer 3D depth parallax transforms (background -> visual -> foreground)
  const bgLayerX = useTransform(smoothNormX, [-0.5, 0.5], [14, -14])
  const bgLayerY = useTransform(smoothNormY, [-0.5, 0.5], [14, -14])
  const visualLayerX = useTransform(smoothNormX, [-0.5, 0.5], [-6, 6])
  const visualLayerY = useTransform(smoothNormY, [-0.5, 0.5], [-6, 6])
  const textLayerX = useTransform(smoothNormX, [-0.5, 0.5], [-3, 3])
  const textLayerY = useTransform(smoothNormY, [-0.5, 0.5], [-3, 3])

  const spotlight = useMotionTemplate`radial-gradient(400px circle at ${pxX}px ${pxY}px, rgba(182, 255, 92, 0.11), rgba(88, 101, 242, 0.1) 45%, rgba(124, 131, 255, 0.05) 62%, transparent 74%)`

  const handleMove = (e) => {
    if (disablePointerFx || !ref.current || e.pointerType === 'touch') return
    const rect = ref.current.getBoundingClientRect()
    const localX = e.clientX - rect.left
    const localY = e.clientY - rect.top
    pxX.set(localX)
    pxY.set(localY)
    normX.set(localX / rect.width - 0.5)
    normY.set(localY / rect.height - 0.5)
    setIsHovered((prev) => (prev ? prev : true))
  }

  const handleLeave = () => {
    normX.set(0)
    normY.set(0)
    setIsHovered(false)
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      whileHover={disablePointerFx ? undefined : { y: -4 }}
      whileTap={disablePointerFx ? { scale: 0.99 } : { scale: 0.994 }}
      transition={{ type: 'spring', stiffness: 320, damping: 26 }}
      style={
        disablePointerFx
          ? undefined
          : { rotateX, rotateY, transformPerspective: 1150 }
      }
      className={className}
    >
      {/* Layer 1: Background Gradient Layer with Counter-Parallax */}
      <motion.div
        aria-hidden="true"
        style={disablePointerFx ? undefined : { x: bgLayerX, y: bgLayerY }}
        className={`pointer-events-none absolute -inset-4 opacity-75 transition-opacity duration-500 group-hover:opacity-100 ${atmosphere}`}
      />

      {/* Animated Gradient Border Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-3xl border border-white/0 transition-colors duration-300 group-hover:border-accent/35"
      />

      {/* Cursor-Following Card Spotlight */}
      {!disablePointerFx && (
        <motion.div
          aria-hidden="true"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.25 }}
          style={{ background: spotlight }}
          className="pointer-events-none absolute inset-0 rounded-3xl"
        />
      )}

      {children({
        visualLayerStyle: disablePointerFx
          ? undefined
          : { x: visualLayerX, y: visualLayerY },
        textLayerStyle: disablePointerFx
          ? undefined
          : { x: textLayerX, y: textLayerY },
      })}
    </motion.div>
  )
}

function MagnifyingVisual({ renderVisual, disablePointerFx }) {
  const containerRef = useRef(null)
  const [size, setSize] = useState({ width: 0, height: 0 })
  const [isActive, setIsActive] = useState(false)

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const smoothX = useSpring(rawX, { stiffness: 300, damping: 28, mass: 0.35 })
  const smoothY = useSpring(rawY, { stiffness: 300, damping: 28, mass: 0.35 })

  const lensX = useTransform(smoothX, (v) => v - LENS_RADIUS)
  const lensY = useTransform(smoothY, (v) => v - LENS_RADIUS)
  const cloneX = useTransform(smoothX, (v) => LENS_RADIUS - v * LENS_SCALE)
  const cloneY = useTransform(smoothY, (v) => LENS_RADIUS - v * LENS_SCALE)

  useEffect(() => {
    if (disablePointerFx || !containerRef.current) return

    const update = () => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      setSize({ width: rect.width, height: rect.height })
    }

    update()
    const observer = new ResizeObserver(update)
    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [disablePointerFx])

  const handleMove = (e) => {
    if (disablePointerFx || !containerRef.current || e.pointerType === 'touch') return
    const rect = containerRef.current.getBoundingClientRect()
    rawX.set(e.clientX - rect.left)
    rawY.set(e.clientY - rect.top)
    setIsActive((prev) => (prev ? prev : true))
  }

  const handleLeave = () => {
    setIsActive(false)
  }

  return (
    <div
      ref={containerRef}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className="relative overflow-hidden rounded-2xl border border-white/12 bg-[#0a0c14]"
    >
      {/* Base Visual */}
      <div className="transition-transform duration-500 group-hover:scale-[1.02]">
        {renderVisual(false)}
      </div>

      {/* Desktop Hint Badge */}
      {!disablePointerFx ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-3 bottom-3 z-20 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/60 px-2.5 py-1 font-mono text-[10px] text-white/65 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-0"
        >
          <Search className="h-2.5 w-2.5 text-accent" />
          <span>Hover to magnify</span>
        </span>
      ) : (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-3 bottom-3 z-20 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/60 px-2.5 py-1 font-mono text-[10px] text-white/70 backdrop-blur-md"
        >
          <span>Tap card</span>
        </span>
      )}

      {/* Interactive Circular Magnifying Glass Lens */}
      {!disablePointerFx && size.width > 0 && (
        <motion.div
          aria-hidden="true"
          animate={{
            opacity: isActive ? 1 : 0,
            scale: isActive ? 1 : 0.8,
          }}
          transition={{ duration: 0.18, ease: EASE_OUT_EXPO }}
          style={{
            width: LENS_SIZE,
            height: LENS_SIZE,
            x: lensX,
            y: lensY,
          }}
          className="pointer-events-none absolute top-0 left-0 z-30 overflow-hidden rounded-full border border-white/35 bg-[#080a12]/90 shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_0_24px_rgba(88,101,242,0.34),inset_0_0_12px_rgba(182,255,92,0.24)] backdrop-brightness-115 backdrop-contrast-110 will-change-transform"
        >
          <motion.div
            style={{
              width: size.width,
              height: size.height,
              x: cloneX,
              y: cloneY,
              scale: LENS_SCALE,
              transformOrigin: '0 0',
            }}
            className="pointer-events-none absolute top-0 left-0"
          >
            {renderVisual(true)}
          </motion.div>

          {/* Realistic Specular Reflection & Rim */}
          <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.26)_0%,rgba(139,92,246,0.1)_40%,transparent_66%)]" />
          <div className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-accent/30" />
        </motion.div>
      )}
    </div>
  )
}

function PortfolioVisual({ shouldReduceMotion, isClone = false }) {
  return (
    <div
      aria-hidden="true"
      className="relative flex h-64 items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_25%_20%,rgba(37,99,235,0.24),transparent_55%),radial-gradient(circle_at_80%_80%,rgba(139,92,246,0.2),transparent_55%)] p-6 sm:h-72"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:28px_28px]" />

      {FLOATING_SYMBOLS.map((item) => (
        <motion.span
          key={item.symbol}
          animate={
            isClone || shouldReduceMotion
              ? undefined
              : { y: [-3, 3, -3], opacity: [0.45, 0.85, 0.45] }
          }
          transition={{
            duration: 4.5,
            delay: item.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className={`pointer-events-none absolute font-mono text-xs text-accent/80 ${item.pos}`}
        >
          {item.symbol}
        </motion.span>
      ))}

      <div className="relative z-10 w-full max-w-sm rounded-2xl border border-white/15 bg-[#10121b]/95 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.75)] backdrop-blur-md">
        <div className="mb-3.5 flex items-center justify-between border-b border-white/10 pb-2.5">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
            <span className="h-2.5 w-2.5 rounded-full bg-accent" />
          </div>
          <div className="flex items-center gap-1 font-mono text-[11px] text-white/55">
            <span>anshid.dev</span>
            {!isClone && (
              <motion.span
                animate={shouldReduceMotion ? undefined : { opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="inline-block h-3 w-1 bg-accent"
              />
            )}
          </div>
        </div>

        <div className="grid grid-cols-12 gap-3">
          <div className="col-span-7 space-y-2.5">
            <div className="h-2 w-16 rounded-full bg-accent/85" />
            <div className="h-3.5 w-36 rounded bg-white/90" />
            <div className="h-2 w-full rounded bg-white/20" />
            <div className="h-2 w-4/5 rounded bg-white/12" />
            <div className="flex gap-2 pt-1">
              <span className="h-5 w-14 rounded-full bg-accent" />
              <span className="h-5 w-14 rounded-full border border-white/20 bg-white/[0.04]" />
            </div>
          </div>
          <div className="col-span-5 flex flex-col justify-between rounded-xl border border-white/12 bg-white/[0.03] p-2.5">
            <span className="font-mono text-[10px] text-accent">JSX</span>
            <div className="space-y-2">
              <div className="h-1.5 w-full rounded bg-white/30" />
              <div className="h-1.5 w-3/4 rounded bg-accent/60" />
              <div className="h-1.5 w-5/6 rounded bg-blue-400/50" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function HealthcareVisual({ shouldReduceMotion, isClone = false }) {
  return (
    <div
      aria-hidden="true"
      className="relative flex h-64 items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.22),transparent_55%),radial-gradient(circle_at_75%_75%,rgba(139,92,246,0.22),transparent_55%)] p-6 sm:h-72"
    >
      <span className="absolute top-3.5 left-1/2 z-20 -translate-x-1/2 rounded-full border border-blue-400/30 bg-blue-500/15 px-3 py-0.5 font-mono text-[10px] text-blue-200">
        Idea / Planning
      </span>

      <svg
        viewBox="0 0 240 160"
        className="pointer-events-none absolute inset-0 h-full w-full"
      >
        {HEALTHCARE_NODES.map((node) => (
          <g key={node.label}>
            <line
              x1={node.x1}
              y1={node.y1}
              x2="120"
              y2="84"
              stroke="rgba(182,255,92,0.38)"
              strokeWidth="1.2"
              strokeDasharray="4 4"
            />
            {!isClone && !shouldReduceMotion && (
              <motion.circle
                r="2.4"
                fill="#B6FF5C"
                animate={{
                  cx: [node.x1, 120],
                  cy: [node.y1, 84],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2.6,
                  delay: node.delay,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            )}
          </g>
        ))}
      </svg>

      {HEALTHCARE_NODES.map((node) => (
        <div
          key={node.label}
          className={`absolute z-10 flex items-center gap-1.5 rounded-xl border border-white/15 bg-[#10121b]/95 px-3 py-1.5 backdrop-blur-sm ${node.pos}`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          <span className="font-mono text-[11px] text-white/85">
            {node.label}
          </span>
        </div>
      ))}

      <motion.div
        animate={
          isClone || shouldReduceMotion ? undefined : { scale: [1, 1.07, 1] }
        }
        transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
        className="relative z-10 mt-3 flex h-14 w-14 items-center justify-center rounded-full border border-accent/45 bg-accent/15 text-accent shadow-[0_0_28px_rgba(182,255,92,0.25)]"
      >
        <HeartPulse className="h-6 w-6" />
      </motion.div>
    </div>
  )
}

function ExperimentsVisual({ shouldReduceMotion, isClone = false }) {
  return (
    <div
      aria-hidden="true"
      className="relative flex h-64 flex-col items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_30%_25%,rgba(139,92,246,0.22),transparent_55%),radial-gradient(circle_at_75%_75%,rgba(37,99,235,0.2),transparent_55%)] p-6 sm:h-72"
    >
      <motion.div
        animate={isClone || shouldReduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
        className="pointer-events-none absolute h-40 w-40 rounded-full border border-dashed border-accent/25"
      />
      <motion.div
        animate={isClone || shouldReduceMotion ? undefined : { rotate: -360 }}
        transition={{ duration: 36, repeat: Infinity, ease: 'linear' }}
        className="pointer-events-none absolute h-26 w-26 rotate-45 rounded-2xl border border-violet-300/20"
      />

      {PLACEHOLDER_PARTICLES.map((p, idx) => (
        <motion.span
          key={idx}
          animate={
            isClone || shouldReduceMotion
              ? undefined
              : { y: [-4, 4, -4], opacity: [0.35, 0.9, 0.35] }
          }
          transition={{
            duration: 3.8,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{ left: p.left, top: p.top }}
          className="pointer-events-none absolute h-1.5 w-1.5 rounded-full bg-accent"
        />
      ))}

      <div className="relative z-10 flex flex-col items-center gap-3 text-center">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-accent/30 bg-accent/15 text-accent">
          <Terminal className="h-5 w-5" />
        </div>
        <p className="font-mono text-xs text-white/85">
          More experiments coming soon.
        </p>
      </div>
    </div>
  )
}

function ProjectCard({ project, index, onSelect, disablePointerFx }) {
  const cardRef = useRef(null)
  const shouldReduceMotion = useReducedMotion()
  const statusCfg = STATUS_CONFIG[project.status]
  const StatusIcon = statusCfg.icon
  const CardIcon = project.icon
  const isPlaceholder = project.status === 'soon'

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  })

  const visualParallaxY = useTransform(scrollYProgress, [0, 1], [-12, 12])
  const disableVisualScroll = shouldReduceMotion || disablePointerFx

  const renderVisual = (isClone) => {
    if (project.id === 'portfolio') {
      return (
        <PortfolioVisual
          shouldReduceMotion={shouldReduceMotion}
          isClone={isClone}
        />
      )
    }
    if (project.id === 'healthcare') {
      return (
        <HealthcareVisual
          shouldReduceMotion={shouldReduceMotion}
          isClone={isClone}
        />
      )
    }
    return (
      <ExperimentsVisual
        shouldReduceMotion={shouldReduceMotion}
        isClone={isClone}
      />
    )
  }

  return (
    <motion.article
      ref={cardRef}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 32, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={VIEWPORT_CONFIG}
      transition={{ duration: 0.65, delay: index * 0.1, ease: EASE_OUT_EXPO }}
    >
      <InteractiveCard
        disablePointerFx={shouldReduceMotion || disablePointerFx}
        atmosphere={project.atmosphere}
        className={`group relative overflow-hidden rounded-3xl border p-6 backdrop-blur-xl transition-colors duration-300 sm:p-8 lg:p-10 ${
          isPlaceholder
            ? 'border-dashed border-white/15 bg-[#0d0e15]/85 hover:border-accent/35'
            : 'border-white/12 bg-[#0d0f17]/90 hover:shadow-[0_28px_90px_rgba(0,0,0,0.7)]'
        }`}
      >
        {({ visualLayerStyle, textLayerStyle }) => (
          <>
            {/* Top Rim Highlight */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-16 top-0 h-px bg-gradient-to-r from-transparent via-accent/65 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />

            <div className="relative z-10 grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-10">
              {/* Layer 4 & 5: Foreground Editorial Text & Magnetic CTA */}
              <motion.div
                style={textLayerStyle}
                className={`lg:col-span-5 ${
                  project.reversed ? 'lg:order-2' : 'lg:order-1'
                }`}
              >
                <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-accent/25 bg-accent/10 text-accent transition-transform duration-300 group-hover:scale-105">
                      <CardIcon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <span className="font-mono text-xs tracking-widest text-white/40 select-none">
                      {project.number}
                    </span>
                  </div>

                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-medium ${statusCfg.classes}`}
                  >
                    <span
                      aria-hidden="true"
                      className={`h-1.5 w-1.5 rounded-full ${statusCfg.dot} ${
                        project.status === 'building' && !shouldReduceMotion
                          ? 'animate-pulse'
                          : ''
                      }`}
                    />
                    <StatusIcon className="h-3 w-3" aria-hidden="true" />
                    <span>{statusCfg.label}</span>
                  </span>
                </div>

                <h3
                  style={{ fontFamily: 'var(--font-manrope)' }}
                  className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl"
                >
                  {project.titleLead}{' '}
                  <span
                    style={{ fontFamily: 'var(--font-editorial)' }}
                    className="font-normal italic text-accent"
                  >
                    {project.titleItalic}
                  </span>
                </h3>

                <p className="mt-3.5 text-sm leading-relaxed text-white/70 sm:text-base">
                  {project.description}
                </p>

                {/* Technology Tags */}
                <div className="mt-6">
                  <span className="mb-2.5 block font-mono text-[10px] tracking-wider text-white/45 uppercase">
                    {project.techLabel}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((item) => (
                      <span
                        key={item}
                        className="rounded-md border border-white/12 bg-white/[0.04] px-2.5 py-1 font-mono text-[11px] text-white/80"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Interactive Detail Modal Trigger */}
                <div className="mt-7">
                  <button
                    type="button"
                    onClick={() => onSelect(project)}
                    aria-label={`Inspect details for ${project.titleLead} ${project.titleItalic}`}
                    className="cursor-pointer rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                  >
                    <MagneticCue disabled={shouldReduceMotion || disablePointerFx}>
                      <span>Inspect Project</span>
                      <ArrowUpRight
                        aria-hidden="true"
                        className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </MagneticCue>
                  </button>
                </div>
              </motion.div>

              {/* Layer 2 & 3: Main Project Preview + Magnifying Depth Lens */}
              <motion.div
                style={
                  disableVisualScroll
                    ? visualLayerStyle
                    : { y: visualParallaxY, x: visualLayerStyle?.x }
                }
                initial={
                  shouldReduceMotion
                    ? false
                    : { clipPath: 'inset(8% 0% 8% 0% round 16px)', opacity: 0 }
                }
                whileInView={{
                  clipPath: 'inset(0% 0% 0% 0% round 16px)',
                  opacity: 1,
                }}
                viewport={VIEWPORT_CONFIG}
                transition={{ duration: 0.75, delay: 0.1, ease: EASE_OUT_EXPO }}
                onClick={() => onSelect(project)}
                className={`cursor-pointer lg:col-span-7 ${
                  project.reversed ? 'lg:order-1' : 'lg:order-2'
                }`}
              >
                <MagnifyingVisual
                  renderVisual={renderVisual}
                  disablePointerFx={shouldReduceMotion || disablePointerFx}
                />
              </motion.div>
            </div>
          </>
        )}
      </InteractiveCard>
    </motion.article>
  )
}

function ProjectModal({ project, onClose, shouldReduceMotion }) {
  const closeButtonRef = useRef(null)

  useEffect(() => {
    if (!project) return

    const previousFocus = document.activeElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
      if (previousFocus instanceof HTMLElement) {
        previousFocus.focus()
      }
    }
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="project-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/75 p-4 backdrop-blur-md"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            initial={
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 18, scale: 0.97 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 12, scale: 0.97 }
            }
            transition={{ duration: 0.25, ease: EASE_OUT_EXPO }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-white/15 bg-[#10121a] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.85)] sm:p-8"
          >
            <div
              aria-hidden="true"
              className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent"
            />

            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-white/40">
                  {project.number}
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium ${
                    STATUS_CONFIG[project.status].classes
                  }`}
                >
                  {STATUS_CONFIG[project.status].label}
                </span>
              </div>

              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label="Close project details"
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/12 bg-white/[0.04] text-white/75 transition-colors hover:border-accent/40 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <h3
              id="project-modal-title"
              className="mt-4 text-2xl font-bold tracking-tight text-foreground"
            >
              {project.titleLead} {project.titleItalic}
            </h3>

            <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-base">
              {project.description}
            </p>

            <div className="mt-6 space-y-2.5">
              <h4 className="font-mono text-xs tracking-wider text-white/45 uppercase">
                Overview
              </h4>
              <ul className="space-y-2">
                {project.highlights.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-2.5 text-sm text-white/75"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 border-t border-white/10 pt-5">
              <span className="mb-2.5 block font-mono text-xs tracking-wider text-white/45 uppercase">
                {project.techLabel}
              </span>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((item) => (
                  <span
                    key={item}
                    className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-xs text-white/80"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Projects() {
  const sectionRef = useRef(null)
  const shouldReduceMotion = useReducedMotion()
  const isCoarsePointer = useIsCoarsePointer()
  const [selectedProject, setSelectedProject] = useState(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
  })
  const ambientY = useTransform(scrollYProgress, [0, 1], [-60, 120])

  return (
    <section
      id="projects"
      ref={sectionRef}
      aria-labelledby="projects-heading"
      className="relative overflow-hidden border-t border-white/10 bg-background py-24 sm:py-28 lg:py-32"
    >
      {/* Blue & Violet Ambient Lighting */}
      <motion.div
        aria-hidden="true"
        style={shouldReduceMotion ? undefined : { y: ambientY }}
        className="pointer-events-none absolute top-10 right-0 h-[560px] w-[560px] translate-x-1/3 rounded-full bg-[radial-gradient(circle,rgba(88,101,242,0.16)_0%,rgba(124,131,255,0.1)_45%,transparent_72%)] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-20 left-0 h-[420px] w-[420px] -translate-x-1/3 rounded-full bg-[radial-gradient(circle,rgba(182,255,92,0.08)_0%,transparent_70%)] blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* Editorial Section Header */}
        <div className="mb-12 sm:mb-14">
          <motion.span
            initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_CONFIG}
            transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/10 px-3.5 py-1 text-xs font-medium tracking-wide text-accent"
          >
            <Rocket className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Projects</span>
          </motion.span>

          <motion.h2
            id="projects-heading"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_CONFIG}
            transition={{ duration: 0.6, delay: 0.08, ease: EASE_OUT_EXPO }}
            style={{ fontFamily: 'var(--font-manrope)' }}
            className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
          >
            What I&apos;m{' '}
            <span
              style={{ fontFamily: 'var(--font-editorial)' }}
              className="font-normal italic text-accent"
            >
              Working On
            </span>
          </motion.h2>

          <p className="mt-4 max-w-xl text-base text-white/65 sm:text-lg">
            {SUBTITLE_WORDS.map((word, index) => (
              <span key={`${word}-${index}`}>
                <motion.span
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEWPORT_CONFIG}
                  transition={{
                    duration: 0.35,
                    delay: 0.14 + index * 0.025,
                    ease: EASE_OUT_EXPO,
                  }}
                  className="inline-block"
                >
                  {word}
                </motion.span>
                {index < SUBTITLE_WORDS.length - 1 ? ' ' : ''}
              </span>
            ))}
          </p>

          <div className="relative mt-8 h-px w-full overflow-hidden bg-white/10">
            <motion.div
              aria-hidden="true"
              initial={shouldReduceMotion ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={VIEWPORT_CONFIG}
              transition={{ duration: 0.9, delay: 0.2, ease: EASE_OUT_EXPO }}
              className="h-full w-full origin-left bg-gradient-to-r from-accent/70 via-blue-400/35 to-transparent"
            />
            {!shouldReduceMotion && (
              <motion.div
                aria-hidden="true"
                style={{ scaleX: smoothProgress }}
                className="absolute inset-0 origin-left bg-accent"
              />
            )}
          </div>
        </div>

        {/* Asymmetric Editorial Cards */}
        <div className="space-y-8">
          {PROJECTS.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onSelect={setSelectedProject}
              disablePointerFx={isCoarsePointer}
            />
          ))}
        </div>
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        shouldReduceMotion={shouldReduceMotion}
      />
    </section>
  )
}

export default Projects
