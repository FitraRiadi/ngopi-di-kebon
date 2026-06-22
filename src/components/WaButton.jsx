import { motion } from 'framer-motion'
import { LuSend } from 'react-icons/lu'

export default function WaButton() {
  return (
    <motion.a
      href="https://wa.me/6285721611105"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.5, type: 'spring', stiffness: 300, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-green-600 hover:bg-green-700 text-white pl-4 pr-5 py-3 rounded-full shadow-xl shadow-green-600/30 transition-colors duration-300 cursor-pointer"
    >
      <LuSend size={20} />
      <span className="text-sm font-medium">Chat WA</span>
    </motion.a>
  )
}
