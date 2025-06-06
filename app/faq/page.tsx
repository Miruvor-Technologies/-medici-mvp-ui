import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const faqs = [
  {
    category: "For Donors",
    questions: [
      {
        question: "How do I know my donation reaches the student?",
        answer:
          "All transactions are recorded on the blockchain and go directly to the student's wallet address. You can track your donation using the transaction hash provided after your contribution.",
      },
      {
        question: "Are there any fees for donating?",
        answer:
          "Medici doesn't charge any platform fees. You only pay the minimal blockchain transaction fees (usually $1-5) which go to the network validators, not to us.",
      },
      {
        question: "Can I donate without a crypto wallet?",
        answer:
          "Currently, donations require a crypto wallet with USDC. We recommend MetaMask, Phantom, or Coinbase Wallet. We're working on adding traditional payment methods in the future.",
      },
      {
        question: "How are students verified?",
        answer:
          "Students must provide enrollment verification, academic transcripts, and government ID. Our team manually reviews all documents before approving profiles.",
      },
      {
        question: "Can I get updates on the student I funded?",
        answer:
          "Yes! You can subscribe to email updates when making a donation. Students regularly post progress updates about their academic journey and achievements.",
      },
    ],
  },
  {
    category: "For Students",
    questions: [
      {
        question: "How long does the verification process take?",
        answer:
          "Verification typically takes 2-3 business days. We review your enrollment documents, transcripts, and identity verification to ensure authenticity.",
      },
      {
        question: "Do I need a crypto wallet to apply?",
        answer:
          "You can complete your application without a wallet, but you'll need one to receive funds. We provide guidance on setting up wallets and can help you through the process.",
      },
      {
        question: "What documents do I need to provide?",
        answer:
          "Required: Proof of enrollment from your university. Optional but recommended: Academic transcripts, government ID, and any relevant research or project documentation.",
      },
      {
        question: "How much can I request for funding?",
        answer:
          "There's no strict limit, but most successful campaigns range from $10,000 to $100,000. Be realistic about your needs and provide a clear breakdown of expenses.",
      },
      {
        question: "What happens after I receive funding?",
        answer:
          "You're expected to provide regular updates on your academic progress. This helps maintain donor trust and may lead to additional funding opportunities.",
      },
    ],
  },
  {
    category: "Technical",
    questions: [
      {
        question: "Which blockchains do you support?",
        answer:
          "Currently, we support Ethereum and Polygon networks for USDC transactions. We're planning to add Solana and other networks based on user demand.",
      },
      {
        question: "Why do you only accept USDC?",
        answer:
          "USDC is a stable cryptocurrency pegged to the US dollar, which eliminates volatility concerns for both donors and students. It's widely supported and easy to convert to local currency.",
      },
      {
        question: "Is my personal information secure?",
        answer:
          "Yes, we use industry-standard encryption and only store necessary information. Wallet addresses are public by nature of blockchain, but personal details are kept private.",
      },
      {
        question: "What if I lose access to my wallet?",
        answer:
          "We cannot recover lost wallets as we don't control private keys. Always backup your wallet recovery phrase securely. You can update your wallet address in your profile if needed.",
      },
    ],
  },
  {
    category: "Platform",
    questions: [
      {
        question: "How does Medici make money?",
        answer:
          "Medici is currently funded by grants and donations. We don't take any fees from student funding. In the future, we may introduce optional premium features for enhanced visibility.",
      },
      {
        question: "Can I fund students from other countries?",
        answer:
          "Yes! Medici is global. Students from any country can apply, and donors can support students worldwide. Blockchain technology makes international transfers seamless.",
      },
      {
        question: "What if a student doesn't reach their funding goal?",
        answer:
          "Students keep all funds raised, even if they don't reach their full goal. There's no all-or-nothing requirement. Partial funding can still make a significant impact.",
      },
      {
        question: "How do I report suspicious activity?",
        answer:
          "Contact our support team immediately at support@medici.ac. We take fraud seriously and investigate all reports promptly.",
      },
    ],
  },
]

export default function FAQPage() {
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
            <Link href="/faq" className="text-gray-900 font-medium">
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

      <div className="container mx-auto px-6 py-20">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-light text-gray-900 mb-8 leading-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
            Find answers to common questions about Medici, blockchain funding, and how our platform works.
          </p>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-16 max-w-4xl mx-auto">
          {faqs.map((category, categoryIndex) => (
            <section key={categoryIndex}>
              <h2 className="text-3xl font-light text-gray-900 mb-8">{category.category}</h2>
              <div className="space-y-4">
                {category.questions.map((faq, faqIndex) => (
                  <Collapsible key={faqIndex}>
                    <Card className="border-gray-200">
                      <CollapsibleTrigger className="w-full">
                        <CardHeader className="hover:bg-gray-50 transition-colors">
                          <CardTitle className="text-left flex items-center justify-between font-medium">
                            <span>{faq.question}</span>
                            <ChevronDown className="h-5 w-5 text-gray-400 transition-transform group-data-[state=open]:rotate-180" />
                          </CardTitle>
                        </CardHeader>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <CardContent className="pt-0">
                          <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                        </CardContent>
                      </CollapsibleContent>
                    </Card>
                  </Collapsible>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Contact Section */}
        <section className="mt-20">
          <Card className="bg-gray-50 border-gray-200 max-w-4xl mx-auto">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-light text-gray-900 mb-6">Still have questions?</h2>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                Can't find the answer you're looking for? Our support team is here to help you get started with Medici.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="rounded-full bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg font-medium"
                >
                  Contact Support
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-full border-gray-300 hover:bg-gray-50 px-8 py-6 text-lg font-medium"
                >
                  <Link href="/how-it-works">Learn How It Works</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
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
