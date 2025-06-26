"use client"
import { Share2 } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { FaWhatsapp, FaFacebook, FaXTwitter, FaEnvelope, FaRegCopy, FaCheck } from 'react-icons/fa6'

export const ShareButton = () => {
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

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    if (open) document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [open])

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 bg-white shadow-sm hover:bg-gray-100 transition"
      >
        <Share2 className="w-5 h-5" />
        <span className="font-medium text-sm">Share</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-xl shadow-xl z-50 p-4 space-y-3">
          <div className="flex justify-between items-center">
            <a
              href={`https://wa.me/?text=${message}%20${encodedUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              title="WhatsApp"
              className="hover:scale-110 transition"
            >
              <FaWhatsapp className="w-6 h-6 text-green-500" />
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              title="Facebook"
              className="hover:scale-110 transition"
            >
              <FaFacebook className="w-6 h-6 text-blue-600" />
            </a>
            <a
              href={`https://x.com/intent/tweet?url=${encodedUrl}&text=${message}`}
              target="_blank"
              rel="noopener noreferrer"
              title="X (Twitter)"
              className="hover:scale-110 transition"
            >
              <FaXTwitter className="w-6 h-6 text-black" />
            </a>
            <a
              href={`mailto:?subject=Support this student on Medici&body=${message}%0A${encodedUrl}`}
              title="Email"
              className="hover:scale-110 transition"
            >
              <FaEnvelope className="w-6 h-6 text-gray-600" />
            </a>
          </div>

          <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
            <input
              readOnly
              value={profileUrl}
              className="flex-1 px-3 py-1.5 text-sm text-gray-700 bg-gray-50 focus:outline-none"
            />
            <button
              onClick={() => {
                navigator.clipboard.writeText(profileUrl)
                setCopied(true)
                setTimeout(() => setCopied(false), 1500)
              }}
              className="bg-blue-600 text-white text-sm px-3 py-1.5 hover:bg-blue-700 transition flex items-center justify-center"
            >
              {copied ? <FaCheck className="w-4 h-4" /> : <FaRegCopy className="w-4 h-4" />}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
