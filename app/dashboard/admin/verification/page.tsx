import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { VerificationQueue } from "@/components/verification/verification-queue"

export default async function AdminVerificationPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user?.id).single()

  // Only allow admin/verifier access
  if (profile?.role !== "admin" && profile?.role !== "verifier") {
    redirect("/dashboard")
  }

  const { data: applications } = await supabase
    .from("applications")
    .select("*, profiles(full_name, email), departments(name)")
    .in("status", ["pending", "under_review", "update_required"])
    .order("created_at", { ascending: true })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Verification Queue</h1>
        <p className="text-muted-foreground mt-1">Review and process pending verification applications</p>
      </div>

      <VerificationQueue applications={applications || []} />
    </div>
  )
}
