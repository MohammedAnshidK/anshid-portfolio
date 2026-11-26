import { useRef } from 'react'
import { ArrowDown, ArrowRight, MapPin } from 'lucide-react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react'
import ActionButton from '../components/ActionButton'
import DeveloperWorkspace from '../components/DeveloperWorkspace'

const EASE_OUT_EXPO = [0.22, 1, 0.36, 1]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: EASE_OUT_EXPO,
    },
  },
}

const HEADLINE_WORDS = ['I', 'Build', 'Digital', 'Experiences.']

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
    href: 'https://github.com',
    ariaLabel: 'Mohammed Anshid on GitHub',
    icon: GitHubIcon,
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com',
    ariaLabel: 'Mohammed Anshid on LinkedIn',
    icon: LinkedInIcon,
  },
]

function Hero() {
  const sectionRef = useRef(null)
  const shouldReduceMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const workspaceParallaxY = useTransform(scrollYProgress, [0, 1], [0, 48])
  const contentParallaxY = useTransform(scrollYProgress, [0, 1], [0, 20])

  return (
    <section
      id="home"
      ref={sectionRef}
      aria-labelledby="hero-heading"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-background pt-20 pb-16 sm:pt-20 sm:pb-20 lg:pt-24"
    >
      {/* Cinematic Background Grid & Ambient Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_40%,#000_40%,transparent_100%)]"
      />
      <motion.div
        aria-hidden="true"
        animate={
          shouldReduceMotion
            ? undefined
            : {
                opacity: [0.35, 0.55, 0.35],
                scale: [1, 1.05, 1],
              }
        }
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[680px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(182,255,92,0.14)_0%,transparent_70%)] blur-3xl"
      />

      {/* Main Content Container */}
      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-8 px-6 lg:grid-cols-12 lg:gap-10">
        {/* LEFT SIDE: Intro & Actions */}
        <motion.div
          style={shouldReduceMotion ? undefined : { y: contentParallaxY }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-6"
        >
          {/* 1. Small Availability Badge */}
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-white/12 bg-white/[0.03] px-3.5 py-1.5 text-xs font-medium text-white/85 backdrop-blur-sm">
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
          </motion.div>

          {/* 2. Main Heading */}
          <motion.h1
            id="hero-heading"
            variants={itemVariants}
            className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
          >
            Hi, I&apos;m <span className="text-accent">Anshid.</span>
          </motion.h1>

          {/* 3. Animated Headline */}
          <motion.h2
            variants={itemVariants}
            className="mt-3 text-3xl font-semibold tracking-tight text-white/90 sm:text-4xl lg:text-[2.65rem] lg:leading-[1.15]"
          >
            {HEADLINE_WORDS.map((word, index) => (
              <span key={word}>
                <motion.span
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.55,
                    delay: 0.25 + index * 0.08,
                    ease: EASE_OUT_EXPO,
                  }}
                  className={`inline-block ${
                    word === 'Digital' || word === 'Experiences.'
                      ? 'bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent'
                      : ''
                  }`}
                >
                  {word}
                </motion.span>
                {index < HEADLINE_WORDS.length - 1 ? ' ' : ''}
              </span>
            ))}
          </motion.h2>

          {/* 4. Short Introduction */}
          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg"
          >
            I&apos;m <span className="font-medium text-foreground">Mohammed Anshid</span>, an
            Aspiring MERN Stack Developer based in Kerala, India. I craft responsive,
            accessible web interfaces with{' '}
            <span className="text-foreground">HTML, CSS, JavaScript, and React</span>{' '}
            while expanding my backend skills in{' '}
            <span className="text-accent">Node.js, Express.js, and MongoDB</span>.
          </motion.p>

          {/* 5 & 6. Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="mt-6 flex flex-wrap items-center gap-4 lg:mt-8"
          >
            <ActionButton href="#projects" variant="primary" icon={ArrowRight}>
              View My Work
            </ActionButton>
            <ActionButton href="#contact" variant="secondary">
              Contact Me
            </ActionButton>
          </motion.div>

          {/* 7. Social Icons */}
          <motion.div
            variants={itemVariants}
            className="mt-6 flex items-center gap-4 lg:mt-8"
          >
            <span className="text-xs font-medium uppercase tracking-[0.16em] text-white/45">
              Connect
            </span>
            <span aria-hidden="true" className="h-px w-8 bg-white/15" />
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon

                return (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.ariaLabel}
                    whileHover={{ y: -2, scale: 1.06 }}
                    whileTap={{ scale: 0.94 }}
                    transition={{ type: 'spring', stiffness: 420, damping: 24 }}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/[0.03] text-white/75 transition-colors duration-200 hover:border-accent/50 hover:bg-accent/10 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                  >
                    <Icon />
                  </motion.a>
                )
              })}
            </div>
          </motion.div>
        </motion.div>

        {/* RIGHT SIDE: Cinematic CSS Developer Workspace */}
        <div className="lg:col-span-6">
          <DeveloperWorkspace scrollParallaxY={workspaceParallaxY} />
        </div>
      </div>

      {/* Smooth Scroll Indicator */}
      <motion.a
        href="#about"
        aria-label="Scroll down to explore more"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.5, ease: EASE_OUT_EXPO }}
        className="group absolute bottom-4 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-1.5 rounded-md px-2 py-1 text-white/50 transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:inline-flex lg:bottom-6"
      >
        <span className="text-[10px] font-medium uppercase tracking-[0.22em]">
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
