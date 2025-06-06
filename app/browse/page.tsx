import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, MapPin, Heart } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Mock data for students
const students = [
  {
    id: 1,
    name: "Maria Rodriguez",
    photo: "/images/maria-rodriguez.png",
    university: "MIT",
    program: "Computer Science",
    goal: 50000,
    funded: 32000,
    location: "Boston, MA",
    tags: ["STEM", "AI/ML"],
    statement: "Passionate about using AI to solve healthcare challenges in underserved communities.",
  },
  {
    id: 2,
    name: "James Chen",
    photo: "/placeholder.svg?height=200&width=200",
    university: "Stanford University",
    program: "Biomedical Engineering",
    goal: 75000,
    funded: 45000,
    location: "Palo Alto, CA",
    tags: ["STEM", "Medical"],
    statement: "Developing low-cost medical devices for developing countries.",
  },
  {
    id: 3,
    name: "Aisha Patel",
    photo: "/placeholder.svg?height=200&width=200",
    university: "Harvard Medical School",
    program: "Medicine",
    goal: 100000,
    funded: 78000,
    location: "Boston, MA",
    tags: ["Medical", "Research"],
    statement: "Researching innovative treatments for rare genetic diseases.",
  },
  {
    id: 4,
    name: "David Kim",
    photo: "/placeholder.svg?height=200&width=200",
    university: "UC Berkeley",
    program: "Environmental Science",
    goal: 40000,
    funded: 15000,
    location: "Berkeley, CA",
    tags: ["Environmental", "Research"],
    statement: "Working on sustainable energy solutions for rural communities.",
  },
  {
    id: 5,
    name: "Sarah Johnson",
    photo: "/placeholder.svg?height=200&width=200",
    university: "Yale University",
    program: "Public Health",
    goal: 60000,
    funded: 42000,
    location: "New Haven, CT",
    tags: ["Public Health", "Policy"],
    statement: "Focusing on health policy reform and community health initiatives.",
  },
  {
    id: 6,
    name: "Ahmed Hassan",
    photo: "/placeholder.svg?height=200&width=200",
    university: "Carnegie Mellon",
    program: "Robotics",
    goal: 55000,
    funded: 28000,
    location: "Pittsburgh, PA",
    tags: ["STEM", "Robotics"],
    statement: "Building assistive robotics for people with disabilities.",
  },
]

export default function BrowseStudentsPage() {
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
            <Link href="/faq" className="text-gray-600 hover:text-gray-900 transition-colors">
              FAQ
            </Link>
            <Button asChild variant="outline" className="rounded-full border-gray-300 hover:bg-gray-50">
              <Link href="/login">Sign In</Link>
            </Button>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Filters */}
          <aside className="lg:w-80">
            <Card className="border-gray-200">
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-6 flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filters
                </h3>

                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-medium mb-3 block">Search</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input placeholder="Search students..." className="pl-10 rounded-full border-gray-300" />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-3 block">Degree Level</label>
                    <Select>
                      <SelectTrigger className="rounded-full border-gray-300">
                        <SelectValue placeholder="All degrees" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="undergraduate">Undergraduate</SelectItem>
                        <SelectItem value="graduate">Graduate</SelectItem>
                        <SelectItem value="phd">PhD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-3 block">Field of Study</label>
                    <Select>
                      <SelectTrigger className="rounded-full border-gray-300">
                        <SelectValue placeholder="All fields" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="stem">STEM</SelectItem>
                        <SelectItem value="medical">Medical</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                        <SelectItem value="arts">Arts & Humanities</SelectItem>
                        <SelectItem value="social">Social Sciences</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-3 block">Funding Goal</label>
                    <Select>
                      <SelectTrigger className="rounded-full border-gray-300">
                        <SelectValue placeholder="Any amount" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0-25000">$0 - $25,000</SelectItem>
                        <SelectItem value="25000-50000">$25,000 - $50,000</SelectItem>
                        <SelectItem value="50000-75000">$50,000 - $75,000</SelectItem>
                        <SelectItem value="75000+">$75,000+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-3 block">Location</label>
                    <Select>
                      <SelectTrigger className="rounded-full border-gray-300">
                        <SelectValue placeholder="All locations" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="california">California</SelectItem>
                        <SelectItem value="massachusetts">Massachusetts</SelectItem>
                        <SelectItem value="newyork">New York</SelectItem>
                        <SelectItem value="texas">Texas</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="mb-8">
              <h1 className="text-4xl font-light text-gray-900 mb-4">Browse Students</h1>
              <p className="text-xl text-gray-600 font-light">
                Discover talented students who need your support to achieve their educational goals.
              </p>
            </div>

            {/* Student Grid */}
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
              {students.map((student) => {
                const fundedPercentage = (student.funded / student.goal) * 100

                return (
                  <Card
                    key={student.id}
                    className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-gray-200"
                  >
                    <Link href={`/student/${student.id}`}>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4 mb-6">
                          <Image
                            src={student.photo || "/placeholder.svg"}
                            alt={student.name}
                            width={60}
                            height={60}
                            className="rounded-full object-cover"
                          />
                          <div>
                            <h3 className="font-medium text-lg group-hover:text-blue-600 transition-colors">
                              {student.name}
                            </h3>
                            <p className="text-sm text-gray-600 flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {student.location}
                            </p>
                          </div>
                        </div>

                        <div className="mb-6">
                          <p className="font-medium">{student.program}</p>
                          <p className="text-sm text-gray-600">{student.university}</p>
                        </div>

                        <div className="mb-6">
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-600">Progress</span>
                            <span className="font-medium">{fundedPercentage.toFixed(0)}%</span>
                          </div>
                          <Progress value={fundedPercentage} className="h-2" />
                          <div className="flex justify-between text-sm mt-2 text-gray-600">
                            <span>${student.funded.toLocaleString()} raised</span>
                            <span>${student.goal.toLocaleString()} goal</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-6">
                          {student.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="text-xs rounded-full bg-blue-50 text-blue-700 border-blue-200"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <p className="text-sm text-gray-600 line-clamp-2 mb-6">{student.statement}</p>

                        <Button className="w-full rounded-full bg-blue-600 hover:bg-blue-700 group-hover:bg-blue-700 transition-colors">
                          <Heart className="mr-2 h-4 w-4" />
                          View Profile
                        </Button>
                      </CardContent>
                    </Link>
                  </Card>
                )
              })}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
