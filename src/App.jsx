import { useState, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
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
  const [appReady, setAppReady] = useState(false)
  const [loadProgress, setLoadProgress] = useState(0)

  const handleReady = useCallback(() => setAppReady(true), [])

  return (
    <>
      <AnimatePresence>
        {!appReady && (
          <IntroOverlay progress={loadProgress} onFinish={handleReady} />
        )}
      </AnimatePresence>

      <div
        style={{ opacity: appReady ? 1 : 0, transition: 'opacity 0.6s ease-out' }}
        className="relative overflow-x-hidden"
      >
        <Navbar />
        <main>
          <Hero onLoadProgress={setLoadProgress} onReady={handleReady} />
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
      </div>
    </>
  )
}

export default App
