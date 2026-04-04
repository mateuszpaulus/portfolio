import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Projects from '@/components/sections/Projects'
import TechDecisions from '@/components/sections/TechDecisions'
import Performance from '@/components/sections/Performance'
import Contact from '@/components/sections/Contact'

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <TechDecisions />
      <Performance />
      <Contact />
    </>
  )
}
