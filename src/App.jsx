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
import WaButton from './components/WaButton'

function App() {
  return (
    <div className="relative overflow-x-hidden">
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
    </div>
  )
}

export default App
