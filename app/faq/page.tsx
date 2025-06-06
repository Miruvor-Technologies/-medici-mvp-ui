import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, ArrowRight, Twitter, Mail } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { cacheTag } from "next/dist/server/use-cache/cache-tag"
import { Footer } from "@/components/ui/footer"
import { Header } from "@/components/ui/header"

const faqs = [

  {
     category: "General",
    questions: [{ 
    question: "How can I verify that the student received my donation?",
    answer:
      "When you complete a transaction, you'll receive a transaction reference or hash. While we notify you of the transaction status, you don't need to take our word for it. Use the hash to independently verify the transaction on any public blockchain explorer.",
  },
  {
    question: "What fees does Medici charge?",
    answer:
      "Medici charges a small fee per transaction to support platform development. However, during our early access phase, all platform fees are waived. You'll only pay the standard blockchain network fee.",
  },
  {
    question: "Can I donate if I'm not familiar with cryptocurrencies?",
    answer:
      "You'll need a crypto wallet with funds to complete a donation. If you're new to crypto, our team can share resources and guide you through setting up a wallet and adding funds.",
  },
  {
    question: "Will I receive updates about the student I support?",
    answer:
      "We encourage students to share updates on how they use the funds they receive. If you'd like to stay informed, sign up with your email after you complete a transaction to receive occasional, non-spammy updates about their progress. We're also working on features that improve accountability and traceability over time.",
  },
  {
    question: "Are donations made through Medici tax-deductible?",
    answer:
      "Donations made through Medici are currently not tax-deductible. We are exploring partnerships and paths to enable this in the future.",
  },
  {
    question: "Can I support students outside the US?",
    answer:
      "Medici is currently available to US citizens and international students who are enrolled or expected to enroll at a US institution. We're actively working on expanding access to students globally.",
  },
  {
    question: "What blockchain does Medici operate on?",
    answer:
      "Medici runs on the Solana blockchain and supports USDC (a stablecoin pegged to the US dollar) for all transactions.",
  },



    ],
  },
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
     <Header />

<div className="container mx-auto px-6 py-20">
  {/* Hero Section */}
  <div className="text-center mb-20">
    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
      Frequently Asked Questions
    </h1>
    <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-light leading-relaxed">
      Find answers to common questions about Medici, blockchain funding, and how our platform works.
    </p>
  </div>

{/* FAQ Categories */}
<div className="space-y-12 max-w-3xl mx-auto">
  {faqs.map((category, categoryIndex) => (
    <section key={categoryIndex}>
      <h2 className="text-2xl font-semibold text-gray-800 mb-5 border-b border-gray-200 pb-1">
        {category.category}
      </h2>
      <div className="space-y-3">
        {category.questions.map((faq, faqIndex) => (
          <Collapsible key={faqIndex}>
            <Card className="border border-gray-200 rounded-lg shadow-sm transition-shadow hover:shadow-md">
              <CollapsibleTrigger className="w-full text-left">
                <CardHeader className="px-4 py-3 group flex justify-between items-center hover:bg-gray-50 transition-colors">
                  <CardTitle className="text-base font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                    {faq.question}
                  </CardTitle>
                  <ChevronDown className="h-4 w-4 text-gray-400 group-data-[state=open]:rotate-180 transition-transform duration-300" />
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed">
                  {faq.answer}
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
                <a
  href="https://x.com/Medici_ac"
  target="_blank"
  rel="noopener noreferrer"
>
  <Button
    size="lg"
    className="rounded-full bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg font-medium"
  >
    Contact Support
    <ArrowRight className="ml-2 h-5 w-5" />
  </Button>
</a>
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
      
        <Footer />

    </div>
  )
}
