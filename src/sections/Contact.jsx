import { useEffect, useRef, useState } from 'react'
import { ArrowUp, Check, Copy, Mail, MapPin, Send, Terminal } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import ActionButton from '../components/ActionButton'

const EASE_OUT_EXPO = [0.22, 1, 0.36, 1]
const VIEWPORT_CONFIG = { once: true, amount: 0.15 }

const CONTACT_EMAIL = 'aanshidhazz@gmail.com'
const CURRENT_YEAR = new Date().getFullYear()

function GitHubIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-4 w-4"
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
      className="h-4 w-4"
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

function Contact() {
  const shouldReduceMotion = useReducedMotion()
  const [copied, setCopied] = useState(false)
  const copyTimerRef = useRef(null)

  useEffect(() => {
    return () => {
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current)
    }
  }, [])

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL)
      setCopied(true)
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current)
      copyTimerRef.current = setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard API unavailable in restricted contexts; fallback to mailto
      window.location.href = `mailto:${CONTACT_EMAIL}`
    }
  }

  return (
    <>
      <section
        id="contact"
        aria-labelledby="contact-heading"
        className="relative overflow-hidden border-t border-white/10 bg-background py-24 sm:py-28 lg:py-32"
      >
        {/* Subtle Ambient Bottom Glow */}
        <motion.div
          aria-hidden="true"
          animate={
            shouldReduceMotion
              ? undefined
              : { opacity: [0.16, 0.3, 0.16], scale: [1, 1.05, 1] }
          }
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-none absolute bottom-0 left-1/2 h-[380px] w-[640px] -translate-x-1/2 translate-y-1/3 rounded-full bg-[radial-gradient(circle,rgba(182,255,92,0.12)_0%,transparent_70%)] blur-3xl"
        />

        <div className="relative z-10 mx-auto max-w-6xl px-6">
          {/* Section Header */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_CONFIG}
            transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
            className="mb-12 sm:mb-14"
          >
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/10 px-3.5 py-1 text-xs font-medium tracking-wide text-accent">
              <Terminal className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Contact</span>
            </span>

            <h2
              id="contact-heading"
              className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
            >
              Let&apos;s <span className="text-accent">Connect</span>
            </h2>

            <p className="mt-4 max-w-xl text-base text-white/65 sm:text-lg">
              Open to learning opportunities, collaborations, and entry-level
              web development roles. Feel free to reach out anytime.
            </p>
          </motion.div>

          {/* Terminal Interface Card */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={VIEWPORT_CONFIG}
            transition={{ duration: 0.65, ease: EASE_OUT_EXPO }}
            className="relative overflow-hidden rounded-2xl border border-white/12 bg-[#101014]/95 shadow-[0_24px_70px_rgba(0,0,0,0.65)] backdrop-blur-xl"
          >
            {/* Top Accent Rim */}
            <div
              aria-hidden="true"
              className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent"
            />

            {/* Terminal Title Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 px-5 py-3.5">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5" aria-hidden="true">
                  <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                  <span className="h-2.5 w-2.5 rounded-full bg-accent/80" />
                </div>
                <span className="font-mono text-xs text-white/55">
                  anshid@portfolio:~/contact
                </span>
              </div>

              <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/25 bg-accent/10 px-2.5 py-0.5 font-mono text-[11px] text-accent">
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-full bg-accent"
                />
                <span>ready</span>
              </span>
            </div>

            {/* Terminal Body */}
            <div className="grid grid-cols-1 gap-8 p-6 sm:p-8 lg:grid-cols-12 lg:items-center">
              {/* Left: Command Output */}
              <div className="space-y-4 font-mono text-xs sm:text-sm lg:col-span-7">
                <div className="flex items-center gap-2 text-white/55">
                  <span className="text-accent">$</span>
                  <span>whoami --contact</span>
                </div>

                <div className="space-y-2.5 rounded-xl border border-white/8 bg-white/[0.02] p-4 sm:p-5">
                  <p className="text-white/85">
                    <span className="text-white/45">name:</span> Mohammed Anshid
                  </p>
                  <p className="text-white/85">
                    <span className="text-white/45">role:</span>{' '}
                    <span className="text-accent">Aspiring MERN Stack Developer</span>
                  </p>
                  <p className="flex items-center gap-1.5 text-white/85">
                    <span className="text-white/45">location:</span>
                    <MapPin className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                    <span>Kerala, India</span>
                  </p>
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <span className="text-white/45">email:</span>
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="text-foreground underline decoration-accent/50 underline-offset-4 transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                    >
                      {CONTACT_EMAIL}
                    </a>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      aria-label={copied ? 'Email address copied' : 'Copy email address'}
                      className="inline-flex items-center gap-1 rounded-md border border-white/12 bg-white/[0.04] px-2 py-0.5 text-[11px] text-white/75 transition-colors hover:border-accent/40 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                    >
                      {copied ? (
                        <>
                          <Check className="h-3 w-3 text-accent" aria-hidden="true" />
                          <span className="text-accent">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" aria-hidden="true" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Right: Direct Actions & Socials */}
              <div className="flex flex-col gap-5 lg:col-span-5 lg:items-end">
                <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto lg:flex-col">
                  <ActionButton
                    href={`mailto:${CONTACT_EMAIL}`}
                    variant="primary"
                    icon={Send}
                    className="w-full sm:w-auto lg:w-56"
                  >
                    Send Email
                  </ActionButton>
                  <ActionButton
                    href={`mailto:${CONTACT_EMAIL}?subject=Hello%20Anshid`}
                    variant="secondary"
                    icon={Mail}
                    className="w-full sm:w-auto lg:w-56"
                  >
                    Say Hello
                  </ActionButton>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  {SOCIAL_LINKS.map((social) => {
                    const Icon = social.icon

                    return (
                      <motion.a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.ariaLabel}
                        whileHover={shouldReduceMotion ? undefined : { y: -2, scale: 1.04 }}
                        whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
                        transition={{ type: 'spring', stiffness: 420, damping: 24 }}
                        className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-4 py-2 text-xs font-medium text-white/80 transition-colors hover:border-accent/50 hover:bg-accent/10 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                      >
                        <Icon />
                        <span>{social.name}</span>
                      </motion.a>
                    )
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Clean Footer */}
      <footer className="border-t border-white/10 bg-background py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-xs text-white/50 sm:flex-row">
          <p>
            &copy; {CURRENT_YEAR}{' '}
            <span className="font-medium text-white/80">Mohammed Anshid</span>.
            Built with React, Vite &amp; Tailwind CSS.
          </p>

          <a
            href="#home"
            className="inline-flex items-center gap-1.5 font-mono text-white/60 transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            <span>Back to top</span>
            <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </footer>
    </>
  )
}

export default Contact
