"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { CheckCircle, Heart, Share2, ArrowRight, Loader2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/ui/header"
import { Footer } from "@/components/ui/footer"
import { createClient } from '@supabase/supabase-js'
import { useSearchParams } from "next/navigation"
import { useState, useEffect, use } from "react"
import { ShareButton } from "@/components/sharebutton"

// Create client-side Supabase client using environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

export default function SuccessPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const searchParams = useSearchParams()
  const [student, setStudent] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  // Get transaction data from URL parameters (passed from pledge page)
  const transactionData = {
    amount: searchParams.get('amount') || '0',
    hash: searchParams.get('hash') || '',
    network: "Polygon zkEVM",
    status: "Confirmed",
    from: searchParams.get('from') || '',
    to: searchParams.get('to') || ''
  }

  // Debug: Log the received parameters
  useEffect(() => {
    console.log('Success page URL parameters:', {
      amount: searchParams.get('amount'),
      hash: searchParams.get('hash'),
      student: searchParams.get('student'),
      program: searchParams.get('program'),
      university: searchParams.get('university'),
      photo: searchParams.get('photo')
    })
  }, [searchParams])

  // Fetch student data
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const { data, error } = await supabase
          .from('student_profiles')
          .select('*')
          .eq('id', resolvedParams.id)
          .single()

        if (error) {
          console.error('Error fetching student:', error)
        } else {
          setStudent(data)
        }
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStudent()
  }, [resolvedParams.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!student) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-medium text-foreground mb-2">Student Not Found</h1>
          <p className="text-muted-foreground mb-4">The student profile you're looking for doesn't exist.</p>
          <Button asChild variant="outline" size="lg">
            <Link href="/browse">Back to Browse</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background dark:bg-black text-foreground">
      <Header />

      <div className="container mx-auto px-6 py-20 max-w-2xl text-center">
        <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircle className="h-12 w-12 text-blue-400" />
        </div>

        <h1 className="text-4xl md:text-5xl font-light text-foreground mb-6 leading-tight">
          Your funds are on the way to {student.fullName}!
        </h1>
        <p className="text-xl text-muted-foreground mb-12 font-light leading-relaxed">
          Your ${transactionData.amount || '0'} USDC contribution is being processed on the blockchain
        </p>

        <Card className="mb-8 bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center gap-6">
              <Image
                src={student.photo || "/image.png"}
                alt={student.fullName}
                width={80}
                height={80}
                className="rounded-full object-cover w-20 h-20"
              />
              <div className="text-left">
                <h3 className="text-xl font-medium text-foreground">{student.fullName}</h3>
                <p className="text-muted-foreground mb-2">
                  {student.program} at {student.university}
                </p>
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-blue-500" />
                  <span className="text-sm text-muted-foreground">You contributed ${transactionData.amount || '0'}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Transaction Details */}
        <Card className="mb-8 bg-card border-border">
          <CardContent className="p-6">
            <h3 className="font-medium text-foreground mb-4">Transaction Details</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Amount:</span>
                <span className="font-medium text-foreground">${transactionData.amount || '0'} USDC</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">From:</span>
                <a 
                  href={`https://cardona-zkevm.polygonscan.com/address/${transactionData.from}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-blue-500 hover:text-blue-400 break-all underline"
                >
                  {transactionData.from}
                </a>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">To:</span>
                <a 
                  href={`https://cardona-zkevm.polygonscan.com/address/${transactionData.to}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-blue-500 hover:text-blue-400 break-all underline"
                >
                  {transactionData.to}
                </a>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Transaction Hash:</span>
                {transactionData.hash ? (
                  <a 
                    href={`https://cardona-zkevm.polygonscan.com/tx/${transactionData.hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs text-blue-500 hover:text-blue-400 break-all underline"
                  >
                    {transactionData.hash}
                  </a>
                ) : (
                  <span className="font-mono text-xs text-muted-foreground">Processing...</span>
                )}
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Network:</span>
                <span className="font-medium text-foreground">{transactionData.network}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <span className="text-green-400 font-medium flex items-center gap-1">
                  <CheckCircle className="h-4 w-4" />
                  {transactionData.status}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Button
            asChild
            size="lg"
            className="w-full rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white h-12 text-lg"
          >
            <Link href="/browse">
              <Heart className="mr-2 h-5 w-5" />
              Discover More Students
            </Link>
          </Button>

          <div className="flex gap-4">
            <ShareButton className="flex-1 h-12 rounded-full border border-border bg-background text-foreground font-medium flex items-center justify-center transition" />
            <Button variant="outline" asChild className="flex-1 rounded-full border-border bg-background text-foreground hover:bg-muted h-12 font-medium">
              <Link href={`/student/${student.id}`}>
                View Profile
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <Footer/>
    </div>
  )
}