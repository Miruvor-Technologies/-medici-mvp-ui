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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

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
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      <div className="h-[calc(100vh-64px)] relative"> {/* Adjust height based on header height */}
        <main className="h-full relative">
          {/* Background Skeleton Grid - Fixed Height Container */}
          <div className="h-full w-full overflow-hidden opacity-20">
            <div className="grid grid-cols-3 gap-8 p-8">
              {Array.from({ length: 6 }, (_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          </div>

          {/* Overlay Content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full max-w-2xl mx-auto px-6">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-12">
                <div className="text-center space-y-8">
                  <div className="space-y-4">
                    <h2 className="text-3xl font-light text-gray-700">No Student Profiles Available</h2>
                    <p className="text-lg text-gray-500 max-w-lg mx-auto leading-relaxed">
                      We are currently in the process of verifying student profiles.
                      <br />
                      <span className="text-blue-600 font-medium">Stay tuned for updates!</span>
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-center gap-3">
                    <Button 
                      onClick={handleNotifyClick}
                      className="bg-blue-600 hover:bg-blue-700 text-base font-medium px-8 py-3 h-auto rounded-full flex items-center gap-2 transition-all duration-200 shadow-lg hover:shadow-xl"
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
                            className="rounded-full hover:bg-gray-100 w-11 h-11 flex items-center justify-center border border-gray-200 bg-white/80 backdrop-blur-sm"
                          >
                            <Info className="h-5 w-5 text-gray-500" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent 
                          side="right" 
                          align="center" 
                          className="max-w-[320px] p-4 bg-white shadow-xl rounded-xl border border-gray-200"
                        >
                          <p className="text-sm text-gray-700 leading-relaxed">
                            Once student profiles are verified by our team, we will notify you when they become publicly available to view. This ensures the quality and authenticity of all profiles on our platform.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>

                  {/* Additional visual element */}
                  <div className="flex justify-center">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                      <span>Verification in progress</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}