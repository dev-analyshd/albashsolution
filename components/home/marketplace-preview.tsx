"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Star, Shield, Hexagon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FadeInUp, SlideIn } from "@/components/ui/motion-wrapper"

const previewListings = [
  {
    id: 1,
    title: "AI-Powered Marketing Tool",
    category: "Digital Product",
    price: 299,
    image: "/ai-marketing-dashboard.jpg",
    rating: 4.9,
    isVerified: true,
    isTokenized: true,
  },
  {
    id: 2,
    title: "Handcrafted Leather Goods",
    category: "Physical Product",
    price: 89,
    image: "/leather-wallet-craftsmanship.jpg",
    rating: 4.8,
    isVerified: true,
    isTokenized: false,
  },
  {
    id: 3,
    title: "Web Development Course",
    category: "Educational",
    price: 149,
    image: "/coding-bootcamp-students.png",
    rating: 4.7,
    isVerified: true,
    isTokenized: false,
  },
  {
    id: 4,
    title: "Digital Art Collection",
    category: "NFT",
    price: 0.5,
    image: "/digital-art-nft-collection.jpg",
    rating: 4.9,
    isVerified: true,
    isTokenized: true,
    currency: "ETH",
  },
]

export function MarketplacePreview() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-8 mb-12">
          <FadeInUp>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-balance">Explore the Marketplace</h2>
            <p className="text-lg text-muted-foreground max-w-xl text-pretty">
              Discover verified products, services, and tokenized assets from our growing community of creators.
            </p>
          </FadeInUp>
          <SlideIn direction="right">
            <Link href="/marketplace">
              <Button variant="outline" className="gap-2 bg-transparent">
                View All Listings
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </SlideIn>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {previewListings.map((listing, index) => (
            <motion.div
              key={listing.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group bg-card rounded-xl border border-border overflow-hidden transition-shadow hover:shadow-xl"
            >
              <div className="aspect-[3/2] relative overflow-hidden">
                <img
                  src={listing.image || "/placeholder.svg"}
                  alt={listing.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  {listing.isVerified && (
                    <Badge variant="secondary" className="gap-1 bg-background/80 backdrop-blur">
                      <Shield className="h-3 w-3" />
                      Verified
                    </Badge>
                  )}
                  {listing.isTokenized && (
                    <Badge variant="secondary" className="gap-1 bg-background/80 backdrop-blur">
                      <Hexagon className="h-3 w-3" />
                      NFT
                    </Badge>
                  )}
                </div>
              </div>
              <div className="p-4">
                <p className="text-xs text-muted-foreground mb-1">{listing.category}</p>
                <h3 className="font-semibold mb-2 line-clamp-1">{listing.title}</h3>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-primary">
                    {listing.currency === "ETH" ? `${listing.price} ETH` : `$${listing.price}`}
                  </span>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Star className="h-4 w-4 fill-chart-4 text-chart-4" />
                    {listing.rating}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
