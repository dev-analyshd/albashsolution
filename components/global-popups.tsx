"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { FileText, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export function GlobalPopups() {
  const [showApply, setShowApply] = useState(false)
  const [showCheckStatus, setShowCheckStatus] = useState(false)
  const [applicationId, setApplicationId] = useState("")

  return (
    <>
      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 1 }}>
          <Button size="lg" className="rounded-full shadow-lg gap-2" onClick={() => setShowApply(true)}>
            <FileText className="h-5 w-5" />
            <span className="hidden sm:inline">Apply</span>
          </Button>
        </motion.div>
        <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 1.1 }}>
          <Button
            size="lg"
            variant="secondary"
            className="rounded-full shadow-lg gap-2"
            onClick={() => setShowCheckStatus(true)}
          >
            <Search className="h-5 w-5" />
            <span className="hidden sm:inline">Status</span>
          </Button>
        </motion.div>
      </div>

      {/* Apply Dialog */}
      <Dialog open={showApply} onOpenChange={setShowApply}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Apply to AlbashSolutions</DialogTitle>
            <DialogDescription>Choose your application type to get started</DialogDescription>
          </DialogHeader>
          <div className="grid gap-3 py-4">
            <Link href="/apply/builder" onClick={() => setShowApply(false)}>
              <Button variant="outline" className="w-full justify-start gap-3 h-auto py-4 bg-transparent">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold">B</span>
                </div>
                <div className="text-left">
                  <div className="font-medium">Builder</div>
                  <div className="text-sm text-muted-foreground">For individuals with ideas & talents</div>
                </div>
              </Button>
            </Link>
            <Link href="/apply/institution" onClick={() => setShowApply(false)}>
              <Button variant="outline" className="w-full justify-start gap-3 h-auto py-4 bg-transparent">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold">I</span>
                </div>
                <div className="text-left">
                  <div className="font-medium">Institution</div>
                  <div className="text-sm text-muted-foreground">For schools & educational bodies</div>
                </div>
              </Button>
            </Link>
            <Link href="/apply/business" onClick={() => setShowApply(false)}>
              <Button variant="outline" className="w-full justify-start gap-3 h-auto py-4 bg-transparent">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold">S</span>
                </div>
                <div className="text-left">
                  <div className="font-medium">Small Business</div>
                  <div className="text-sm text-muted-foreground">For small businesses & startups</div>
                </div>
              </Button>
            </Link>
            <Link href="/apply/company" onClick={() => setShowApply(false)}>
              <Button variant="outline" className="w-full justify-start gap-3 h-auto py-4 bg-transparent">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold">C</span>
                </div>
                <div className="text-left">
                  <div className="font-medium">Company</div>
                  <div className="text-sm text-muted-foreground">For established companies</div>
                </div>
              </Button>
            </Link>
            <Link href="/apply/organization" onClick={() => setShowApply(false)}>
              <Button variant="outline" className="w-full justify-start gap-3 h-auto py-4 bg-transparent">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold">O</span>
                </div>
                <div className="text-left">
                  <div className="font-medium">Organization</div>
                  <div className="text-sm text-muted-foreground">For NGOs & non-profits</div>
                </div>
              </Button>
            </Link>
          </div>
        </DialogContent>
      </Dialog>

      {/* Check Status Dialog */}
      <Dialog open={showCheckStatus} onOpenChange={setShowCheckStatus}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Check Application Status</DialogTitle>
            <DialogDescription>Enter your application ID to track your progress</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="application-id">Application ID</Label>
              <Input
                id="application-id"
                placeholder="e.g., APP-2024-XXXXX"
                value={applicationId}
                onChange={(e) => setApplicationId(e.target.value)}
              />
            </div>
            <Link href={`/check-status?id=${applicationId}`} onClick={() => setShowCheckStatus(false)}>
              <Button className="w-full" disabled={!applicationId}>
                Check Status
              </Button>
            </Link>
            <p className="text-sm text-muted-foreground text-center">
              Or{" "}
              <Link
                href="/auth/login"
                className="text-primary hover:underline"
                onClick={() => setShowCheckStatus(false)}
              >
                login to your account
              </Link>{" "}
              to view all applications
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
