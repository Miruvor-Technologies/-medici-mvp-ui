"use client"
import { Share2 } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FaWhatsapp, FaFacebook, FaXTwitter, FaEnvelope, FaRegCopy, FaCheck } from 'react-icons/fa6'

// Add className prop
type ShareButtonProps = {
  className?: string
}

export const ShareButton = ({ className = "" }: ShareButtonProps) => {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [profileUrl, setProfileUrl] = useState('')
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      setProfileUrl(window.location.href)
    }
  }, [])

  const encodedUrl = encodeURIComponent(profileUrl)
  const message = encodeURIComponent("Support this student on Medici!")

  // Close popup when clicking outside, but not for the initial button click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    if (open) {
      setTimeout(() => document.addEventListener("mousedown", handleClickOutside), 0)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [open])

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 dark:border-slate-700 bg-background dark:bg-slate-800 dark:hover:bg-slate-700 shadow-sm hover:bg-gray-100 transition text-foreground ${className}`}
      >
        <Share2 className="w-5 h-5" />
        <span className="font-medium text-sm">Share</span>
      </button>

      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl shadow-2xl p-6 space-y-5 w-96"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-foreground">Share Profile</h3>
                <button
                  onClick={() => setOpen(false)}
                  className="h-8 w-8 flex items-center justify-center rounded-full text-gray-500 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                  aria-label="Close"
                >
                  <span className="text-2xl font-light">×</span>
                </button>
              </div>

              <div className="grid grid-cols-4 gap-4 text-center">
                <a href={`https://wa.me/?text=${message}%20${encodedUrl}`} target="_blank" rel="noopener noreferrer" title="WhatsApp">
                  <div className="flex items-center justify-center h-14 w-14 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition">
                    <FaWhatsapp className="w-7 h-7 text-green-500" />
                  </div>
                </a>
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`} target="_blank" rel="noopener noreferrer" title="Facebook">
                  <div className="flex items-center justify-center h-14 w-14 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition">
                    <FaFacebook className="w-7 h-7 text-blue-600" />
                  </div>
                </a>
                <a href={`https://x.com/intent/tweet?url=${encodedUrl}&text=${message}`} target="_blank" rel="noopener noreferrer" title="X (Twitter)">
                  <div className="flex items-center justify-center h-14 w-14 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition">
                    <FaXTwitter className="w-7 h-7 text-black dark:text-white" />
                  </div>
                </a>
                <a href={`mailto:?subject=Support this student on Medici&body=${message}%0A${encodedUrl}`} title="Email">
                  <div className="flex items-center justify-center h-14 w-14 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition">
                    <FaEnvelope className="w-7 h-7 text-gray-600 dark:text-gray-300" />
                  </div>
                </a>
              </div>

              <div className="flex items-center border border-gray-300 dark:border-slate-700 rounded-lg overflow-hidden bg-gray-50 dark:bg-slate-800">
                <input
                  readOnly
                  value={profileUrl}
                  className="flex-1 px-3 py-2.5 text-sm text-gray-700 dark:text-gray-200 bg-transparent focus:outline-none"
                />
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(profileUrl)
                    setCopied(true)
                    setTimeout(() => setCopied(false), 2000)
                  }}
                  className="bg-blue-600 text-white text-sm px-4 py-2.5 hover:bg-blue-700 transition flex items-center justify-center"
                >
                  {copied ? <FaCheck className="w-4 h-4" /> : <FaRegCopy className="w-4 h-4" />}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
