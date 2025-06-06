
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Mail, Twitter } from "lucide-react"



export function Footer() {
        return (
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
  <a href="mailto:contact@medici.ac" className="hover:text-gray-900 transition-colors">
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

              </ul>
            </div>
          </div>
          <div className="border-t border-gray-100 mt-12 pt-8 text-center text-gray-600">
            <p>&copy; 2025 Medici. All rights reserved.</p>
          </div>
        </div>
      </footer>
        )
      }