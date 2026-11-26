import {
  Atom,
  Braces,
  Database,
  FolderGit2,
  GitBranch,
  Globe,
  Palette,
  Route,
  Server,
  Terminal,
  Wrench,
} from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'

const EASE_OUT_EXPO = [0.22, 1, 0.36, 1]
const VIEWPORT_CONFIG = { once: true, amount: 0.15 }

const CATEGORIES = [
  {
    id: 'frontend',
    label: 'Frontend',
    tag: 'Current Skills',
    tagStatus: 'active',
    description: 'Building responsive, accessible interfaces for the web.',
    skills: [
      { name: 'HTML', icon: Globe, note: 'Structure & Semantics' },
      { name: 'CSS', icon: Palette, note: 'Styling & Layouts' },
      { name: 'JavaScript', icon: Braces, note: 'ES6+ & DOM' },
      { name: 'React', icon: Atom, note: 'UI Architecture' },
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    tag: 'Currently Learning',
    tagStatus: 'learning',
    description: 'Exploring server-side development and database design.',
    skills: [
      { name: 'Node.js', icon: Server, note: 'Server Runtime' },
      { name: 'Express.js', icon: Route, note: 'REST APIs' },
      { name: 'MongoDB', icon: Database, note: 'NoSQL Database' },
    ],
  },
  {
    id: 'tools',
    label: 'Tools',
    tag: 'Everyday Workflow',
    tagStatus: 'tools',
    description: 'Tools I use daily to write, track, and collaborate on code.',
    skills: [
      { name: 'Git', icon: GitBranch, note: 'Version Control' },
      { name: 'GitHub', icon: FolderGit2, note: 'Remote Collaboration' },
      { name: 'VS Code', icon: Terminal, note: 'Code Editor' },
    ],
  },
]

const TAG_STYLES = {
  active:
    'border-accent/30 bg-accent/10 text-accent',
  learning:
    'border-emerald-400/30 bg-emerald-400/10 text-emerald-300',
  tools:
    'border-white/15 bg-white/[0.04] text-white/70',
}

const GLOW_COLORS = {
  active: 'hover:border-accent/40 hover:shadow-[0_0_22px_rgba(226,162,58,0.14)] hover:bg-accent/[0.04]',
  learning: 'hover:border-emerald-400/35 hover:shadow-[0_0_22px_rgba(52,211,153,0.12)] hover:bg-emerald-400/[0.03]',
  tools: 'hover:border-white/25 hover:shadow-[0_0_22px_rgba(255,255,255,0.06)] hover:bg-white/[0.04]',
}

const ICON_COLORS = {
  active: 'text-accent border-accent/25 bg-accent/10',
  learning: 'text-emerald-300 border-emerald-400/25 bg-emerald-400/10',
  tools: 'text-white/75 border-white/15 bg-white/[0.04]',
}

function SkillCard({ skill, tagStatus, delay, shouldReduceMotion }) {
  const Icon = skill.icon

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 18, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={VIEWPORT_CONFIG}
      whileHover={shouldReduceMotion ? undefined : { y: -4, scale: 1.03 }}
      transition={{
        default: { duration: 0.45, delay, ease: EASE_OUT_EXPO },
        y: { type: 'spring', stiffness: 380, damping: 26 },
        scale: { type: 'spring', stiffness: 380, damping: 26 },
      }}
      className={`group cursor-default rounded-xl border border-white/10 bg-white/[0.025] p-4 transition-colors duration-300 ${GLOW_COLORS[tagStatus]}`}
    >
      <div className="flex flex-col items-start gap-3">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-lg border ${ICON_COLORS[tagStatus]}`}
        >
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground leading-tight">
            {skill.name}
          </p>
          <p className="mt-0.5 text-xs text-white/55">{skill.note}</p>
        </div>
      </div>
    </motion.div>
  )
}

function CategoryBlock({ category, categoryIndex, shouldReduceMotion }) {
  const tagStyle = TAG_STYLES[category.tagStatus]

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT_CONFIG}
      transition={{
        duration: 0.6,
        delay: categoryIndex * 0.1,
        ease: EASE_OUT_EXPO,
      }}
    >
      {/* Category Header */}
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="text-base font-semibold tracking-tight text-foreground sm:text-lg">
            {category.label}
          </span>
          <span
            className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${tagStyle}`}
          >
            {category.tag}
          </span>
        </div>
      </div>

      <p className="mb-5 text-sm text-white/60">{category.description}</p>

      {/* Skill Cards Grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
        {category.skills.map((skill, skillIndex) => (
          <SkillCard
            key={skill.name}
            skill={skill}
            tagStatus={category.tagStatus}
            delay={categoryIndex * 0.08 + skillIndex * 0.06}
            shouldReduceMotion={shouldReduceMotion}
          />
        ))}
      </div>
    </motion.div>
  )
}

function Skills() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="relative overflow-hidden border-t border-white/10 bg-background py-24 sm:py-28 lg:py-32"
    >
      {/* Ambient Left Glow */}
      <motion.div
        aria-hidden="true"
        animate={
          shouldReduceMotion
            ? undefined
            : { opacity: [0.2, 0.38, 0.2], scale: [1, 1.06, 1] }
        }
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute top-1/2 -left-24 h-[480px] w-[480px] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(226,162,58,0.11)_0%,transparent_70%)] blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* Section Header */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_CONFIG}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
          className="mb-14 flex flex-col items-start gap-3 sm:mb-16"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/10 px-3.5 py-1 text-xs font-medium tracking-wide text-accent">
            <Wrench className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Skills</span>
          </span>

          <h2
            id="skills-heading"
            className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
          >
            Technologies I{' '}
            <span className="text-accent">Work With</span>
          </h2>

          <p className="max-w-xl text-base text-white/65 sm:text-lg">
            Tools and technologies I&apos;m learning and using to build modern
            web applications.
          </p>
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_CONFIG}
          transition={{ duration: 0.5, delay: 0.1, ease: EASE_OUT_EXPO }}
          className="mb-10 flex flex-wrap items-center gap-4 text-xs text-white/55"
          aria-label="Skill status legend"
        >
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
            <span>Current Skills</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-300" aria-hidden="true" />
            <span>Currently Learning</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-white/40" aria-hidden="true" />
            <span>Everyday Workflow</span>
          </div>
        </motion.div>

        {/* Category Divider Sections */}
        <div className="space-y-12 sm:space-y-14">
          {CATEGORIES.map((category, index) => (
            <div key={category.id}>
              <CategoryBlock
                category={category}
                categoryIndex={index}
                shouldReduceMotion={shouldReduceMotion}
              />
              {index < CATEGORIES.length - 1 && (
                <div
                  aria-hidden="true"
                  className="mt-12 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent sm:mt-14"
                />
              )}
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <motion.p
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={VIEWPORT_CONFIG}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE_OUT_EXPO }}
          className="mt-14 text-center text-xs text-white/40 sm:mt-16"
        >
          <span className="text-accent">&#8594;</span> Always learning, always
          building — expanding this stack with every project.
        </motion.p>
      </div>
    </section>
  )
}

export default Skills
