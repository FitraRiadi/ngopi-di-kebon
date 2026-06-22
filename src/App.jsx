import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import SuasanaCarousel from './components/SuasanaCarousel'
import WhyUs from './components/WhyUs'
import Menu from './components/Menu'
import Gallery from './components/Gallery'
import AktivitasCarousel from './components/AktivitasCarousel'
import Location from './components/Location'
import Testimonials from './components/Testimonials'
import Footer from './components/Footer'
import IntroOverlay from './components/IntroOverlay'
import WaButton from './components/WaButton'

function App() {
  const [introDone, setIntroDone] = useState(false)

  return (
    <>
      <AnimatePresence>
        {!introDone && <IntroOverlay onFinish={() => setIntroDone(true)} />}
      </AnimatePresence>
      {introDone && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative overflow-x-hidden"
        >
          <Navbar />
          <main>
            <Hero />
            <About />
            <SuasanaCarousel />
            <WhyUs />
            <Menu />
            <Gallery />
            <AktivitasCarousel />
            <Location />
            <Testimonials />
          </main>
          <Footer />
          <WaButton />
        </motion.div>
      )}
    </>
  )
}

export default App
