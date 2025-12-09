import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import {
  Store,
  FileText,
  Wallet,
  Star,
  TrendingUp,
  Eye,
  ShoppingCart,
  ArrowRight,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react"

export default async function DashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user?.id).single()

  const { data: listings } = await supabase.from("listings").select("*").eq("seller_id", user?.id)

  const { data: applications } = await supabase
    .from("applications")
    .select("*")
    .eq("user_id", user?.id)
    .order("created_at", { ascending: false })
    .limit(5)

  const { data: transactions } = await supabase
    .from("transactions")
    .select("*")
    .or(`buyer_id.eq.${user?.id},seller_id.eq.${user?.id}`)
    .order("created_at", { ascending: false })
    .limit(5)

  const { data: reputationLogs } = await supabase
    .from("reputation_logs")
    .select("*")
    .eq("user_id", user?.id)
    .order("created_at", { ascending: false })
    .limit(5)

  const activeListings = listings?.filter((l) => l.status === "active").length || 0
  const totalViews = listings?.reduce((sum, l) => sum + (l.views || 0), 0) || 0
  const totalSales = transactions?.filter((t) => t.seller_id === user?.id && t.status === "completed").length || 0

  const stats = [
    {
      title: "Active Listings",
      value: activeListings,
      icon: Store,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      href: "/dashboard/listings",
    },
    {
      title: "Total Views",
      value: totalViews,
      icon: Eye,
      color: "text-green-600",
      bgColor: "bg-green-100",
      href: "/dashboard/listings",
    },
    {
      title: "Sales",
      value: totalSales,
      icon: ShoppingCart,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      href: "/dashboard/transactions",
    },
    {
      title: "Reputation",
      value: profile?.reputation_score || 0,
      icon: Star,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
      href: "/dashboard/reputation",
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "pending":
      case "under_review":
        return <Clock className="h-4 w-4 text-yellow-600" />
      case "rejected":
        return <AlertCircle className="h-4 w-4 text-red-600" />
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Welcome back, {profile?.full_name || "User"}</h1>
        <p className="text-muted-foreground mt-1">Here's an overview of your activity on AlbashSolutions</p>
      </div>

      {/* Profile Completion */}
      {profile && !profile.is_verified && (
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="flex items-center justify-between p-6">
            <div className="flex-1">
              <h3 className="font-semibold">Complete Your Profile</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Get verified to unlock all platform features and increase your visibility.
              </p>
              <div className="mt-3">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span>Profile completion</span>
                  <span className="font-medium">60%</span>
                </div>
                <Progress value={60} className="h-2" />
              </div>
            </div>
            <Link href="/apply/builder">
              <Button className="ml-6">
                Get Verified
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link key={stat.title} href={stat.href}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="flex items-center gap-4 p-6">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Applications */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Recent Applications
              </CardTitle>
              <CardDescription>Your verification and listing applications</CardDescription>
            </div>
            <Link href="/dashboard/applications">
              <Button variant="ghost" size="sm">
                View All
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {applications && applications.length > 0 ? (
              <div className="space-y-4">
                {applications.map((app) => (
                  <div key={app.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(app.status)}
                      <div>
                        <p className="font-medium capitalize">{app.type} Application</p>
                        <p className="text-sm text-muted-foreground">{new Date(app.created_at).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <Badge
                      variant={
                        app.status === "approved" ? "default" : app.status === "rejected" ? "destructive" : "secondary"
                      }
                      className="capitalize"
                    >
                      {app.status.replace("_", " ")}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No applications yet</p>
                <Link href="/apply/builder">
                  <Button variant="link" className="mt-2">
                    Start an application
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="h-5 w-5" />
                Recent Transactions
              </CardTitle>
              <CardDescription>Your latest purchases and sales</CardDescription>
            </div>
            <Link href="/dashboard/transactions">
              <Button variant="ghost" size="sm">
                View All
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {transactions && transactions.length > 0 ? (
              <div className="space-y-4">
                {transactions.map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-full ${
                          tx.seller_id === user?.id ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"
                        }`}
                      >
                        {tx.seller_id === user?.id ? (
                          <TrendingUp className="h-4 w-4" />
                        ) : (
                          <ShoppingCart className="h-4 w-4" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{tx.seller_id === user?.id ? "Sale" : "Purchase"}</p>
                        <p className="text-sm text-muted-foreground">{new Date(tx.created_at).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <p className="font-semibold">
                      {tx.seller_id === user?.id ? "+" : "-"}${tx.amount}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Wallet className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No transactions yet</p>
                <Link href="/marketplace">
                  <Button variant="link" className="mt-2">
                    Browse marketplace
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Reputation Activity */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                Reputation Activity
              </CardTitle>
              <CardDescription>Recent changes to your reputation score</CardDescription>
            </div>
            <Link href="/dashboard/reputation">
              <Button variant="ghost" size="sm">
                View All
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {reputationLogs && reputationLogs.length > 0 ? (
              <div className="space-y-4">
                {reputationLogs.map((log) => (
                  <div key={log.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div>
                      <p className="font-medium">{log.reason}</p>
                      <p className="text-sm text-muted-foreground">{new Date(log.created_at).toLocaleDateString()}</p>
                    </div>
                    <Badge variant={log.change > 0 ? "default" : "destructive"} className="font-mono">
                      {log.change > 0 ? "+" : ""}
                      {log.change}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Star className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No reputation activity yet</p>
                <p className="text-sm mt-1">Complete transactions to build your reputation</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2">
            <Link href="/dashboard/listings/new">
              <Button variant="outline" className="w-full justify-start gap-2 h-auto py-4 bg-transparent">
                <Store className="h-5 w-5 text-primary" />
                <div className="text-left">
                  <p className="font-medium">Create Listing</p>
                  <p className="text-xs text-muted-foreground">Add a new product or service</p>
                </div>
              </Button>
            </Link>
            <Link href="/check-status">
              <Button variant="outline" className="w-full justify-start gap-2 h-auto py-4 bg-transparent">
                <FileText className="h-5 w-5 text-primary" />
                <div className="text-left">
                  <p className="font-medium">Check Status</p>
                  <p className="text-xs text-muted-foreground">Track your applications</p>
                </div>
              </Button>
            </Link>
            <Link href="/studio">
              <Button variant="outline" className="w-full justify-start gap-2 h-auto py-4 bg-transparent">
                <TrendingUp className="h-5 w-5 text-primary" />
                <div className="text-left">
                  <p className="font-medium">Open Studio</p>
                  <p className="text-xs text-muted-foreground">Access your creative tools</p>
                </div>
              </Button>
            </Link>
            <Link href="/dashboard/wallet">
              <Button variant="outline" className="w-full justify-start gap-2 h-auto py-4 bg-transparent">
                <Wallet className="h-5 w-5 text-primary" />
                <div className="text-left">
                  <p className="font-medium">Manage Wallet</p>
                  <p className="text-xs text-muted-foreground">View balance and withdraw</p>
                </div>
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
