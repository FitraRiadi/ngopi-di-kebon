import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'

import bgTexture from '../assets/suasana/suasana-1.jpg'

gsap.registerPlugin(ScrollTrigger)

const activities = [
  {
    title: 'Kelas Kopi',
    desc: 'Belajar menyeduh kopi ala barista profesional. Dari teknik pour-over hingga latte art, kami bimbing Anda dari nol.',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&q=80',
  },
  {
    title: 'Live Akustik',
    desc: 'Nikmati alunan musik akustik setiap akhir pekan. Temukan suasana hangat ditemani lagu-lagu favorit Anda.',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1200&q=80',
  },
  {
    title: 'Fotografi Senja',
    desc: 'Abadikan momen golden hour dengan latar pemandangan Bandung dari ketinggian. Spot foto terbaik menanti Anda.',
    image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=1200&q=80',
  },
  {
    title: 'Gathering Kebun',
    desc: 'Rayakan momen spesial bersama keluarga, teman, atau rekan kerja di tengah kebun yang asri dan menenangkan.',
    image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1200&q=80',
  },
  {
    title: 'Ngopi Senja',
    desc: 'Program spesial menikmati kopi favorit sambil menyaksikan matahari terbenam. Diskon khusus untuk pengunjung sore.',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200&q=80',
  },
]

export default function AktivitasCarousel() {
  const [current, setCurrent] = useState(0)
  const [prevIdx, setPrevIdx] = useState(0)
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const timerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%', end: 'center 60%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setPrevIdx(current)
      setCurrent((prev) => (prev + 1) % activities.length)
    }, 5000)
    return () => clearInterval(timerRef.current)
  }, [current])

  const goTo = (idx) => {
    if (idx === current) return
    setPrevIdx(current)
    setCurrent(idx)
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setPrevIdx(idx)
      setCurrent((prev) => (prev + 1) % activities.length)
    }, 5000)
  }

  const next = () => goTo((current + 1) % activities.length)
  const prev = () => goTo((current - 1 + activities.length) % activities.length)

  return (
    <section
      id="aktivitas"
      ref={sectionRef}
      className="relative py-20 sm:py-28 bg-cream text-espresso overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url(${bgTexture})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.25,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-cream via-transparent to-cream pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center mb-12 sm:mb-16">
          <span className="text-forest font-medium text-sm tracking-[0.2em] uppercase">
            Aktivitas & Acara
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mt-3 text-espresso">
            Lebih dari Sekadar Kopi
          </h2>
          <p className="text-espresso-light/70 mt-4 max-w-lg mx-auto">
            Setiap kunjungan menghadirkan pengalaman baru yang tak terlupakan
          </p>
        </div>

        <div className="relative">
          <div className="relative h-[420px] sm:h-[520px] md:h-[560px] rounded-3xl overflow-hidden bg-espresso/50">
            {activities.map((item, idx) => {
              const isActive = idx === current
              return (
                <div
                  key={item.title}
                  className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                    isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] ease-out ${
                      isActive ? 'scale-100' : 'scale-110'
                    }`}
                    loading={idx < 2 ? 'eager' : 'lazy'}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/40 to-espresso/5" />
                  <div className="absolute inset-0 bg-gradient-to-r from-espresso/70 via-espresso/20 to-transparent" />

                  <div className="absolute top-6 right-6 sm:top-8 sm:right-8 text-[10rem] sm:text-[16rem] md:text-[20rem] font-serif font-bold text-cream/[0.04] leading-none select-none pointer-events-none tracking-tighter">
                    {String(idx + 1).padStart(2, '0')}
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 md:p-14">
                    <div className="max-w-xl">

                      <h3 className={`font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-cream mb-3 sm:mb-4 leading-tight transition-all duration-500 delay-300 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                        {item.title}
                      </h3>
                      <p className={`text-beige/80 leading-relaxed text-sm sm:text-base max-w-lg transition-all duration-500 delay-[400ms] ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}

            <button
              onClick={prev}
              className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3 rounded-full bg-cream/10 hover:bg-cream/20 text-cream transition-all duration-300 cursor-pointer backdrop-blur-sm hover:scale-105 active:scale-95"
              aria-label="Previous activity"
            >
              <HiChevronLeft size={20} />
            </button>
            <button
              onClick={next}
              className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3 rounded-full bg-cream/10 hover:bg-cream/20 text-cream transition-all duration-300 cursor-pointer backdrop-blur-sm hover:scale-105 active:scale-95"
              aria-label="Next activity"
            >
              <HiChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
