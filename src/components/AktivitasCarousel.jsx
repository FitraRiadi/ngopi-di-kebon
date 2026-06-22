import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import { LuCoffee, LuMusic, LuCamera, LuUsers, LuSunset } from 'react-icons/lu'

gsap.registerPlugin(ScrollTrigger)

const activities = [
  {
    icon: LuCoffee,
    title: 'Kelas Kopi',
    desc: 'Belajar menyeduh kopi ala barista profesional. Dari teknik pour-over hingga latte art, kami bimbing Anda dari nol.',
    tag: 'Setiap Sabtu',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80',
  },
  {
    icon: LuMusic,
    title: 'Live Akustik',
    desc: 'Nikmati alunan musik akustik setiap akhir pekan. Temukan suasana hangat ditemani lagu-lagu favorit Anda.',
    tag: 'Jumat & Sabtu Malam',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80',
  },
  {
    icon: LuCamera,
    title: 'Fotografi Senja',
    desc: 'Abadikan momen golden hour dengan latar pemandangan Bandung dari ketinggian. Spot foto terbaik menanti Anda.',
    tag: 'Setiap Hari',
    image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&q=80',
  },
  {
    icon: LuUsers,
    title: 'Gathering Kebun',
    desc: 'Rayakan momen spesial bersama keluarga, teman, atau rekan kerja di tengah kebun yang asri dan menenangkan.',
    tag: 'Reservasi',
    image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&q=80',
  },
  {
    icon: LuSunset,
    title: 'Ngopi Senja',
    desc: 'Program spesial menikmati kopi favorit sambil menyaksikan matahari terbenam. Diskon khusus untuk pengunjung sore.',
    tag: '15:00 - 17:00',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&q=80',
  },
]

export default function AktivitasCarousel() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const timerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
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

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setDirection(1)
      setCurrent((prev) => (prev + 1) % activities.length)
    }, 5000)
    return () => clearInterval(timerRef.current)
  }, [])

  const goTo = (idx) => {
    setDirection(idx > current ? 1 : -1)
    setCurrent(idx)
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setDirection(1)
      setCurrent((prev) => (prev + 1) % activities.length)
    }, 5000)
  }

  const next = () => goTo((current + 1) % activities.length)
  const prev = () => goTo((current - 1 + activities.length) % activities.length)

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? 400 : -400, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -400 : 400, opacity: 0 }),
  }

  return (
    <section
      id="aktivitas"
      ref={sectionRef}
      className="relative py-20 sm:py-28 bg-espresso text-cream overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1498804103079-a6351b050096?w=1600&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-espresso via-transparent to-espresso pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center mb-12">
          <span className="text-gold font-medium text-sm tracking-[0.2em] uppercase">
            Aktivitas & Acara
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mt-3">
            Lebih dari Sekadar Kopi
          </h2>
          <p className="text-beige/70 mt-4 max-w-lg mx-auto">
            Setiap kunjungan menghadirkan pengalaman baru yang tak terlupakan
          </p>
        </div>

        <div className="relative">
          <div className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="grid md:grid-cols-2 gap-0"
              >
                <div className="aspect-[4/3] md:aspect-auto md:h-full overflow-hidden">
                  <img
                    src={activities[current].image}
                    alt={activities[current].title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8 sm:p-10 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 rounded-xl bg-gold/20">
                      {(() => {
                        const Icon = activities[current].icon
                        return Icon && <Icon className="text-gold" size={22} />
                      })()}
                    </div>
                    <span className="text-gold text-xs font-medium tracking-wider uppercase px-3 py-1 rounded-full bg-gold/10">
                      {activities[current].tag}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-cream mb-4">
                    {activities[current].title}
                  </h3>
                  <p className="text-beige/80 leading-relaxed text-base">
                    {activities[current].desc}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 p-3 rounded-full bg-cream/10 hover:bg-cream/20 text-cream transition-colors cursor-pointer hidden sm:block"
          >
            <HiChevronLeft size={22} />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 p-3 rounded-full bg-cream/10 hover:bg-cream/20 text-cream transition-colors cursor-pointer hidden sm:block"
          >
            <HiChevronRight size={22} />
          </button>
        </div>

        <div className="flex items-center justify-center gap-2 mt-8">
          {activities.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                idx === current ? 'bg-gold w-8' : 'bg-cream/30 w-2 hover:bg-cream/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
