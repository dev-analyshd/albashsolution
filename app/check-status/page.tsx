"use client"

import type React from "react"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { FadeInUp } from "@/components/ui/motion-wrapper"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Clock, CheckCircle, XCircle, AlertCircle, FileText, ArrowRight } from "lucide-react"
import Link from "next/link"

type StatusType = "pending" | "in_review" | "approved" | "rejected" | "needs_update" | null

const statusConfig = {
  pending: { icon: Clock, color: "text-chart-4", bg: "bg-chart-4/10", label: "Pending Review" },
  in_review: { icon: AlertCircle, color: "text-chart-1", bg: "bg-chart-1/10", label: "Under Review" },
  approved: { icon: CheckCircle, color: "text-chart-2", bg: "bg-chart-2/10", label: "Approved" },
  rejected: { icon: XCircle, color: "text-destructive", bg: "bg-destructive/10", label: "Rejected" },
  needs_update: { icon: FileText, color: "text-chart-3", bg: "bg-chart-3/10", label: "Needs Update" },
}

export default function CheckStatusPage() {
  const searchParams = useSearchParams()
  const initialId = searchParams.get("id") || ""

  const [applicationId, setApplicationId] = useState(initialId)
  const [status, setStatus] = useState<StatusType>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [notFound, setNotFound] = useState(false)

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setNotFound(false)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Demo: random status for demonstration
    const statuses: StatusType[] = ["pending", "in_review", "approved", "rejected", "needs_update"]
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)]

    if (applicationId.startsWith("APP-")) {
      setStatus(randomStatus)
    } else {
      setNotFound(true)
      setStatus(null)
    }

    setIsLoading(false)
  }

  const StatusIcon = status ? statusConfig[status].icon : null

  return (
    <div className="pt-20 min-h-screen">
      <section className="py-24">
        <div className="container mx-auto px-4">
          <FadeInUp className="max-w-xl mx-auto">
            <Card>
              <CardHeader className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">Check Application Status</CardTitle>
                <CardDescription>Enter your application ID to track your verification progress</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCheck} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="applicationId">Application ID</Label>
                    <Input
                      id="applicationId"
                      placeholder="e.g., APP-2024-XXXXX"
                      value={applicationId}
                      onChange={(e) => setApplicationId(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading || !applicationId}>
                    {isLoading ? "Checking..." : "Check Status"}
                  </Button>
                </form>

                {/* Status Result */}
                {status && StatusIcon && (
                  <div className="mt-8 pt-8 border-t border-border">
                    <div className={`rounded-xl p-6 ${statusConfig[status].bg}`}>
                      <div className="flex items-center gap-4 mb-4">
                        <div className={`w-12 h-12 rounded-full bg-background flex items-center justify-center`}>
                          <StatusIcon className={`h-6 w-6 ${statusConfig[status].color}`} />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Status</p>
                          <p className={`font-semibold ${statusConfig[status].color}`}>{statusConfig[status].label}</p>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Application ID</span>
                          <span className="font-medium">{applicationId}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Submitted</span>
                          <span className="font-medium">Dec 5, 2024</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Last Updated</span>
                          <span className="font-medium">Dec 7, 2024</span>
                        </div>
                      </div>
                      {status === "needs_update" && (
                        <div className="mt-4 pt-4 border-t border-border">
                          <p className="text-sm text-muted-foreground mb-2">Feedback from reviewer:</p>
                          <p className="text-sm">Please provide additional documentation for identity verification.</p>
                        </div>
                      )}
                    </div>

                    <div className="mt-6 text-center">
                      <Link href="/auth/login">
                        <Button variant="outline" className="gap-2 bg-transparent">
                          Login for Full Details
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                )}

                {/* Not Found */}
                {notFound && (
                  <div className="mt-8 pt-8 border-t border-border text-center">
                    <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
                      <XCircle className="h-8 w-8 text-destructive" />
                    </div>
                    <p className="font-medium mb-2">Application Not Found</p>
                    <p className="text-sm text-muted-foreground">
                      Please check your application ID and try again. IDs typically start with "APP-".
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </FadeInUp>
        </div>
      </section>
    </div>
  )
}
