"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import WelcomePage from "./components/welcome-page"
import ChatPage from "./components/chat-page"
import ApiStatus from "./components/api-status"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

export default function App() {
  const [showWelcome, setShowWelcome] = useState(true)
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(true)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "مرحباً! أنا مساعدك الذكي المتطور مدعوم بتقنية Groq AI. كيف يمكنني مساعدتك اليوم؟",
      role: "assistant",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleStartChat = () => {
    setShowWelcome(false)
  }

  const handleCloseSubscription = () => {
    setShowSubscriptionModal(false)
  }

  const handleTelegramVisit = () => {
    window.open("https://t.me/chat_nx", "_blank")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.content,
        role: "assistant",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("خطأ:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "عذراً، حدث خطأ في الاتصال. يرجى المحاولة مرة أخرى.",
        role: "assistant",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen">
      <ApiStatus />
      <AnimatePresence mode="wait">
        {showWelcome ? (
          <motion.div
            key="welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <WelcomePage
              onStartChat={handleStartChat}
              showSubscriptionModal={showSubscriptionModal}
              onCloseSubscription={handleCloseSubscription}
              onTelegramVisit={handleTelegramVisit}
            />
          </motion.div>
        ) : (
          <motion.div key="chat" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <ChatPage
              messages={messages}
              isLoading={isLoading}
              handleSubmit={handleSubmit}
              input={input}
              setInput={setInput}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
