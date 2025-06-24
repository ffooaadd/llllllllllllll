"use client"

import type React from "react"

import { useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Send, User, Bot, ArrowLeft, Settings, Sparkles } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

interface ChatPageProps {
  messages: Message[]
  isLoading: boolean
  handleSubmit: (e: React.FormEvent) => void
  input: string
  setInput: (value: string) => void
}

export default function ChatPage({ messages, isLoading, handleSubmit, input, setInput }: ChatPageProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleBackToWelcome = () => {
    window.location.reload()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" dir="rtl">
      {/* خلفية بسيطة */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: "30px 30px",
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col h-screen">
        {/* الهيدر المبسط */}
        <motion.header
          className="p-4 border-b border-white/10 backdrop-blur-xl bg-black/20"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between">
            <motion.button
              onClick={handleBackToWelcome}
              className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors p-2 rounded-lg hover:bg-purple-400/10"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-5 h-5" />
              <span>العودة</span>
            </motion.button>

            <div className="flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-purple-400" />
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                مساعد الذكاء الاصطناعي
              </h1>
            </div>

            <button className="p-2 rounded-lg bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </motion.header>

        {/* منطقة الرسائل */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`flex ${message.role === "user" ? "justify-start" : "justify-end"}`}
              >
                <div className="max-w-[80%]">
                  <Card
                    className={`p-4 backdrop-blur-xl border transition-all duration-300 ${
                      message.role === "user" ? "bg-purple-500/20 border-purple-400/30" : "bg-white/5 border-white/10"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`p-2 rounded-lg ${
                          message.role === "user"
                            ? "bg-purple-500/30 text-purple-200"
                            : "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                        }`}
                      >
                        {message.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                      </div>

                      <div className="flex-1">
                        <p className="text-white leading-relaxed">{message.content}</p>
                        <p className="text-xs text-gray-400 mt-2">{message.timestamp.toLocaleTimeString("ar-SA")}</p>
                      </div>
                    </div>
                  </Card>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* مؤشر الكتابة */}
          {isLoading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-end">
              <Card className="p-4 backdrop-blur-xl bg-white/5 border-white/10">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                    <Bot className="w-4 h-4" />
                  </div>

                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 bg-purple-400 rounded-full"
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 1,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: i * 0.2,
                        }}
                      />
                    ))}
                  </div>

                  <span className="text-gray-300 text-sm">جاري الكتابة...</span>
                </div>
              </Card>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* منطقة الإدخال */}
        <motion.div
          className="p-4 border-t border-white/10 backdrop-blur-xl bg-black/20"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <form onSubmit={handleSubmit} className="flex gap-3">
            <div className="flex-1">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="اكتب رسالتك هنا..."
                className="bg-white/10 border-white/20 text-white placeholder-gray-400 backdrop-blur-xl focus:border-purple-400 transition-all duration-300 py-3"
                disabled={isLoading}
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 px-4 py-3"
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  )
}
