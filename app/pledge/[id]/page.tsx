"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Wallet, Shield, Zap, Loader2 } from "lucide-react"

// Extend Window interface for MetaMask
declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: any[] }) => Promise<any>
      isMetaMask?: boolean
    }
  }
}

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
  const [isConnecting, setIsConnecting] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [pledgeAmount, setPledgeAmount] = useState("")
  const [message, setMessage] = useState("")
  const [isClient, setIsClient] = useState(false)

  // Ensure we're on the client side before accessing window
  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleQuickAmount = (amount: number) => {
    setPledgeAmount(amount.toString())
  }

  const connectWalletAndFund = async () => {
    // Only proceed if we're on the client side
    if (!isClient) {
      return
    }

    try {
      setIsConnecting(true)
      
      // Check if MetaMask is installed
      if (typeof window === 'undefined' || typeof window.ethereum === 'undefined') {
        alert('MetaMask is not installed. Please install MetaMask to continue.')
        return
      }

      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      })

      if (accounts.length === 0) {
        alert('No accounts found. Please unlock MetaMask.')
        return
      }

      const account = accounts[0]
      console.log('Connected account:', account)

      setIsConnecting(false)
      setIsProcessing(true)

      // Simplified mock transaction - just send a small amount of ETH
      const transactionParams = {
        to: '0x742d35Cc6634C0532925a3b8D49EC0dC5E123456', // Mock recipient address
        from: account,
        value: '0x5AF3107A4000', // 0.0001 ETH in wei (hex)
        gas: '0x5208', // 21000 gas limit
      }

      // Request transaction signature
      const txHash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParams],
      })

      console.log('Transaction hash:', txHash)

      // Wait for 3 seconds to simulate transaction processing
      await new Promise(resolve => setTimeout(resolve, 3000))

      // Redirect to success page (only on client side)
      if (typeof window !== 'undefined') {
        window.location.href = '/success'
      }

    } catch (error: any) {
      console.error('Wallet connection or transaction failed:', error)
      
      if (error.code === 4001) {
        alert('Transaction was rejected by user.')
      } else if (error.code === -32602) {
        alert('Invalid transaction parameters.')
      } else {
        alert('An error occurred. Please try again.')
      }
    } finally {
      setIsConnecting(false)
      setIsProcessing(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100 bg-white sticky top-0 z-50">
       <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center">
            <img src="/images/medici-logo.svg" alt="Medici" width={120} height={40} className="h-8 w-auto" />
          </a>
          <Button variant="outline" className="rounded-full border-gray-300 hover:bg-gray-50">
            Sign In
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12 max-w-2xl">
        {/* Back Button */}
        <button
          onClick={() => {
            if (typeof window !== 'undefined') {
              window.history.back()
            }
          }}
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Profile
        </button>

        {/* Student Summary */}
        <Card className="mb-8 border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-6">
              <img
                src={student.photo || "/placeholder.svg"}
                alt={student.name}
                width={80}
                height={80}
                className="rounded-full object-cover w-20 h-20"
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
                  value={pledgeAmount}
                  onChange={(e) => setPledgeAmount(e.target.value)}
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
                  <Button 
                    key={amount} 
                    variant="outline" 
                    className="h-12 rounded-full border-gray-300 hover:bg-gray-50"
                    onClick={() => handleQuickAmount(amount)}
                  >
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
                value={message}
                onChange={(e) => setMessage(e.target.value)}
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
              className="w-full h-14 text-lg rounded-full bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
              onClick={connectWalletAndFund}
              disabled={isConnecting || isProcessing || !pledgeAmount || parseFloat(pledgeAmount) < 1}
            >
              {isConnecting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Connecting Wallet...
                </>
              ) : isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Processing Transaction...
                </>
              ) : (
                <>
                  <Wallet className="mr-2 h-5 w-5" />
                  Connect Wallet & Fund
                </>
              )}
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
              <img src="/images/medici-logo.svg" alt="Medici" width={120} height={40} className="h-8 w-auto mb-4" />
              <p className="text-gray-600 leading-relaxed">
                Democratizing education funding through blockchain technology.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-4">Platform</h4>
              <ul className="space-y-3 text-gray-600">
                <li>
                  <a href="/how-it-works" className="hover:text-gray-900 transition-colors">
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="/browse" className="hover:text-gray-900 transition-colors">
                    Browse Students
                  </a>
                </li>
                <li>
                  <a href="/register" className="hover:text-gray-900 transition-colors">
                    Apply for Funding
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Support</h4>
              <ul className="space-y-3 text-gray-600">
                <li>
                  <a href="/faq" className="hover:text-gray-900 transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="/contact" className="hover:text-gray-900 transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="/help" className="hover:text-gray-900 transition-colors">
                    Help Center
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Legal</h4>
              <ul className="space-y-3 text-gray-600">
                <li>
                  <a href="/privacy" className="hover:text-gray-900 transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/terms" className="hover:text-gray-900 transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="/security" className="hover:text-gray-900 transition-colors">
                    Security
                  </a>
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