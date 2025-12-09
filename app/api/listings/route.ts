import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const supabase = await createClient()
    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type")
    const category = searchParams.get("category")
    const verified = searchParams.get("verified")
    const tokenized = searchParams.get("tokenized")
    const search = searchParams.get("search")

    let query = supabase
      .from("listings")
      .select("*, profiles!listings_user_id_fkey(full_name, avatar_url, reputation_score)")
      .eq("is_verified", true)

    if (type) query = query.eq("listing_type", type)
    if (category) query = query.eq("category_id", category)
    if (verified === "true") query = query.eq("is_verified", true)
    if (tokenized === "true") query = query.eq("is_tokenized", true)
    if (search) query = query.ilike("title", `%${search}%`)

    const { data, error } = await query.order("created_at", { ascending: false })

    if (error) throw error

    return NextResponse.json({ data })
  } catch (error) {
    console.error("Listings fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch listings" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const body = await request.json()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check if user is verified
    const { data: profile } = await supabase.from("profiles").select("is_verified").eq("id", user.id).single()

    if (!profile?.is_verified) {
      return NextResponse.json({ error: "Only verified users can create listings" }, { status: 403 })
    }

    const { data, error } = await supabase
      .from("listings")
      .insert({
        user_id: user.id,
        title: body.title,
        description: body.description,
        price: body.price,
        listing_type: body.listingType,
        category_id: body.categoryId,
        images: body.images || [],
        is_verified: false, // Requires verification
        is_tokenized: body.isTokenized || false,
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ data })
  } catch (error) {
    console.error("Listing creation error:", error)
    return NextResponse.json({ error: "Failed to create listing" }, { status: 500 })
  }
}
