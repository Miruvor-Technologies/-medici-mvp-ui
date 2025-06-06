import { Button } from "@/components/ui/button"
import { Shield, Users, Zap, ArrowRight, Target, Globe, Heart } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100 bg-white sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image src="/images/medici-logo.svg" alt="Medici" width={120} height={40} className="h-8 w-auto" />
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/about" className="text-gray-900 font-medium">
              About
            </Link>
            <Link href="/how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">
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
          <h1 className="text-5xl md:text-6xl font-light text-gray-900 mb-8 leading-tight">About Medici</h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
            We're democratizing education funding through blockchain technology, creating direct connections between
            students who need support and donors who want to make a difference.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-light text-gray-900 mb-8">Our Mission</h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-12">
              To eliminate barriers in education funding by creating a transparent, efficient, and direct platform that
              connects students with supporters worldwide. We believe every talented student deserves the opportunity to
              pursue their educational dreams, regardless of their financial circumstances.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-medium mb-4">Direct Impact</h3>
                <p className="text-gray-600">100% of donations reach students directly through blockchain technology</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Globe className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-medium mb-4">Global Reach</h3>
                <p className="text-gray-600">
                  Supporting students from universities worldwide, breaking down geographical barriers
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-medium mb-4">Community Driven</h3>
                <p className="text-gray-600">
                  Building a community of supporters and students working together for educational success
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-light text-gray-900 mb-12 text-center">Our Values</h2>

            <div className="space-y-12">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl font-medium mb-4">Transparency</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Every transaction is recorded on the blockchain, providing complete visibility into how funds are
                    used. Donors can track their contributions and see the direct impact of their support.
                  </p>
                </div>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto md:order-1">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <div className="md:order-2">
                  <h3 className="text-2xl font-medium mb-4">Accessibility</h3>
                  <p className="text-gray-600 leading-relaxed">
                    We believe education funding should be accessible to all. Our platform removes traditional barriers
                    and bureaucracy, making it easy for students to connect with supporters.
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl font-medium mb-4">Innovation</h3>
                  <p className="text-gray-600 leading-relaxed">
                    By leveraging blockchain technology and smart contracts, we're creating new possibilities for
                    education funding that are more efficient, secure, and transparent than traditional methods.
                  </p>
                </div>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <Zap className="h-8 w-8 text-blue-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-light text-gray-900 mb-6">Join Our Mission</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Whether you're a student seeking support or a donor looking to make an impact, you can be part of the future
            of education funding.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg font-medium"
            >
              <Link href="/browse">
                Fund a Student
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
