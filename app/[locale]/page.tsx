import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Projects from '@/components/sections/Projects'
import TechDecisions from '@/components/sections/TechDecisions'

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <TechDecisions />
      <div id="contact" />
    </>
  )
}
