import { Clock, Code2, Layers, Lightbulb, Rocket, Sparkles } from 'lucide-react'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react'
import { useRef } from 'react'

const EASE_OUT_EXPO = [0.22, 1, 0.36, 1]
const VIEWPORT_CONFIG = { once: true, amount: 0.15 }

const STATUS_CONFIG = {
  building: {
    label: 'Currently Building',
    icon: Rocket,
    classes: 'border-accent/35 bg-accent/10 text-accent',
    dot: 'bg-accent animate-pulse',
  },
  planning: {
    label: 'Idea / Planning',
    icon: Lightbulb,
    classes: 'border-yellow-400/35 bg-yellow-400/10 text-yellow-300',
    dot: 'bg-yellow-300',
  },
  soon: {
    label: 'Coming Soon',
    icon: Clock,
    classes: 'border-white/20 bg-white/[0.04] text-white/65',
    dot: 'bg-white/40',
  },
}

const PROJECTS = [
  {
    id: 'portfolio',
    number: '01',
    title: 'Personal Portfolio',
    description:
      'My personal developer portfolio, built to showcase my skills, learning journey, and future projects. Crafted with a focus on clean design, smooth animations, and responsive layout.',
    status: 'building',
    tech: ['React', 'Vite', 'Tailwind CSS', 'Motion'],
    icon: Code2,
  },
  {
    id: 'healthcare',
    number: '02',
    title: 'Healthcare Platform',
    description:
      'An early-stage concept for a platform connecting patients, family caregivers, doctors, and hospitals—aiming to improve communication and coordination in healthcare.',
    status: 'planning',
    tech: ['MERN Stack (Planned)'],
    icon: Layers,
  },
  {
    id: 'coming-soon',
    number: '03',
    title: 'More Projects Coming Soon',
    description:
      'I am continuously learning and working towards building practical projects. Each new project will reflect my growth as a developer.',
    status: 'soon',
    tech: [],
    icon: Sparkles,
  },
]

// 3D tilt card — only active on devices with a fine pointer (desktop)
function TiltCard({ children, className }) {
  const shouldReduceMotion = useReducedMotion()
  const ref = useRef(null)

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [5, -5]), { stiffness: 280, damping: 28 })
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-6, 6]), { stiffness: 280, damping: 28 })

  const handleMove = (e) => {
    if (shouldReduceMotion || !ref.current) return
    // Only engage tilt for fine-pointer (mouse), not touch
    if (e.pointerType === 'touch') return
    const rect = ref.current.getBoundingClientRect()
    rawX.set((e.clientX - rect.left) / rect.width - 0.5)
    rawY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleLeave = () => {
    rawX.set(0)
    rawY.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={shouldReduceMotion ? undefined : { rotateX, rotateY, transformPerspective: 900 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function ProjectCard({ project, index }) {
  const shouldReduceMotion = useReducedMotion()
  const statusCfg = STATUS_CONFIG[project.status]
  const StatusIcon = statusCfg.icon
  const CardIcon = project.icon

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT_CONFIG}
      transition={{ duration: 0.6, delay: index * 0.12, ease: EASE_OUT_EXPO }}
    >
      <TiltCard className="group relative h-full rounded-2xl border border-white/10 bg-white/[0.025] p-6 transition-colors duration-300 hover:border-accent/25 hover:bg-white/[0.04] hover:shadow-[0_0_40px_rgba(226,162,58,0.07)]">
        {/* Subtle top rim on hover */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />

        {/* Card Header */}
        <div className="mb-5 flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-accent/25 bg-accent/10 text-accent">
              <CardIcon className="h-5 w-5" aria-hidden="true" />
            </div>
            <span className="font-mono text-xs tracking-widest text-white/35 select-none">
              {project.number}
            </span>
          </div>

          {/* Status Badge */}
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium ${statusCfg.classes}`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${statusCfg.dot}`} aria-hidden="true" />
            <StatusIcon className="h-3 w-3" aria-hidden="true" />
            {statusCfg.label}
          </span>
        </div>

        {/* Title & Description */}
        <h3 className="mb-2 text-lg font-semibold tracking-tight text-foreground sm:text-xl">
          {project.title}
        </h3>
        <p className="text-sm leading-relaxed text-white/65 sm:text-base">
          {project.description}
        </p>

        {/* Technology Chips */}
        {project.tech.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2" aria-label="Technologies">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] text-white/65"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        {/* Bottom decorative accent line */}
        <div
          aria-hidden="true"
          className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
      </TiltCard>
    </motion.div>
  )
}

function Projects() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="relative overflow-hidden border-t border-white/10 bg-background py-24 sm:py-28 lg:py-32"
    >
      {/* Ambient top-right glow */}
      <motion.div
        aria-hidden="true"
        animate={
          shouldReduceMotion
            ? undefined
            : { opacity: [0.18, 0.32, 0.18], scale: [1, 1.07, 1] }
        }
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute -top-16 right-0 h-[500px] w-[500px] translate-x-1/3 rounded-full bg-[radial-gradient(circle,rgba(226,162,58,0.12)_0%,transparent_70%)] blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* Section Header */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_CONFIG}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
          className="mb-14 sm:mb-16"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/10 px-3.5 py-1 text-xs font-medium tracking-wide text-accent">
            <Rocket className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Projects</span>
          </span>

          <h2
            id="projects-heading"
            className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
          >
            What I&apos;m{' '}
            <span className="text-accent">Working On</span>
          </h2>

          <p className="mt-4 max-w-xl text-base text-white/65 sm:text-lg">
            As a beginner developer, I&apos;m building my first real projects and
            forming ideas for what comes next. Honest progress, shared openly.
          </p>
        </motion.div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Bottom Note */}
        <motion.p
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={VIEWPORT_CONFIG}
          transition={{ duration: 0.6, delay: 0.4, ease: EASE_OUT_EXPO }}
          className="mt-14 text-center text-xs text-white/40 sm:mt-16"
        >
          <span className="text-accent">&#8594;</span>{' '}
          Every project here is a real, honest reflection of where I am in my journey.
        </motion.p>
      </div>
    </section>
  )
}

export default Projects
