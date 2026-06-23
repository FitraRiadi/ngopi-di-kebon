import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { HiX } from 'react-icons/hi'
import { LuSend } from 'react-icons/lu'
import CircularGallery from './CircularGallery'

gsap.registerPlugin(ScrollTrigger)

const galleryItems = [
  {
    id: 1,
    name: 'Sop Buntut',
    price: '95K',
    category: 'sop',
    image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=800&q=80',
    desc: 'Sop buntut sapi empuk dengan kuah kaldu gurih, favorit pengunjung sejak pertama buka.',
  },
  {
    id: 8,
    name: 'Udang Telur Asin',
    price: '100K',
    category: 'seafood',
    image: 'https://images.unsplash.com/photo-1625943553852-781c6dd46faa?w=800&q=80',
    desc: 'Udang segar goreng tepung dengan balutan telur asin creamy yang lumer di mulut.',
  },
  {
    id: 21,
    name: 'Ayam Bakakak',
    price: '88K',
    category: 'lauk',
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=800&q=80',
    desc: 'Ayam kampung utuh yang dibakar dengan bumbu tradisional, cocok untuk ramai-ramai.',
  },
  {
    id: 33,
    name: 'Nasi Liwet Kastrol',
    price: '85K',
    category: 'nasi',
    image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800&q=80',
    desc: 'Nasi liwet kastrol untuk 4 orang — lengkap dengan teri, jambal, pete, dan rawit.',
  },
  {
    id: 15,
    name: 'Gurame Terbang',
    price: '93K',
    category: 'seafood',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&q=80',
    desc: 'Gurame utuh kremes dengan saus telur asin, renyah di luar, lembut di dalam.',
  },
  {
    id: 56,
    name: 'Pisang Goreng Keju',
    price: '27.5K',
    category: 'snack',
    image: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=800&q=80',
    desc: 'Pisang goreng keju melted — camilan manis yang pas untuk sore hari.',
  },
  {
    id: 37,
    name: 'Nasi Goreng Kampung',
    price: '45K',
    category: 'nasi',
    image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800&q=80',
    desc: 'Nasi goreng kampung dengan bumbu rempah pilihan, telur mata sapi, dan kerupuk.',
  },
  {
    id: 42,
    name: 'Kangkung Balacan',
    price: '25K',
    category: 'sayur',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&q=80',
    desc: 'Tumis kangkung pedas dengan terasi pilihan, pelengkap sempurna untuk lauk apapun.',
  },
]

const circularItems = galleryItems.map((item) => ({
  image: item.image,
  text: `${item.name}  •  IDR ${item.price}`,
}))

const WA_NUMBER = '6285721611105'

// Detect mobile: viewport width < 640px
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 640 : false
  )
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 640)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])
  return isMobile
}

export default function Menu() {
  const [selectedItem, setSelectedItem] = useState(null)
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const hintRef = useRef(null)
  const isMobile = useIsMobile()

  // Adaptive bend: gentle on mobile, full on desktop
  const bend = isMobile ? 1 : 3
  // Slightly shorter gallery on mobile
  const galleryHeight = isMobile ? 320 : 500

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%', end: 'center 60%',
            toggleActions: 'play none none reverse',
          },
        }
      )
      gsap.fromTo(
        hintRef.current,
        { opacity: 0, y: 16 },
        {
          opacity: 1, y: 0, duration: 0.7, delay: 0.3,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    document.body.style.overflow = selectedItem ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [selectedItem])

  // onItemClick now receives the real index directly from CircularGallery
  const handleItemClick = useCallback((realIndex) => {
    setSelectedItem(galleryItems[realIndex])
  }, [])

  const openWA = (item) => {
    const text = encodeURIComponent(
      `Halo, saya ingin memesan ${item.name} sebesar IDR ${item.price}`
    )
    window.open(`https://wa.me/${WA_NUMBER}?text=${text}`, '_blank')
    setSelectedItem(null)
  }

  return (
    <section
      id="menu"
      ref={sectionRef}
      className="relative py-20 sm:py-28 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #F5E6D3 0%, #efe0cf 50%, #F5E6D3 100%)',
      }}
    >
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1600&q=80")',
          backgroundSize: 'cover', backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-beige/40 via-transparent to-beige/40 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <div ref={titleRef} className="text-center mb-6">
          <span className="text-forest font-medium text-sm tracking-[0.2em] uppercase">
            Menu Kami
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-espresso font-bold mt-3">
            Nikmati Pengalaman
          </h2>
          <p className="text-espresso-light mt-4 max-w-lg mx-auto">
            Estimasi biaya Rp 50.000 – Rp 100.000 per orang
          </p>
        </div>

        {/* ── Hint ── */}
        <p
          ref={hintRef}
          className="text-center text-espresso-light/60 text-xs mb-4 tracking-wide"
        >
          {isMobile
            ? 'Geser untuk menjelajahi · Ketuk kartu untuk memesan'
            : 'Geser atau scroll untuk menjelajahi menu · Klik kartu untuk memesan'}
        </p>

        {/* ── CircularGallery ── */}
        <div
          className="relative rounded-3xl overflow-hidden"
          style={{ height: `${galleryHeight}px` }}
        >
          <CircularGallery
            items={circularItems}
            bend={bend}
            textColor="#F5E6D3"
            borderRadius={0.08}
            scrollSpeed={isMobile ? 1.5 : 2}
            scrollEase={0.025}
            font={isMobile ? 'bold 16px serif' : 'bold 22px serif'}
            onItemClick={handleItemClick}
          />
        </div>

        {/* ── Grid preview ── */}
        <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {galleryItems.map((item, i) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              onClick={() => setSelectedItem(item)}
              className="group text-left bg-white/70 backdrop-blur-sm rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-beige/30 cursor-pointer"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-3">
                <h3 className="font-serif text-xs sm:text-sm font-semibold text-espresso leading-snug line-clamp-1">
                  {item.name}
                </h3>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-gold font-semibold text-[11px] sm:text-xs">IDR {item.price}</p>
                  <span className="text-espresso-light/50 text-[9px] flex items-center gap-1 group-hover:text-forest transition-colors">
                    <LuSend size={8} /> Pesan
                  </span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* ── WhatsApp Modal ── */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 40 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              className="bg-cream rounded-3xl overflow-hidden max-w-sm w-full shadow-2xl"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <img src={selectedItem.image} alt={selectedItem.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-4 right-4 p-1.5 rounded-full bg-black/30 hover:bg-black/50 text-cream transition-colors cursor-pointer"
                >
                  <HiX size={20} />
                </button>
                <div className="absolute bottom-4 left-5">
                  <h3 className="font-serif text-2xl font-bold text-cream">{selectedItem.name}</h3>
                  <p className="text-gold font-semibold text-lg">IDR {selectedItem.price}</p>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <p className="text-espresso-light text-sm leading-relaxed">{selectedItem.desc}</p>
                <button
                  onClick={() => openWA(selectedItem)}
                  className="w-full flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white font-semibold py-3.5 rounded-2xl transition-all duration-300 cursor-pointer shadow-lg shadow-green-600/25"
                >
                  <LuSend size={18} /> Pesan via WhatsApp
                </button>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="w-full text-espresso-light text-sm hover:text-espresso transition-colors cursor-pointer"
                >
                  Batal
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}