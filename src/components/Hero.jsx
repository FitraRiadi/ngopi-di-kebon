import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import { HiArrowRight } from 'react-icons/hi'
import { useLenis } from 'lenis/react'

gsap.registerPlugin(ScrollTrigger)

const images = [
  'https://www.image2url.com/r2/default/images/1782160242592-b0f3630c-7937-4235-bee9-efee8388f47a.webp',
]

export default function Hero() {
  const sectionRef = useRef(null)
  const bgRef = useRef(null)
  const textRef = useRef(null)
  const lenis = useLenis()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        bgRef.current,
        { scale: 1.2 },
        {
          scale: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
          },
        }
      )

      gsap.fromTo(
        textRef.current,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          ease: 'power3.out',
        }
      )

      gsap.fromTo(
        textRef.current,
        { y: 0 },
        {
          y: -80,
          opacity: 0.5,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'center center',
            scrub: 1,
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const scrollTo = (href) => {
    lenis.scrollTo(href)
  }

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative h-screen overflow-hidden"
    >
      <div
        ref={bgRef}
        className="absolute inset-0 bg-cover bg-center will-change-transform"
        style={{ backgroundImage: `url(${images[0]})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/40 via-transparent to-transparent" />

      <div
        ref={textRef}
        className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4"
      >
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-beige/80 tracking-[0.3em] uppercase text-sm sm:text-base font-medium mb-4"
        >
          Selamat Datang di
        </motion.span>

        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-cream font-bold leading-tight mb-6">
          Ngopi
          <span className="block text-gold">Di Kebon</span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-beige/90 text-base sm:text-lg md:text-xl max-w-xl mb-10 font-light"
        >
          Authentic Indonesia Cuisine with 360° Bandung Views
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <button
            onClick={() => scrollTo('#menu')}
            className="group inline-flex items-center gap-2 bg-gold hover:bg-gold/90 text-espresso font-medium px-8 py-3.5 rounded-full transition-all duration-300 cursor-pointer"
          >
            Lihat Menu
            <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => scrollTo('#location')}
            className="inline-flex items-center gap-2 border-2 border-cream/40 hover:border-cream/80 text-cream font-medium px-8 py-3.5 rounded-full transition-all duration-300 cursor-pointer"
          >
            Kunjungi Kami
          </button>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-beige/60 text-xs tracking-widest uppercase">Gulir</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-px h-8 bg-beige/40"
        />
      </div>
    </section>
  )
}
