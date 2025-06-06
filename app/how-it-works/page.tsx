import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Users, Zap, DollarSign, CheckCircle, ArrowRight, Target } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100 bg-white sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image src="/images/medici-logo.svg" alt="Medici" width={120} height={40} className="h-8 w-auto" />
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/about" className="text-gray-600 hover:text-gray-900 transition-colors">
              About
            </Link>
            <Link href="/how-it-works" className="text-gray-900 font-medium">
              How It Works
            </Link>
            <Link href="/faq" className="text-gray-600 hover:text-gray-900 transition-colors">
              FAQ
            </Link>
            <Link href="/privacy" className="text-gray-600 hover:text-gray-900 transition-colors">
              Privacy Policy
            </Link>
            <Button asChild variant="outline" className="rounded-full border-gray-300 hover:bg-gray-50">
              <Link href="/login">Sign In</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-light text-gray-900 mb-8 leading-tight">How Medici Works</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
            Medici connects students directly with donors through blockchain technology, ensuring transparent and secure
            funding for education.
          </p>
        </div>
      </section>

      {/* For Donors */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-light text-center mb-16">For Donors</h2>
          <div className="grid md:grid-cols-4 gap-12 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-medium mb-4">1. Browse Students</h3>
              <p className="text-gray-600 leading-relaxed">
                Explore verified student profiles, read their stories, and see their funding goals.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-medium mb-4">2. Choose a Student</h3>
              <p className="text-gray-600 leading-relaxed">
                Select a student whose story resonates with you and whose goals align with your values.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <DollarSign className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-medium mb-4">3. Make a Pledge</h3>
              <p className="text-gray-600 leading-relaxed">
                Connect your wallet and send USDC directly to the student's wallet address.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-medium mb-4">4. Track Progress</h3>
              <p className="text-gray-600 leading-relaxed">
                Receive updates on your student's academic progress and achievements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* For Students */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-light text-center mb-16">For Students</h2>
          <div className="grid md:grid-cols-4 gap-12 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-medium mb-4">1. Create Profile</h3>
              <p className="text-gray-600 leading-relaxed">
                Complete your profile with your story, goals, and verification documents.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-medium mb-4">2. Get Verified</h3>
              <p className="text-gray-600 leading-relaxed">
                Our team reviews your documents to ensure authenticity and builds donor trust.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-medium mb-4">3. Connect with Donors</h3>
              <p className="text-gray-600 leading-relaxed">
                Your profile goes live and donors can discover and support your educational journey.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <DollarSign className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-medium mb-4">4. Receive Funding</h3>
              <p className="text-gray-600 leading-relaxed">
                Get USDC directly in your wallet and share progress updates with your supporters.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Blockchain Benefits */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-light text-center mb-16">Why Blockchain?</h2>
          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-medium mb-4">Transparency</h3>
              <p className="text-gray-600 leading-relaxed">
                Every transaction is recorded on the blockchain, providing complete transparency about where funds go
                and how they're used.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-medium mb-4">Direct Transfer</h3>
              <p className="text-gray-600 leading-relaxed">
                Funds go directly from donor to student wallets without intermediaries, ensuring 100% of donations reach
                students.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <DollarSign className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-medium mb-4">Low Fees</h3>
              <p className="text-gray-600 leading-relaxed">
                Blockchain transactions have minimal fees compared to traditional payment processors, maximizing the
                impact of donations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
            <h2 className="text-4xl font-light mb-6">Security & Trust</h2>
            <p className="text-xl text-gray-600 mb-12 font-light leading-relaxed">
              We verify every student through document review and identity checks. All transactions are secured by
              blockchain technology, and smart contracts ensure funds are used appropriately.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-gray-200">
                <CardContent className="p-8 text-center">
                  <CheckCircle className="h-8 w-8 text-blue-600 mx-auto mb-4" />
                  <h4 className="font-medium mb-3">Document Verification</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Enrollment proof, transcripts, and ID verification required for all students.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-gray-200">
                <CardContent className="p-8 text-center">
                  <CheckCircle className="h-8 w-8 text-blue-600 mx-auto mb-4" />
                  <h4 className="font-medium mb-3">Blockchain Security</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    All transactions are immutable and transparent on the blockchain.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-gray-200">
                <CardContent className="p-8 text-center">
                  <CheckCircle className="h-8 w-8 text-blue-600 mx-auto mb-4" />
                  <h4 className="font-medium mb-3">Progress Tracking</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Students provide regular updates on their academic progress.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-light mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto font-light">
            Join thousands of donors and students already using Medici to democratize education funding.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg font-medium"
            >
              <Link href="/browse">
                Browse Students
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full border-gray-300 hover:bg-gray-50 px-8 py-6 text-lg font-medium"
            >
              <Link href="/register">Apply for Funding</Link>
            </Button>
          </div>
        </div>
      </section>

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
