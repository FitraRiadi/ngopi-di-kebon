import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { HiX, HiStar, HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import {
  LuSparkles, LuSend,
  LuSoup, LuFish, LuDrumstick, LuCupSoda, LuUtensils, LuLeaf, LuCookie,
} from 'react-icons/lu'

gsap.registerPlugin(ScrollTrigger)

const categories = [
  { id: 'all', label: 'Semua', icon: LuSparkles },
  { id: 'sop', label: 'Sop', icon: LuSoup },
  { id: 'seafood', label: 'Seafood', icon: LuFish },
  { id: 'lauk', label: 'Lauk', icon: LuDrumstick },
  { id: 'nasi', label: 'Nasi', icon: LuCupSoda },
  { id: 'mie', label: 'Mie', icon: LuUtensils },
  { id: 'sayur', label: 'Sayur', icon: LuLeaf },
  { id: 'snack', label: 'Snack', icon: LuCookie },
]

const getItemImage = (item) => {
  const n = item.name.toLowerCase()
  const kw = (key) => n.includes(key)

  if (kw('sop buntut') || kw('buntut')) return 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&q=80'
  if (kw('sop iga') || kw('iga')) return 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80'
  if (kw('sop gurame') || kw('sop')) return 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&q=80'

  if (kw('udang telor asin') || kw('udang telur')) return 'https://images.unsplash.com/photo-1625943553852-781c6dd46faa?w=400&q=80'
  if (kw('udang saus') || kw('udang asam') || kw('udang lada')) return 'https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=400&q=80'
  if (kw('udang bakar')) return 'https://images.unsplash.com/photo-1580476262798-b3b4b9c5e3e0?w=400&q=80'
  if (kw('udang')) return 'https://images.unsplash.com/photo-1625943553852-781c6dd46faa?w=400&q=80'

  if (kw('gurame terbang') || kw('gurame bakar') || kw('gurame goreng')) return 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80'
  if (kw('gurame telor') || kw('gurame lada') || kw('gurame asam')) return 'https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=400&q=80'
  if (kw('gurame')) return 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80'

  if (kw('ayam bakakak')) return 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&q=80'
  if (kw('ayam geprek') || kw('ayam goreng') || kw('ayam bakar')) return 'https://images.unsplash.com/photo-1562967914-608f82629710?w=400&q=80'
  if (kw('ayam')) return 'https://images.unsplash.com/photo-1562967914-608f82629710?w=400&q=80'
  if (kw('empal')) return 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80'

  if (kw('asin jambal') || kw('asin peda') || kw('peda goreng') || kw('pete goreng peda')) return 'https://images.unsplash.com/photo-1621857094831-d1c6f8ae391e?w=400&q=80'
  if (kw('tahu') || kw('tempe')) return 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400&q=80'
  if (kw('telor') || kw('telur')) return 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=400&q=80'

  if (kw('nasi liwet kastrol') || kw('nasi liwet 1') || kw('nasi liwet citel') || kw('nasi liwet 2')) return 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&q=80'
  if (kw('nasi goreng')) return 'https://images.unsplash.com/photo-1602872030210-07254f2c4f5a?w=400&q=80'
  if (kw('nasi timbel') || kw('nasi putih')) return 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&q=80'
  if (kw('nasi')) return 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&q=80'

  if (kw('mie') || kw('kwetiau')) return 'https://images.unsplash.com/photo-1552611052-33e04de1b100?w=400&q=80'

  if (kw('kangkung') || kw('genjer') || kw('karedok') || kw('leunca') || kw('sayur asem')) return 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&q=80'
  if (kw('terong') || kw('lalap') || kw('sambal')) return 'https://images.unsplash.com/photo-1621857094831-d1c6f8ae391e?w=400&q=80'
  if (kw('toge') || kw('peuncok') || kw('pete goreng')) return 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&q=80'

  if (kw('pisang goreng') || kw('colenak') || kw('tape goreng') || kw('bala bala')) return 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=400&q=80'
  if (kw('cireng') || kw('bakwan') || kw('mendoan')) return 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400&q=80'
  if (kw('kentang goreng') || kw('sosis')) return 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=80'
  if (kw('singkong')) return 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400&q=80'
  if (kw('dory') || kw('fish')) return 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80'
  if (kw('kerupuk') || kw('emping')) return 'https://images.unsplash.com/photo-1621857094831-d1c6f8ae391e?w=400&q=80'

  return 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400&q=80'
}

const menuItems = [
  { id: 1, name: 'Sop Buntut', price: '95K', category: 'sop' },
  { id: 2, name: 'Buntut Penyet', price: '95K', category: 'sop' },
  { id: 3, name: 'Buntut Bakar Madu', price: '95K', category: 'sop' },
  { id: 4, name: 'Sop Iga', price: '95K', category: 'sop' },
  { id: 5, name: 'Iga Penyet', price: '95K', category: 'sop' },
  { id: 6, name: 'Iga Bakar Madu', price: '95K', category: 'sop' },
  { id: 7, name: 'Sop Gurame', price: '93K', category: 'sop' },

  { id: 8, name: 'Udang Telur Asin', price: '100K', category: 'seafood' },
  { id: 9, name: 'Udang Saus Padang', price: '100K', category: 'seafood' },
  { id: 10, name: 'Udang Asam Manis', price: '100K', category: 'seafood' },
  { id: 11, name: 'Udang Bakar Madu', price: '100K', category: 'seafood' },
  { id: 12, name: 'Udang Lada Garam', price: '100K', category: 'seafood' },
  { id: 13, name: 'Gurame Telur Asin', price: '93K', category: 'seafood' },
  { id: 14, name: 'Gurame Lada Garam', price: '93K', category: 'seafood' },
  { id: 15, name: 'Gurame Terbang', price: '93K', category: 'seafood' },
  { id: 16, name: 'Gurame Bakar', price: '93K', category: 'seafood' },
  { id: 17, name: 'Gurame Asam Manis', price: '93K', category: 'seafood' },

  { id: 18, name: 'Ayam Goreng', price: '33K', category: 'lauk' },
  { id: 19, name: 'Ayam Bakar', price: '33K', category: 'lauk' },
  { id: 20, name: 'Ayam Geprek', price: '30K', category: 'lauk' },
  { id: 21, name: 'Ayam Bakakak', price: '88K', category: 'lauk' },
  { id: 22, name: 'Empal', price: '35K', category: 'lauk' },
  { id: 23, name: 'Asin Jambal Goreng', price: '28K', category: 'lauk' },
  { id: 24, name: 'Tumis Asin Jambal', price: '27.5K', category: 'lauk' },
  { id: 25, name: 'Tumis Asin Peda', price: '25K', category: 'lauk' },
  { id: 26, name: 'Peda Goreng', price: '20K', category: 'lauk' },
  { id: 27, name: 'Pete Goreng Peda', price: '35K', category: 'lauk' },
  { id: 28, name: 'Tahu Goreng', price: '3K', category: 'lauk' },
  { id: 29, name: 'Tempe Goreng', price: '3K', category: 'lauk' },
  { id: 30, name: 'Telor (Mata Sapi/Dadar)', price: '10K', category: 'lauk' },

  { id: 31, name: 'Nasi Putih', price: '7K', category: 'nasi' },
  { id: 32, name: 'Nasi Timbel', price: '10K', category: 'nasi' },
  { id: 33, name: 'Nasi Liwet Kastrol (4 Org)', price: '85K', category: 'nasi' },
  { id: 34, name: 'Nasi Liwet Citel (2 Org)', price: '45K', category: 'nasi' },
  { id: 35, name: 'Nasi Liwet Kastrol (Teri)', price: '80K', category: 'nasi' },
  { id: 36, name: 'Nasi Liwet 2 Org (Teri)', price: '40K', category: 'nasi' },
  { id: 37, name: 'Nasi Goreng Kampung', price: '45K', category: 'nasi' },

  { id: 38, name: 'Mie Goreng', price: '35K', category: 'mie' },
  { id: 39, name: 'Mie Tek Tek', price: '35K', category: 'mie' },
  { id: 40, name: 'Kwetiau Goreng', price: '35K', category: 'mie' },
  { id: 41, name: 'Kwetiau Rebus', price: '35K', category: 'mie' },

  { id: 42, name: 'Kangkung Balacan', price: '25K', category: 'sayur' },
  { id: 43, name: 'Tumis Kangkung', price: '18K', category: 'sayur' },
  { id: 44, name: 'Toge Ikan Asin', price: '25K', category: 'sayur' },
  { id: 45, name: 'Tumis Genjer', price: '18K', category: 'sayur' },
  { id: 46, name: 'Karedok', price: '20K', category: 'sayur' },
  { id: 47, name: 'Ulukutek Leunca', price: '18K', category: 'sayur' },
  { id: 48, name: 'Peuncok Leunca', price: '18K', category: 'sayur' },
  { id: 49, name: 'Peuncok K Panjang', price: '18K', category: 'sayur' },
  { id: 50, name: 'Pete Goreng/Bakar', price: '20K', category: 'sayur' },
  { id: 51, name: 'Terong Teri', price: '25K', category: 'sayur' },
  { id: 52, name: 'Terong Crispy', price: '25K', category: 'sayur' },
  { id: 53, name: 'Sambal', price: '5K', category: 'sayur' },
  { id: 54, name: 'Sayur Asem', price: '15K', category: 'sayur' },
  { id: 55, name: 'Lalap', price: '5K', category: 'sayur' },

  { id: 56, name: 'Pisang Goreng Keju', price: '27.5K', category: 'snack' },
  { id: 57, name: 'Pisang Goreng Polos', price: '22.5K', category: 'snack' },
  { id: 58, name: 'Bala Bala', price: '27.5K', category: 'snack' },
  { id: 59, name: 'Cireng', price: '30K', category: 'snack' },
  { id: 60, name: 'Singkong Keju', price: '27.5K', category: 'snack' },
  { id: 61, name: 'Sosis Kentang Keju', price: '55K', category: 'snack' },
  { id: 62, name: 'Sosis Keju', price: '45K', category: 'snack' },
  { id: 63, name: 'Sosis Polos', price: '40K', category: 'snack' },
  { id: 64, name: 'Kentang Goreng', price: '25K', category: 'snack' },
  { id: 65, name: 'Kentang Goreng Keju', price: '30K', category: 'snack' },
  { id: 66, name: 'Tempe Mendoan', price: '27.5K', category: 'snack' },
  { id: 67, name: 'Bakwan Jagung', price: '25K', category: 'snack' },
  { id: 68, name: 'Colenak Original', price: '20K', category: 'snack' },
  { id: 69, name: 'Colenak Ice Cream', price: '25K', category: 'snack' },
  { id: 70, name: 'Tape Goreng Keju', price: '27.5K', category: 'snack' },
  { id: 71, name: 'Dory Mayo', price: '45K', category: 'snack' },
  { id: 72, name: 'Fish & Co', price: '62.5K', category: 'snack' },
  { id: 73, name: 'Kerupuk Aci', price: '2K', category: 'snack' },
  { id: 74, name: 'Kerupuk Udang', price: '10K', category: 'snack' },
  { id: 75, name: 'Emping', price: '15K', category: 'snack' },
  { id: 76, name: 'Tahu Lada Garam', price: '27.5K', category: 'snack' },
]

const featuredIds = [1, 8, 21, 33, 15, 56]
const featured = featuredIds.map((id) => menuItems.find((i) => i.id === id)).filter(Boolean)

const featuredDesc = {
  1: 'Sop buntut sapi empuk dengan kuah kaldu gurih, favorit pengunjung sejak pertama buka.',
  8: 'Udang segar goreng tepung dengan balutan telur asin creamy yang lumer di mulut.',
  21: 'Ayam kampung utuh yang dibakar dengan bumbu tradisional, cocok untuk ramai-ramai.',
  33: 'Nasi liwet kastrol untuk 4 orang — lengkap dengan teri, jambal, pete, dan rawit.',
  15: 'Gurame utuh kremes dengan saus telur asin, renyah di luar, lembut di dalam.',
  56: 'Pisang goreng keju melted — camilan manis yang pas untuk sore hari.',
}

const ITEMS_PER_PAGE = 8
const WA_NUMBER = '6285721611105'

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedItem, setSelectedItem] = useState(null)
  const [featIdx, setFeatIdx] = useState(0)
  const [page, setPage] = useState(1)
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const featTimer = useRef(null)

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
    featTimer.current = setInterval(() => {
      setFeatIdx((prev) => (prev + 1) % featured.length)
    }, 4000)
    return () => clearInterval(featTimer.current)
  }, [])

  useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [selectedItem])

  useEffect(() => { setPage(1) }, [activeCategory])

  const filtered = activeCategory === 'all'
    ? menuItems
    : menuItems.filter((item) => item.category === activeCategory)

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const pagedItems = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

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
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1600&q=80")',
          backgroundSize: 'cover', backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-beige/40 via-transparent to-beige/40 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div ref={titleRef} className="text-center mb-10">
          <span className="text-forest font-medium text-sm tracking-[0.2em] uppercase">Menu Kami</span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-espresso font-bold mt-3">
            Nikmati Pengalaman
          </h2>
          <p className="text-espresso-light mt-4 max-w-lg mx-auto">
            Estimasi biaya Rp 50.000 – Rp 100.000 per orang
          </p>
        </div>

        {/* ── Carousel Menu Unggulan ── */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-serif text-lg text-espresso font-semibold flex items-center gap-2">
              <HiStar className="text-gold" /> Menu Unggulan
            </h3>
            <div className="flex gap-2">
              <button onClick={() => setFeatIdx((p) => (p - 1 + featured.length) % featured.length)} className="p-1.5 rounded-full bg-forest/10 hover:bg-forest/20 text-espresso transition-colors cursor-pointer"><HiChevronLeft size={18} /></button>
              <button onClick={() => setFeatIdx((p) => (p + 1) % featured.length)} className="p-1.5 rounded-full bg-forest/10 hover:bg-forest/20 text-espresso transition-colors cursor-pointer"><HiChevronRight size={18} /></button>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-2xl bg-white/40 backdrop-blur-sm border border-beige/30">
            <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${featIdx * 100}%)` }}>
              {featured.map((item) => (
                <div key={item.id} className="min-w-full flex items-stretch cursor-pointer" onClick={() => setSelectedItem(item)}>
                  <div className="w-1/3 sm:w-1/4 aspect-square overflow-hidden">
                    <img src={getItemImage(item)} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 p-5 sm:p-7 flex flex-col justify-center">
                    <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-gold/15 text-gold text-[11px] font-semibold tracking-wider uppercase w-fit mb-2">
                      <HiStar size={12} /> Unggulan
                    </div>
                    <h4 className="font-serif text-xl sm:text-2xl font-bold text-espresso mb-1">{item.name}</h4>
                    <p className="text-gold font-semibold text-lg">IDR {item.price}</p>
                    <p className="text-espresso-light text-xs sm:text-sm mt-2 leading-relaxed line-clamp-2">{featuredDesc[item.id]}</p>
                    <span className="text-espresso-light text-xs mt-2 flex items-center gap-1 hover:text-forest transition-colors">Klik untuk pesan <LuSend size={12} /></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center gap-1.5 mt-3">
            {featured.map((_, idx) => (
              <button key={idx} onClick={() => setFeatIdx(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${idx === featIdx ? 'bg-gold w-6' : 'bg-forest/20 w-1.5'}`}
              />
            ))}
          </div>
        </div>

        {/* ── Filter ── */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button key={cat.id} onClick={() => { setActiveCategory(cat.id); setPage(1) }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${activeCategory === cat.id ? 'bg-forest text-cream shadow-lg shadow-forest/25' : 'bg-white/70 text-espresso-light hover:bg-forest/10 hover:text-espresso border border-beige/40'}`}
            >
              <cat.icon className="text-base" /> {cat.label}
            </button>
          ))}
        </div>

        {/* ── Grid ── */}
        <motion.div layout className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <AnimatePresence mode="popLayout">
            {pagedItems.map((item) => (
              <motion.div
                key={item.id} layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                whileHover={{ y: -5 }}
                onClick={() => setSelectedItem(item)}
                className="group bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-beige/30"
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img src={getItemImage(item)} alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-4">
                  <h3 className="font-serif text-sm sm:text-base font-semibold text-espresso leading-snug min-h-[2.5em]">
                    {item.name}
                  </h3>
                  <div className="flex items-center justify-between mt-1.5">
                    <p className="text-gold font-semibold text-xs sm:text-sm">IDR {item.price}</p>
                    <span className="text-espresso-light/50 text-[10px] flex items-center gap-1 group-hover:text-forest transition-colors">
                      <LuSend size={9} /> Pesan
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ── Pagination ── */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-10">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-2 rounded-xl bg-white/60 border border-beige/30 text-espresso-light hover:text-espresso disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
            >
              <HiChevronLeft size={16} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-9 h-9 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
                  p === page
                    ? 'bg-forest text-cream shadow-md shadow-forest/20'
                    : 'bg-white/60 border border-beige/30 text-espresso-light hover:bg-forest/10 hover:text-espresso'
                }`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-2 rounded-xl bg-white/60 border border-beige/30 text-espresso-light hover:text-espresso disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
            >
              <HiChevronRight size={16} />
            </button>
          </div>
        )}

        <p className="text-center text-espresso-light/50 text-xs mt-4">
          Menampilkan {pagedItems.length} dari {filtered.length} menu
        </p>
      </div>

      {/* ── WhatsApp Popup ── */}
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
                <img src={getItemImage(selectedItem)} alt={selectedItem.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <button onClick={() => setSelectedItem(null)}
                  className="absolute top-4 right-4 p-1.5 rounded-full bg-black/30 hover:bg-black/50 text-cream transition-colors cursor-pointer"
                ><HiX size={20} /></button>
                <div className="absolute bottom-4 left-5">
                  <h3 className="font-serif text-2xl font-bold text-cream">{selectedItem.name}</h3>
                  <p className="text-gold font-semibold text-lg">IDR {selectedItem.price}</p>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <p className="text-espresso-light text-sm leading-relaxed">
                  Pesan {selectedItem.name} sekarang dan nikmati pengalaman Ngopi Di Kebon yang tak terlupakan.
                </p>
                <button onClick={() => openWA(selectedItem)}
                  className="w-full flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white font-semibold py-3.5 rounded-2xl transition-all duration-300 cursor-pointer shadow-lg shadow-green-600/25"
                ><LuSend size={18} /> Pesan via WhatsApp</button>
                <button onClick={() => setSelectedItem(null)}
                  className="w-full text-espresso-light text-sm hover:text-espresso transition-colors cursor-pointer">Batal</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
