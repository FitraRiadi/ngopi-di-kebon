import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import { HiLocationMarker, HiPhone, HiClock, HiStar } from 'react-icons/hi'
import { LuSend } from 'react-icons/lu'

gsap.registerPlugin(ScrollTrigger)

const contactInfo = [
  { icon: HiLocationMarker, label: 'Alamat', value: 'Cikasumukan, RW.9, Mandalamekar, Kec. Cimenyan, Kab. Bandung, Jawa Barat 40193' },
  { icon: HiPhone, label: 'Telepon / WA', value: '(022) 63736732 / +6285721611105' },
  { icon: HiClock, label: 'Jam Buka', value: 'Sel–Jum 12.00–20.00 | Sab–Min 11.00–21.00' },
  { icon: HiStar, label: 'Rating', value: '4.6 / 5.0 (3.250+ ulasan)' },
]

export default function Location() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const contentRef = useRef(null)

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
      gsap.fromTo(
        contentRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            end: 'center 55%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="location"
      ref={sectionRef}
      className="relative py-20 sm:py-28 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #e8d5be 0%, #F5E6D3 50%, #e8d5be 100%)',
      }}
    >
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1498804103079-a6351b050096?w=1600&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-beige/40 via-transparent to-beige/40 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center mb-12 sm:mb-16">
          <span className="text-forest font-medium text-sm tracking-[0.2em] uppercase">
            Temukan Kami
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-espresso font-bold mt-3">
            Kunjungi Kafe Kami
          </h2>
          <p className="text-espresso-light mt-4 max-w-lg mx-auto">
            Authentic Indonesia Cuisine with 360° Bandung Views
          </p>
        </div>

        <div ref={contentRef} className="grid md:grid-cols-2 gap-10 items-start">
          <div className="space-y-6">
            {contactInfo.map((info) => (
              <div key={info.label} className="flex items-start gap-4">
                <div className="bg-forest/10 p-3 rounded-xl">
                  <info.icon className="text-forest text-xl" />
                </div>
                <div>
                  <p className="text-espresso-light text-sm font-medium">{info.label}</p>
                  <p className="text-espresso font-semibold">{info.value}</p>
                </div>
              </div>
            ))}

            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="https://maps.app.goo.gl/XFM17Ne5BGfg1LiF8"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-forest hover:bg-forest-light text-cream font-medium px-8 py-3.5 rounded-full transition-colors duration-300 cursor-pointer w-full"
            >
              <HiLocationMarker />
              Petunjuk Arah
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="https://wa.me/6285721611105?text=Halo%20saya%20ingin%20reservasi%20dan%20informasi%20lebih%20lanjut"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium px-8 py-3.5 rounded-full transition-all duration-300 cursor-pointer shadow-lg shadow-green-600/20 w-full"
            >
              <LuSend size={18} />
              Reservasi & Info Lebih Lanjut
            </motion.a>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-lg h-[350px] sm:h-[400px]">
            <iframe
              src="https://maps.google.com/maps?q=Ngopi+Di+Kebon+Cikasumukan+Mandalamekar+Cimenyan+Bandung+Jawa+Barat&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ngopi Di Kebon Location"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
