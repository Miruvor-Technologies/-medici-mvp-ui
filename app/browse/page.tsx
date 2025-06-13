import { supabase } from '@/lib/supabaseClient'
import { redirect } from 'next/navigation'
import { Header } from "@/components/ui/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, MapPin, Heart } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default async function BrowseStudentsPage() {
  // Fetch only approved students
  const { data: students, error } = await supabase
    .from('student_profiles')
    .select('*')
    .eq('status', 'approved')

  const studentsArr: any[] = students || [];

  if (!studentsArr || studentsArr.length === 0) {
    redirect('/noprofile');
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="container mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-light text-gray-900 mb-4">Browse Students</h1>
          <p className="text-xl text-gray-600 font-light">
            Discover talented students who need your support to achieve their educational goals.
          </p>
        </div>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {studentsArr.map((student: any) => (
            <Card key={student.id} className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-gray-200">
              <Link href={`/student/${student.id}`}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-8">
                    <Image
                      src={student.photo || '/default-avatar.png'}
                      alt={student.fullName}
                      width={64}
                      height={64}
                      className="rounded-full object-cover w-16 h-16"
                    />
                    <div>
                      <h3 className="font-medium mb-1">{student.fullName}</h3>
                      <p className="text-sm text-gray-600">
                        {student.program} at {student.university}
                      </p>
                    </div>
                  </div>
                  <div className="text-center mb-8">
                    <div className="text-3xl font-light text-gray-900 mb-2">
                      ${student.fundsRequested ? student.fundsRequested.toLocaleString() : 'N/A'}
                    </div>
                    <div className="text-sm text-gray-600">
                      Funding Goal
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-6">{student.quickBio || 'No bio available.'}</p>
                  <Button className="w-full rounded-full bg-blue-600 hover:bg-blue-700 group-hover:bg-blue-700 transition-colors">
                    <Heart className="mr-2 h-4 w-4" />
                    View Profile
                  </Button>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}