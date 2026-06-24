import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import bgTexture from '../assets/suasana/suasana-1.jpg'

gsap.registerPlugin(ScrollTrigger)

const suasanaImages = import.meta.glob('/src/assets/suasana/*.jpg', {
  eager: true,
  import: 'default',
})
const suasanaUrls = Object.values(suasanaImages)

const images = suasanaUrls.slice(0, 5).map((src, i) => ({
  src,
  alt: `Suasana Ngopi Di Kebon ${i + 1}`
}))

export default function SuasanaCarousel() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const trackRef = useRef(null)
  const offsetRef = useRef(0)
  const rafRef = useRef(null)

  useEffect(() => {
    // ── GSAP title animation ──────────────────────────
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            end: 'center 65%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, sectionRef)

    // ── Carousel auto-scroll ──────────────────────────
    const speed = 1.5

    const tick = () => {
      const track = trackRef.current
      if (!track) return

      offsetRef.current -= speed

      const halfWidth = track.scrollWidth / 2
      if (Math.abs(offsetRef.current) >= halfWidth) {
        offsetRef.current = 0
      }

      track.style.transform = `translateX(${offsetRef.current}px)`
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)

    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(rafRef.current)
      } else {
        rafRef.current = requestAnimationFrame(tick)
      }
    }
    document.addEventListener('visibilitychange', handleVisibility)

    return () => {
      ctx.revert()
      cancelAnimationFrame(rafRef.current)
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [])

  return (
    <section
      id="suasana"
      ref={sectionRef}
      className="relative py-16 sm:py-20 bg-cream overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url(${bgTexture})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.7,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-cream via-transparent to-cream pointer-events-none" />

      <div ref={titleRef} className="relative text-center mb-10 px-4">
        <span className="text-forest font-medium text-sm tracking-[0.2em] uppercase">
          Suasana
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-espresso font-bold mt-2">
          Ngopi Di Kebon
        </h2>
      </div>

      <div className="relative w-full overflow-hidden py-2">
        <div
          ref={trackRef}
          className="flex gap-4"
          style={{ willChange: 'transform' }}
        >
          {[...images, ...images].map((img, idx) => (
            <div
              key={idx}
              className="relative flex-shrink-0 w-[70vw] sm:w-[45vw] md:w-[35vw] lg:w-[28vw] aspect-[4/3] rounded-2xl overflow-hidden shadow-lg"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}