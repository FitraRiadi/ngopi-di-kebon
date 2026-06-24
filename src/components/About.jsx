import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import { HiSun, HiStar } from 'react-icons/hi'
import { LuLeaf, LuCoffee, LuTreePine, LuUtensils, LuCircleCheck } from 'react-icons/lu'
import { useLenis } from 'lenis/react'

gsap.registerPlugin(ScrollTrigger)

const highlights = [
  { icon: LuTreePine, label: 'Suasana Kebun' },
  { icon: LuCoffee, label: 'Kopi & Teh Premium' },
  { icon: HiSun, label: 'Citylight Bandung' },
  { icon: LuUtensils, label: 'Makanan Halal' },
  { icon: HiStar, label: 'Rating 4.6' },
  { icon: LuCircleCheck, label: 'Parkir Luas' },
]

const aboutImages = import.meta.glob('/src/assets/cinematic-frame/*.webp', {
  eager: true,
  import: 'default',
})
const aboutImageUrls = Object.values(aboutImages)

export default function About() {
  const sectionRef = useRef(null)
  const bgRef = useRef(null)
  const leftRef = useRef(null)
  const rightRef = useRef(null)
  const lenis = useLenis()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        bgRef.current,
        { scale: 1.1 },
        {
          scale: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        }
      )
      gsap.fromTo(
        leftRef.current,
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'center 60%',
            toggleActions: 'play none none reverse',
          },
        }
      )
      gsap.fromTo(
        rightRef.current,
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'center 60%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-20 sm:py-28 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #F5E6D3 0%, #e8d5be 50%, #F5E6D3 100%)',
      }}
    >
      <div className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=1600&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-beige/60 via-transparent to-beige/60 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div ref={leftRef} className="relative">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-xl">
              <img
                src={aboutImageUrls[0] || 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&q=80'}
                alt="Ngopi Di Kebon garden atmosphere"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-forest text-cream p-6 rounded-2xl shadow-xl hidden sm:block">
              <p className="text-3xl font-serif font-bold">4.6</p>
              <p className="text-sm text-beige/80">Rating Google</p>
            </div>
          </div>

          <div ref={rightRef} className="space-y-6">
            <span className="text-forest font-medium text-sm tracking-[0.2em] uppercase">
              Tentang Kami
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-espresso font-bold leading-tight">
              Indonesian Restaurant
              <span className="block text-forest">with 360° Bandung Views</span>
            </h2>

            <p className="text-espresso-light leading-relaxed text-base sm:text-lg">
              Ngopi Di Kebon adalah restoran Indonesia asli dengan interior hangat & area makan 
              luar ruangan yang dikelilingi oleh tanaman hijau subur. Terletak di ketinggian Cimenyan, 
              tempat ini sangat cocok untuk berkumpul, menikmati pemandangan 360° kota Bandung 
              di sore dan malam hari dari atas bukit untuk melepas penat.
            </p>

            <p className="text-espresso-light leading-relaxed text-base sm:text-lg">
              Dengan rating 4.6 dari 3.250+ ulasan, kami menyajikan berbagai hidangan 
              mulai dari sop buntut, udang telur asin, gurame terbang, hingga aneka 
              jajanan tradisional — semua dengan cita rasa yang memanjakan.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              {highlights.map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <item.icon className="text-gold text-lg" />
                  <span className="text-espresso text-sm font-medium">{item.label}</span>
                </div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => lenis.scrollTo('#menu')}
              className="inline-block bg-forest hover:bg-forest-light text-cream font-medium px-8 py-3.5 rounded-full transition-colors duration-300 cursor-pointer"
            >
              Lihat Menu Kami
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  )
}
