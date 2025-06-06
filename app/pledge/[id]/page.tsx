import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Wallet, Shield, Zap } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Mock student data
const student = {
  id: 1,
  name: "Maria Rodriguez",
  photo: "/images/maria-rodriguez.png",
  university: "MIT",
  program: "Computer Science",
  goal: 50000,
  funded: 32000,
  remaining: 18000,
}

export default function PledgePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100 bg-white sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image src="/images/medici-logo.svg" alt="Medici" width={120} height={40} className="h-8 w-auto" />
          </Link>
          <Button asChild variant="outline" className="rounded-full border-gray-300 hover:bg-gray-50">
            <Link href="/login">Sign In</Link>
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12 max-w-2xl">
        {/* Back Button */}
        <Link
          href={`/student/${student.id}`}
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Profile
        </Link>

        {/* Student Summary */}
        <Card className="mb-8 border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-6">
              <Image
                src={student.photo || "/placeholder.svg"}
                alt={student.name}
                width={80}
                height={80}
                className="rounded-full object-cover"
              />
              <div>
                <h2 className="text-2xl font-light">{student.name}</h2>
                <p className="text-gray-600 mb-2">
                  {student.program} at {student.university}
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-gray-600">
                    ${student.funded.toLocaleString()} raised of ${student.goal.toLocaleString()}
                  </span>
                  <Badge variant="secondary" className="rounded-full bg-blue-50 text-blue-700 border-blue-200">
                    ${student.remaining.toLocaleString()} remaining
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pledge Form */}
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="text-3xl font-light text-center">Support {student.name}</CardTitle>
            <p className="text-center text-gray-600 font-light">Your contribution will directly fund their education</p>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Amount Input */}
            <div>
              <label className="text-sm font-medium mb-3 block">Pledge Amount (USDC)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                <Input
                  type="number"
                  placeholder="0.00"
                  className="pl-8 text-lg h-14 rounded-full border-gray-300"
                  min="1"
                  step="0.01"
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">Minimum pledge: $1 USDC</p>
            </div>

            {/* Quick Amount Buttons */}
            <div>
              <label className="text-sm font-medium mb-3 block">Quick amounts</label>
              <div className="grid grid-cols-4 gap-3">
                {[25, 50, 100, 250].map((amount) => (
                  <Button key={amount} variant="outline" className="h-12 rounded-full border-gray-300 hover:bg-gray-50">
                    ${amount}
                  </Button>
                ))}
              </div>
            </div>

            {/* Optional Message */}
            <div>
              <label className="text-sm font-medium mb-3 block">Message for {student.name} (Optional)</label>
              <Textarea
                placeholder="Write an encouraging message..."
                className="min-h-[100px] border-gray-300 rounded-lg"
              />
            </div>

            {/* Security Features */}
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h4 className="font-medium mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-600" />
                Secure & Transparent
              </h4>
              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex items-center gap-3">
                  <Zap className="h-4 w-4 text-blue-600" />
                  <span>100% on-chain transaction</span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="h-4 w-4 text-blue-600" />
                  <span>Funds go directly to student</span>
                </div>
                <div className="flex items-center gap-3">
                  <Wallet className="h-4 w-4 text-blue-600" />
                  <span>No platform fees</span>
                </div>
              </div>
            </div>

            {/* Fund Button */}
            <Button
              size="lg"
              className="w-full h-14 text-lg rounded-full bg-blue-600 hover:bg-blue-700 text-white"
              asChild
            >
              <Link href="/success">
                <Wallet className="mr-2 h-5 w-5" />
                Connect Wallet & Fund
              </Link>
            </Button>

            <p className="text-xs text-gray-500 text-center leading-relaxed">
              By clicking "Connect Wallet & Fund", you agree to our Terms of Service and Privacy Policy. Your wallet
              will open to complete the USDC transaction.
            </p>
          </CardContent>
        </Card>

        {/* How it Works */}
        <Card className="mt-8 border-gray-200">
          <CardHeader>
            <CardTitle className="text-xl font-light">How it works</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                  1
                </div>
                <div>
                  <h4 className="font-medium mb-1">Connect your wallet</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    We'll prompt you to connect your crypto wallet (MetaMask, Phantom, etc.)
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                  2
                </div>
                <div>
                  <h4 className="font-medium mb-1">Approve the transaction</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">Confirm the USDC transfer in your wallet</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                  3
                </div>
                <div>
                  <h4 className="font-medium mb-1">Funds transferred</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Your contribution goes directly to the student's wallet
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <Image src="/images/medici-logo.svg" alt="Medici" width={120} height={40} className="h-8 w-auto mb-4" />
              <p className="text-gray-600 leading-relaxed">
                Democratizing education funding through blockchain technology.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-4">Platform</h4>
              <ul className="space-y-3 text-gray-600">
                <li>
                  <Link href="/how-it-works" className="hover:text-gray-900 transition-colors">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="/browse" className="hover:text-gray-900 transition-colors">
                    Browse Students
                  </Link>
                </li>
                <li>
                  <Link href="/register" className="hover:text-gray-900 transition-colors">
                    Apply for Funding
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Support</h4>
              <ul className="space-y-3 text-gray-600">
                <li>
                  <Link href="/faq" className="hover:text-gray-900 transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-gray-900 transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/help" className="hover:text-gray-900 transition-colors">
                    Help Center
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Legal</h4>
              <ul className="space-y-3 text-gray-600">
                <li>
                  <Link href="/privacy" className="hover:text-gray-900 transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-gray-900 transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/security" className="hover:text-gray-900 transition-colors">
                    Security
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-100 mt-12 pt-8 text-center text-gray-600">
            <p>&copy; 2024 Medici. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
