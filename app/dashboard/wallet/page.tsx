import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Wallet, ArrowUpRight, ArrowDownLeft, Plus, CreditCard } from "lucide-react"

export default async function WalletPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data: profile } = await supabase.from("profiles").select("wallet_balance").eq("id", user?.id).single()

  const { data: transactions } = await supabase
    .from("transactions")
    .select("*")
    .or(`buyer_id.eq.${user?.id},seller_id.eq.${user?.id}`)
    .order("created_at", { ascending: false })
    .limit(20)

  const balance = profile?.wallet_balance || 0
  const pendingBalance =
    transactions
      ?.filter((t) => t.seller_id === user?.id && t.status === "pending")
      .reduce((sum, t) => sum + t.amount, 0) || 0

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Wallet</h1>
        <p className="text-muted-foreground mt-1">Manage your funds, view transactions, and withdraw earnings</p>
      </div>

      {/* Balance Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Available Balance</p>
                <p className="text-3xl font-bold mt-1">${balance.toFixed(2)}</p>
              </div>
              <Wallet className="h-10 w-10 opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-3xl font-bold mt-1">${pendingBalance.toFixed(2)}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <ArrowDownLeft className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Earned</p>
                <p className="text-3xl font-bold mt-1">
                  $
                  {transactions
                    ?.filter((t) => t.seller_id === user?.id && t.status === "completed")
                    .reduce((sum, t) => sum + t.amount, 0)
                    .toFixed(2) || "0.00"}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <ArrowUpRight className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Funds
        </Button>
        <Button variant="outline">
          <ArrowUpRight className="mr-2 h-4 w-4" />
          Withdraw
        </Button>
      </div>

      {/* Payment Methods */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Methods</CardTitle>
          <CardDescription>Manage your connected payment methods</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-muted rounded">
                <CreditCard className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium">•••• •••• •••• 4242</p>
                <p className="text-sm text-muted-foreground">Expires 12/25</p>
              </div>
            </div>
            <Badge>Default</Badge>
          </div>
          <Button variant="outline" className="w-full bg-transparent">
            <Plus className="mr-2 h-4 w-4" />
            Add Payment Method
          </Button>
        </CardContent>
      </Card>

      {/* Transaction History */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>Your recent transactions</CardDescription>
        </CardHeader>
        <CardContent>
          {transactions && transactions.length > 0 ? (
            <div className="space-y-4">
              {transactions.map((tx) => {
                const isSale = tx.seller_id === user?.id
                return (
                  <div key={tx.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${isSale ? "bg-green-100" : "bg-blue-100"}`}>
                        {isSale ? (
                          <ArrowDownLeft className="h-5 w-5 text-green-600" />
                        ) : (
                          <ArrowUpRight className="h-5 w-5 text-blue-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{isSale ? "Sale" : "Purchase"}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(tx.created_at).toLocaleDateString()} at{" "}
                          {new Date(tx.created_at).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${isSale ? "text-green-600" : ""}`}>
                        {isSale ? "+" : "-"}${tx.amount.toFixed(2)}
                      </p>
                      <Badge variant="secondary" className="capitalize">
                        {tx.status}
                      </Badge>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Wallet className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No transactions yet</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
