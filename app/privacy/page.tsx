import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function PrivacyPage() {
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
            <Link href="/how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">
              How It Works
            </Link>
            <Link href="/faq" className="text-gray-600 hover:text-gray-900 transition-colors">
              FAQ
            </Link>
            <Link href="/privacy" className="text-gray-900 font-medium">
              Privacy Policy
            </Link>
            <Button asChild variant="outline" className="rounded-full border-gray-300 hover:bg-gray-50">
              <Link href="/login">Sign In</Link>
            </Button>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-light text-gray-900 mb-8 leading-tight">Privacy Policy</h1>
            <p className="text-xl text-gray-600 font-light leading-relaxed">Last updated: January 1, 2024</p>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <div className="space-y-12">
              <section>
                <h2 className="text-3xl font-light text-gray-900 mb-6">Introduction</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  At Medici, we are committed to protecting your privacy and ensuring the security of your personal
                  information. This Privacy Policy explains how we collect, use, disclose, and safeguard your
                  information when you use our platform for education funding.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  By using our service, you agree to the collection and use of information in accordance with this
                  policy.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-light text-gray-900 mb-6">Information We Collect</h2>

                <h3 className="text-xl font-medium text-gray-900 mb-4">Personal Information</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  We collect information you provide directly to us, such as:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
                  <li>Name, email address, and contact information</li>
                  <li>Educational background and university details</li>
                  <li>Financial information related to funding requests</li>
                  <li>Identity verification documents</li>
                  <li>Wallet addresses for blockchain transactions</li>
                </ul>

                <h3 className="text-xl font-medium text-gray-900 mb-4">Usage Information</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  We automatically collect certain information about your use of our platform:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Device information and browser type</li>
                  <li>IP address and location data</li>
                  <li>Platform usage patterns and preferences</li>
                  <li>Transaction history and blockchain interactions</li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-light text-gray-900 mb-6">How We Use Your Information</h2>
                <p className="text-gray-600 leading-relaxed mb-4">We use the information we collect to:</p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Provide and maintain our education funding platform</li>
                  <li>Verify student identities and enrollment status</li>
                  <li>Process funding transactions and donations</li>
                  <li>Communicate with users about their accounts and transactions</li>
                  <li>Improve our services and user experience</li>
                  <li>Comply with legal obligations and prevent fraud</li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-light text-gray-900 mb-6">Information Sharing</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  We do not sell, trade, or otherwise transfer your personal information to third parties except:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>With your explicit consent</li>
                  <li>To service providers who assist in our operations</li>
                  <li>When required by law or to protect our rights</li>
                  <li>In connection with a business transfer or acquisition</li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-light text-gray-900 mb-6">Blockchain and Cryptocurrency</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Our platform uses blockchain technology for transparent transactions. Please note:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Blockchain transactions are public and immutable</li>
                  <li>Wallet addresses may be visible on public blockchains</li>
                  <li>We do not control or have access to your private keys</li>
                  <li>Transaction data is stored on decentralized networks</li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-light text-gray-900 mb-6">Data Security</h2>
                <p className="text-gray-600 leading-relaxed">
                  We implement appropriate technical and organizational measures to protect your personal information
                  against unauthorized access, alteration, disclosure, or destruction. However, no method of
                  transmission over the internet or electronic storage is 100% secure.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-light text-gray-900 mb-6">Your Rights</h2>
                <p className="text-gray-600 leading-relaxed mb-4">You have the right to:</p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Access and update your personal information</li>
                  <li>Request deletion of your data (subject to legal requirements)</li>
                  <li>Opt out of marketing communications</li>
                  <li>Request data portability</li>
                  <li>Lodge a complaint with supervisory authorities</li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-light text-gray-900 mb-6">Contact Us</h2>
                <p className="text-gray-600 leading-relaxed">
                  If you have any questions about this Privacy Policy or our data practices, please contact us at:
                </p>
                <div className="mt-4 p-6 bg-gray-50 rounded-lg">
                  <p className="text-gray-700">
                    <strong>Email:</strong> privacy@medici.ac
                    <br />
                    <strong>Address:</strong> 123 Education Street, San Francisco, CA 94105
                  </p>
                </div>
              </section>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-20 text-center">
            <Card className="bg-gray-50 border-gray-200">
              <CardContent className="p-12">
                <h2 className="text-3xl font-light text-gray-900 mb-4">Questions about our privacy practices?</h2>
                <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                  Our team is here to help you understand how we protect your information and respect your privacy.
                </p>
                <Button
                  size="lg"
                  className="rounded-full bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg font-medium"
                >
                  Contact Support
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
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
