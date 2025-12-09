import { notFound } from "next/navigation"
import { ListingDetail } from "@/components/marketplace/listing-detail"
import type { Listing } from "@/lib/types"

// Demo listing data
const demoListing: Listing = {
  id: "1",
  user_id: "user1",
  title: "AI-Powered Content Generator",
  description:
    "Revolutionary AI tool that creates high-quality content for blogs, social media, and marketing. Built with the latest GPT technology to deliver human-like writing in seconds. Perfect for marketers, bloggers, and content creators who need to scale their content production without sacrificing quality.\n\nFeatures:\n- Blog post generation\n- Social media content\n- Email marketing copy\n- SEO optimization\n- Multiple languages supported",
  price: 299,
  listing_type: "digital",
  category_id: "tech",
  images: ["/ai-marketing-dashboard.jpg", "/ai-content-features.jpg", "/ai-dashboard-preview.jpg"],
  is_verified: true,
  is_tokenized: true,
  token_id: "TOKEN-001",
  contract_address: "0x1234567890abcdef",
  metadata: {
    version: "2.0",
    license: "Commercial",
    support: "24/7",
  },
  view_count: 1250,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}

export default async function ListingPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  // In production, fetch from database
  // const listing = await getListingById(id)

  if (!id) {
    notFound()
  }

  return <ListingDetail listing={demoListing} />
}
