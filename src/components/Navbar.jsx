import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from 'motion/react'

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

const EASE_OUT_EXPO = [0.22, 1, 0.36, 1]

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [hoveredHref, setHoveredHref] = useState(null)
  const [activeHref, setActiveHref] = useState('#home')
  const toggleButtonRef = useRef(null)

  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const nextScrolled = latest > 16
    setIsScrolled((prev) => (prev === nextScrolled ? prev : nextScrolled))
  })

  useEffect(() => {
    if (!isMobileOpen) return

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsMobileOpen(false)
        toggleButtonRef.current?.focus()
      }
    }

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('resize', handleResize)
    }
  }, [isMobileOpen])

  const handleLinkSelect = (href, event) => {
    // Prevent the native anchor jump — we control scrolling manually so it
    // works reliably even while the mobile drawer is mid-animation or unmounting.
    if (event) event.preventDefault()

    setActiveHref(href)
    setIsMobileOpen(false)

    // Give React one frame to begin the drawer exit before we scroll, so the
    // fixed header height is stable and scrollIntoView lands at the right spot.
    requestAnimationFrame(() => {
      const id = href.replace('#', '')
      const target = document.getElementById(id)
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      } else if (href === '#home') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    })
  }

  const hasBackdrop = isScrolled || isMobileOpen

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        hasBackdrop
          ? 'border-white/10 bg-background/80 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.45)]'
          : 'border-transparent bg-transparent backdrop-blur-none'
      }`}
    >
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 sm:h-18"
      >
        {/* Left: Brand Logo */}
        <a
          href="#home"
          onClick={(e) => handleLinkSelect('#home', e)}
          aria-label="Mohammed Anshid — Home"
          className="group inline-flex items-center gap-1.5 rounded-md py-1 text-base font-semibold tracking-[0.16em] text-foreground transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          <span>ANSHID</span>
          <span
            aria-hidden="true"
            className="h-2 w-2 rounded-full bg-accent shadow-[0_0_10px_rgba(182,255,92,0.75)] transition-transform duration-300 group-hover:scale-125"
          />
        </a>

        {/* Center: Desktop Navigation Links */}
        <ul
          onMouseLeave={() => setHoveredHref(null)}
          className="hidden items-center gap-8 md:flex"
        >
          {NAV_LINKS.map((item) => {
            const isActive = activeHref === item.href
            const isHovered = hoveredHref === item.href

            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(e) => handleLinkSelect(item.href, e)}
                  onMouseEnter={() => setHoveredHref(item.href)}
                  onFocus={() => setHoveredHref(item.href)}
                  onBlur={() => setHoveredHref(null)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative inline-block py-1 text-sm font-medium tracking-wide transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${
                    isActive || isHovered
                      ? 'text-foreground'
                      : 'text-white/65 hover:text-foreground'
                  }`}
                >
                  {item.label}

                  <AnimatePresence>
                    {isHovered && (
                      <motion.span
                        layoutId="navbar-link-underline"
                        aria-hidden="true"
                        initial={{ opacity: 0, scaleX: 0.7 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        exit={{ opacity: 0, scaleX: 0.7 }}
                        transition={{
                          type: 'spring',
                          stiffness: 460,
                          damping: 34,
                        }}
                        className="absolute inset-x-0 -bottom-0.5 h-0.5 origin-center rounded-full bg-accent"
                      />
                    )}
                  </AnimatePresence>
                </a>
              </li>
            )
          })}
        </ul>

        {/* Right: CTA & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <motion.a
            href="#contact"
            onClick={(e) => handleLinkSelect('#contact', e)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 450, damping: 28 }}
            className="group hidden items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-background transition-shadow duration-300 hover:shadow-[0_0_24px_rgba(182,255,92,0.35)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent md:inline-flex"
          >
            <span>Let&apos;s Talk</span>
            <ArrowUpRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </motion.a>

          <motion.button
            ref={toggleButtonRef}
            type="button"
            onClick={() => setIsMobileOpen((prev) => !prev)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
            aria-expanded={isMobileOpen}
            aria-controls="mobile-navigation"
            aria-label={isMobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-foreground transition-colors hover:border-white/20 hover:bg-white/[0.06] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              {isMobileOpen ? (
                <motion.span
                  key="close-icon"
                  initial={{ opacity: 0, rotate: -45 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 45 }}
                  transition={{ duration: 0.15 }}
                >
                  <X aria-hidden="true" className="h-5 w-5" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu-icon"
                  initial={{ opacity: 0, rotate: 45 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -45 }}
                  transition={{ duration: 0.15 }}
                >
                  <Menu aria-hidden="true" className="h-5 w-5" />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </nav>

      {/* Mobile Navigation Drawer */}
      {/* Wrapper is NOT overflow-hidden so exit animation doesn't block pointer
          events on page content that becomes visible underneath during collapse. */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            id="mobile-navigation"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: EASE_OUT_EXPO }}
            style={{ overflow: 'hidden' }}
            className="border-t border-white/10 bg-background/95 backdrop-blur-xl md:hidden"
          >
            <div className="mx-auto max-w-6xl px-6 py-5">
              <ul className="flex flex-col gap-1">
                {NAV_LINKS.map((item, index) => {
                  const isActive = activeHref === item.href

                  return (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -8 }}
                      transition={{
                        delay: index * 0.04,
                        duration: 0.22,
                        ease: EASE_OUT_EXPO,
                      }}
                    >
                      <a
                        href={item.href}
                        onClick={(e) => handleLinkSelect(item.href, e)}
                        aria-current={isActive ? 'page' : undefined}
                        className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-base font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                          isActive
                            ? 'bg-white/[0.06] text-foreground'
                            : 'text-white/70 hover:bg-white/[0.04] hover:text-foreground'
                        }`}
                      >
                        <span>{item.label}</span>
                        {isActive && (
                          <span
                            aria-hidden="true"
                            className="h-1.5 w-1.5 rounded-full bg-accent"
                          />
                        )}
                      </a>
                    </motion.li>
                  )
                })}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ delay: 0.2, duration: 0.22, ease: EASE_OUT_EXPO }}
                className="mt-4 border-t border-white/10 pt-4"
              >
                <motion.a
                  href="#contact"
                  onClick={(e) => handleLinkSelect('#contact', e)}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-background transition-shadow duration-300 hover:shadow-[0_0_24px_rgba(182,255,92,0.35)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  <span>Let&apos;s Talk</span>
                  <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default Navbar
