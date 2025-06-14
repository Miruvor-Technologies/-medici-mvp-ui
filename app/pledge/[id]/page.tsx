"use client"

import { useState, useEffect, use } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Wallet, Shield, Zap, Loader2 } from "lucide-react"
import { createClient } from '@supabase/supabase-js'
import Link from "next/link"
import Image from "next/image"
import { Footer } from "@/components/ui/footer"
import { Connection, PublicKey } from "@solana/web3.js"
import { MediciClient } from "@/lib/medici-sdk/src/index"

// Create client-side Supabase client using environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseKey)

// Solana configuration
const SOLANA_RPC_URL = "https://api.devnet.solana.com" // Using devnet for testing
const MINT_ADDRESS = "veTsw5aZBnxMqwaAioaveRoNv9PDyjAbmaV9CLfb6cy" // Your token mint address

// Extend Window interface for Phantom wallet
declare global {
  interface Window {
    solana?: {
      isPhantom?: boolean
      connect: () => Promise<{ publicKey: PublicKey }>
      disconnect: () => Promise<void>
      signTransaction: (transaction: any) => Promise<any>
      signMessage: (message: Uint8Array) => Promise<{ signature: Uint8Array }>
      publicKey: PublicKey | null
    }
  }
}

export default function PledgePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const [student, setStudent] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isConnecting, setIsConnecting] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [pledgeAmount, setPledgeAmount] = useState("")
  const [message, setMessage] = useState("")
  const [isClient, setIsClient] = useState(false)
  const [walletConnected, setWalletConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState<string>("")
  const [transactionData, setTransactionData] = useState<{
    amount: string
    hash: string
    status: string
  } | null>(null)

  // Fetch student data from Supabase
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const { data, error } = await supabase
          .from('student_profiles')
          .select('*')
          .eq('id', resolvedParams.id)
          .single()

        if (error) {
          console.error('Supabase error:', error)
        } else if (data) {
          setStudent(data)
          // Log wallet address
          console.log('Student Wallet Address:', data.walletAddress)
        }
      } catch (error) {
        console.error('Error fetching student:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStudent()
    setIsClient(true)
  }, [resolvedParams.id])

  // Check if wallet is already connected
  useEffect(() => {
    if (isClient && window.solana && window.solana.publicKey) {
      setWalletConnected(true)
      setWalletAddress(window.solana.publicKey.toString())
    }
  }, [isClient])

  // If loading, show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading student profile...</p>
        </div>
      </div>
    )
  }

  // If no student is found, show error state
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

  const handleQuickAmount = (amount: number) => {
    setPledgeAmount(amount.toString())
  }

  const connectSolanaWallet = async () => {
    if (!isClient) return

    try {
      setIsConnecting(true)
      
      // Check if Phantom wallet is installed
      if (typeof window === 'undefined' || !window.solana || !window.solana.isPhantom) {
        alert('Phantom wallet is not installed. Please install Phantom wallet to continue.')
        console.error('Phantom wallet not found')
        return
      }

      // Connect to wallet
      const response = await window.solana.connect()
      console.log('Connected to wallet:', response.publicKey.toString())
      
      setWalletConnected(true)
      setWalletAddress(response.publicKey.toString())
      
    } catch (error: any) {
      console.error('Wallet connection failed:', error)
      alert('Failed to connect wallet. Please try again.')
    } finally {
      setIsConnecting(false)
    }
  }

  const sendFundsToStudent = async () => {
    if (!isClient || !walletConnected || !window.solana || !window.solana.publicKey) {
      alert('Please connect your wallet first.')
      return
    }

    if (!pledgeAmount || parseFloat(pledgeAmount) <= 0) {
      alert('Please enter a valid amount.')
      return
    }

    if (!student.walletAddress) {
      alert('Student wallet address not found.')
      console.error('Student wallet address missing:', student)
      return
    }

    try {
      setIsProcessing(true)
      console.log('Starting transaction process...')
      console.log('Donor wallet:', window.solana.publicKey.toString())
      console.log('Student wallet:', student.walletAddress)
      console.log('Amount:', pledgeAmount)
      console.log('Mint address:', MINT_ADDRESS)

      // Create Solana connection
      const connection = new Connection(SOLANA_RPC_URL, 'confirmed')
      console.log('Solana connection created')

      // Create wallet adapter for Medici SDK
      const walletAdapter = {
        publicKey: window.solana.publicKey,
        signTransaction: async (transaction: any) => {
          return await window.solana!.signTransaction(transaction)
        },
        signMessage: async (message: Uint8Array) => {
          const result = await window.solana!.signMessage(message)
          return result.signature
        }
      }

      // Initialize Medici client
      const mediciClient = new MediciClient(connection, walletAdapter)
      console.log('Medici client initialized')

             // Use the amount directly as tokens (not converting to smallest unit)
       const tokenAmount = Math.floor(parseFloat(pledgeAmount))
       console.log('Token amount:', tokenAmount)

       // Validate and create PublicKey objects with error handling
       let mintPublicKey: PublicKey
       let studentPublicKey: PublicKey
       
       try {
         mintPublicKey = new PublicKey(MINT_ADDRESS)
         console.log('Mint PublicKey created successfully:', mintPublicKey.toString())
       } catch (error) {
         console.error('Invalid mint address:', MINT_ADDRESS, error)
         throw new Error('Invalid mint address configuration')
       }
       
       try {
         // Clean the wallet address (remove any whitespace/invalid characters)
         const cleanWalletAddress = student.walletAddress.trim()
         studentPublicKey = new PublicKey(cleanWalletAddress)
         console.log('Student PublicKey created successfully:', studentPublicKey.toString())
       } catch (error) {
         console.error('Invalid student wallet address:', student.walletAddress, error)
         throw new Error('Invalid student wallet address')
       }
      
             console.log('Calling sendAmountFromDonorToStudent...')
       console.log('Parameters:', {
         tokenAmount,
         mintAddress: mintPublicKey.toString(),
         studentAddress: studentPublicKey.toString(),
         donorAddress: window.solana.publicKey.toString()
       })

      //  await mediciClient.initializeFeesConfigurationAccount()
       
       // Send transaction using Medici SDK
       const txHash = await mediciClient.sendAmountFromDonorToStudent(
         tokenAmount,
         mintPublicKey,
         studentPublicKey
       )

       console.log('Transaction successful! Hash:', txHash)
       console.log('Transaction details:', {
         hash: txHash,
         amount: tokenAmount,
         from: window.solana.publicKey.toString(),
         to: studentPublicKey.toString(),
         mint: mintPublicKey.toString()
       })

      // Set transaction data for display
      setTransactionData({
        amount: pledgeAmount,
        hash: txHash,
        status: 'Confirmed'
      })

      // Wait a bit then redirect to success page
      setTimeout(() => {
        if (typeof window !== 'undefined') {
          window.location.href = `/success/${resolvedParams.id}`
        }
      }, 3000)

         } catch (error: any) {
       console.error('Transaction failed:', error)
       console.error('Error details:', {
         message: error.message,
         code: error.code,
         stack: error.stack,
         logs: error.logs || 'No logs available'
       })
       
       // Log the full error object for debugging
       console.error('Full error object:', JSON.stringify(error, null, 2))
      
             let errorMessage = 'Transaction failed. Please try again.'
       
       if (error.message?.includes('User rejected') || error.message?.includes('user rejected')) {
         errorMessage = 'Transaction was rejected by user.'
       } else if (error.message?.includes('insufficient funds')) {
         errorMessage = 'Insufficient funds in your wallet.'
       }
      
      alert(errorMessage)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100 bg-white sticky top-0 z-50">
        <div className="container mx-auto px-6 py-0 flex items-center justify-between h-16">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/medici-logo.svg"
              alt="Medici"
              width={200}
              height={64}
              className="h-14 w-auto"
            />
          </Link>
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
          Back
        </button>

        {/* Transaction Success Display */}
        {transactionData && (
          <Card className="mb-8 border-green-200 bg-green-50">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-medium text-green-900 mb-2">Transaction Successful!</h3>
                <p className="text-green-700 mb-4">Your ${transactionData.amount} USDC has been sent to {student.fullName}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-green-600">Amount:</span>
                    <span className="font-medium">${transactionData.amount} USDC</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-600">Transaction Hash:</span>
                    <span className="font-mono text-xs text-green-800 break-all">{transactionData.hash}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-600">Status:</span>
                    <span className="text-green-800 font-medium">{transactionData.status}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Student Info */}
        <Card className="mb-8 border-gray-200">
          <CardContent className="p-8">
            <div className="flex items-center gap-6 mb-6">
              <Image
                src={student.photo || "/placeholder.svg"}
                alt={student.fullName}
                width={80}
                height={80}
                className="rounded-full object-cover w-20 h-20"
              />
              <div>
                <h1 className="text-2xl font-medium text-gray-900 mb-1">{student.fullName}</h1>
                <p className="text-gray-600 mb-2">{student.program} at {student.university}</p>
                <Badge variant="secondary" className="rounded-full">
                  Goal: ${student.fundsRequested ? student.fundsRequested.toLocaleString() : 'N/A'}
                </Badge>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">{student.quickBio || 'No bio available.'}</p>
          </CardContent>
        </Card>

        {/* Wallet Connection */}
        {!walletConnected ? (
          <Card className="mb-8 border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="h-5 w-5" />
                Connect Your Solana Wallet
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-6">Connect your Phantom wallet to send USDC to {student.fullName}</p>
              <Button
                onClick={connectSolanaWallet}
                disabled={isConnecting}
                className="w-full rounded-full bg-purple-600 hover:bg-purple-700 text-white h-12"
              >
                {isConnecting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  <>
                    <Wallet className="mr-2 h-4 w-4" />
                    Connect Phantom Wallet
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Wallet Connected */}
            <Card className="mb-8 border-green-200 bg-green-50">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="font-medium text-green-900">Wallet Connected</span>
                </div>
                <p className="text-sm text-green-700 mt-1 font-mono break-all">{walletAddress}</p>
              </CardContent>
            </Card>

            {/* Funding Form */}
            <Card className="mb-8 border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Send USDC to {student.fullName}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-3">Amount (USDC)</label>
                  <Input
                    type="number"
                    value={pledgeAmount}
                    onChange={(e) => setPledgeAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="rounded-full border-gray-300 h-12 text-lg"
                    min="0"
                    step="0.01"
                  />
                  <div className="flex gap-2 mt-3">
                    {[25, 50, 100, 250].map((amount) => (
                      <Button
                        key={amount}
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuickAmount(amount)}
                        className="rounded-full border-gray-300 hover:bg-gray-50"
                      >
                        ${amount}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-3">Message (Optional)</label>
                  <Textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Leave a message for the student..."
                    className="border-gray-300 rounded-lg"
                    rows={3}
                  />
                </div>

                <Button
                  onClick={sendFundsToStudent}
                  disabled={isProcessing || !pledgeAmount}
                  className="w-full rounded-full bg-blue-600 hover:bg-blue-700 text-white h-12 text-lg"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Processing Transaction...
                    </>
                  ) : (
                    <>
                      <Zap className="mr-2 h-5 w-5" />
                      Send ${pledgeAmount || '0'} USDC
                    </>
                  )}
                </Button>

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-800">
                    <Shield className="inline h-4 w-4 mr-1" />
                    Secure transaction powered by Solana blockchain
                  </p>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      <Footer />
    </div>
  )
}