"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Sparkles, Rocket, ArrowRight, ExternalLink, X, Brain, MessageCircle, Zap, Crown } from "lucide-react"

interface WelcomePageProps {
  onStartChat: () => void
  showSubscriptionModal: boolean
  onCloseSubscription: () => void
  onTelegramVisit: () => void
}

export default function WelcomePage({
  onStartChat,
  showSubscriptionModal,
  onCloseSubscription,
  onTelegramVisit,
}: WelcomePageProps) {
  return (
    <div
      className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
      dir="rtl"
    >
      {/* خلفية بسيطة وخفيفة */}
      <div className="absolute inset-0">
        {/* شبكة خفيفة */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        {/* كرات متوهجة مبسطة */}
        <motion.div
          className="absolute top-20 left-20 w-64 h-64 bg-purple-500/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-64 h-64 bg-pink-500/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      {/* المحتوى الرئيسي */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
        {/* العنوان الرئيسي */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="flex items-center justify-center gap-6 mb-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <Brain className="w-16 h-16 text-purple-400" />
            <Sparkles className="w-20 h-20 text-cyan-400" />
            <Zap className="w-16 h-16 text-pink-400" />
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            مساعد الذكاء الاصطناعي
          </motion.h1>

          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            تجربة محادثة ذكية مع أحدث تقنيات الذكاء الاصطناعي
          </motion.p>
        </motion.div>

        {/* البطاقات المبسطة */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl w-full"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          {[
            {
              icon: MessageCircle,
              title: "محادثة ذكية",
              desc: "تفاعل طبيعي مع الذكاء الاصطناعي",
            },
            {
              icon: Zap,
              title: "استجابة فورية",
              desc: "إجابات سريعة ودقيقة",
            },
            {
              icon: Crown,
              title: "ذكاء متطور",
              desc: "تقنيات حديثة ومتقدمة",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
            >
              <Card className="p-6 bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300">
                <div className="text-center">
                  <div className="inline-flex p-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 mb-4">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.desc}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* زر البدء */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.3, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={() => {
              onCloseSubscription()
              onStartChat()
            }}
            className="px-8 py-4 text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl shadow-xl border-0"
          >
            <div className="flex items-center gap-3">
              <Rocket className="w-5 h-5" />
              ابدأ المحادثة الآن
              <ArrowRight className="w-5 h-5" />
            </div>
          </Button>
        </motion.div>
      </div>

      {/* نافذة الاشتراك المبسطة */}
      <AnimatePresence>
        {showSubscriptionModal && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-md w-full"
            >
              <Card className="p-6 bg-gray-900/90 backdrop-blur-xl border border-purple-500/30">
                <button
                  onClick={onCloseSubscription}
                  className="absolute top-3 left-3 p-2 rounded-full bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
                >
                  <X className="w-4 h-4 text-gray-400" />
                </button>

                <div className="text-center">
                  <Brain className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-3">مرحباً بك!</h3>
                  <p className="text-gray-300 mb-6 text-sm">للحصول على أفضل تجربة، انضم لقناتنا على التلغرام</p>

                  <div className="space-y-3">
                    <Button
                      onClick={onTelegramVisit}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3"
                    >
                      <ExternalLink className="w-4 h-4 ml-2" />
                      انضم الآن @chat_nx
                    </Button>

                    <Button
                      onClick={onCloseSubscription}
                      variant="outline"
                      className="w-full border-gray-600 text-gray-300 hover:bg-gray-800/50"
                    >
                      تخطي الآن
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
