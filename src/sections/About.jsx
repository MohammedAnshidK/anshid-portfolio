import { Code2, Compass, Database, Sparkles, Terminal } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'

const EASE_OUT_EXPO = [0.22, 1, 0.36, 1]

const VIEWPORT_CONFIG = { once: true, amount: 0.2 }

const textContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
}

const textItemVariants = {
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

const JOURNEY_STEPS = [
  {
    step: '01',
    phase: 'Foundation',
    title: 'HTML, CSS & JavaScript',
    description:
      'Started with core web fundamentals—semantic markup, responsive layouts, and interactive browser logic.',
    status: 'Core',
    icon: Code2,
  },
  {
    step: '02',
    phase: 'Frontend Craft',
    title: 'React & Modern UI',
    description:
      'Focused on component architecture, clean state flow, accessibility, and purposeful motion.',
    status: 'Active',
    icon: Sparkles,
  },
  {
    step: '03',
    phase: 'MERN Progression',
    title: 'Node.js, Express.js & MongoDB',
    description:
      'Currently learning server-side JavaScript, API design, and database modeling to build end-to-end apps.',
    status: 'Learning',
    icon: Database,
  },
]

function About() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative overflow-hidden border-t border-white/10 bg-background py-24 sm:py-28 lg:py-32"
    >
      {/* Subtle Ambient Accent Glow */}
      <motion.div
        aria-hidden="true"
        animate={
          shouldReduceMotion
            ? undefined
            : {
                opacity: [0.25, 0.42, 0.25],
                scale: [1, 1.05, 1],
              }
        }
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute top-1/2 right-0 h-[420px] w-[420px] translate-x-1/3 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(226,162,58,0.12)_0%,transparent_70%)] blur-3xl"
      />

      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-12 lg:gap-12">
        {/* LEFT SIDE: Heading, Intro & Story Paragraphs */}
        <motion.div
          variants={textContainerVariants}
          initial={shouldReduceMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={VIEWPORT_CONFIG}
          className="lg:col-span-6"
        >
          <motion.div variants={textItemVariants} className="mb-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/10 px-3.5 py-1 text-xs font-medium tracking-wide text-accent">
              <Compass className="h-3.5 w-3.5" aria-hidden="true" />
              <span>About Me</span>
            </span>
          </motion.div>

          <motion.h2
            id="about-heading"
            variants={textItemVariants}
            className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
          >
            More About <span className="text-accent">Me</span>
          </motion.h2>

          <motion.p
            variants={textItemVariants}
            className="mt-6 text-base leading-relaxed font-medium text-white/90 sm:text-lg"
          >
            I&apos;m Mohammed Anshid, an aspiring MERN Stack Developer from
            Kerala, India. I&apos;m passionate about building modern web
            applications and continuously improving my development skills.
          </motion.p>

          <div className="mt-5 space-y-4 text-sm leading-relaxed text-white/70 sm:text-base">
            <motion.p variants={textItemVariants}>
              My journey into web development began with curiosity about how
              websites turn ideas into interactive tools anyone can open in a
              browser. Starting from HTML, CSS, and JavaScript, I developed a
              strong appreciation for clean structure and responsive design.
            </motion.p>

            <motion.p variants={textItemVariants}>
              I enjoy both sides of the stack—crafting thoughtful, intuitive
              interfaces with React on the frontend while understanding how
              servers, APIs, and data fit together on the backend. Right now, I
              am actively expanding into Node.js, Express.js, and MongoDB as I
              work toward full-stack MERN fluency.
            </motion.p>

            <motion.p variants={textItemVariants}>
              Above all, I care about creating useful digital experiences that
              feel fast, clear, and purposeful for the people using them—writing
              clean code and learning something better with every iteration.
            </motion.p>
          </div>
        </motion.div>

        {/* RIGHT SIDE: Creative Developer Journey Card */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 28, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={VIEWPORT_CONFIG}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
          className="relative py-4 sm:px-2 lg:col-span-6"
        >
          {/* Decorative Floating Chip (Top Right) */}
          <motion.div
            aria-hidden="true"
            animate={shouldReduceMotion ? undefined : { y: [-4, 4, -4] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="pointer-events-none absolute -top-2 right-2 z-20 hidden items-center gap-2 rounded-full border border-white/12 bg-[#121217]/95 px-3 py-1.5 text-[11px] font-medium text-white/80 shadow-[0_12px_30px_rgba(0,0,0,0.55)] backdrop-blur-md sm:flex"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="font-mono">stack: mern-in-progress</span>
          </motion.div>

          {/* Subtle Offset Frame Layer */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-2 translate-x-2 translate-y-2 rounded-2xl border border-accent/15 bg-accent/[0.02]"
          />

          {/* Main Journey Card */}
          <div className="relative overflow-hidden rounded-2xl border border-white/12 bg-[#101014]/95 shadow-[0_24px_70px_rgba(0,0,0,0.65)] backdrop-blur-xl">
            {/* Top Accent Rim */}
            <div
              aria-hidden="true"
              className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent"
            />

            {/* Card Terminal Header */}
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-3.5">
              <div className="flex items-center gap-2 font-mono text-xs text-white/60">
                <Terminal className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                <span>~/anshid/journey.md</span>
              </div>
              <span className="rounded-full border border-accent/25 bg-accent/10 px-2.5 py-0.5 font-mono text-[10px] font-medium text-accent">
                Kerala, IN
              </span>
            </div>

            {/* Journey Timeline Nodes */}
            <div className="space-y-4 p-5 sm:p-6">
              {JOURNEY_STEPS.map((item, index) => {
                const Icon = item.icon

                return (
                  <motion.div
                    key={item.step}
                    initial={shouldReduceMotion ? false : { opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={VIEWPORT_CONFIG}
                    transition={{
                      duration: 0.5,
                      delay: 0.15 + index * 0.1,
                      ease: EASE_OUT_EXPO,
                    }}
                    className="group relative rounded-xl border border-white/8 bg-white/[0.02] p-4 transition-colors duration-200 hover:border-accent/30 hover:bg-white/[0.04]"
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-accent/25 bg-accent/10 text-accent">
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="font-mono text-[11px] tracking-wider text-white/45 uppercase">
                            {item.step} &middot; {item.phase}
                          </span>
                          <span className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-0.5 font-mono text-[10px] text-accent">
                            {item.status}
                          </span>
                        </div>

                        <h3 className="mt-1 text-sm font-semibold text-foreground sm:text-base">
                          {item.title}
                        </h3>

                        <p className="mt-1 text-xs leading-relaxed text-white/65 sm:text-sm">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Code-Inspired Footer Snippet */}
            <div className="border-t border-white/10 bg-white/[0.015] px-5 py-3.5 font-mono text-[11px] text-white/60 sm:px-6 sm:text-xs">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span>
                  <span className="text-white/40">goal:</span>{' '}
                  <span className="text-accent">&apos;Useful Digital Experiences&apos;</span>
                </span>
                <span className="text-white/45">
                  status: <span className="text-emerald-300">&apos;keep_building&apos;</span>
                </span>
              </div>
            </div>
          </div>

          {/* Decorative Floating Chip (Bottom Left) */}
          <motion.div
            aria-hidden="true"
            animate={shouldReduceMotion ? undefined : { y: [4, -4, 4] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
            className="pointer-events-none absolute -bottom-2 left-2 z-20 hidden items-center gap-2 rounded-full border border-white/12 bg-[#121217]/95 px-3 py-1.5 text-[11px] font-medium text-white/80 shadow-[0_12px_30px_rgba(0,0,0,0.55)] backdrop-blur-md sm:flex"
          >
            <span className="text-accent">&lt;/&gt;</span>
            <span>Frontend + Backend Curiosity</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
