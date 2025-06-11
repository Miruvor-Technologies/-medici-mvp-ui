'use client'

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { CheckCircle2 } from "lucide-react"
import { Header } from "@/components/ui/header"

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      <div className="container mx-auto px-6 py-24 max-w-2xl">
        <div className="text-center space-y-6">
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-12 h-12 text-green-500" />
            </div>
          </div>
          
          <h1 className="text-4xl font-light text-gray-900">Application Submitted!</h1>
          
          <div className="space-y-4 text-lg text-gray-600">
            <p>Thank you for applying to Medici.</p>
            <p>Our team will review your application within 2-3 business days.</p>
            <p>You'll receive an email notification once your profile is approved and live.</p>
          </div>

          <div className="pt-8">
            <Button 
              asChild
              variant="outline" 
              className="rounded-full border-gray-300 hover:bg-gray-50"
            >
              <a 
                href="mailto:contact@medici.ac" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Contact Support
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 