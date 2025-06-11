"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { User, DollarSign, FileText, Wallet, CheckCircle, Upload, ArrowRight, ArrowLeft, Info, Plus } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Footer } from "@/components/ui/footer"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function StudentRegisterPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [socialLinks, setSocialLinks] = useState([{ platform: '', url: '' }])
  const totalSteps = 4
  const progress = (currentStep / totalSteps) * 100

  const steps = [
    { number: 1, title: "Basic Info", icon: User },
    { number: 2, title: "Your Story", icon: FileText },
    { number: 3, title: "Social Links", icon: FileText },
    { number: 4, title: "Wallet Setup", icon: Wallet },
  ]

  const addSocialLink = () => {
    setSocialLinks([...socialLinks, { platform: '', url: '' }])
  }

  const updateSocialLink = (index: number, field: 'platform' | 'url', value: string) => {
    const newLinks = [...socialLinks]
    newLinks[index][field] = value
    setSocialLinks(newLinks)
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
      scrollToTop()
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      scrollToTop()
    }
  }

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
          {/* <Link href="/login" className="text-gray-600 hover:text-gray-900 transition-colors">
            Already have an account? Sign In
          </Link> */}
            <Button asChild variant="outline" className="rounded-full border-gray-300 hover:bg-gray-50">
                <a href="mailto:contact@medici.ac" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Contact Us
                </a>
                </Button>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12 max-w-4xl">
        {/* Progress Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-light text-center mb-4">Apply for Funding</h1>
          <p className="text-xl text-gray-600 text-center mb-8 font-light">
            Complete your profile to start receiving funding from donors
          </p>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between mb-3">
              <span className="text-sm text-gray-600 font-medium">
                Step {currentStep} of {totalSteps}
              </span>
              <span className="text-sm text-gray-600 font-medium">{progress.toFixed(0)}% complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Step Indicators */}
          <div className="flex justify-between">
            {steps.map((step) => {
              const Icon = step.icon
              const isActive = currentStep === step.number
              const isCompleted = currentStep > step.number

              return (
                <div key={step.number} className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-colors ${
                      isCompleted
                        ? "bg-blue-600 text-white"
                        : isActive
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-400"
                    }`}
                  >
                    {isCompleted ? <CheckCircle className="h-6 w-6" /> : <Icon className="h-6 w-6" />}
                  </div>
                  <span
                    className={`text-sm text-center font-medium ${
                      isActive ? "text-blue-600" : isCompleted ? "text-blue-600" : "text-gray-400"
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Step Content */}
        <Card className="border-gray-200">
          <CardContent className="p-8">
            {currentStep === 1 && (
              <div className="space-y-8">
                <div>
                  <CardTitle className="text-2xl font-light mb-4">Basic Information</CardTitle>
                  <p className="text-gray-600 mb-8 leading-relaxed">
                    Tell us about yourself and your educational background.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="firstName" className="text-sm font-medium">
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      placeholder="Enter your first name"
                      className="mt-2 rounded-full border-gray-300 h-12"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-sm font-medium">
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      placeholder="Enter your last name"
                      className="mt-2 rounded-full border-gray-300 h-12"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    className="mt-2 rounded-full border-gray-300 h-12"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="country" className="text-sm font-medium">
                      Country
                    </Label>
                    <Select>
                      <SelectTrigger className="mt-2 rounded-full border-gray-300 h-12">
                        <SelectValue placeholder="Select your country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="us">United States</SelectItem>
                        <SelectItem value="ca">Canada</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                        <SelectItem value="au">Australia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="university" className="text-sm font-medium">
                      University
                    </Label>
                    <Input
                      id="university"
                      placeholder="e.g., MIT, Stanford, Harvard"
                      className="mt-2 rounded-full border-gray-300 h-12"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="program" className="text-sm font-medium">
                      Program/Major
                    </Label>
                    <Input
                      id="program"
                      placeholder="e.g., Computer Science, Medicine"
                      className="mt-2 rounded-full border-gray-300 h-12"
                    />
                  </div>
                  <div>
                    <Label htmlFor="degree" className="text-sm font-medium">
                      Degree Level
                    </Label>
                    <Select>
                      <SelectTrigger className="mt-2 rounded-full border-gray-300 h-12">
                        <SelectValue placeholder="Select degree level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="undergraduate">Undergraduate</SelectItem>
                        <SelectItem value="graduate">Graduate/Master's</SelectItem>
                        <SelectItem value="phd">PhD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <Label htmlFor="totalAmount" className="text-sm font-medium">
                      Total Amount Needed (USDC)
                    </Label>
                    <TooltipProvider>
                      <Tooltip delayDuration={200}>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="p-0 h-auto">
                            <Info className="h-4 w-4 text-gray-400" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent 
                          side="right" 
                          align="center" 
                          className="max-w-[300px] p-4 bg-white shadow-lg rounded-xl border border-gray-200"
                        >
                          <p className="text-sm text-gray-700 leading-relaxed">
                            USDC is a stablecoin that maintains a 1:1 value with the US Dollar. Unlike other cryptocurrencies, 
                            its value remains stable and won't fluctuate, making it a safe way to receive and store funds.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className="relative mt-2">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                    <Input
                      id="totalAmount"
                      type="number"
                      placeholder="0.00"
                      className="pl-8 rounded-full border-gray-300 h-12"
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-2">Enter the total amount you need for your education</p>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-8">
                <div>
                  <CardTitle className="text-2xl font-light mb-4">Your Story</CardTitle>
                  <p className="text-gray-600 mb-8 leading-relaxed">
                    Share your story and goals to connect with potential donors.
                  </p>
                </div>

                <div>
                  <Label htmlFor="statement" className="text-sm font-medium">
                    Personal Statement
                  </Label>
                  <Textarea
                    id="statement"
                    placeholder="Tell your story... What are you studying? What are your goals? How will this funding help you make an impact?"
                    className="mt-2 min-h-[200px] border-gray-300 rounded-lg"
                  />
                </div>

                <div className="space-y-6">
                  <div>
                    <Label htmlFor="q1" className="text-sm font-medium">
                      What inspired you to choose your field of study?
                    </Label>
                    <Textarea
                      id="q1"
                      className="mt-2 border-gray-300 rounded-lg"
                      placeholder="Share your inspiration and motivation..."
                    />
                  </div>

                  <div>
                    <Label htmlFor="q2" className="text-sm font-medium">
                      How do you plan to use your education to make an impact?
                    </Label>
                    <Textarea
                      id="q2"
                      className="mt-2 border-gray-300 rounded-lg"
                      placeholder="Describe your future goals and impact..."
                    />
                  </div>

                  <div>
                    <Label htmlFor="q3" className="text-sm font-medium">
                      What challenges have you overcome in your academic journey?
                    </Label>
                    <Textarea
                      id="q3"
                      className="mt-2 border-gray-300 rounded-lg"
                      placeholder="Share your experiences and resilience..."
                    />
                  </div>

                  <div>
                    <Label htmlFor="q4" className="text-sm font-medium">
                      How will this funding specifically help you achieve your goals?
                    </Label>
                    <Textarea
                      id="q4"
                      className="mt-2 border-gray-300 rounded-lg"
                      placeholder="Explain how the funding will be used..."
                    />
                  </div>

                  <div>
                    <Label htmlFor="q5" className="text-sm font-medium">
                      What extracurricular activities or projects are you involved in?
                    </Label>
                    <Textarea
                      id="q5"
                      className="mt-2 border-gray-300 rounded-lg"
                      placeholder="Share your activities and involvement..."
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-8">
                <div>
                  <CardTitle className="text-2xl font-light mb-4">Social Links</CardTitle>
                  <p className="text-gray-600 mb-8 leading-relaxed">
                    Add your social media profiles to help donors learn more about you.
                  </p>
                </div>

                <div className="space-y-6">
                  {socialLinks.map((link, index) => (
                    <div key={index} className="grid grid-cols-2 gap-4">
                      <div>
                        <Select
                          value={link.platform}
                          onValueChange={(value) => updateSocialLink(index, 'platform', value)}
                        >
                          <SelectTrigger className="rounded-full border-gray-300 h-12">
                            <SelectValue placeholder="Select platform" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="linkedin">LinkedIn</SelectItem>
                            <SelectItem value="twitter">X (Twitter)</SelectItem>
                            <SelectItem value="website">Personal Website</SelectItem>
                            <SelectItem value="instagram">Instagram</SelectItem>
                            <SelectItem value="facebook">Facebook</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Input
                        value={link.url}
                        onChange={(e) => updateSocialLink(index, 'url', e.target.value)}
                        placeholder="Enter URL"
                        className="rounded-full border-gray-300 h-12"
                      />
                    </div>
                  ))}

                  <Button
                    type="button"
                    variant="outline"
                    onClick={addSocialLink}
                    className="rounded-full border-gray-300 hover:bg-gray-50"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Another Link
                  </Button>
                </div>

                <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                  <h4 className="font-medium mb-3">Next Steps</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• We will reach out for documentation once you submit your information</li>
                    <li>• After verification, your profile will be reviewed by our team</li>
                    <li>• Once approved, your profile will be publicly available on our platform</li>
                  </ul>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-8">
                <div>
                  <CardTitle className="text-2xl font-light mb-4">Wallet Setup</CardTitle>
                  <p className="text-gray-600 mb-8 leading-relaxed">
                    Add your wallet address to receive funding directly.
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <Label htmlFor="walletAddress" className="text-sm font-medium">
                      Wallet Address (USDC compatible)
                    </Label>
                    <TooltipProvider>
                      <Tooltip delayDuration={200}>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="p-0 h-auto">
                            <Info className="h-4 w-4 text-gray-400" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent 
                          side="right" 
                          align="center" 
                          className="max-w-[300px] p-4 bg-white shadow-lg rounded-xl border border-gray-200"
                        >
                          <p className="text-sm text-gray-700 leading-relaxed">
                            A wallet address is like your digital bank account number for cryptocurrencies. 
                            A USDC compatible wallet can receive and store USDC tokens. We recommend using any 
                            of the supported wallets listed below for the best experience.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Input
                    id="walletAddress"
                    placeholder="0x... or leave blank if you need help setting up"
                    className="mt-2 font-mono text-sm rounded-full border-gray-300 h-12"
                  />
                  <p className="text-sm text-gray-500 mt-2">This is where donors will send USDC directly to you</p>
                </div>

                <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <Wallet className="h-5 w-5 text-yellow-600" />
                    Need help with wallet setup?
                  </h4>
                  <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                    Don't have a crypto wallet yet? No problem! You can complete your profile now and add your wallet
                    address later.
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="rounded-full border-gray-300 hover:bg-gray-50"
                    asChild
                  >
                    <a 
                      href="mailto:contact@medici.ac" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      Contact Support for Help
                    </a>
                  </Button>
                </div>

                <div className="space-y-6">
                  <h4 className="font-medium">Supported Wallets:</h4>
                  <div className="grid grid-cols-2 gap-6 text-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      MetaMask
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      Phantom
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      Coinbase Wallet
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      Trust Wallet
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-8 border-t border-gray-100">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="rounded-full border-gray-300 hover:bg-gray-50 px-6"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>

              {currentStep < totalSteps ? (
                <Button onClick={nextStep} className="rounded-full bg-blue-600 hover:bg-blue-700 text-white px-6">
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button className="rounded-full bg-blue-600 hover:bg-blue-700 text-white px-6" asChild>
                  <Link href="/register/success">
                    Submit Application
                  </Link>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <Footer/>
    </div>
  )
}
