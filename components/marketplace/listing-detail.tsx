"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Star,
  Shield,
  Hexagon,
  Share2,
  Heart,
  ShoppingCart,
  MessageSquare,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Award,
  Wallet,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import type { Listing } from "@/lib/types"

interface ListingDetailProps {
  listing: Listing
}

export function ListingDetail({ listing }: ListingDetailProps) {
  const [currentImage, setCurrentImage] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)

  const images = listing.images?.length ? listing.images : ["/diverse-products-still-life.png"]

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % images.length)
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + images.length) % images.length)

  return (
    <div className="pb-12">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link href="/marketplace" className="text-sm text-muted-foreground hover:text-primary transition-colors">
          ← Back to Marketplace
        </Link>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Images */}
        <div className="space-y-4">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-secondary/30">
            <motion.img
              key={currentImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              src={images[currentImage] || "/placeholder.svg"}
              alt={listing.title}
              className="w-full h-full object-cover"
            />

            {/* Navigation */}
            {images.length > 1 && (
              <>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </>
            )}

            {/* Badges */}
            <div className="absolute top-4 left-4 flex gap-2">
              {listing.is_verified && (
                <Badge className="gap-1">
                  <Shield className="h-3 w-3" />
                  Verified
                </Badge>
              )}
              {listing.is_tokenized && (
                <Badge variant="secondary" className="gap-1">
                  <Hexagon className="h-3 w-3" />
                  NFT
                </Badge>
              )}
            </div>
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImage(i)}
                  className={`w-20 h-20 rounded-lg overflow-hidden shrink-0 border-2 transition-colors ${
                    currentImage === i ? "border-primary" : "border-transparent"
                  }`}
                >
                  <img src={img || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <p className="text-sm text-muted-foreground capitalize mb-1">{listing.listing_type}</p>
              <h1 className="text-3xl font-bold">{listing.title}</h1>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsFavorite(!isFavorite)}
                className="bg-transparent"
              >
                <Heart className={`h-5 w-5 ${isFavorite ? "fill-destructive text-destructive" : ""}`} />
              </Button>
              <Button variant="outline" size="icon" className="bg-transparent">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Rating & Stats */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-5 w-5 ${star <= 4 ? "fill-chart-4 text-chart-4" : "text-muted-foreground"}`}
                />
              ))}
              <span className="ml-2 text-sm text-muted-foreground">(128 reviews)</span>
            </div>
            <span className="text-sm text-muted-foreground">{listing.view_count} views</span>
          </div>

          {/* Price */}
          <div className="bg-secondary/30 rounded-xl p-6 mb-6">
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-4xl font-bold text-primary">${listing.price?.toFixed(2)}</span>
              {listing.is_tokenized && <span className="text-sm text-muted-foreground">or 0.15 ETH</span>}
            </div>
            <div className="flex gap-3">
              <Button className="flex-1 gap-2">
                <ShoppingCart className="h-5 w-5" />
                Buy Now
              </Button>
              {listing.is_tokenized && (
                <Button variant="outline" className="gap-2 bg-transparent">
                  <Wallet className="h-5 w-5" />
                  Make Offer
                </Button>
              )}
            </div>
          </div>

          {/* Seller */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src="/professional-woman-portrait.png" />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-semibold">Sarah Chen</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Shield className="h-3 w-3 text-primary" />
                    Verified Builder
                    <span className="flex items-center gap-1">
                      <Award className="h-3 w-3 text-chart-4" />
                      850 pts
                    </span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                  <MessageSquare className="h-4 w-4" />
                  Contact
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Token Info */}
          {listing.is_tokenized && (
            <Card className="mb-6">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Hexagon className="h-5 w-5 text-primary" />
                  Token Information
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Token ID</span>
                    <span className="font-mono">{listing.token_id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Contract</span>
                    <a href="#" className="text-primary hover:underline flex items-center gap-1">
                      {listing.contract_address?.slice(0, 10)}...
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Chain</span>
                    <span>Ethereum</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="description" className="mt-8">
        <TabsList>
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="reviews">Reviews (128)</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <div className="prose prose-sm max-w-none">
                <p className="whitespace-pre-line">{listing.description}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reviews" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                {[1, 2, 3].map((review) => (
                  <div key={review} className="border-b border-border pb-6 last:border-0 last:pb-0">
                    <div className="flex items-start gap-4">
                      <Avatar>
                        <AvatarFallback>U{review}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold">User {review}</span>
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star key={star} className="h-3 w-3 fill-chart-4 text-chart-4" />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Great product! Exactly what I was looking for. The quality exceeded my expectations.
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="details" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Category</p>
                  <p className="font-medium capitalize">{listing.category_id}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Type</p>
                  <p className="font-medium capitalize">{listing.listing_type}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Created</p>
                  <p className="font-medium">{new Date(listing.created_at).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Views</p>
                  <p className="font-medium">{listing.view_count}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
