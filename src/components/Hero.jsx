import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import { HiArrowRight } from 'react-icons/hi'
import { useLenis } from 'lenis/react'

gsap.registerPlugin(ScrollTrigger)

// Daftar fallback images jika tidak ada gambar lokal di folder asset
const FALLBACK_IMAGES = [
  'https://www.image2url.com/r2/default/images/1782160242592-b0f3630c-7937-4235-bee9-efee8388f47a.webp',
  'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1920&q=85',
  'https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=1920&q=85',
  'https://images.unsplash.com/photo-1470338745628-171cf53de3a8?w=1920&q=85',
  'https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=1920&q=85',
  'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=1920&q=85',
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&q=85',
  'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=85',
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&q=85',
  'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1920&q=85',
]

const SCENE_DOTS = [0, 0.12, 0.30, 0.54, 0.75, 0.92]

// Scene text helper: compute opacity for a progress range [in, out]
function sceneOpacity(progress, inStart, inEnd, outStart, outEnd) {
  if (progress < inStart || progress > outEnd) return 0
  if (progress >= inEnd && progress <= outStart) return 1
  if (progress < inEnd) return (progress - inStart) / (inEnd - inStart)
  return 1 - (progress - outStart) / (outEnd - outStart)
}

// ─────────────────────────────────────────────
// CANVAS DRAW (60 FPS Optimized)
// ─────────────────────────────────────────────
function drawFrameToCtx(ctx, img, progress, alpha = 1) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const w = ctx.canvas.width / dpr
  const h = ctx.canvas.height / dpr

  const iA = img.width / img.height
  const cA = w / h
  let dW, dH
  if (iA > cA) { dH = h; dW = h * iA }
  else          { dW = w; dH = w / iA }

  const zoom = 1 + progress * 0.1
  dW *= zoom; dH *= zoom
  const dX = (w - dW) / 2 + progress * w * 0.03
  const dY = (h - dH) / 2

  ctx.globalAlpha = alpha
  ctx.drawImage(img, dX, dY, dW, dH)
  ctx.globalAlpha = 1
}

function drawOverlays(ctx, progress) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const w = ctx.canvas.width / dpr
  const h = ctx.canvas.height / dpr

  const bright = 1 - Math.sin(progress * Math.PI) * 0.18
  if (bright < 1) {
    ctx.fillStyle = `rgba(0,0,0,${1 - bright})`
    ctx.fillRect(0, 0, w, h)
  }

  ctx.fillStyle = `rgba(100,50,10,${0.05 + progress * 0.12})`
  ctx.fillRect(0, 0, w, h)

  const topGrad = ctx.createLinearGradient(0, 0, 0, h * 0.55)
  topGrad.addColorStop(0, 'rgba(0,0,0,0.55)')
  topGrad.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = topGrad
  ctx.fillRect(0, 0, w, h)

  const botGrad = ctx.createLinearGradient(0, h * 0.5, 0, h)
  botGrad.addColorStop(0, 'rgba(0,0,0,0)')
  botGrad.addColorStop(1, 'rgba(0,0,0,0.65)')
  ctx.fillStyle = botGrad
  ctx.fillRect(0, 0, w, h)

  const vig = ctx.createRadialGradient(w/2, h/2, h*0.2, w/2, h/2, h*0.85)
  vig.addColorStop(0, 'rgba(0,0,0,0)')
  vig.addColorStop(1, 'rgba(0,0,0,0.5)')
  ctx.fillStyle = vig
  ctx.fillRect(0, 0, w, h)
}

