'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, MapPin, Heart, Info, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/ui/header"
import { Footer } from "@/components/ui/footer"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { motion } from "framer-motion"

// Skeleton Card Component
const SkeletonCard = () => (
  <Card className="border-gray-100 bg-gray-50/30 backdrop-blur-sm">
    <CardContent className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-[60px] h-[60px] rounded-full bg-gray-200 animate-pulse" />
        <div className="flex-1">
          <div className="h-5 bg-gray-200 rounded-md animate-pulse mb-2 w-32" />
          <div className="h-4 bg-gray-200 rounded-md animate-pulse w-24" />
        </div>
      </div>

      <div className="mb-6">
        <div className="h-5 bg-gray-200 rounded-md animate-pulse mb-2 w-48" />
        <div className="h-4 bg-gray-200 rounded-md animate-pulse w-36" />
      </div>

      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <div className="h-4 bg-gray-200 rounded-md animate-pulse w-16" />
          <div className="h-4 bg-gray-200 rounded-md animate-pulse w-8" />
        </div>
        <div className="h-2 bg-gray-200 rounded-full animate-pulse" />
        <div className="flex justify-between text-sm mt-2">
          <div className="h-4 bg-gray-200 rounded-md animate-pulse w-20" />
          <div className="h-4 bg-gray-200 rounded-md animate-pulse w-16" />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-6 bg-gray-200 rounded-full animate-pulse w-16" />
        ))}
      </div>

      <div className="space-y-2 mb-6">
        <div className="h-4 bg-gray-200 rounded-md animate-pulse w-full" />
        <div className="h-4 bg-gray-200 rounded-md animate-pulse w-3/4" />
      </div>

      <div className="h-10 bg-gray-200 rounded-full animate-pulse w-full" />
    </CardContent>
  </Card>
)

export default function BrowseStudentsPage() {
  const handleNotifyClick = () => {
    window.open('mailto:contact@medici.ac', '_blank');
  };

  // Generate skeleton cards
  const skeletonCards = Array.from({ length: 6 }, (_, i) => (
    <SkeletonCard key={i} />
  ));

  return (
    <div className="min-h-screen bg-background dark:bg-black flex flex-col">
      <Header />
      <div className="flex-1 h-[calc(100vh-64px)] relative">
        <main className="h-full relative">
          {/* Background Skeleton Grid - Fixed Height Container */}
          <div className="h-full w-full overflow-hidden opacity-20 pointer-events-none select-none">
            <div className="grid grid-cols-3 gap-8 p-8">
              {skeletonCards}
            </div>
          </div>

          {/* Overlay Content */}
          <div className="fixed inset-0 flex items-center justify-center z-30">
            <div className="w-full max-w-2xl mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.97, y: 24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="bg-card/80 dark:bg-card/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-border p-12"
              >
                <div className="text-center space-y-8">
                  <div className="space-y-4">
                    <h2 className="text-3xl font-light text-foreground">No Student Profiles Available</h2>
                    <p className="text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed">
                      We are currently in the process of verifying student profiles.<br />
                      <span className="text-blue-500 font-medium">Stay tuned for updates!</span>
                    </p>
                  </div>
                  <div className="flex items-center justify-center gap-3">
                    <Button 
                      onClick={handleNotifyClick}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-base font-medium px-8 py-3 h-auto rounded-full flex items-center gap-2 transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      Notify Me When Ready
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                    <TooltipProvider>
                      <Tooltip delayDuration={200}>
                        <TooltipTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="rounded-full hover:bg-muted w-11 h-11 flex items-center justify-center border border-border bg-background/80 backdrop-blur-sm"
                          >
                            <Info className="h-5 w-5 text-muted-foreground" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent 
                          side="right" 
                          align="center" 
                          className="max-w-[320px] p-4 bg-card shadow-xl rounded-xl border border-border text-foreground"
                        >
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            Once student profiles are verified by our team, we will notify you when they become publicly available to view. This ensures the quality and authenticity of all profiles on our platform.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  {/* Additional visual element */}
                  <div className="flex justify-center">
                    <div className="flex items-center gap-2 text-sm text-blue-400">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                      <span>Verification in progress</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}