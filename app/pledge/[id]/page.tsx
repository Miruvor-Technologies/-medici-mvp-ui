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
import { BrowserProvider } from "ethers"
import { approveMediciToken, sendWithFee } from "@/evm-medici-sdk/src"

// Contract addresses (replace with your actual addresses)
const TOKEN_ADDRESS = process.env.NEXT_PUBLIC_TOKEN_ADDRESS!
const TRANSFER_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_TRANSFER_CONTRACT_ADDRESS!

// Create client-side Supabase client using environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseKey)

// Extend Window interface for Ethereum
declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: any[] }) => Promise<any>
      on: (event: string, callback: (accounts: string[]) => void) => void
      removeListener: (event: string, callback: (accounts: string[]) => void) => void
    }
  }
}

// Add new transaction state type
type TransactionState = 'idle' | 'approving' | 'approved' | 'sending' | 'confirming' | 'confirmed' | 'failed'

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
  const [transactionError, setTransactionError] = useState<{
    message: string
    details?: string
  } | null>(null)
  const [transactionState, setTransactionState] = useState<TransactionState>('idle')

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
    const checkConnection = async () => {
      if (isClient && typeof window !== 'undefined' && window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' })
          if (accounts && accounts.length > 0) {
            setWalletConnected(true)
            setWalletAddress(accounts[0])
          }
        } catch (error) {
          console.error('Error checking wallet connection:', error)
        }
      }
    }

    checkConnection()

    // Listen for account changes
    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length > 0) {
        setWalletConnected(true)
        setWalletAddress(accounts[0])
      } else {
        setWalletConnected(false)
        setWalletAddress("")
      }
    }

    if (typeof window !== 'undefined' && window.ethereum) {
      const ethereum = window.ethereum
      ethereum.on('accountsChanged', handleAccountsChanged)
      return () => {
        ethereum.removeListener('accountsChanged', handleAccountsChanged)
      }
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
    console.log('Quick amount selected:', amount)
  }

  const connectMetamask = async () => {
    if (!isClient) return

    try {
      setIsConnecting(true)
      
      // Check if MetaMask is installed
      if (typeof window === 'undefined' || !window.ethereum) {
        alert('MetaMask is not installed. Please install MetaMask to continue.')
        console.error('MetaMask not found')
        return
      }

      // Connect to wallet
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      if (accounts && accounts.length > 0) {
        console.log('Connected to wallet:', accounts[0])
        setWalletConnected(true)
        setWalletAddress(accounts[0])
      } else {
        throw new Error('No accounts found')
      }
      
    } catch (error: any) {
      console.error('Wallet connection failed:', error)
      alert('Failed to connect wallet. Please try again.')
    } finally {
      setIsConnecting(false)
    }
  }

  const sendFundsToStudent = async () => {
    if (!isClient || !walletConnected || !window.ethereum) {
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
      setTransactionError(null)
      setTransactionState('approving')
      
      // Scroll to top immediately when starting transaction
      window.scrollTo({ top: 0, behavior: 'smooth' })
      
      console.log('=== STARTING TRANSACTION PROCESS ===')
      console.log('Donor wallet:', walletAddress)
      console.log('Student wallet:', student.walletAddress)
      console.log('Amount entered by user:', pledgeAmount)
      console.log('Token address:', TOKEN_ADDRESS)
      console.log('Transfer contract:', TRANSFER_CONTRACT_ADDRESS)
      
      // Validate amount first
      const amount = pledgeAmount.toString()
      if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
        throw new Error('Invalid amount entered')
      }

      // Create provider
      if (!window.ethereum) throw new Error('MetaMask not found')
      const provider = new BrowserProvider(window.ethereum)
      console.log('Provider created')

      // First approve the transfer
      setTransactionState('approving')
      console.log('Approving token transfer...', {
        tokenAddress: TOKEN_ADDRESS,
        spenderAddress: TRANSFER_CONTRACT_ADDRESS,
        amount: amount
      })
      
      const approveTx = await approveMediciToken(
        provider,
        TOKEN_ADDRESS,
        TRANSFER_CONTRACT_ADDRESS,
        amount
      )
      
      setTransactionState('approved')
      console.log('Token transfer approved!', {
        hash: approveTx.hash,
        blockNumber: approveTx.blockNumber,
        status: approveTx.status
      })

      // Add a small delay to ensure user sees the approved state
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Then send the tokens
      setTransactionState('sending')
      console.log('Sending tokens...', {
        contractAddress: TRANSFER_CONTRACT_ADDRESS,
        studentAddress: student.walletAddress,
        amount: amount
      })
      
      const sendTx = await sendWithFee(
        provider,
        TRANSFER_CONTRACT_ADDRESS,
        student.walletAddress,
        amount
      )
      
      setTransactionState('confirming')
      console.log('Transaction successful!', {
        hash: sendTx.hash,
        blockNumber: sendTx.blockNumber,
        status: sendTx.status
      })

      // Set transaction data for display
      const txHash = sendTx.hash
      console.log('Final transaction details:', {
        hash: txHash,
        amount: amount,
        from: walletAddress,
        to: student.walletAddress,
        status: sendTx.status
      })

      setTransactionState('confirmed')
      setTransactionData({
        amount: amount,
        hash: txHash,
        status: 'Confirmed'
      })

      // No need to scroll here since we already scrolled at the start
      
      // Wait a bit then redirect to success page with transaction data
      setTimeout(() => {
        if (typeof window !== 'undefined') {
          const successUrl = `/success/${resolvedParams.id}?amount=${encodeURIComponent(amount)}&hash=${encodeURIComponent(txHash)}&student=${encodeURIComponent(student.fullName)}&program=${encodeURIComponent(student.program)}&university=${encodeURIComponent(student.university)}&photo=${encodeURIComponent(student.photo || '')}&from=${encodeURIComponent(walletAddress)}&to=${encodeURIComponent(student.walletAddress)}`
          window.location.href = successUrl
        }
      }, 3000)

    } catch (error: any) {
      setTransactionState('failed')
      console.error('=== TRANSACTION FAILED ===')
      console.error('Transaction failed:', error)
      console.error('Error details:', {
        message: error.message,
        code: error.code,
        stack: error.stack
      })
      
      // Log the full error object for debugging
      console.error('Full error object:', JSON.stringify(error, null, 2))
      
      let errorMessage = 'Transaction failed. Please try again.'
      let errorDetails = error.message
      
      if (error.message?.includes('user rejected') || error.message?.includes('User rejected')) {
        errorMessage = 'Transaction was rejected by user.'
        errorDetails = 'You cancelled the transaction in your wallet.'
      } else if (error.message?.includes('insufficient funds')) {
        errorMessage = 'Insufficient funds in your wallet.'
        errorDetails = 'Please ensure you have enough tokens in your wallet.'
      } else if (error.message?.includes('execution reverted')) {
        errorMessage = 'Transaction reverted.'
        errorDetails = 'The transaction was reverted by the smart contract. Please try again.'
      }
      
      // Set error state for UI display
      setTransactionError({
        message: errorMessage,
        details: errorDetails
      })
      
      // Scroll to top to show error
      window.scrollTo({ top: 0, behavior: 'smooth' })
      
      console.error('Showing error to user:', errorMessage)
    } finally {
      setIsProcessing(false)
    }
  }

  // Helper function to get transaction state message
  const getTransactionStateMessage = () => {
    switch (transactionState) {
      case 'approving':
        return 'Requesting token approval...'
      case 'approved':
        return 'Token approval confirmed! Preparing transfer...'
      case 'sending':
        return 'Sending tokens to student...'
      case 'confirming':
        return 'Waiting for blockchain confirmation...'
      case 'confirmed':
        return 'Transaction confirmed!'
      case 'failed':
        return 'Transaction failed'
      default:
        return ''
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

        {/* Transaction Error Display */}
        {transactionError && (
          <Card className="mb-8 border-red-200 bg-red-50">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-xl font-medium text-red-900 mb-2">Transaction Failed</h3>
                <p className="text-red-700 mb-4">{transactionError.message}</p>
                {transactionError.details && (
                  <div className="bg-red-100 p-4 rounded-lg border border-red-200 mb-4">
                    <p className="text-sm text-red-800">{transactionError.details}</p>
                  </div>
                )}
                <Button
                  onClick={() => setTransactionError(null)}
                  variant="outline"
                  className="border-red-300 text-red-700 hover:bg-red-100"
                >
                  Try Again
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Transaction Processing State */}
        {isProcessing && transactionState !== 'idle' && (
          <Card className="mb-8 border-blue-200 bg-blue-50">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
                </div>
                <h3 className="text-xl font-medium text-blue-900 mb-2">Processing Transaction</h3>
                <p className="text-blue-700 mb-4">{getTransactionStateMessage()}</p>
                <div className="space-y-4">
                  <div className="flex items-center justify-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${transactionState === 'approving' ? 'bg-blue-600 animate-pulse' : transactionState === 'approved' || transactionState === 'sending' || transactionState === 'confirming' || transactionState === 'confirmed' ? 'bg-green-600' : 'bg-gray-300'}`} />
                    <span className="text-sm">Token Approval</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${transactionState === 'sending' ? 'bg-blue-600 animate-pulse' : transactionState === 'confirming' || transactionState === 'confirmed' ? 'bg-green-600' : 'bg-gray-300'}`} />
                    <span className="text-sm">Token Transfer</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${transactionState === 'confirming' ? 'bg-blue-600 animate-pulse' : transactionState === 'confirmed' ? 'bg-green-600' : 'bg-gray-300'}`} />
                    <span className="text-sm">Blockchain Confirmation</span>
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
                Connect Your Ethereum Wallet
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-6">Connect your MetaMask wallet to send USDC to {student.fullName}</p>
              <Button
                onClick={connectMetamask}
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
                    Connect MetaMask
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
                    onChange={(e) => {
                      setPledgeAmount(e.target.value)
                      console.log('Amount input changed to:', e.target.value)
                    }}
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
                  onClick={async () => {
                    // Scroll to top immediately when button is clicked
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                    // Small delay to allow smooth scroll before transaction starts
                    await new Promise(resolve => setTimeout(resolve, 500))
                    sendFundsToStudent()
                  }}
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
                    Secure transaction powered by Ethereum blockchain
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