import { useEffect, useRef, useState } from 'react'
import { ArrowDown, ArrowRight, MapPin, Sparkles } from 'lucide-react'
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react'
import ActionButton from '../components/ActionButton'

const EASE_OUT_EXPO = [0.22, 1, 0.36, 1]

const LENS_SIZE = 220
const LENS_RADIUS = LENS_SIZE / 2
const LENS_SCALE = 1.28

const HEADLINE_WORDS = [
  { text: 'I', italic: false, accent: false },
  { text: 'Build', italic: false, accent: false },
  { text: 'Digital', italic: true, accent: true },
  { text: 'Experiences.', italic: false, accent: false },
]

function GitHubIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-4.5 w-4.5"
    >
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-4.5 w-4.5"
    >
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77Z" />
    </svg>
  )
}

const SOCIAL_LINKS = [
  {
    name: 'GitHub',
    href: 'https://github.com/MohammedAnshidK',
    ariaLabel: 'Mohammed Anshid on GitHub',
    icon: GitHubIcon,
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/mohammed-anshid-k-b17363421/',
    ariaLabel: 'Mohammed Anshid on LinkedIn',
    icon: LinkedInIcon,
  },
]

function useIsCoarsePointer() {
  const [isCoarse] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(pointer: coarse)').matches
      : false
  )
  return isCoarse
}

function EditorialHeadline({ isClone = false, shouldReduceMotion = false }) {
  return (
    <div className="space-y-4 sm:space-y-5">
      <motion.p
        initial={isClone || shouldReduceMotion ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.12, ease: EASE_OUT_EXPO }}
        className="font-mono text-sm tracking-wide text-white/80 sm:text-base"
      >
        Hi, I&apos;m{' '}
        <span className="font-semibold text-foreground">Mohammed Anshid</span>.
      </motion.p>

      <h1
        id={isClone ? undefined : 'hero-heading'}
        style={{ fontFamily: 'var(--font-manrope)' }}
        className="text-5xl leading-[1.03] font-extrabold tracking-[-0.035em] text-foreground sm:text-6xl md:text-7xl lg:text-[5.25rem]"
      >
        {HEADLINE_WORDS.map((word, index) => (
          <span key={word.text}>
            <motion.span
              initial={
                isClone || shouldReduceMotion ? false : { opacity: 0, y: 26 }
              }
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.65,
                delay: 0.2 + index * 0.08,
                ease: EASE_OUT_EXPO,
              }}
              style={
                word.italic
                  ? { fontFamily: 'var(--font-editorial)' }
                  : undefined
              }
              className={`inline-block ${
                word.italic
                  ? 'pr-1.5 text-[1.08em] font-normal italic text-accent drop-shadow-[0_0_24px_rgba(182,255,92,0.28)]'
                  : ''
              }`}
            >
              {word.text}
            </motion.span>
            {index < HEADLINE_WORDS.length - 1 ? ' ' : ''}
          </span>
        ))}
      </h1>

      <motion.p
        initial={isClone || shouldReduceMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.48, ease: EASE_OUT_EXPO }}
        style={{ fontFamily: 'var(--font-manrope)' }}
        className="max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg md:text-xl"
      >
        <span className="font-semibold text-foreground">
          Aspiring MERN Stack Developer.
        </span>{' '}
        Currently exploring modern web technologies and building interactive
        digital experiences.
      </motion.p>
    </div>
  )
}

