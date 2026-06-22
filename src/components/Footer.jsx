import { motion } from 'framer-motion'
import { HiHeart, HiMap, HiLink } from 'react-icons/hi'
import { LuInstagram } from 'react-icons/lu'
import { useLenis } from 'lenis/react'

const socialLinks = [
  { icon: LuInstagram, label: 'Instagram', href: 'https://www.instagram.com/ngopidikebon.bandung' },
  { icon: HiLink, label: 'Linktree', href: 'https://linktr.ee/ngopidikebon.bandung' },
  { icon: HiMap, label: 'Google Maps', href: 'https://maps.app.goo.gl/XFM17Ne5BGfg1LiF8' },
]

const footerLinks = [
  { label: 'Tentang', href: '#about' },
  { label: 'Menu', href: '#menu' },
  { label: 'Galeri', href: '#gallery' },
  { label: 'Lokasi', href: '#location' },
  { label: 'Kontak', href: '#location' },
]

export default function Footer() {
  const lenis = useLenis()

  const scrollTo = (href) => {
    lenis.scrollTo(href)
  }

  return (
    <footer className="relative bg-espresso text-cream overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1498804103079-a6351b050096?w=1600&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-espresso/85" />
        <div className="absolute inset-0 bg-gradient-to-b from-espresso/60 via-transparent to-espresso/60" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-10">
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-bold text-gold">
              Ngopi Di Kebon
            </h3>
            <p className="text-beige/70 text-sm leading-relaxed max-w-sm">
              Restoran dengan interior hangat & area makan luar ruangan yang dikelilingi tanaman hijau subur. 
              Tempat nongkrong dan ngopi di ketinggian Cimenyan dengan pemandangan citylight Bandung.
            </p>
            <div className="flex gap-3 pt-2">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.label}
                  whileHover={{ y: -2 }}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-cream/10 hover:bg-gold hover:text-espresso transition-colors duration-300 cursor-pointer"
                >
                  <link.icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-beige mb-4 text-sm tracking-widest uppercase">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-beige/70 hover:text-cream text-sm transition-colors duration-200 cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-beige mb-4 text-sm tracking-widest uppercase">
              Kunjungi Kami
            </h4>
            <div className="text-beige/70 text-sm space-y-2">
              <p>Cikasumukan, Mandalamekar</p>
              <p>Cimenyan, Kab. Bandung, Jawa Barat 40193</p>
              <p className="pt-2">Selasa–Jumat: 12.00–20.00</p>
              <p>Sabtu–Minggu: 11.00–21.00</p>
              <p className="text-gold/60 text-xs">Senin Tutup</p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-cream/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-beige/50 text-xs">
            &copy; {new Date().getFullYear()} Ngopi Di Kebon. Hak cipta dilindungi.
          </p>
          <p className="text-beige/50 text-xs flex items-center gap-1">
            Dibuat dengan <HiHeart className="text-gold" /> di Bandung
          </p>
        </div>
      </div>
    </footer>
  )
}
