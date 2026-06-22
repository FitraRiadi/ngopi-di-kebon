import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiOutlineMenuAlt3, HiX } from 'react-icons/hi'
import { useLenis } from 'lenis/react'

const navLinks = [
  { label: 'Beranda', href: '#hero' },
  { label: 'Menu', href: '#menu' },
  { label: 'Galeri', href: '#gallery' },
  { label: 'Aktivitas', href: '#aktivitas' },
  { label: 'Lokasi', href: '#location' },
  { label: 'Ulasan', href: '#testimonials' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 })
  const navRef = useRef(null)
  const linkRefs = useRef({})
  const lenis = useLenis()

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50)
      const sections = navLinks.map(l => l.href.slice(1))
      for (const id of sections.reverse()) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= 150) {
          setActive(id)
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll)
    setActive('hero')
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const el = linkRefs.current[active]
    if (el && navRef.current) {
      const parentRect = navRef.current.getBoundingClientRect()
      const elRect = el.getBoundingClientRect()
      setIndicatorStyle({
        left: elRect.left - parentRect.left,
        width: elRect.width,
      })
    }
  }, [active])

  const scrollTo = (href) => {
    setIsOpen(false)
    lenis.scrollTo(href)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 sm:px-6 pt-3 sm:pt-5">
      <div
        className={`w-full max-w-5xl transition-all duration-500 ease-out rounded-2xl ${
          scrolled
            ? 'bg-cream/70 backdrop-blur-xl shadow-lg shadow-black/5 border border-white/40'
            : 'bg-white/10 backdrop-blur-sm border border-white/20'
        }`}
      >
        <div className="flex items-center justify-between h-14 sm:h-16 px-4 sm:px-6">
          <button
            onClick={() => scrollTo('#hero')}
            className={`text-lg sm:text-xl font-serif font-bold cursor-pointer transition-colors duration-300 ${
              scrolled ? 'text-forest' : 'text-cream'
            }`}
          >
            Ngopi Di Kebon
          </button>

          <div ref={navRef} className="hidden md:flex items-center gap-1 relative">
            {navLinks.map((link) => (
              <button
                key={link.href}
                ref={(el) => (linkRefs.current[link.href.slice(1)] = el)}
                onClick={() => scrollTo(link.href)}
                className={`relative px-3 py-1.5 text-sm font-medium rounded-lg transition-colors duration-200 cursor-pointer ${
                  active === link.href.slice(1)
                    ? 'text-espresso'
                    : 'text-espresso-light/70 hover:text-espresso'
                }`}
              >
                {link.label}
              </button>
            ))}
            <motion.div
              layoutId="nav-indicator"
              className="absolute bottom-0 h-full bg-white/60 backdrop-blur-sm rounded-lg -z-0"
              style={{
                left: indicatorStyle.left,
                width: indicatorStyle.width,
              }}
              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            />
          </div>

          <button
            className={`md:hidden p-2 cursor-pointer transition-colors duration-300 ${
              scrolled ? 'text-espresso' : 'text-cream'
            }`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <HiX size={22} /> : <HiOutlineMenuAlt3 size={22} />}
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className={`md:hidden overflow-hidden rounded-b-2xl ${
                scrolled
                  ? 'bg-cream/80 backdrop-blur-xl border-t border-beige/40'
                  : 'bg-black/50 backdrop-blur-lg border-t border-white/10'
              }`}
            >
              <div className="px-4 py-3 space-y-1">
                {navLinks.map((link) => (
                  <motion.button
                    key={link.href}
                    initial={{ x: -16, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.25, delay: 0.04 * navLinks.indexOf(link) }}
                    onClick={() => scrollTo(link.href)}
                    className={`block w-full text-left py-2.5 px-3 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
                      active === link.href.slice(1)
                        ? scrolled
                          ? 'bg-forest/10 text-forest'
                          : 'bg-white/20 text-cream'
                        : scrolled
                          ? 'text-espresso-light/70 hover:text-espresso hover:bg-forest/5'
                          : 'text-cream/70 hover:text-cream hover:bg-white/10'
                    }`}
                  >
                    {link.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}
