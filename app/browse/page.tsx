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
  const { data: students, error } = await supabase
    .from('student_profiles')
    .select('*')
    .eq('status', 'approved')

  const studentsArr: any[] = students || [];

  if (!studentsArr || studentsArr.length === 0) {
    redirect('/noprofile');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/20 dark:via-purple-950/10 dark:to-pink-950/20">
      <Header />
      <div className="container mx-auto px-6 pt-40 pb-20"> {/* Push content below header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Browse Students
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover talented students who need your support to achieve their educational goals.
          </p>
        </div>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-10">
          {studentsArr.map((student: any) => (
            <Card key={student.id} className="group transform transition-transform duration-300 hover:scale-[1.03] hover:shadow-3xl rounded-2xl backdrop-blur-xl bg-white/80 dark:bg-background/70 border border-border/50 shadow-2xl overflow-hidden">
              <Link href={`/student/${student.id}`}> 
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <Image
                      src={student.photo || '/image.png'}
                      alt={student.fullName}
                      width={64}
                      height={64}
                      className="rounded-full object-cover w-16 h-16"
                    />
                    <div>
                      <h3 className="font-semibold text-lg text-foreground mb-1">{student.fullName}</h3>
                      <p className="text-sm text-muted-foreground">
                        {student.program} at {student.university}
                      </p>
                    </div>
                  </div>
                  <div className="text-center mb-6">
                    <div className="text-3xl font-light text-foreground mb-1">
                      ${student.fundsRequested ? student.fundsRequested.toLocaleString() : 'N/A'}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Funding Goal
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-6">{student.quickBio || 'No bio available.'}</p>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white h-11 rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
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
