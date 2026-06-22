import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function IntroOverlay({ onFinish }) {
  const [phase, setPhase] = useState('enter')

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('hold'), 1200)
    const t2 = setTimeout(() => setPhase('exit'), 2600)
    const t3 = setTimeout(() => onFinish(), 3600)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [onFinish])

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

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: phase === 'hold' ? 1 : 0 }}
          transition={{ duration: 1.4, ease: 'easeInOut' }}
          className="absolute bottom-1/4 h-0.5 w-40 bg-gold/60 rounded-full origin-center"
          style={{ transformOrigin: 'center center' }}
        />
      </motion.div>
    </AnimatePresence>
  )
}
