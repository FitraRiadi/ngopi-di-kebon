import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import { LuLeaf, LuCoffee, LuSun, LuUsers } from 'react-icons/lu'

gsap.registerPlugin(ScrollTrigger)

const reasons = [
  {
    icon: LuLeaf,
    title: 'Vibes Alami',
    desc: 'Dikelilingi pepohonan hijau, udara segar pegunungan, dan keindahan perbukitan Cimenyan — pelarian sejati dari kota.',
  },
  {
    icon: LuCoffee,
    title: 'Cita Rasa Premium',
    desc: 'Kami memilih biji kopi terbaik dan bahan segar untuk menciptakan cita rasa yang memanjakan setiap tegukan dan gigitan.',
  },
  {
    icon: LuSun,
    title: 'Senja Romantis',
    desc: 'Nikmati pemandangan matahari terbenam yang menakjubkan sambil menyesap kopi favorit Anda di kebun kami.',
  },
  {
    icon: LuUsers,
    title: 'Ramah Keluarga',
    desc: 'Ruang yang ramah untuk semua — pasangan, teman, keluarga, bahkan teman berbulu Anda.',
  },
]

export default function WhyUs() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const cardsRef = useRef([])

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

      cardsRef.current.forEach((card, idx) => {
        gsap.fromTo(
          card,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: idx * 0.15,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              end: 'center 50%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="why-us"
      ref={sectionRef}
      className="relative py-20 sm:py-28 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #efe0cf 0%, #e8d5be 50%, #f0e3d4 100%)',
      }}
    >
      <div className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-beige/50 via-transparent to-beige/50 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center mb-14">
          <span className="text-forest font-medium text-sm tracking-[0.2em] uppercase">
            Kenapa Kami
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-espresso font-bold mt-3">
            Kenapa{" "}
            <span className="text-forest">Kita?</span>
          </h2>
          <p className="text-espresso-light mt-4 max-w-lg mx-auto">
            Lebih dari sekadar kafe — pengalaman yang dibuat dengan sepenuh hati
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((item, idx) => (
            <motion.div
              key={item.title}
              ref={(el) => (cardsRef.current[idx] = el)}
              whileHover={{ y: -8 }}
              className="group bg-white/70 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <div className="w-14 h-14 rounded-xl bg-forest/10 flex items-center justify-center mb-5 group-hover:bg-forest group-hover:text-cream transition-colors duration-300">
                <item.icon className="text-forest group-hover:text-cream transition-colors duration-300" size={24} />
              </div>
              <h3 className="font-serif text-xl font-semibold text-espresso mb-3">
                {item.title}
              </h3>
              <p className="text-espresso-light text-sm leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
