import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Experience from '@/components/sections/Experience'
import Skills from '@/components/sections/Skills'
import Projects from '@/components/sections/Projects'
import TechDecisions from '@/components/sections/TechDecisions'
import Performance from '@/components/sections/Performance'
import Contact from '@/components/sections/Contact'
import EasterEggController from '@/components/common/EasterEggController'

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <TechDecisions />
      <Performance />
      <Contact />
      <EasterEggController />
    </>
  )
}