function Hero() {
  const sectionRef = useRef(null)
  const stageRef = useRef(null)
  const shouldReduceMotion = useReducedMotion()
  const isCoarsePointer = useIsCoarsePointer()
  const enableLens = !shouldReduceMotion && !isCoarsePointer

  const [stageSize, setStageSize] = useState({ width: 0, height: 0 })
  const [isLensActive, setIsLensActive] = useState(false)

  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)

  const smoothX = useSpring(pointerX, { stiffness: 280, damping: 28, mass: 0.4 })
  const smoothY = useSpring(pointerY, { stiffness: 280, damping: 28, mass: 0.4 })

  const lensX = useTransform(smoothX, (v) => v - LENS_RADIUS)
  const lensY = useTransform(smoothY, (v) => v - LENS_RADIUS)

  const cloneOffsetX = useTransform(smoothX, (v) => LENS_RADIUS - v * LENS_SCALE)
  const cloneOffsetY = useTransform(smoothY, (v) => LENS_RADIUS - v * LENS_SCALE)

  const spotlightBg = useMotionTemplate`radial-gradient(420px circle at ${smoothX}px ${smoothY}px, rgba(59, 130, 246, 0.16), rgba(182, 255, 92, 0.06) 45%, transparent 72%)`

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const contentParallaxY = useTransform(scrollYProgress, [0, 1], [0, 36])
  const blueGlowY = useTransform(scrollYProgress, [0, 1], [0, 70])

  useEffect(() => {
    if (!enableLens || !stageRef.current) return

    const updateSize = () => {
      if (!stageRef.current) return
      const rect = stageRef.current.getBoundingClientRect()
      setStageSize({ width: rect.width, height: rect.height })
    }

    updateSize()
    const observer = new ResizeObserver(updateSize)
    observer.observe(stageRef.current)

    return () => observer.disconnect()
  }, [enableLens])

  const handleStagePointerMove = (e) => {
    if (!enableLens || !stageRef.current || e.pointerType === 'touch') return
    const rect = stageRef.current.getBoundingClientRect()
    pointerX.set(e.clientX - rect.left)
    pointerY.set(e.clientY - rect.top)
    setIsLensActive((prev) => (prev ? prev : true))
  }

  const handleStagePointerLeave = () => {
    setIsLensActive(false)
  }

  return (
    <section
      id="home"
      ref={sectionRef}
      aria-labelledby="hero-heading"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-background pt-24 pb-20 sm:pt-28 sm:pb-24"
    >
      {/* Deep Midnight Blue Radial Lighting & Ambient Lime Accent */}
      <motion.div
        aria-hidden="true"
        style={shouldReduceMotion ? undefined : { y: blueGlowY }}
        animate={
          shouldReduceMotion
            ? undefined
            : { opacity: [0.65, 0.9, 0.65], scale: [1, 1.06, 1] }
        }
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute -top-32 left-1/2 h-[620px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.22)_0%,rgba(29,78,216,0.09)_42%,transparent_72%)] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-1/4 bottom-12 h-[360px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(182,255,92,0.09)_0%,transparent_70%)] blur-3xl"
      />

      {/* Minimal Fine Architectural Grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_45%,#000_35%,transparent_100%)]"
      />

      {/* Editorial Hero Stage */}
      <motion.div
        style={shouldReduceMotion ? undefined : { y: contentParallaxY }}
        className="relative z-10 mx-auto w-full max-w-6xl px-6"
      >
        <div
          ref={stageRef}
          onPointerMove={handleStagePointerMove}
          onPointerLeave={handleStagePointerLeave}
          className="relative rounded-3xl py-6 sm:py-10"
        >
          {/* Interactive Stage Spotlight (Desktop Fine-Pointer Only) */}
          {enableLens && (
            <motion.div
              aria-hidden="true"
              animate={{ opacity: isLensActive ? 1 : 0 }}
              transition={{ duration: 0.25 }}
              style={{ background: spotlightBg }}
              className="pointer-events-none absolute -inset-6 rounded-3xl"
            />
          )}

          {/* Top Row: Availability Indicator + Static Mobile Lens Pill */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
            className="mb-8 flex flex-wrap items-center justify-between gap-4 sm:mb-10"
          >
            <span className="inline-flex items-center gap-2.5 rounded-full border border-white/12 bg-white/[0.03] px-4 py-1.5 text-xs font-medium text-white/85 backdrop-blur-md">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                {!shouldReduceMotion && (
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                )}
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <span>Available for opportunities</span>
              <span className="text-white/30" aria-hidden="true">
                &middot;
              </span>
              <span className="inline-flex items-center gap-1 text-white/65">
                <MapPin className="h-3 w-3 text-accent" aria-hidden="true" />
                Kerala, India
              </span>
            </span>

            {/* Desktop Hint vs Mobile Static Glass Treatment */}
            {enableLens ? (
              <span className="hidden items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/[0.06] px-3.5 py-1 font-mono text-[11px] text-white/60 sm:inline-flex">
                <Sparkles className="h-3 w-3 text-accent" aria-hidden="true" />
                <span>Move cursor over text to magnify</span>
              </span>
            ) : (
              <div
                aria-hidden="true"
                className="inline-flex items-center gap-2 rounded-full border border-blue-400/25 bg-gradient-to-r from-blue-500/15 via-white/[0.04] to-accent/15 px-3.5 py-1 font-mono text-[11px] text-white/75 backdrop-blur-md"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                <span>MERN Stack Focus</span>
              </div>
            )}
          </motion.div>

          {/* Base Editorial Typography */}
          <EditorialHeadline shouldReduceMotion={shouldReduceMotion} />

          {/* Interactive Actions & Socials */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.56, ease: EASE_OUT_EXPO }}
            className="mt-10 flex flex-wrap items-center justify-between gap-6 border-t border-white/10 pt-8"
          >
            <div className="flex flex-wrap items-center gap-4">
              <ActionButton href="#contact" variant="primary" icon={ArrowRight}>
                Contact Me
              </ActionButton>
              <ActionButton href="#projects" variant="secondary">
                View Projects
              </ActionButton>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-mono text-xs tracking-[0.14em] text-white/45 uppercase">
                Connect
              </span>
              <span aria-hidden="true" className="h-px w-6 bg-white/15" />
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon

                return (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.ariaLabel}
                    whileHover={
                      shouldReduceMotion ? undefined : { y: -2, scale: 1.06 }
                    }
                    whileTap={shouldReduceMotion ? undefined : { scale: 0.94 }}
                    transition={{ type: 'spring', stiffness: 420, damping: 24 }}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/[0.03] text-white/75 transition-colors duration-200 hover:border-accent/50 hover:bg-accent/10 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                  >
                    <Icon />
                  </motion.a>
                )
              })}
            </div>
          </motion.div>

          {/* Interactive Magnifying Glass Lens (Desktop Fine-Pointer Only) */}
          {enableLens && stageSize.width > 0 && (
            <motion.div
              aria-hidden="true"
              animate={{
                opacity: isLensActive ? 1 : 0,
                scale: isLensActive ? 1 : 0.85,
              }}
              transition={{ duration: 0.2, ease: EASE_OUT_EXPO }}
              style={{
                width: LENS_SIZE,
                height: LENS_SIZE,
                x: lensX,
                y: lensY,
              }}
              className="pointer-events-none absolute top-0 left-0 z-30 overflow-hidden rounded-full border border-white/30 bg-[#090d1a]/85 shadow-[0_24px_60px_rgba(0,0,0,0.75),inset_0_0_28px_rgba(59,130,246,0.28),inset_0_0_12px_rgba(182,255,92,0.18)] backdrop-brightness-110 backdrop-contrast-110 will-change-transform"
            >
              {/* Magnified Cloned Stage Content */}
              <motion.div
                style={{
                  width: stageSize.width,
                  height: stageSize.height,
                  x: cloneOffsetX,
                  y: cloneOffsetY,
                  scale: LENS_SCALE,
                  transformOrigin: '0 0',
                }}
                className="pointer-events-none absolute top-0 left-0 py-6 sm:py-10"
              >
                <div className="mb-8 flex flex-wrap items-center justify-between gap-4 opacity-0 sm:mb-10">
                  <span className="py-1.5 text-xs">spacer</span>
                </div>
                <EditorialHeadline isClone shouldReduceMotion />
              </motion.div>

              {/* Specular Glass Highlight & Chromatic Rim */}
              <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.22)_0%,rgba(59,130,246,0.08)_38%,transparent_65%)]" />
              <div className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-accent/25" />
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Smooth Scroll Indicator */}
      <motion.a
        href="#about"
        aria-label="Scroll down to explore more"
        initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.85, duration: 0.5, ease: EASE_OUT_EXPO }}
        className="group absolute bottom-5 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-1.5 rounded-md px-2 py-1 text-white/50 transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:inline-flex"
      >
        <span className="font-mono text-[10px] font-medium uppercase tracking-[0.22em]">
          Scroll
        </span>
        <motion.span
          aria-hidden="true"
          animate={shouldReduceMotion ? undefined : { y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="inline-flex text-accent"
        >
          <ArrowDown className="h-4 w-4" />
        </motion.span>
      </motion.a>
    </section>
  )
}

export default Hero
