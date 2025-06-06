import { Button } from "@/components/ui/button"
import { Shield, Users, Zap, ArrowRight, Heart, GraduationCap } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Mail, Twitter } from "lucide-react"

export default function HomePage() {
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
      <section className="container mx-auto px-6 py-24 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-8 leading-tight tracking-tighter">
            Fund a Student's Future
            <span className="bg-gradient-to-r from-blue-800 to-blue-500 text-transparent bg-clip-text">
              {" "}Direct. Instant. Transparent.
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            Connect directly with students who need funding. Every transaction is transparent, secure, and recorded on
            the blockchain.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg font-medium"
            >
              <Link href="/browse">
                <Heart className="mr-2 h-5 w-5" />
                Fund a Student
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full border-gray-300 hover:bg-gray-50 px-8 py-6 text-lg font-medium"
            >
              <Link href="/register">
                <GraduationCap className="mr-2 h-5 w-5" />
                Request Scholarship Funds
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
<section className="bg-gray-50 py-24">
  <div className="container mx-auto px-6">
    <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
      {[
        {
          icon: <Users className="h-8 w-8 text-blue-600" />,
          title: "No Middlemen",
          description: "Direct peer-to-peer funding between donors and students.",
        },
        {
          icon: <Zap className="h-8 w-8 text-blue-600" />,
          title: "100% On-Chain",
          description: "Every transaction is transparent and verifiable on the blockchain.",
        },
        {
          icon: <Shield className="h-8 w-8 text-blue-600" />,
          title: "Verified Students",
          description: "All students are verified with enrollment proof and documentation.",
        },
      ].map((item, idx) => (
        <div key={idx} className="text-center p-6 bg-white shadow-sm rounded-xl hover:shadow-md transition-shadow duration-300">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            {item.icon}
          </div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">{item.title}</h3>
          <p className="text-gray-600 leading-relaxed text-base">{item.description}</p>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* Stats Section */}
      <section className="py-24">
  <div className="container mx-auto px-6">
    <div className="grid md:grid-cols-3 gap-12 text-center max-w-5xl mx-auto">
      {[
        { stat: "$2.4M", label: "Total Funded" },
        { stat: "1,247", label: "Students Helped" },
        { stat: "89", label: "Countries" },
      ].map((item, idx) => (
        <div key={idx}>
          <div className="text-5xl font-bold text-gray-900 mb-2 tracking-tight">{item.stat}</div>
          <div className="text-gray-600 text-lg">{item.label}</div>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-24">
  <div className="container mx-auto px-6 text-center">
    <h2 className="text-5xl font-semibold text-gray-900 mb-6 tracking-tight">
      Ready to make an impact?
    </h2>
    <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
      Join thousands of donors and students already using Medici to democratize education funding.
    </p>
    <Button
      asChild
      size="lg"
      className="rounded-full bg-blue-600 hover:bg-blue-700 text-white px-10 py-6 text-lg font-medium"
    >
      <Link href="/browse">
        Get Started
        <ArrowRight className="ml-2 h-5 w-5" />
      </Link>
    </Button>
  </div>
</section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
           <div>
  <Image
    src="/images/medici-logo.svg"
    alt="Medici"
    width={220}
    height={70}
    className="h-16 w-auto mb-2" 
  />
              <p className="text-gray-600 leading-relaxed">
                A peer-to-peer platform where donors pick verified students, choose any amount and fund their education securely and directly on the blockchain
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
                <li className="flex items-center gap-2">
  <Mail className="h-4 w-4 text-gray-600" />
  <a href="mailto:rd@stableresearch.xyz" className="hover:text-gray-900 transition-colors">
    Email
  </a>
</li>
<li className="flex items-center gap-2">
  <Twitter className="h-4 w-4 text-gray-600" />
  <a href="https://x.com/Medici_ac" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition-colors">
    Twitter
  </a>
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
            <p>&copy; 2025 Medici. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
