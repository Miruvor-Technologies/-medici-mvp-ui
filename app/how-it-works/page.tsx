import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Users, Zap, DollarSign, CheckCircle, ArrowRight, Target } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/ui/header"
import { Footer } from "@/components/ui/footer"

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-white">
  {/* Header */}
  <Header />

  {/* Hero Section */}
  <section className="container mx-auto px-6 py-20 text-center">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-5xl md:text-6xl font-semibold text-gray-900 mb-6 leading-tight">
        How Medici Works
      </h1>
      <p className="text-lg md:text-xl text-gray-600 font-light max-w-2xl mx-auto">
        Medici connects students directly with donors through blockchain technology, ensuring transparent and secure funding for education.
      </p>
    </div>
  </section>

  {/* For Donors */}
  <section className="py-16">
    <div className="container mx-auto px-6">
      <h2 className="text-4xl font-semibold text-center mb-12">For Donors</h2>
      <div className="grid md:grid-cols-4 gap-10 max-w-6xl mx-auto">
        {[
          { icon: Users, title: "1. Browse Students", text: "Explore verified student profiles, read their stories, and see their funding goals." },
          { icon: CheckCircle, title: "2. Choose a Student", text: "Select a student whose story resonates with you and whose goals align with your values." },
          { icon: DollarSign, title: "3. Make a Pledge", text: "Connect your wallet and send USDC directly to the student's wallet address." },
          { icon: Zap, title: "4. Track Progress", text: "Receive updates on your student's academic progress and achievements." }
        ].map((item, idx) => (
          <div className="text-center" key={idx}>
            <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <item.icon className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  </section>

  {/* For Students */}
  <section className="bg-gray-50 py-16">
    <div className="container mx-auto px-6">
      <h2 className="text-4xl font-semibold text-center mb-12">For Students</h2>
      <div className="grid md:grid-cols-4 gap-10 max-w-6xl mx-auto">
        {[
          { icon: Target, title: "1. Create Profile", text: "Complete your profile with your story, goals, and verification documents." },
          { icon: Shield, title: "2. Get Verified", text: "Our team reviews your documents to ensure authenticity and builds donor trust." },
          { icon: Users, title: "3. Connect with Donors", text: "Your profile goes live and donors can discover and support your educational journey." },
          { icon: DollarSign, title: "4. Receive Funding", text: "Get USDC directly in your wallet and share progress updates with your supporters." }
        ].map((item, idx) => (
          <div className="text-center" key={idx}>
            <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <item.icon className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  </section>

  {/* Blockchain Benefits */}
  <section className="py-16">
    <div className="container mx-auto px-6">
      <h2 className="text-4xl font-semibold text-center mb-12">Why Blockchain?</h2>
      <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
        {[
          { icon: Shield, title: "Transparency", text: "Every transaction is recorded on the blockchain, providing full visibility into how funds are used." },
          { icon: Zap, title: "Direct Transfer", text: "Funds move directly from donor to student wallets with no intermediaries." },
          { icon: DollarSign, title: "Low Fees", text: "Minimal blockchain transaction fees maximize the impact of donations." }
        ].map((item, idx) => (
          <div className="text-center" key={idx}>
            <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <item.icon className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  </section>

  {/* Security Section */}
  <section className="bg-gray-50 py-16">
    <div className="container mx-auto px-6 text-center">
      <div className="max-w-4xl mx-auto">
        <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Shield className="h-6 w-6 text-blue-600" />
        </div>
        <h2 className="text-4xl font-semibold mb-4">Security & Trust</h2>
        <p className="text-lg text-gray-600 mb-10">
          We verify every student through document review and identity checks. Smart contracts ensure proper use of funds and on-chain transparency.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Document Verification", text: "Enrollment proof, transcripts, and ID verification required for all students." },
            { title: "Blockchain Security", text: "All transactions are immutable and transparent on the blockchain." },
            { title: "Progress Tracking", text: "Students provide regular updates on their academic progress." }
          ].map((item, idx) => (
            <Card className="border border-gray-200 shadow-sm" key={idx}>
              <CardContent className="p-6 text-center">
                <CheckCircle className="h-6 w-6 text-blue-600 mx-auto mb-4" />
                <h4 className="font-medium mb-2 text-gray-900">{item.title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{item.text}</p>
              </CardContent>
            </Card>
          ))}
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
      <Footer />
    </div>
  )
}
