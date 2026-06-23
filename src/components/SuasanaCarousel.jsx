import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const images = [
  { src: 'https://lh3.googleusercontent.com/grass-cs/ANxoTn1VoavQHAFgHOz90EPXCF_mbt-XLpWxW4w0XbSfX9BK6bbesaKH5MTlVpPUQJsD-7d0F0QidnIorhbA9zl8lPa8AeoVGo0nqxoFHTGdN9nsvaIGNaFqpQlv_cRIjJRHfWEDWzbmiiktJq0=k-no', alt: 'Taman dengan tempat duduk outdoor' },
  { src: 'https://lh3.googleusercontent.com/grass-cs/ANxoTn3mv229i4rl48V0MYlaSZoKjWK1qZNuaT9Lk5z9IQu1hHhPWYuqxwGn-3vG6Vt38MwYoVm_sin7JwLIh4jUCvEmQ8Kgp420MTrE6xycuzuXQMV8OQTQpwZPH7wq7vte9k9JImHoKg=k-no', alt: 'Suasana sore di kebun' },
  { src: 'https://lh3.googleusercontent.com/grass-cs/ANxoTn2VoMNiDiMmzrWDg3K-BUMX5h6Vn14JqM02LvjsFJqPbMpqsoSvchJs9BLJgrWS8phQ_h5lA0rZUSFDQrRkLeU-LpEHmMwV1lNR2PS0p1Kav1YW9oOgK6LG9tcwrWsWLaAl-yCRPA=k-no', alt: 'Area makan outdoor' },
  { src: 'https://lh3.googleusercontent.com/grass-cs/ANxoTn1TwDNk9tvZ8vMn8ZGdlIkYiMFE_gHsZP3EYzPB6Q1pkV_14P-CKaFqN5GrMjqCAcvsMqB1dHcCetR6WldVbqRq-cH9JBtRYWwskDeIlsdo5inuuxWnRpinNIfsxT0k1vc0xbeC=k-no', alt: 'Pemandangan citylight Bandung' },
  { src: 'https://lh3.googleusercontent.com/grass-cs/ANxoTn2CybniRbjgIqKaENJZK2KtuggSuuLOYkuYdXi8UcbBAXQ2OTUpu7x-SlX2uejD2AFpNyRvEVUJgnfRYatUNOeM1zPlb0ta-fke5_YNMqw3BYqiXDVuB_Q1s9IdtQ0oHbV6_j0Y7w=k-no', alt: 'Interior hangat kafe' },
  { src: 'https://lh3.googleusercontent.com/grass-cs/ANxoTn0436DlcY8EUILYqcvd211y2GhoFX9MCFCpzHhC8Az2cC-YChPE1aJEDqxkdxvctpQT_rQpjySk1Gh3RSHG6-W7cuXs9NVYz6F-LkoPKjENnpe2JCC-P_Fo6ta0TzKXT6ibAe9i=k-no', alt: 'Hidangan spesial' },
  { src: 'https://lh3.googleusercontent.com/grass-cs/ANxoTn2GtHI6zJ0revQ3oNqDOVsbH0qlbm-k3BBgjAuwd1D3XgdfEPLm6r4jZs_5j79G8B0Ka7Ge8sJett-q9Zhw7EXqDnzv8waPouYSkAud-lSnFPQaFi5SJAswl1ASkIxREy0B_gzr=k-no', alt: 'Pemandangan bukit Cimenyan' },
]

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
    const speed = 1.5 // ← ubah ini: kecil = lambat, besar = cepat

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

    // Pause saat tab tidak aktif
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
      className="relative py-16 sm:py-20 bg-espresso overflow-hidden"
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

      <div ref={titleRef} className="relative text-center mb-10 px-4">
        <span className="text-gold font-medium text-sm tracking-[0.2em] uppercase">
          Suasana
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-cream font-bold mt-2">
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