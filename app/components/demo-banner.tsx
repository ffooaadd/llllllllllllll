"use client"

import { motion } from "framer-motion"
import { Sparkles, Zap } from "lucide-react"
import { Card } from "@/components/ui/card"

export default function DemoBanner() {
  return (
    <motion.div
      className="fixed bottom-4 left-4 right-4 z-40"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, type: "spring", stiffness: 200 }}
    >
      <Card className="p-4 bg-gradient-to-r from-lime-500/20 to-green-500/20 backdrop-blur-xl border-lime-400/30 relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-lime-400/10 to-green-400/10"
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />

        <div className="relative z-10 flex items-center justify-center gap-3 text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            <Sparkles className="w-5 h-5 text-lime-400" />
          </motion.div>
          <span className="text-white font-medium">🎉 التطبيق يعمل في الوضع التجريبي - تجربة كاملة بدون API!</span>
          <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}>
            <Zap className="w-5 h-5 text-green-400" />
          </motion.div>
        </div>
      </Card>
    </motion.div>
  )
}
