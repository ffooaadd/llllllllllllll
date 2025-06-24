"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { WifiOff, Zap, AlertCircle, CheckCircle } from "lucide-react"
import { Card } from "@/components/ui/card"

export default function ApiStatus() {
  const [apiStatus, setApiStatus] = useState<"checking" | "groq" | "fallback" | "error">("checking")
  const [showStatus, setShowStatus] = useState(true)
  const [modelUsed, setModelUsed] = useState<string>("")

  useEffect(() => {
    checkApiStatus()
  }, [])

  const checkApiStatus = async () => {
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [{ role: "user", content: "test connection" }],
        }),
      })

      if (response.ok) {
        const data = await response.json()
        if (data.provider === "groq") {
          setApiStatus("groq")
          setModelUsed(data.model || "groq-model")
        } else if (data.provider === "fallback") {
          setApiStatus("fallback")
        } else {
          setApiStatus("error")
        }
      } else {
        setApiStatus("error")
      }
    } catch (error) {
      setApiStatus("fallback")
    }

    // إخفاء الإشعار بعد 5 ثوان
    setTimeout(() => setShowStatus(false), 5000)
  }

  const getStatusConfig = () => {
    switch (apiStatus) {
      case "groq":
        return {
          icon: CheckCircle,
          text: `متصل بـ Groq AI (${modelUsed})`,
          color: "from-green-500 to-emerald-500",
          bgColor: "bg-green-500/20",
          borderColor: "border-green-500/30",
        }
      case "fallback":
        return {
          icon: Zap,
          text: "وضع الاحتياطي - يعمل بدون API",
          color: "from-yellow-500 to-orange-500",
          bgColor: "bg-yellow-500/20",
          borderColor: "border-yellow-500/30",
        }
      case "error":
        return {
          icon: WifiOff,
          text: "خطأ في الاتصال",
          color: "from-red-500 to-pink-500",
          bgColor: "bg-red-500/20",
          borderColor: "border-red-500/30",
        }
      default:
        return {
          icon: AlertCircle,
          text: "جاري التحقق من الاتصال...",
          color: "from-blue-500 to-cyan-500",
          bgColor: "bg-blue-500/20",
          borderColor: "border-blue-500/30",
        }
    }
  }

  const config = getStatusConfig()

  return (
    <AnimatePresence>
      {showStatus && (
        <motion.div
          className="fixed top-4 right-4 z-50"
          initial={{ opacity: 0, x: 100, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 100, scale: 0.8 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <Card
            className={`p-3 backdrop-blur-xl border ${config.bgColor} ${config.borderColor} relative overflow-hidden`}
          >
            <motion.div
              className={`absolute inset-0 bg-gradient-to-r ${config.color} opacity-10`}
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />

            <div className="relative z-10 flex items-center gap-2">
              <motion.div
                animate={
                  apiStatus === "checking" ? { rotate: 360 } : apiStatus === "groq" ? { scale: [1, 1.2, 1] } : {}
                }
                transition={{
                  duration: apiStatus === "checking" ? 1 : 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              >
                <config.icon
                  className={`w-4 h-4`}
                  style={{
                    color: config.color.includes("green")
                      ? "#10b981"
                      : config.color.includes("yellow")
                        ? "#eab308"
                        : config.color.includes("red")
                          ? "#ef4444"
                          : "#3b82f6",
                  }}
                />
              </motion.div>
              <span className="text-white font-medium text-sm">{config.text}</span>
            </div>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
