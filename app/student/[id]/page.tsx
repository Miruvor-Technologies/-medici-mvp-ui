import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, MapPin, Heart, Share2, FileText, Award, Target } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Footer } from "@/components/ui/footer"
import { Header } from "@/components/ui/header"
import { supabase } from '@/lib/supabaseClient'
import { ShareButton } from "@/components/sharebutton"

function SocialLinksSection({ socialLinks }: { socialLinks: any }) {
  if (!socialLinks) {
    return <p className="text-gray-500">No social links available.</p>;
  }

  try {
    let socialLinksArray;

    if (typeof socialLinks === 'string') {
      try {
        socialLinksArray = JSON.parse(socialLinks);
      } catch (parseError) {
        console.error('Failed to parse social links JSON:', parseError);
        return <p className="text-gray-500">Error loading social links.</p>;
      }
    } else if (Array.isArray(socialLinks)) {
      socialLinksArray = socialLinks;
    } else if (typeof socialLinks === 'object' && socialLinks !== null) {
      socialLinksArray = Object.entries(socialLinks).map(([platform, url]) => ({
        platform,
        url
      }));
    } else {
      return <p className="text-gray-500">No social links available.</p>;
    }

    if (!Array.isArray(socialLinksArray)) {
      return <p className="text-gray-500">No social links available.</p>;
    }

    const validSocialLinks = socialLinksArray.filter(link => 
      link && 
      typeof link === 'object' && 
      link.platform && 
      link.url && 
      typeof link.platform === 'string' && 
      typeof link.url === 'string' &&
      link.platform.trim() !== '' &&
      link.url.trim() !== ''
    );

    if (validSocialLinks.length === 0) {
      return <p className="text-gray-500">No social links available.</p>;
    }

    const socialElements = validSocialLinks.map((link, index) => (
      <div key={index} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
        <div className="flex-1">
          <h4 className="font-medium capitalize">{link.platform}</h4>
          <a 
            href={link.url.startsWith('http') ? link.url : `https://${link.url}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:text-blue-800 break-all"
          >
            {link.url}
          </a>
        </div>
      </div>
    ));

    return <div className="space-y-4">{socialElements}</div>;
  } catch (error) {
    console.error('Error processing social links:', error);
    return <p className="text-gray-500">Error loading social links.</p>;
  }
}

export default async function StudentProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { data: student, error } = await supabase
    .from('student_profiles')
    .select('*')
    .eq('id', id)
    .single()

  if (!student) {
    return (
      <div className="min-h-screen bg-background dark:bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-medium text-foreground mb-2">Student Not Found</h1>
          <p className="text-muted-foreground mb-4">The student profile you're looking for doesn't exist.</p>
          <Button asChild variant="outline" size="lg">
            <Link href="/browse">Back to Browse</Link>
          </Button>
        </div>
      </div>
    )
  }

  const fundedPercentage = 0
  const remaining = student.fundsRequested || 0

  return (
    <div className="min-h-screen bg-background dark:bg-black">
      <Header />

      <div className="container mx-auto px-6 py-12">
        <Link
          href="/browse"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-400 mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Browse Students
        </Link>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <Card className="mb-8 border-border bg-card relative overflow-visible">
              <CardContent className="p-8">
                <div className="absolute top-4 right-4">
                  <ShareButton />
                </div>
                <div className="flex flex-col md:flex-row gap-8">
                  <Image
                    src={student.photo || "/image.png"}
                    alt={student.fullName}
                    width={200}
                    height={200}
                    className="rounded-lg object-cover mx-auto md:mx-0"
                  />
                  <div className="flex-1">
                    <h1 className="text-4xl font-light text-foreground mb-3">{student.fullName}</h1>
                    <p className="text-xl text-muted-foreground mb-2">{student.program}</p>
                    <p className="text-muted-foreground mb-4">
                      {student.university} • {student.degreeLevel}
                    </p>
                    <p className="text-muted-foreground flex items-center gap-2 mb-6">
                      <MapPin className="h-4 w-4" />
                      {student.country}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="story" className="w-full">
              <TabsList className="grid w-full grid-cols-4 rounded-full bg-gray-100 dark:bg-gray-800">
                <TabsTrigger value="story" className="rounded-full">Story</TabsTrigger>
                <TabsTrigger value="social" className="rounded-full">Public Profiles</TabsTrigger>
                <TabsTrigger value="documents" className="rounded-full">Documents</TabsTrigger>
                <TabsTrigger value="updates" className="rounded-full">Updates</TabsTrigger>
              </TabsList>

              <TabsContent value="story" className="mt-8">
                <Card className="border-border bg-card">
                  <CardHeader>
                    <CardTitle className="text-xl font-light">My Story</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    <div>
                      <h3 className="font-medium mb-3">Quick Bio</h3>
                      <p className="text-gray-500 dark:text-gray-400 leading-relaxed">{student.quickBio || 'No bio available.'}</p>
                    </div>
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-medium mb-2">Past</h3>
                        <p className="text-gray-500 dark:text-gray-400 leading-relaxed">{student.past || 'No past information available.'}</p>
                      </div>
                      <div>
                        <h3 className="font-medium mb-2">Present</h3>
                        <p className="text-gray-500 dark:text-gray-400 leading-relaxed">{student.present || 'No present information available.'}</p>
                      </div>
                      <div>
                        <h3 className="font-medium mb-2">Future</h3>
                        <p className="text-gray-500 dark:text-gray-400 leading-relaxed">{student.future || 'No future plans available.'}</p>
                      </div>
                      <div>
                        <h3 className="font-medium mb-2">Additional Information</h3>
                        <p className="text-gray-500 dark:text-gray-400 leading-relaxed">{student.misc || 'No additional information available.'}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="social" className="mt-8">
                <Card className="border-border bg-card">
                  <CardHeader>
                    <CardTitle className="text-xl font-light">Public Profiles</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* {student.email && (
                        <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                          <div className="flex-1">
                            <h4 className="font-medium">Email</h4>
                            <p className="text-sm text-gray-600">{student.email}</p>
                          </div>
                        </div>
                      )} */}
                      <SocialLinksSection socialLinks={student.socialLinks} />
                      {!student.socialLinks && !student.email && (
                        <p className="text-gray-500 dark:text-gray-400">No Public Profile information available.</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="documents" className="mt-8">
                <Card className="border-border bg-card">
                  <CardHeader>
                    <CardTitle className="text-xl font-light">Verification Documents</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-500 dark:text-gray-400">Documents will be available soon.</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="updates" className="mt-8">
                <Card className="border-border bg-card">
                  <CardHeader>
                    <CardTitle className="text-xl font-light">Updates</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-500 dark:text-gray-400">No updates available yet.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl font-light">
                    <Target className="h-5 w-5" />
                    Funding Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-6">
                    <div className="text-4xl font-light text-blue-600 mb-2">{fundedPercentage}%</div>
                    <div className="text-sm text-muted-foreground">funded</div>
                  </div>
                  <Progress value={fundedPercentage} className="h-3 mb-6" />
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Raised:</span>
                      <span className="font-medium">$0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Goal:</span>
                      <span className="font-medium">${student.fundsRequested ? student.fundsRequested.toLocaleString() : 'N/A'}</span>
                    </div>
                    <div className="flex justify-between border-t border-gray-100 pt-3">
                      <span className="text-muted-foreground">Remaining:</span>
                      <span className="font-medium text-blue-600">${remaining.toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-border bg-card">
                <CardContent className="p-6">
                  <Button
                    asChild
                    size="lg"
                    className="w-full mb-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                  >
                    <Link href={`/pledge/${student.id}`}>
                      <Heart className="mr-2 h-5 w-5" />
                      Back {student.fullName}
                    </Link>
                  </Button>
                  <p className="text-xs text-gray-500 dark:text-gray-400 text-center">Secure payments powered by blockchain technology</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
