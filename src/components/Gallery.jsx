import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { HiX } from 'react-icons/hi'

gsap.registerPlugin(ScrollTrigger)

const frameImages = import.meta.glob('/src/assets/cinematic-frame/*.webp', {
  eager: true,
  import: 'default',
})
const frameUrls = Object.values(frameImages)

const suasanaImages = import.meta.glob('/src/assets/suasana/*.jpg', {
  eager: true,
  import: 'default',
})
const suasanaUrls = Object.values(suasanaImages)

const galleryImages = [
  { src: frameUrls[0], alt: 'Suasana Ngopi Di Kebon', span: 'md:row-span-2' },
  { src: frameUrls[1], alt: 'Taman dengan tempat duduk outdoor', span: '' },
  { src: frameUrls[2], alt: 'Area makan outdoor', span: '' },
  { src: frameUrls[3], alt: 'Pemandangan citylight Bandung', span: '' },
  { src: frameUrls[4], alt: 'Interior hangat kafe', span: 'md:row-span-2' },
  { src: frameUrls[5], alt: 'Hidangan spesial', span: '' },
  { src: frameUrls[6], alt: 'Pemandangan bukit Cimenyan', span: '' },
  { src: frameUrls[7], alt: 'Detail dekorasi kafe', span: '' },
  ...suasanaUrls.map((src, i) => ({
    src,
    alt: `Suasana Ngopi Di Kebon ${i + 1}`,
    span: '',
  })),
]

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null)
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

  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [selectedImage])

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative py-20 sm:py-28 bg-espresso text-cream overflow-hidden"
    >
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1498804103079-a6351b050096?w=1600&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center mb-12 sm:mb-16">
          <span className="text-gold font-medium text-sm tracking-[0.2em] uppercase">
            Galeri
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mt-3">
            Momen di Ngopi Di Kebon
          </h2>
          <p className="text-beige/70 mt-4 max-w-lg mx-auto">
            Saksikan keindahan surga kebun kami melalui momen-momen yang terabadikan
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {galleryImages.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: idx * 0.05, duration: 0.5 }}
              className={`${img.span} relative overflow-hidden rounded-xl cursor-pointer group`}
              onClick={() => setSelectedImage(img)}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover aspect-[4/3] group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 rounded-xl pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={(e) => { e.stopPropagation(); setSelectedImage(null) }}
              className="absolute top-6 right-6 text-cream/80 hover:text-cream z-10 cursor-pointer transition-colors duration-200"
            >
              <HiX size={28} />
            </button>
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
