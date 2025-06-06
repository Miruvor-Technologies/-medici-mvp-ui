
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"



export function Header() {
        return (
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
        )
      }