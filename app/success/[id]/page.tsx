import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { CheckCircle, Heart, Share2, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/ui/header"
import { Footer } from "@/components/ui/footer"
import { getStudentById } from "@/utils/sample-data"

export default function SuccessPage({ params }: { params: { id: string } }) {
  const studentId = parseInt(params.id)
  const student = getStudentById(studentId)

  // Mock transaction data - you can replace this with real data
  const transactionData = {
    amount: "250", // This should come from your actual transaction
    hash: "0x1234...5678",
    network: "Ethereum",
    status: "Confirmed"
  }

  if (!student) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-medium text-gray-900 mb-2">Student Not Found</h1>
          <p className="text-gray-600 mb-4">The student profile you're looking for doesn't exist.</p>
          <Button asChild variant="outline" size="lg">
            <Link href="/browse">Back to Browse</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="container mx-auto px-6 py-20 max-w-2xl text-center">
        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircle className="h-12 w-12 text-blue-600" />
        </div>

        <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-6 leading-tight">
          Your funds are on the way to {student.name}!
        </h1>
        <p className="text-xl text-gray-600 mb-12 font-light leading-relaxed">
          Your ${transactionData.amount} USDC contribution is being processed on the blockchain
        </p>

        <Card className="mb-8 border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-6">
              <Image
                src={student.photo}
                alt={student.name}
                width={80}
                height={80}
                className="rounded-full object-cover w-20 h-20"
              />
              <div className="text-left">
                <h3 className="text-xl font-medium">{student.name}</h3>
                <p className="text-gray-600 mb-2">
                  {student.program} at {student.university}
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
                <span className="font-mono text-xs text-blue-600">{transactionData.hash}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Network:</span>
                <span className="font-medium">{transactionData.network}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className="text-blue-600 font-medium">{transactionData.status}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Email Updates */}
        <Card className="mb-8 border-gray-200">
          <CardContent className="p-6">
            <h3 className="font-medium mb-3">Want updates on your student's progress?</h3>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Get notified when {student.name} posts updates about their journey
            </p>
            <div className="flex gap-3">
              <Input type="email" placeholder="Enter your email" className="flex-1 rounded-full border-gray-300 h-12" />
              <Button className="rounded-full bg-blue-600 hover:bg-blue-700 text-white px-6">Subscribe</Button>
            </div>
            <p className="text-xs text-gray-500 mt-3">We'll link your wallet address with your email for updates</p>
          </CardContent>
        </Card>

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
              <Link href={`/student/${student.id}`}>
                View Profile
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Impact Message */}
        <div className="mt-16 p-8 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="font-medium text-blue-900 mb-3">Your Impact</h3>
          <p className="text-blue-800 leading-relaxed">
            Thanks to supporters like you, we've helped over 1,200 students achieve their educational dreams. Every
            contribution makes a difference!
          </p>
        </div>
      </div>

      <Footer/>
    </div>
  )
}