// ─────────────────────────────────────────────
// CANVAS COMPONENT
// ─────────────────────────────────────────────
function CinematicCanvas({ frames, scrollProgressRef, isLoaded }) {
  const canvasRef  = useRef(null)
  const currentRef = useRef(0)
  const rafRef     = useRef(null)

  useEffect(() => {
    const resize = () => {
      const canvas = canvasRef.current
      if (!canvas) return
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = window.innerWidth
      const h = window.innerHeight
      canvas.width  = w * dpr
      canvas.height = h * dpr
      canvas.style.width  = w + 'px'
      canvas.style.height = h + 'px'
      canvas.getContext('2d').scale(dpr, dpr)
    }
    resize()
    window.addEventListener('resize', resize, { passive: true })
    return () => window.removeEventListener('resize', resize)
  }, [])

  useEffect(() => {
    const totalFrames = frames.length
    if (!totalFrames) return
    
    const ctx = canvasRef.current?.getContext('2d')
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const tick = () => {
      const target = scrollProgressRef.current
      const diff = target - currentRef.current

      if (Math.abs(diff) > 0.0001) {
        currentRef.current += diff * 0.07
      } else {
        currentRef.current = target
      }

      const p = Math.max(0, Math.min(1, currentRef.current))
      const exactIdx  = p * (totalFrames - 1)
      const idxA      = Math.floor(exactIdx)
      const idxB      = Math.min(idxA + 1, totalFrames - 1)
      const blend     = exactIdx - idxA

      const frameA = frames[idxA]
      const frameB = frames[idxB]

      if (!frameA) { 
        rafRef.current = requestAnimationFrame(tick)
        return 
      }

      const w = ctx.canvas.width / dpr
      const h = ctx.canvas.height / dpr
      ctx.clearRect(0, 0, w, h)

      drawFrameToCtx(ctx, frameA, p, 1)

      if (frameB && idxB !== idxA && blend > 0) {
        drawFrameToCtx(ctx, frameB, p, blend)
      }

      drawOverlays(ctx, p)

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [frames, scrollProgressRef])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        opacity: isLoaded ? 1 : 0,
        transition: 'opacity 1s ease',
        pointerEvents: 'none',
      }}
    />
  )
}

// ─────────────────────────────────────────────
// PRELOADER HOOK (Fully Dynamic & Ascending Sort)
// ─────────────────────────────────────────────
function useFrames() {
  const [frames, setFrames]             = useState([])
  const [isLoaded, setIsLoaded]         = useState(false)
  const [isFallback, setIsFallback]     = useState(false)

  useEffect(() => {
    let localPaths = []
    
    try {
      // ✏️ Ganti '/src/assets/cinematic-frame' dengan folder kamu
      const context = import.meta.glob('/src/assets/cinematic-frame/*.{jpg,jpeg,png,webp}', { eager: true })
      localPaths = Object.keys(context).sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))
    } catch (e) {
      localPaths = []
    }

    const forceLoaded = () => {
      setIsLoaded(true)
    }

    if (localPaths.length > 0) {
      const totalToLoad = localPaths.length
      const results = new Array(totalToLoad)
      let loadedCount = 0

      localPaths.forEach((path, index) => {
        const img = new Image()
        img.onload = () => {
          results[index] = img
          loadedCount++
          if (loadedCount === totalToLoad) {
            setFrames(results.filter(Boolean))
            setIsLoaded(true)
          }
        }
        img.onerror = () => {
          loadedCount++
          if (loadedCount === totalToLoad) {
            setFrames(results.filter(Boolean))
            setIsLoaded(true)
          }
        }
        img.src = path
      })
    } else {
      setIsFallback(true)
      let fallbackLoaded = 0
      const fallbackResults = []
      const TARGET_EXTENDED_FRAMES = 60

      FALLBACK_IMAGES.forEach((src, i) => {
        const img = new Image()
        img.crossOrigin = 'anonymous'
        img.onload = () => {
          fallbackResults[i] = img
          fallbackLoaded++
          if (fallbackLoaded === FALLBACK_IMAGES.length) {
            const expanded = Array.from({ length: TARGET_EXTENDED_FRAMES }, (_, fi) => {
              const srcIdx = Math.floor((fi / TARGET_EXTENDED_FRAMES) * FALLBACK_IMAGES.length)
              return fallbackResults[Math.min(srcIdx, fallbackResults.length - 1)]
            })
            setFrames(expanded)
            setIsLoaded(true)
          }
        }
        img.onerror = () => {
          fallbackLoaded++
          if (fallbackLoaded === FALLBACK_IMAGES.length) {
            const valid = fallbackResults.filter(Boolean)
            if (valid.length) {
              const expanded = Array.from({ length: TARGET_EXTENDED_FRAMES }, (_, fi) => {
                return valid[Math.floor((fi / TARGET_EXTENDED_FRAMES) * valid.length)]
              })
              setFrames(expanded)
            }
            setIsLoaded(true)
          }
        }
        img.src = src
      })
    }

    const safetyTimer = setTimeout(forceLoaded, 10000)
    return () => clearTimeout(safetyTimer)
  }, [])

  return { frames, isLoaded, isFallback }
}

