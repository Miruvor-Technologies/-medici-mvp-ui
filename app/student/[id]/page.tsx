import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, MapPin, Heart, Share2, FileText, Award, Target } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Mock student data
const student = {
  id: 1,
  name: "Maria Rodriguez",
  photo: "/images/maria-rodriguez.png",
  university: "MIT",
  program: "Computer Science",
  degree: "Master's Degree",
  goal: 50000,
  funded: 32000,
  location: "Boston, MA",
  tags: ["STEM", "AI/ML", "Healthcare"],
  statement:
    "I am passionate about using artificial intelligence to solve healthcare challenges in underserved communities. My research focuses on developing AI-powered diagnostic tools that can be deployed in resource-limited settings. With your support, I can complete my Master's degree and continue working on solutions that will impact millions of lives globally.",
  documents: [
    { name: "Enrollment Verification", type: "PDF", verified: true },
    { name: "Academic Transcript", type: "PDF", verified: true },
    { name: "Research Proposal", type: "PDF", verified: false },
  ],
  milestones: [
    { title: "Semester 1 Tuition", amount: 15000, completed: true },
    { title: "Research Equipment", amount: 8000, completed: true },
    { title: "Semester 2 Tuition", amount: 15000, completed: false },
    { title: "Conference & Travel", amount: 5000, completed: false },
    { title: "Thesis Research", amount: 7000, completed: false },
  ],
  updates: [
    {
      date: "2024-01-15",
      title: "Research Progress Update",
      content:
        "Successfully completed the first phase of my AI diagnostic tool. The preliminary results show 94% accuracy in detecting early-stage conditions.",
    },
    {
      date: "2024-01-01",
      title: "Semester 1 Complete",
      content:
        "Thanks to your support, I've successfully completed my first semester with a 3.9 GPA. Moving on to advanced machine learning courses next semester.",
    },
  ],
}

export default function StudentProfilePage() {
  const fundedPercentage = (student.funded / student.goal) * 100
  const remaining = student.goal - student.funded

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100 bg-white sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image src="/images/medici-logo.svg" alt="Medici" width={120} height={40} className="h-8 w-auto" />
          </Link>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" className="rounded-full border-gray-300 hover:bg-gray-50">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button asChild variant="outline" className="rounded-full border-gray-300 hover:bg-gray-50">
              <Link href="/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        {/* Back Button */}
        <Link
          href="/browse"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Browse Students
        </Link>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Profile Header */}
            <Card className="mb-8 border-gray-200">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row gap-8">
                  <Image
                    src={student.photo || "/placeholder.svg"}
                    alt={student.name}
                    width={200}
                    height={200}
                    className="rounded-lg object-cover mx-auto md:mx-0"
                  />
                  <div className="flex-1">
                    <h1 className="text-4xl font-light text-gray-900 mb-3">{student.name}</h1>
                    <p className="text-xl text-gray-600 mb-2">{student.program}</p>
                    <p className="text-gray-600 mb-4">
                      {student.university} • {student.degree}
                    </p>
                    <p className="text-gray-600 flex items-center gap-2 mb-6">
                      <MapPin className="h-4 w-4" />
                      {student.location}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {student.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="rounded-full bg-blue-50 text-blue-700 border-blue-200"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs */}
            <Tabs defaultValue="story" className="w-full">
              <TabsList className="grid w-full grid-cols-4 rounded-full bg-gray-100">
                <TabsTrigger value="story" className="rounded-full">
                  Story
                </TabsTrigger>
                <TabsTrigger value="milestones" className="rounded-full">
                  Milestones
                </TabsTrigger>
                <TabsTrigger value="documents" className="rounded-full">
                  Documents
                </TabsTrigger>
                <TabsTrigger value="updates" className="rounded-full">
                  Updates
                </TabsTrigger>
              </TabsList>

              <TabsContent value="story" className="mt-8">
                <Card className="border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-xl font-light">My Story</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">{student.statement}</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="milestones" className="mt-8">
                <Card className="border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-xl font-light">Funding Milestones</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {student.milestones.map((milestone, index) => (
                        <div key={index} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              milestone.completed ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-400"
                            }`}
                          >
                            {milestone.completed ? "✓" : index + 1}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{milestone.title}</h4>
                            <p className="text-sm text-gray-600">${milestone.amount.toLocaleString()}</p>
                          </div>
                          <Badge variant={milestone.completed ? "default" : "secondary"} className="rounded-full">
                            {milestone.completed ? "Completed" : "Pending"}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="documents" className="mt-8">
                <Card className="border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-xl font-light">Verification Documents</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {student.documents.map((doc, index) => (
                        <div key={index} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                          <FileText className="h-8 w-8 text-gray-400" />
                          <div className="flex-1">
                            <h4 className="font-medium">{doc.name}</h4>
                            <p className="text-sm text-gray-600">{doc.type}</p>
                          </div>
                          <Badge variant={doc.verified ? "default" : "secondary"} className="rounded-full">
                            {doc.verified ? "Verified" : "Pending"}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="updates" className="mt-8">
                <div className="space-y-6">
                  {student.updates.map((update, index) => (
                    <Card key={index} className="border-gray-200">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <h4 className="font-medium">{update.title}</h4>
                          <span className="text-sm text-gray-500">{update.date}</span>
                        </div>
                        <p className="text-gray-700 leading-relaxed">{update.content}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              {/* Funding Progress */}
              <Card className="border-gray-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl font-light">
                    <Target className="h-5 w-5" />
                    Funding Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-6">
                    <div className="text-4xl font-light text-blue-600 mb-2">{fundedPercentage.toFixed(0)}%</div>
                    <div className="text-sm text-gray-600">funded</div>
                  </div>

                  <Progress value={fundedPercentage} className="h-3 mb-6" />

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Raised:</span>
                      <span className="font-medium">${student.funded.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Goal:</span>
                      <span className="font-medium">${student.goal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between border-t border-gray-100 pt-3">
                      <span className="text-gray-600">Remaining:</span>
                      <span className="font-medium text-blue-600">${remaining.toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Fund Button */}
              <Card className="border-gray-200">
                <CardContent className="p-6">
                  <Button
                    asChild
                    size="lg"
                    className="w-full mb-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Link href={`/pledge/${student.id}`}>
                      <Heart className="mr-2 h-5 w-5" />
                      Back {student.name}
                    </Link>
                  </Button>
                  <p className="text-xs text-gray-500 text-center">Secure payments powered by blockchain technology</p>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className="border-gray-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl font-light">
                    <Award className="h-5 w-5" />
                    Quick Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Backers:</span>
                    <span className="font-medium">47</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Average pledge:</span>
                    <span className="font-medium">$680</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Days remaining:</span>
                    <span className="font-medium">156</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
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
