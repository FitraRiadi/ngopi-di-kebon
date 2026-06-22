import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { HiStar, HiChevronLeft, HiChevronRight } from 'react-icons/hi'

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  {
    name: 'Dewi Lestari',
    role: 'Pengunjung',
    text: 'Pemandangan citylight Bandung dari atas bukit sungguh luar biasa! Tempatnya nyaman, cocok banget buat melepas penat setelah hiruk pikuk kota. Kopinya juga enak!',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
  },
  {
    name: 'Andi Pratama',
    role: 'Pemandu Lokal',
    text: 'Jalan menanjaknya cukup menantang, butuh effort ekstra untuk sampai ke sini. Tapi begitu sampai, semua terbayar lunas! Pemandangan dan suasananya juara.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
  },
  {
    name: 'Maya Putri',
    role: 'Pengunjung Keluarga',
    text: 'Bawa keluarga besar ke sini, semua puas! Anak-anak betah main di kebun, ada menu khusus anak juga. Tempat duduk outdoor-nya asik banget buat ngumpul.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
  },
  {
    name: 'Rizky Hidayat',
    role: 'Wisatawan',
    text: 'Rekomendasi banget buat yang mau hunting foto malam. Citylight Bandung dari sini keren abis! Makanannya standar tapi worth it sama pengalamannya.',
    rating: 4,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
  },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)
  const sectionRef = useRef(null)
  const titleRef = useRef(null)

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

  const next = () => {
    setDirection(1)
    setCurrent((prev) => (prev + 1) % testimonials.length)
  }

  const prev = () => {
    setDirection(-1)
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
  }

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative py-20 sm:py-28 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #efe0cf 0%, #e8d5be 50%, #f0e3d4 100%)',
      }}
    >
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=1600&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-beige/40 via-transparent to-beige/40 pointer-events-none" />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center mb-12">
          <span className="text-forest font-medium text-sm tracking-[0.2em] uppercase">
            Testimoni
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-espresso font-bold mt-3">
            Kata Pengunjung
          </h2>
        </div>

        <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-sm p-8 sm:p-12">
          <div className="flex items-center gap-1 mb-6">
            {[...Array(testimonials[current].rating)].map((_, i) => (
              <HiStar key={i} className="text-gold text-xl" />
            ))}
          </div>

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            >
              <p className="text-espresso text-lg sm:text-xl leading-relaxed italic mb-8">
                "{testimonials[current].text}"
              </p>

              <div className="flex items-center gap-4">
                <img
                  src={testimonials[current].image}
                  alt={testimonials[current].name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-espresso">{testimonials[current].name}</p>
                  <p className="text-espresso-light text-sm">{testimonials[current].role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-between mt-8 pt-6 border-t border-beige/50">
            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => { setDirection(idx > current ? 1 : -1); setCurrent(idx) }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === current ? 'bg-forest w-6' : 'bg-forest/30'
                  }`}
                />
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={prev}
                className="p-2.5 rounded-full bg-forest/10 hover:bg-forest/20 text-espresso transition-colors cursor-pointer"
              >
                <HiChevronLeft size={20} />
              </button>
              <button
                onClick={next}
                className="p-2.5 rounded-full bg-forest/10 hover:bg-forest/20 text-espresso transition-colors cursor-pointer"
              >
                <HiChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
