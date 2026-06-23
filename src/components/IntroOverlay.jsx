import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function IntroOverlay({ progress, onFinish }) {
  const [phase, setPhase] = useState('enter')
  const pct = Math.min(Math.round((progress || 0) * 100), 100)

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('hold'), 800)
    return () => clearTimeout(t1)
  }, [])

  useEffect(() => {
    if (phase === 'hold' && pct >= 100) {
      const t = setTimeout(() => {
        setPhase('exit')
        setTimeout(onFinish, 800)
      }, 400)
      return () => clearTimeout(t)
    }
  }, [phase, pct, onFinish])

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: 0 }}
        exit={{ y: '-100%' }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-espresso"
      >
        <motion.div
          initial={{ scale: 0.6, opacity: 0, y: 30 }}
          animate={
            phase === 'enter'
              ? { scale: 1, opacity: 1, y: 0 }
              : phase === 'exit'
                ? { scale: 1.1, opacity: 0, y: -20 }
                : { scale: 1, opacity: 1, y: 0 }
          }
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center px-6"
        >
          <h1 className="font-serif text-5xl sm:text-7xl text-cream font-bold mb-3">
            Ngopi
            <span className="block text-gold">Di Kebon</span>
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === 'hold' ? 1 : 0 }}
            transition={{ duration: 0.8 }}
            className="text-beige/60 text-sm sm:text-base tracking-widest uppercase mt-4"
          >
            Authentic Indonesia Cuisine
          </motion.p>
        </motion.div>

        <div className="absolute bottom-1/4 flex flex-col items-center gap-3">
          <p className="text-beige/40 text-[11px] tracking-[0.25em] uppercase">
            Memuat tampilan {pct}%
          </p>
          <div className="h-0.5 w-40 bg-gold/15 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gold/60 rounded-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: pct / 100 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              style={{ transformOrigin: 'left center' }}
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
