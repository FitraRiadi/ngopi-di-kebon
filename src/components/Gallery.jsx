import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { HiX } from 'react-icons/hi'

gsap.registerPlugin(ScrollTrigger)

const galleryImages = [
  { src: 'https://lh3.googleusercontent.com/grass-cs/ANxoTn1VoavQHAFgHOz90EPXCF_mbt-XLpWxW4w0XbSfX9BK6bbesaKH5MTlVpPUQJsD-7d0F0QidnIorhbA9zl8lPa8AeoVGo0nqxoFHTGdN9nsvaIGNaFqpQlv_cRIjJRHfWEDWzbmiiktJq0=k-no', alt: 'Taman dengan tempat duduk outdoor', span: 'md:row-span-2' },
  { src: 'https://lh3.googleusercontent.com/grass-cs/ANxoTn3mv229i4rl48V0MYlaSZoKjWK1qZNuaT9Lk5z9IQu1hHhPWYuqxwGn-3vG6Vt38MwYoVm_sin7JwLIh4jUCvEmQ8Kgp420MTrE6xycuzuXQMV8OQTQpwZPH7wq7vte9k9JImHoKg=k-no', alt: 'Suasana sore di kebun', span: '' },
  { src: 'https://lh3.googleusercontent.com/grass-cs/ANxoTn2VoMNiDiMmzrWDg3K-BUMX5h6Vn14JqM02LvjsFJqPbMpqsoSvchJs9BLJgrWS8phQ_h5lA0rZUSFDQrRkLeU-LpEHmMwV1lNR2PS0p1Kav1YW9oOgK6LG9tcwrWsWLaAl-yCRPA=k-no', alt: 'Area makan outdoor', span: '' },
  { src: 'https://lh3.googleusercontent.com/grass-cs/ANxoTn1TwDNk9tvZ8vMn8ZGdlIkYiMFE_gHsZP3EYzPB6Q1pkV_14P-CKaFqN5GrMjqCAcvsMqB1dHcCetR6WldVbqRq-cH9JBtRYWwskDeIlsdo5inuuxWnRpinNIfsxT0k1vc0xbeC=k-no', alt: 'Pemandangan citylight Bandung', span: '' },
  { src: 'https://lh3.googleusercontent.com/grass-cs/ANxoTn2CybniRbjgIqKaENJZK2KtuggSuuLOYkuYdXi8UcbBAXQ2OTUpu7x-SlX2uejD2AFpNyRvEVUJgnfRYatUNOeM1zPlb0ta-fke5_YNMqw3BYqiXDVuB_Q1s9IdtQ0oHbV6_j0Y7w=k-no', alt: 'Interior hangat kafe', span: 'md:row-span-2' },
  { src: 'https://lh3.googleusercontent.com/grass-cs/ANxoTn0436DlcY8EUILYqcvd211y2GhoFX9MCFCpzHhC8Az2cC-YChPE1aJEDqxkdxvctpQT_rQpjySk1Gh3RSHG6-W7cuXs9NVYz6F-LkoPKjENnpe2JCC-P_Fo6ta0TzKXT6ibAe9i=k-no', alt: 'Hidangan spesial', span: '' },
  { src: 'https://lh3.googleusercontent.com/grass-cs/ANxoTn2GtHI6zJ0revQ3oNqDOVsbH0qlbm-k3BBgjAuwd1D3XgdfEPLm6r4jZs_5j79G8B0Ka7Ge8sJett-q9Zhw7EXqDnzv8waPouYSkAud-lSnFPQaFi5SJAswl1ASkIxREy0B_gzr=k-no', alt: 'Pemandangan bukit Cimenyan', span: '' },
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
