import { useState } from 'react'
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
  Sparkles,
  Terminal,
  Wrench,
} from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'

const EASE_OUT_EXPO = [0.22, 1, 0.36, 1]
const VIEWPORT_CONFIG = { once: true, amount: 0.15 }

const CATEGORIES = [
  {
    id: 'frontend',
    label: 'Frontend',
    tag: 'Current Skills',
    tagStatus: 'active',
    description: 'Building responsive, accessible interfaces for the web.',
    gridCols: 'grid-cols-2 md:grid-cols-4',
    skills: [
      {
        name: 'HTML',
        icon: Globe,
        note: 'Structure & Semantics',
        detail:
          'Writing clean, semantic, and accessible document structures as the foundation of every web interface.',
        connects: ['CSS', 'JavaScript', 'React'],
      },
      {
        name: 'CSS',
        icon: Palette,
        note: 'Styling & Layouts',
        detail:
          'Crafting responsive layouts with Flexbox, Grid, modern CSS tokens, and Tailwind CSS utility architecture.',
        connects: ['HTML', 'React'],
      },
      {
        name: 'JavaScript',
        icon: Braces,
        note: 'ES6+ & DOM',
        detail:
          'Building interactive client-side behavior using modern ES6+ syntax, async patterns, and DOM APIs.',
        connects: ['HTML', 'React', 'Node.js'],
      },
      {
        name: 'React',
        icon: Atom,
        note: 'UI Architecture',
        detail:
          'Structuring reusable functional components, hooks, and stateful user interfaces with smooth Motion.',
        connects: ['JavaScript', 'CSS', 'Vite'],
      },
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    tag: 'Currently Learning',
    tagStatus: 'learning',
    description: 'Exploring server-side development and database design.',
    gridCols: 'grid-cols-2 sm:grid-cols-3',
    skills: [
      {
        name: 'Node.js',
        icon: Server,
        note: 'Server Runtime',
        detail:
          'Learning server-side JavaScript execution, module architecture, and asynchronous backend workflows.',
        connects: ['JavaScript', 'Express.js'],
      },
      {
        name: 'Express.js',
        icon: Route,
        note: 'REST APIs',
        detail:
          'Exploring routing, middleware patterns, and building structured RESTful endpoints.',
        connects: ['Node.js', 'MongoDB'],
      },
      {
        name: 'MongoDB',
        icon: Database,
        note: 'NoSQL Database',
        detail:
          'Learning document-oriented data modeling, collections, and CRUD operations for MERN applications.',
        connects: ['Node.js', 'Express.js'],
      },
    ],
  },
  {
    id: 'tools',
    label: 'Tools',
    tag: 'Everyday Workflow',
    tagStatus: 'tools',
    description: 'Tools I use daily to write, track, and collaborate on code.',
    gridCols: 'grid-cols-2 sm:grid-cols-3',
    skills: [
      {
        name: 'Git',
        icon: GitBranch,
        note: 'Version Control',
        detail:
          'Tracking code history, branching cleanly, and keeping development changes organized.',
        connects: ['GitHub', 'VS Code'],
      },
      {
        name: 'GitHub',
        icon: FolderGit2,
        note: 'Remote Collaboration',
        detail:
          'Hosting repositories, managing commits, and sharing ongoing portfolio and learning code.',
        connects: ['Git'],
      },
      {
        name: 'VS Code',
        icon: Terminal,
        note: 'Code Editor',
        detail:
          'Primary editor for writing React, JavaScript, and Tailwind CSS with integrated terminal workflows.',
        connects: ['Git', 'React', 'Node.js'],
      },
    ],
  },
]

const FILTER_OPTIONS = [
  { id: 'all', label: 'All' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend (Learning)' },
  { id: 'tools', label: 'Tools' },
]

const TAG_STYLES = {
  active: 'border-accent/30 bg-accent/10 text-accent',
  learning: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300',
  tools: 'border-white/15 bg-white/[0.04] text-white/75',
}

const CARD_STATE_STYLES = {
  active: {
    base: 'hover:border-accent/45 hover:bg-accent/[0.04] hover:shadow-[0_0_26px_rgba(182,255,92,0.14)]',
    selected: 'border-accent/60 bg-accent/[0.07] shadow-[0_0_28px_rgba(182,255,92,0.18)]',
    icon: 'border-accent/25 bg-accent/10 text-accent',
    dot: 'bg-accent',
    statusLabel: 'Current Skill',
  },
  learning: {
    base: 'hover:border-emerald-400/40 hover:bg-emerald-400/[0.04] hover:shadow-[0_0_26px_rgba(52,211,153,0.12)]',
    selected: 'border-emerald-400/55 bg-emerald-400/[0.07] shadow-[0_0_26px_rgba(52,211,153,0.16)]',
    icon: 'border-emerald-400/25 bg-emerald-400/10 text-emerald-300',
    dot: 'bg-emerald-300',
    statusLabel: 'Currently Learning',
  },
  tools: {
    base: 'hover:border-white/30 hover:bg-white/[0.05] hover:shadow-[0_0_24px_rgba(255,255,255,0.07)]',
    selected: 'border-white/40 bg-white/[0.07] shadow-[0_0_24px_rgba(255,255,255,0.1)]',
    icon: 'border-white/15 bg-white/[0.05] text-white/80',
    dot: 'bg-white/60',
    statusLabel: 'Everyday Tool',
  },
}

const ALL_SKILLS = CATEGORIES.flatMap((cat) =>
  cat.skills.map((skill) => ({
    ...skill,
    categoryLabel: cat.label,
    tagStatus: cat.tagStatus,
  }))
)

function SkillCard({
  skill,
  tagStatus,
  delay,
  isSelected,
  isConnected,
  onSelect,
  shouldReduceMotion,
}) {
  const Icon = skill.icon
  const styles = CARD_STATE_STYLES[tagStatus]

  return (
    <motion.button
      type="button"
      onClick={() => onSelect(skill.name)}
      aria-pressed={isSelected}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 18, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={VIEWPORT_CONFIG}
      whileHover={shouldReduceMotion ? undefined : { y: -4, scale: 1.02 }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
      transition={{
        default: { duration: 0.45, delay, ease: EASE_OUT_EXPO },
        y: { type: 'spring', stiffness: 380, damping: 26 },
        scale: { type: 'spring', stiffness: 380, damping: 26 },
      }}
      className={`group relative w-full cursor-pointer rounded-xl border p-4 text-left transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
        isSelected
          ? styles.selected
          : isConnected
            ? 'border-accent/30 bg-white/[0.035]'
            : `border-white/10 bg-white/[0.025] ${styles.base}`
      }`}
    >
      {/* Top Rim Highlight */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent transition-opacity duration-300 ${
          isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        }`}
      />

      <div className="flex items-start justify-between gap-2">
        <motion.div
          whileHover={shouldReduceMotion ? undefined : { rotate: -6, scale: 1.08 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          className={`flex h-10 w-10 items-center justify-center rounded-lg border transition-transform duration-300 group-hover:scale-105 ${styles.icon}`}
        >
          <Icon className="h-5 w-5" aria-hidden="true" />
        </motion.div>

        <span
          aria-hidden="true"
          className={`mt-1 h-2 w-2 rounded-full ${styles.dot} ${
            tagStatus === 'learning' && !shouldReduceMotion ? 'animate-pulse' : ''
          }`}
        />
      </div>

      <div className="mt-3.5">
        <p className="text-sm font-semibold leading-tight text-foreground">
          {skill.name}
        </p>
        <p className="mt-1 text-xs text-white/55">{skill.note}</p>
      </div>
    </motion.button>
  )
}

function CategoryBlock({
  category,
  categoryIndex,
  selectedSkillName,
  connectedSet,
  onSelectSkill,
  shouldReduceMotion,
}) {
  const tagStyle = TAG_STYLES[category.tagStatus]

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT_CONFIG}
      transition={{
        duration: 0.55,
        delay: categoryIndex * 0.08,
        ease: EASE_OUT_EXPO,
      }}
    >
      {/* Category Header */}
      <div className="mb-2 flex flex-wrap items-center gap-3">
        <h3 className="text-base font-semibold tracking-tight text-foreground sm:text-lg">
          {category.label}
        </h3>
        <span
          className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${tagStyle}`}
        >
          {category.tag}
        </span>
      </div>

      <p className="mb-5 text-sm text-white/60">{category.description}</p>

      {/* Skill Cards Grid */}
      <div className={`grid gap-3.5 ${category.gridCols}`}>
        {category.skills.map((skill, skillIndex) => (
          <SkillCard
            key={skill.name}
            skill={skill}
            tagStatus={category.tagStatus}
            delay={categoryIndex * 0.06 + skillIndex * 0.05}
            isSelected={selectedSkillName === skill.name}
            isConnected={connectedSet.has(skill.name)}
            onSelect={onSelectSkill}
            shouldReduceMotion={shouldReduceMotion}
          />
        ))}
      </div>
    </motion.div>
  )
}

function Skills() {
  const shouldReduceMotion = useReducedMotion()
  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedSkillName, setSelectedSkillName] = useState('React')

  const selectedSkill =
    ALL_SKILLS.find((item) => item.name === selectedSkillName) ?? ALL_SKILLS[0]
  const connectedSet = new Set(selectedSkill?.connects ?? [])

  const visibleCategories =
    activeFilter === 'all'
      ? CATEGORIES
      : CATEGORIES.filter((cat) => cat.id === activeFilter)

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
            : { opacity: [0.2, 0.36, 0.2], scale: [1, 1.06, 1] }
        }
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute top-1/2 -left-24 h-[480px] w-[480px] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(182,255,92,0.11)_0%,transparent_70%)] blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* Section Header */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_CONFIG}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
          className="mb-10 flex flex-col items-start gap-3 sm:mb-12"
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

        {/* Legend & Category Filter Row */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div
            className="flex flex-wrap items-center gap-4 text-xs text-white/60"
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
              <span className="h-2 w-2 rounded-full bg-white/55" aria-hidden="true" />
              <span>Everyday Workflow</span>
            </div>
          </div>

          {/* Interactive Filter Pills */}
          <div
            role="group"
            aria-label="Filter skills by category"
            className="inline-flex flex-wrap gap-1.5 rounded-full border border-white/10 bg-white/[0.02] p-1"
          >
            {FILTER_OPTIONS.map((option) => {
              const isActive = activeFilter === option.id

              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setActiveFilter(option.id)}
                  aria-pressed={isActive}
                  className={`relative rounded-full px-3 py-1 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                    isActive
                      ? 'text-background'
                      : 'text-white/65 hover:text-foreground'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="skills-filter-pill"
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                      className="absolute inset-0 rounded-full bg-accent"
                    />
                  )}
                  <span className="relative z-10">{option.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Interactive Skill Inspector Bar */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedSkill.name}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.22, ease: EASE_OUT_EXPO }}
            aria-live="polite"
            className="mb-10 rounded-2xl border border-white/12 bg-[#101014]/90 p-5 backdrop-blur-md"
          >
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2.5">
                  <Sparkles className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                  <span className="font-mono text-sm font-semibold text-foreground">
                    {selectedSkill.name}
                  </span>
                  <span
                    className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${
                      TAG_STYLES[selectedSkill.tagStatus]
                    }`}
                  >
                    {CARD_STATE_STYLES[selectedSkill.tagStatus].statusLabel}
                  </span>
                  <span className="font-mono text-[11px] text-white/45">
                    &middot; {selectedSkill.categoryLabel}
                  </span>
                </div>

                <p className="text-sm leading-relaxed text-white/70">
                  {selectedSkill.detail}
                </p>
              </div>

              {selectedSkill.connects.length > 0 && (
                <div className="flex shrink-0 flex-wrap items-center gap-1.5 sm:justify-end">
                  <span className="mr-1 font-mono text-[11px] text-white/40">
                    pairs with:
                  </span>
                  {selectedSkill.connects.map((rel) => (
                    <span
                      key={rel}
                      className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-0.5 font-mono text-[11px] text-white/75"
                    >
                      {rel}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Category Sections */}
        <div className="space-y-12 sm:space-y-14">
          {visibleCategories.map((category, index) => (
            <div key={category.id}>
              <CategoryBlock
                category={category}
                categoryIndex={index}
                selectedSkillName={selectedSkillName}
                connectedSet={connectedSet}
                onSelectSkill={setSelectedSkillName}
                shouldReduceMotion={shouldReduceMotion}
              />
              {index < visibleCategories.length - 1 && (
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
          className="mt-14 text-center text-xs text-white/45 sm:mt-16"
        >
          <span className="text-accent">&#8594;</span> Click any technology card
          above to inspect its role and learning status.
        </motion.p>
      </div>
    </section>
  )
}

export default Skills
