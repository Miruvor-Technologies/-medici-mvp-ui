import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { CheckCircle, Heart, Share2, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/ui/header"
import { Footer } from "@/components/ui/footer"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

function SuccessPageContent() {
  const searchParams = useSearchParams()
  
  // Get transaction data from URL parameters
  const transactionData = {
    amount: searchParams.get('amount') || '0',
    hash: searchParams.get('hash') || '',
    student: {
      name: searchParams.get('student') || 'Student',
      program: searchParams.get('program') || 'Program',
      university: searchParams.get('university') || 'University',
      photo: searchParams.get('photo') || '/placeholder.svg'
    }
  }
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      <div className="container mx-auto px-6 py-20 max-w-2xl text-center">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircle className="h-12 w-12 text-blue-600" />
        </div>

        {/* Success Message */}
        <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-6 leading-tight">
          Your funds are on the way to {transactionData.student.name}!
        </h1>
        <p className="text-xl text-gray-600 mb-12 font-light leading-relaxed">
          Your ${transactionData.amount} USDC contribution is being processed on the blockchain
        </p>

        {/* Student Card */}
        <Card className="mb-8 border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-6">
              <Image
                src={transactionData.student.photo || "/placeholder.svg"}
                alt={transactionData.student.name}
                width={80}
                height={80}
                className="rounded-full object-cover"
              />
              <div className="text-left">
                <h3 className="text-xl font-medium">{transactionData.student.name}</h3>
                <p className="text-gray-600 mb-2">
                  {transactionData.student.program} at {transactionData.student.university}
                </p>
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-gray-600">You contributed ${transactionData.amount}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Transaction Details */}
        <Card className="mb-8 border-gray-200">
          <CardContent className="p-6">
            <h3 className="font-medium mb-4">Transaction Details</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Amount:</span>
                <span className="font-medium">${transactionData.amount} USDC</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Transaction Hash:</span>
                <span className="font-mono text-xs text-blue-600 break-all">{transactionData.hash}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Network:</span>
                <span className="font-medium">Solana</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className="text-blue-600 font-medium">Confirmed</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Email Updates */}
        

        {/* Action Buttons */}
        <div className="space-y-4">
          <Button
            asChild
            size="lg"
            className="w-full rounded-full bg-blue-600 hover:bg-blue-700 text-white h-12 text-lg"
          >
            <Link href="/browse">
              <Heart className="mr-2 h-5 w-5" />
              Discover More Students
            </Link>
          </Button>

          <div className="flex gap-4">
            <Button variant="outline" className="flex-1 rounded-full border-gray-300 hover:bg-gray-50 h-12">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Button variant="outline" asChild className="flex-1 rounded-full border-gray-300 hover:bg-gray-50 h-12">
              <Link href={`/student/${transactionData.student.name.toLowerCase().replace(" ", "-")}`}>
                View Profile
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>


      </div>

      {/* Footer */}
      <Footer/>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center">Loading...</div>}>
      <SuccessPageContent />
    </Suspense>
  )
}
