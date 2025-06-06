import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DollarSign, Users, TrendingUp, Edit, Eye, Share2, FileText, Wallet } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Footer } from "@/components/ui/footer"

// Mock student data
const studentData = {
  name: "Maria Rodriguez",
  photo: "/images/maria-rodriguez.png",
  university: "MIT",
  program: "Computer Science - AI/ML Track",
  status: "Live",
  goal: 50000,
  funded: 32000,
  backers: 47,
  profileViews: 1247,
  createdAt: "2024-01-01",
  walletAddress: "0x742d35Cc6634C0532925a3b8D4C2C4e4C8b4C8b4",
  documentsVerified: true,
  profileCompletion: 95,
}

const transactions = [
  { id: 1, donor: "Anonymous", amount: 500, date: "2024-01-20", message: "Keep up the great work!" },
  { id: 2, donor: "John D.", amount: 250, date: "2024-01-19", message: "Proud to support your journey" },
  { id: 3, donor: "Sarah M.", amount: 1000, date: "2024-01-18", message: "Go change the world!" },
  { id: 4, donor: "Anonymous", amount: 100, date: "2024-01-17", message: "" },
  { id: 5, donor: "Tech Alumni", amount: 2000, date: "2024-01-15", message: "From one engineer to another" },
]

export default function StudentDashboard() {
  const fundedPercentage = (studentData.funded / studentData.goal) * 100
  const remaining = studentData.goal - studentData.funded

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
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" asChild className="rounded-full border-gray-300 hover:bg-gray-50">
              <Link href={`/student/1`}>
                <Eye className="h-4 w-4 mr-2" />
                View Public Profile
              </Link>
            </Button>
            <Button variant="outline" size="sm" className="rounded-full border-gray-300 hover:bg-gray-50">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button size="sm" className="rounded-full bg-blue-600 hover:bg-blue-700 text-white">
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        {/* Welcome Header */}
        <div className="mb-12">
          <div className="flex items-center gap-6 mb-6">
            <Image
              src={studentData.photo || "/placeholder.svg"}
              alt={studentData.name}
              width={100}
              height={100}
              className="rounded-full object-cover"
            />
            <div>
              <h1 className="text-4xl font-light text-gray-900 mb-2">Welcome back, {studentData.name}!</h1>
              <p className="text-xl text-gray-600 font-light">
                {studentData.program} at {studentData.university}
              </p>
              <div className="flex items-center gap-3 mt-3">
                <Badge
                  variant={
                    studentData.status === "Live"
                      ? "default"
                      : studentData.status === "Pending"
                        ? "secondary"
                        : "outline"
                  }
                  className="rounded-full"
                >
                  {studentData.status}
                </Badge>
                <span className="text-sm text-gray-500">
                  Application Status: {studentData.status} • Created{" "}
                  {new Date(studentData.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card className="border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">Total Raised</p>
                  <p className="text-3xl font-light text-blue-600">${studentData.funded.toLocaleString()}</p>
                </div>
                <DollarSign className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">Funding Goal</p>
                  <p className="text-3xl font-light">${studentData.goal.toLocaleString()}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-gray-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">Backers</p>
                  <p className="text-3xl font-light">{studentData.backers}</p>
                </div>
                <Users className="h-8 w-8 text-gray-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">Profile Views</p>
                  <p className="text-3xl font-light">{studentData.profileViews}</p>
                </div>
                <Eye className="h-8 w-8 text-gray-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Funding Progress */}
            <Card className="mb-8 border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-xl font-light">
                  <span>Funding Progress</span>
                  <Badge variant="outline" className="rounded-full border-gray-300">
                    {fundedPercentage.toFixed(0)}% Complete
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={fundedPercentage} className="h-3 mb-6" />
                <div className="grid grid-cols-3 gap-6 text-center">
                  <div>
                    <p className="text-3xl font-light text-blue-600">${studentData.funded.toLocaleString()}</p>
                    <p className="text-sm text-gray-600 font-medium">Raised</p>
                  </div>
                  <div>
                    <p className="text-3xl font-light text-gray-900">${remaining.toLocaleString()}</p>
                    <p className="text-sm text-gray-600 font-medium">Remaining</p>
                  </div>
                  <div>
                    <p className="text-3xl font-light text-gray-900">{studentData.backers}</p>
                    <p className="text-sm text-gray-600 font-medium">Supporters</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs */}
            <Tabs defaultValue="transactions" className="w-full">
              <TabsList className="grid w-full grid-cols-3 rounded-full bg-gray-100">
                <TabsTrigger value="transactions" className="rounded-full">
                  Recent Funding
                </TabsTrigger>
                <TabsTrigger value="analytics" className="rounded-full">
                  Analytics
                </TabsTrigger>
                <TabsTrigger value="updates" className="rounded-full">
                  Updates
                </TabsTrigger>
              </TabsList>

              <TabsContent value="transactions" className="mt-8">
                <Card className="border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-xl font-light">Recent Transactions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {transactions.map((transaction) => (
                        <div
                          key={transaction.id}
                          className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <DollarSign className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-medium">{transaction.donor}</p>
                              <p className="text-sm text-gray-600">{transaction.date}</p>
                              {transaction.message && (
                                <p className="text-sm text-gray-500 italic mt-1">"{transaction.message}"</p>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-blue-600">+${transaction.amount}</p>
                            <p className="text-xs text-gray-500">USDC</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="analytics" className="mt-8">
                <Card className="border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-xl font-light">Profile Analytics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-8">
                      <div>
                        <div className="flex justify-between mb-3">
                          <span className="text-sm text-gray-600 font-medium">Profile Views (Last 30 days)</span>
                          <span className="font-medium">1,247</span>
                        </div>
                        <Progress value={75} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-3">
                          <span className="text-sm text-gray-600 font-medium">Conversion Rate</span>
                          <span className="font-medium">3.8%</span>
                        </div>
                        <Progress value={38} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-3">
                          <span className="text-sm text-gray-600 font-medium">Average Pledge</span>
                          <span className="font-medium">$680</span>
                        </div>
                        <Progress value={68} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="updates" className="mt-8">
                <Card className="border-gray-200">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between text-xl font-light">
                      <span>Your Updates</span>
                      <Button size="sm" className="rounded-full bg-blue-600 hover:bg-blue-700 text-white">
                        <FileText className="h-4 w-4 mr-2" />
                        Post Update
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="font-medium">Research Progress Update</h4>
                          <span className="text-sm text-gray-500">Jan 15, 2024</span>
                        </div>
                        <p className="text-gray-700 text-sm leading-relaxed">
                          Successfully completed the first phase of my AI diagnostic tool. The preliminary results show
                          94% accuracy in detecting early-stage conditions.
                        </p>
                      </div>
                      <div className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="font-medium">Semester 1 Complete</h4>
                          <span className="text-sm text-gray-500">Jan 1, 2024</span>
                        </div>
                        <p className="text-gray-700 text-sm leading-relaxed">
                          Thanks to your support, I've successfully completed my first semester with a 3.9 GPA. Moving
                          on to advanced machine learning courses next semester.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              {/* Quick Actions */}
              <Card className="border-gray-200">
                <CardHeader>
                  <CardTitle className="text-xl font-light">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start rounded-full" variant="outline">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Button>
                  <Button className="w-full justify-start rounded-full" variant="outline">
                    <FileText className="mr-2 h-4 w-4" />
                    Post Update
                  </Button>
                  <Button className="w-full justify-start rounded-full" variant="outline">
                    <Wallet className="mr-2 h-4 w-4" />
                    Update Wallet
                  </Button>
                  <Button className="w-full justify-start rounded-full" variant="outline">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share Profile
                  </Button>
                </CardContent>
              </Card>

              {/* Profile Status */}
              <Card className="border-gray-200">
                <CardHeader>
                  <CardTitle className="text-xl font-light">Profile Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 font-medium">Profile Completion</span>
                    <span className="font-medium">95%</span>
                  </div>
                  <Progress value={95} className="h-2" />
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span>Profile verified</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span>Documents approved</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span>Add more photos</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tips */}
              <Card className="border-gray-200">
                <CardHeader>
                  <CardTitle className="text-xl font-light">Tips to Get More Funding</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="font-medium mb-2">Post Regular Updates</p>
                    <p className="text-gray-600 leading-relaxed">Keep donors engaged with progress updates</p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="font-medium mb-2">Share Your Story</p>
                    <p className="text-gray-600 leading-relaxed">Personal stories connect with donors</p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="font-medium mb-2">Add More Photos</p>
                    <p className="text-gray-600 leading-relaxed">Visual content increases engagement</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer/>
    </div>
  )
}
