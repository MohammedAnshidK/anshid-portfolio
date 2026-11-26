import { MotionConfig } from 'motion/react'
import { useCallback, useState } from 'react'
import CursorGlow from './components/CursorGlow'
import IntroAnimation from './components/IntroAnimation'
import Navbar from './components/Navbar'
import About from './sections/About'
import Hero from './sections/Hero'
import Projects from './sections/Projects'
import Skills from './sections/Skills'

function App() {
  const [introComplete, setIntroComplete] = useState(false)
  const handleIntroComplete = useCallback(() => setIntroComplete(true), [])

  return (
    <MotionConfig reducedMotion="user">
      {/* Intro animation overlay — renders over everything, non-blocking */}
      <IntroAnimation onComplete={handleIntroComplete} />

      {/* Cursor glow — desktop fine-pointer only */}
      <CursorGlow />

      <div
        className="min-h-screen bg-background text-foreground"
        // Prevent interaction during intro only on the first 2.2s; after that
        // the overlay is gone and this attr is removed.
        aria-busy={!introComplete || undefined}
      >
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
        </main>
      </div>
    </MotionConfig>
  )
}

export default App
