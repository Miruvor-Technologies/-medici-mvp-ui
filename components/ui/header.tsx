import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ui/theme-toggle"

export function Header() {
  return (
    <header className="fixed top-0 w-full z-50 backdrop-blur-md bg-background/40 border-b border-border/30 supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/medici-logo.svg"
            alt="Medici"
            width={240}
            height={64}
            className="h-16 w-auto dark:invert"
            priority
          />
        </Link>

        <div className="flex items-center ml-auto gap-2">
          <nav className="flex items-center gap-2">
            <Link
              href="/about"
              className="nav-animated-link text-muted-foreground hover:text-foreground transition-colors font-medium px-3 py-2 rounded-md"
            >
              About
            </Link>
            <Link
              href="/#how-it-works"
              className="nav-animated-link text-muted-foreground hover:text-foreground transition-colors font-medium px-3 py-2 rounded-md"
            >
              How It Works
            </Link>
            <Link
              href="/#faq"
              className="nav-animated-link text-muted-foreground hover:text-foreground transition-colors font-medium px-3 py-2 rounded-md"
            >
              FAQ
            </Link>
            <Link
              href="/privacy"
              className="nav-animated-link text-muted-foreground hover:text-foreground transition-colors font-medium px-3 py-2 rounded-md"
            >
              Privacy Policy
            </Link>
            <Button asChild variant="outline" className="rounded-full border-border font-medium px-5 py-2 ml-2">
              <a href="mailto:contact@medici.ac" target="_blank" rel="noopener noreferrer" className="flex items-center">
                Contact Us
              </a>
            </Button>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
} 