// ─────────────────────────────────────────────
// MAIN HERO COMPONENT
// ─────────────────────────────────────────────
export default function Hero() {
  const sectionRef  = useRef(null)
  const stickyRef   = useRef(null)
  const textRef     = useRef(null)
  const scene1Ref   = useRef(null)
  const scene2Ref   = useRef(null)
  const progressRef = useRef(null)
  const hintRef     = useRef(null)
  const dotsRef     = useRef([]) 
  
  const scrollProgressRef = useRef(0)
  const lenis = useLenis()

  const { frames, isLoaded } = useFrames()

  useEffect(() => {
    if (!isLoaded) return

    let hintTimeout = setTimeout(() => {
      if (scrollProgressRef.current < 0.04 && hintRef.current) {
        hintRef.current.style.opacity = '1'
      }
    }, 800)

    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: '+=200%',
      pin: stickyRef.current,
      scrub: true, 
      anticipatePin: 1,
      onUpdate: (self) => {
        const p = self.progress
        scrollProgressRef.current = p

        if (progressRef.current) {
          progressRef.current.style.width = `${p * 100}%`
        }
        
        if (p > 0.03 && hintRef.current) {
          hintRef.current.style.opacity = '0'
        }

        if (scene1Ref.current) {
          scene1Ref.current.style.opacity = sceneOpacity(p, 0.06, 0.18, 0.38, 0.50)
        }
        if (scene2Ref.current) {
          scene2Ref.current.style.opacity = sceneOpacity(p, 0.48, 0.60, 0.78, 0.88)
        }

        SCENE_DOTS.forEach((dotPos, i) => {
          const dot = dotsRef.current[i]
          if (dot) {
            const isNear = Math.abs(p - dotPos) < 0.12
            dot.style.height = isNear ? '22px' : '6px'
            dot.style.background = isNear ? '#C8860A' : 'rgba(240,232,213,0.25)'
          }
        })
      },
    })

    gsap.fromTo(
      textRef.current,
      { y: 0, opacity: 1 },
      {
        y: -60, opacity: 0, ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=80%',
          scrub: true,
        },
      }
    )

    return () => {
      clearTimeout(hintTimeout)
      st.kill()
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === sectionRef.current) t.kill()
      })
    }
  }, [isLoaded])

  const scrollTo = (href) => lenis?.scrollTo(href)

  return (
    <>
      <style>{`
        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0); opacity: 0.5; }
          50%       { transform: translateY(8px); opacity: 1; }
        }
      `}</style>

      <section
        id="hero"
        ref={sectionRef}
        style={{ height: '300vh', position: 'relative' }}
      >
        <div
          ref={stickyRef}
          style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}
        >

          {/* Canvas */}
          <CinematicCanvas
            frames={frames}
            scrollProgressRef={scrollProgressRef}
            isLoaded={isLoaded}
          />

          {/* Grain */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            opacity: 0.03, zIndex: 2,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: '256px',
          }} />

          {/* Teks Hero Content */}
          <div
            ref={textRef}
            style={{
              position: 'absolute', inset: 0, zIndex: 10,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              textAlign: 'center', padding: '0 16px',
            }}
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-beige/80 tracking-[0.3em] uppercase text-sm sm:text-base font-medium mb-4"
            >
              Selamat Datang di
            </motion.span>

            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-cream font-bold leading-tight mb-6">
              Ngopi
              <span className="block text-gold">Di Kebon</span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-beige/90 text-base sm:text-lg md:text-xl max-w-xl mb-10 font-light"
            >
              Authentic Indonesia Cuisine with 360° Bandung Views
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button
                onClick={() => scrollTo('#menu')}
                className="group inline-flex items-center gap-2 bg-gold hover:bg-gold/90 text-espresso font-medium px-8 py-3.5 rounded-full transition-all duration-300 cursor-pointer"
              >
                Lihat Menu
                <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => scrollTo('#location')}
                className="inline-flex items-center gap-2 border-2 border-cream/40 hover:border-cream/80 text-cream font-medium px-8 py-3.5 rounded-full transition-all duration-300 cursor-pointer"
              >
                Kunjungi Kami
              </button>
            </motion.div>
          </div>

          {/* Scene overlay 1 — kanan bawah */}
          <div ref={scene1Ref} style={{
            position: 'absolute', right: 'clamp(20px, 5vw, 60px)',
            bottom: 'clamp(80px, 12vh, 140px)',
            zIndex: 10, opacity: 0, pointerEvents: 'none',
            maxWidth: 'min(380px, 65vw)',
            textAlign: 'right', transition: 'opacity 0.15s ease',
          }}>
            <span style={{
              fontSize: '11px', letterSpacing: '0.25em',
              color: '#C8860A', textTransform: 'uppercase',
              display: 'block', marginBottom: '8px',
            }}>
              Nikmati Suasana
            </span>
            <p style={{
              fontFamily: 'Georgia, serif',
              fontSize: 'clamp(13px, 1.5vw, 17px)',
              color: 'rgba(240,232,213,0.9)',
              lineHeight: 1.7, fontWeight: 300,
            }}>
              Restoran tenang dengan interior hangat &amp; area makan outdoor
              dikelilingi tanaman hijau subur. Pemandangan citylight Bandung
              dari atas bukit Cimenyan.
            </p>
          </div>

          {/* Scene overlay 2 — kiri bawah */}
          <div ref={scene2Ref} style={{
            position: 'absolute', left: 'clamp(20px, 5vw, 60px)',
            bottom: 'clamp(80px, 12vh, 140px)',
            zIndex: 10, opacity: 0, pointerEvents: 'none',
            maxWidth: 'min(380px, 65vw)',
            textAlign: 'left', transition: 'opacity 0.15s ease',
          }}>
            <span style={{
              fontSize: '11px', letterSpacing: '0.25em',
              color: '#C8860A', textTransform: 'uppercase',
              display: 'block', marginBottom: '8px',
            }}>
              Berkumpul &amp; Bersantai
            </span>
            <p style={{
              fontFamily: 'Georgia, serif',
              fontSize: 'clamp(13px, 1.5vw, 17px)',
              color: 'rgba(240,232,213,0.9)',
              lineHeight: 1.7, fontWeight: 300,
            }}>
              Tempat sempurna untuk berkumpul bersama teman dan keluarga.
              Ruang makan privat, area parkir luas, free Wi-Fi,
              dan menu khusus anak tersedia.
            </p>
          </div>

          {/* Progress bar */}
          {isLoaded && (
            <div style={{
              position: 'absolute', bottom: '7vh', left: '50%',
              transform: 'translateX(-50%)',
              width: 'clamp(80px, 12vw, 140px)', height: '1px',
              background: 'rgba(240,232,213,0.12)', zIndex: 20, overflow: 'hidden',
            }}>
              <div ref={progressRef} style={{
                height: '100%', width: '0%',
                background: 'linear-gradient(to right, rgba(200,134,10,0.4), #C8860A)',
              }} />
            </div>
          )}

          {/* Scene dots */}
          {isLoaded && (
            <div style={{
              position: 'absolute', right: 'clamp(16px, 3vw, 28px)',
              top: '50%', transform: 'translateY(-50%)',
              display: 'flex', flexDirection: 'column', gap: '8px',
              zIndex: 20, pointerEvents: 'none',
            }}>
              {SCENE_DOTS.map((p, i) => (
                <div 
                  key={i} 
                  ref={(el) => (dotsRef.current[i] = el)}
                  style={{
                    width: '2px',
                    height: '6px',
                    background: 'rgba(240,232,213,0.25)',
                    borderRadius: '2px',
                    transition: 'all 0.3s ease',
                  }} 
                />
              ))}
            </div>
          )}

          {/* Scroll hint */}
          {isLoaded && (
            <div 
              ref={hintRef}
              style={{
                position: 'absolute', bottom: '13vh', left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: '8px',
                zIndex: 20, pointerEvents: 'none',
                opacity: 0,
                transition: 'opacity 0.6s ease',
              }}
            >
              <span style={{
                fontSize: '9px', letterSpacing: '0.35em',
                color: 'rgba(240,232,213,0.5)', textTransform: 'uppercase',
              }}>
                Gulir untuk menjelajah
              </span>
              <div style={{
                width: '1px', height: '36px',
                background: 'linear-gradient(to bottom, rgba(240,232,213,0.5), transparent)',
                animation: 'scrollBounce 2s ease-in-out infinite',
              }} />
            </div>
          )}

        </div>
      </section>
    </>
  )
}