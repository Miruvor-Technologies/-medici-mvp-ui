import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, MapPin, Heart } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/ui/header"
import { students } from "@/utils/sample-data"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Removed the mock data for students

export default function BrowseStudentsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Filters */}
          {/* <aside className="lg:w-80">
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
          </aside> */}

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
                        <div className="flex items-center justify-between mb-8">
                          <div className="flex items-center gap-4">
                            <Image
                              src={student.photo}
                              alt={student.name}
                              width={64}
                              height={64}
                              className="rounded-full object-cover w-16 h-16"
                            />
                            <div>
                              <h3 className="font-medium mb-1">{student.name}</h3>
                              <p className="text-sm text-gray-600">
                                {student.program} at {student.university}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <TooltipProvider>
                              <Tooltip delayDuration={200}>
                                <TooltipTrigger asChild>
                                  <Badge 
                                    variant="secondary" 
                                    className={`h-7 px-3 rounded-full cursor-help ${
                                      student.funded > 30000 
                                        ? "bg-yellow-50 text-yellow-700 border-yellow-200" 
                                        : student.funded > 15000 
                                          ? "bg-gray-50 text-gray-700 border-gray-200" 
                                          : "bg-orange-50 text-orange-700 border-orange-200"
                                    }`}
                                  >
                                    <div className="flex items-center gap-1 text-sm">
                                      {student.funded > 30000 ? (
                                        <>⭐ Top</>
                                      ) : student.funded > 15000 ? (
                                        <>↗ Rising</>
                                      ) : (
                                        <>🌱 Early</>
                                      )}
                                    </div>
                                  </Badge>
                                </TooltipTrigger>
                                <TooltipContent 
                                  side="right" 
                                  align="center" 
                                  className="max-w-[250px] p-4 bg-white shadow-lg rounded-xl border border-gray-200"
                                >
                                  <div className="space-y-2 text-sm">
                                    <p className="font-medium text-gray-900">
                                      {student.funded > 30000 ? "Top Student" : student.funded > 15000 ? "Rising Student" : "Early Supporter"}
                                    </p>
                                    <div className="space-y-1 text-gray-600">
                                      {student.funded > 30000 ? (
                                        <>
                                          <p>• Over 10 profile visits daily</p>
                                          <p>• More than 5 active donors</p>
                                          <p>• High engagement rate</p>
                                        </>
                                      ) : student.funded > 15000 ? (
                                        <>
                                          <p>• Growing profile visits</p>
                                          <p>• 2-5 active donors</p>
                                          <p>• Regular updates</p>
                                        </>
                                      ) : (
                                        <>
                                          <p>• New to the platform</p>
                                          <p>• Verified profile</p>
                                          <p>• Seeking first donors</p>
                                        </>
                                      )}
                                    </div>
                                  </div>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>

                            <TooltipProvider>
                              <Tooltip delayDuration={200}>
                                <TooltipTrigger asChild>
                                  {/* <Badge 
                                    variant="secondary" 
                                    className="h-7 px-3 rounded-full cursor-help bg-green-50 text-green-700 border-green-200"
                                  >
                                    <div className="flex items-center gap-1 text-sm">
                                      ✓ Verified
                                    </div>
                                  </Badge> */}
                                </TooltipTrigger>
                                <TooltipContent 
                                  side="right" 
                                  align="center" 
                                  className="max-w-[300px] p-4 bg-white shadow-lg rounded-xl border border-gray-200"
                                >
                                  <div className="space-y-3 text-sm">
                                    <p className="text-gray-700">Documents verified by Medici. You can view any document by contacting us.</p>
                                    <Button 
                                      size="sm" 
                                      variant="outline" 
                                      className="w-full rounded-full"
                                      asChild
                                    >
                                      <a href="mailto:contact@medici.ac">Contact for Documents</a>
                                    </Button>
                                  </div>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </div>

                        <div className="text-center mb-8">
                          <div className="text-3xl font-light text-gray-900 mb-2">
                            ${student.goal.toLocaleString()}
                          </div>
                          <div className="text-sm text-gray-600">
                            Funding Goal
                          </div>
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