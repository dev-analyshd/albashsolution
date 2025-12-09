import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { Users, Calendar, Award, TrendingUp, Search, Plus, Heart, MessageCircle, Share2, Bookmark } from "lucide-react"

const discussions = [
  {
    id: 1,
    title: "Best practices for getting your first sale on the marketplace",
    author: { name: "Sarah Chen", avatar: null, verified: true },
    category: "Tips & Tricks",
    replies: 23,
    likes: 45,
    time: "2 hours ago",
  },
  {
    id: 2,
    title: "How to price your digital products effectively",
    author: { name: "Michael Brown", avatar: null, verified: true },
    category: "Pricing",
    replies: 18,
    likes: 32,
    time: "5 hours ago",
  },
  {
    id: 3,
    title: "Introducing myself - New builder from Nigeria",
    author: { name: "Adebayo Okonkwo", avatar: null, verified: false },
    category: "Introductions",
    replies: 12,
    likes: 28,
    time: "1 day ago",
  },
  {
    id: 4,
    title: "NFT tokenization: Is it worth it for small sellers?",
    author: { name: "Emma Wilson", avatar: null, verified: true },
    category: "NFTs",
    replies: 31,
    likes: 67,
    time: "2 days ago",
  },
]

const topMembers = [
  { name: "Alex Rivera", score: 2450, badge: "Diamond", avatar: null },
  { name: "Sarah Chen", score: 2120, badge: "Platinum", avatar: null },
  { name: "Michael Brown", score: 1890, badge: "Platinum", avatar: null },
  { name: "Emma Wilson", score: 1650, badge: "Gold", avatar: null },
  { name: "James Kim", score: 1420, badge: "Gold", avatar: null },
]

const upcomingEvents = [
  {
    title: "Weekly Creator Meetup",
    date: "Dec 15, 2025",
    time: "2:00 PM UTC",
    attendees: 45,
  },
  {
    title: "NFT Workshop: Tokenize Your Work",
    date: "Dec 18, 2025",
    time: "4:00 PM UTC",
    attendees: 128,
  },
  {
    title: "Q&A with Top Sellers",
    date: "Dec 20, 2025",
    time: "6:00 PM UTC",
    attendees: 89,
  },
]

export default async function CommunityPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-primary/10 via-background to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4">Community</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
              Connect, Learn, and Grow <span className="text-primary">Together</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 text-pretty">
              Join thousands of builders, creators, and entrepreneurs sharing knowledge and supporting each other.
            </p>
            <div className="flex items-center gap-4 max-w-lg mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search discussions..." className="pl-10" />
              </div>
              <Link href="/community/new">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  New Post
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 container mx-auto px-4">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Discussions */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="popular">
              <div className="flex items-center justify-between">
                <TabsList>
                  <TabsTrigger value="popular">Popular</TabsTrigger>
                  <TabsTrigger value="recent">Recent</TabsTrigger>
                  <TabsTrigger value="unanswered">Unanswered</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="popular" className="mt-6 space-y-4">
                {discussions.map((post) => (
                  <Card key={post.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={post.author.avatar || undefined} />
                          <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium">{post.author.name}</span>
                            {post.author.verified && <Badge className="h-5 text-xs">Verified</Badge>}
                            <span className="text-muted-foreground">·</span>
                            <span className="text-sm text-muted-foreground">{post.time}</span>
                          </div>
                          <Link href={`/community/post/${post.id}`}>
                            <h3 className="font-semibold text-lg hover:text-primary transition-colors">{post.title}</h3>
                          </Link>
                          <Badge variant="secondary" className="mt-2">
                            {post.category}
                          </Badge>
                          <div className="flex items-center gap-6 mt-4">
                            <button className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
                              <Heart className="h-4 w-4" />
                              <span className="text-sm">{post.likes}</span>
                            </button>
                            <button className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
                              <MessageCircle className="h-4 w-4" />
                              <span className="text-sm">{post.replies}</span>
                            </button>
                            <button className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
                              <Share2 className="h-4 w-4" />
                            </button>
                            <button className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors ml-auto">
                              <Bookmark className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="recent" className="mt-6">
                <p className="text-muted-foreground text-center py-8">Recent discussions will appear here</p>
              </TabsContent>

              <TabsContent value="unanswered" className="mt-6">
                <p className="text-muted-foreground text-center py-8">Unanswered questions will appear here</p>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Top Members */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Top Members
                </CardTitle>
                <CardDescription>This month's most active contributors</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {topMembers.map((member, index) => (
                  <div key={member.name} className="flex items-center gap-3">
                    <span className="text-lg font-bold text-muted-foreground w-6">{index + 1}</span>
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={member.avatar || undefined} />
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{member.name}</p>
                      <p className="text-xs text-muted-foreground">{member.score} pts</p>
                    </div>
                    <Badge
                      variant="secondary"
                      className={
                        member.badge === "Diamond"
                          ? "bg-cyan-100 text-cyan-700"
                          : member.badge === "Platinum"
                            ? "bg-purple-100 text-purple-700"
                            : "bg-yellow-100 text-yellow-700"
                      }
                    >
                      {member.badge}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Upcoming Events
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div key={event.title} className="p-3 bg-muted rounded-lg">
                    <h4 className="font-medium">{event.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {event.date} · {event.time}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{event.attendees} attending</span>
                    </div>
                  </div>
                ))}
                <Link href="/community/events">
                  <Button variant="outline" className="w-full bg-transparent">
                    View All Events
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Community Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Community Stats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold">12.5K</p>
                    <p className="text-sm text-muted-foreground">Members</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">3.2K</p>
                    <p className="text-sm text-muted-foreground">Discussions</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">28K</p>
                    <p className="text-sm text-muted-foreground">Replies</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">156</p>
                    <p className="text-sm text-muted-foreground">Online Now</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
