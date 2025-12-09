"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Upload, X, Loader2 } from "lucide-react"
import Link from "next/link"
import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function NewListingPage() {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [images, setImages] = useState<string[]>([])
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category_id: "",
    listing_type: "product",
    is_tokenized: false,
  })

  const { data: categories } = useSWR("/api/categories", fetcher)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      // In a real app, upload to Supabase Storage
      // For now, create object URLs
      const urls = Array.from(files).map((file) => URL.createObjectURL(file))
      setImages((prev) => [...prev, ...urls].slice(0, 5))
    }
  }

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent, status: "active" | "draft") => {
    e.preventDefault()
    setLoading(true)

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) throw new Error("Not authenticated")

      const { error } = await supabase.from("listings").insert({
        title: formData.title,
        description: formData.description,
        price: Number.parseFloat(formData.price),
        category_id: formData.category_id || null,
        listing_type: formData.listing_type,
        is_tokenized: formData.is_tokenized,
        images,
        seller_id: user.id,
        status,
      })

      if (error) throw error

      router.push("/dashboard/listings")
      router.refresh()
    } catch (error) {
      console.error("Error creating listing:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/listings">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Create New Listing</h1>
          <p className="text-muted-foreground mt-1">Add a new product, service, or digital asset to the marketplace</p>
        </div>
      </div>

      <form onSubmit={(e) => handleSubmit(e, "active")}>
        <div className="space-y-6">
          {/* Images */}
          <Card>
            <CardHeader>
              <CardTitle>Images</CardTitle>
              <CardDescription>Add up to 5 images for your listing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-5 gap-4">
                {images.map((url, index) => (
                  <div key={index} className="relative aspect-square rounded-lg overflow-hidden bg-muted">
                    <img src={url || "/placeholder.svg"} alt="" className="object-cover w-full h-full" />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 p-1 rounded-full bg-background/80 hover:bg-background"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
                {images.length < 5 && (
                  <label className="aspect-square rounded-lg border-2 border-dashed flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors">
                    <Upload className="h-6 w-6 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground mt-1">Upload</span>
                    <input type="file" accept="image/*" multiple className="hidden" onChange={handleImageUpload} />
                  </label>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Enter listing title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your listing..."
                  rows={5}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formData.category_id}
                    onValueChange={(value) => setFormData({ ...formData, category_id: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories?.map((cat: any) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Listing Type</Label>
                <Select
                  value={formData.listing_type}
                  onValueChange={(value) => setFormData({ ...formData, listing_type: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="product">Product</SelectItem>
                    <SelectItem value="service">Service</SelectItem>
                    <SelectItem value="digital">Digital Asset</SelectItem>
                    <SelectItem value="talent">Talent/Skill</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Tokenization */}
          <Card>
            <CardHeader>
              <CardTitle>Tokenization</CardTitle>
              <CardDescription>Mint your listing as an NFT for additional security and ownership proof</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Enable NFT Tokenization</p>
                  <p className="text-sm text-muted-foreground">
                    Your listing will be minted as an NFT on the blockchain
                  </p>
                </div>
                <Switch
                  checked={formData.is_tokenized}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_tokenized: checked })}
                />
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-4 justify-end">
            <Button type="button" variant="outline" onClick={(e) => handleSubmit(e as any, "draft")} disabled={loading}>
              Save as Draft
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Publish Listing
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
