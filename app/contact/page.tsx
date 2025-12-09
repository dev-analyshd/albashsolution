"use client"

import type React from "react"

import { useState } from "react"
import { FadeInUp, SlideIn } from "@/components/ui/motion-wrapper"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Phone, MapPin, Send } from "lucide-react"
import { FaXTwitter, FaFacebookF, FaTiktok, FaYoutube, FaWhatsapp } from "react-icons/fa6"

const contactMethods = [
  { icon: Mail, label: "Email", value: "albashsolutions@gmail.com", href: "mailto:albashsolutions@gmail.com" },
  { icon: Phone, label: "Phone", value: "+234 806 818 5000", href: "tel:+2348068185000" },
  { icon: FaWhatsapp, label: "WhatsApp", value: "+234 806 818 5000", href: "https://wa.me/2348068185000" },
  { icon: MapPin, label: "Location", value: "Nigeria", href: "#" },
]

const socialLinks = [
  {
    icon: FaXTwitter,
    label: "X (Twitter)",
    href: "https://x.com/albashsolutions",
    color: "hover:text-black dark:hover:text-white",
  },
  {
    icon: FaFacebookF,
    label: "Facebook",
    href: "https://web.facebook.com/profile.php?id=100076069236843",
    color: "hover:text-blue-600",
  },
  {
    icon: FaTiktok,
    label: "TikTok",
    href: "https://www.tiktok.com/@albashsolutions",
    color: "hover:text-black dark:hover:text-white",
  },
  { icon: FaYoutube, label: "YouTube", href: "https://www.youtube.com/@albashsolutions", color: "hover:text-red-600" },
  { icon: FaWhatsapp, label: "WhatsApp", href: "https://wa.me/2348068185000", color: "hover:text-green-500" },
]

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setSubmitted(true)
  }

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <FadeInUp className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-balance">Get in Touch</h1>
            <p className="text-lg text-muted-foreground text-pretty">
              Have questions? We would love to hear from you. Send us a message and we will respond as soon as possible.
            </p>
          </FadeInUp>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {contactMethods.map((method, index) => (
              <FadeInUp key={method.label} delay={index * 0.1}>
                <a
                  href={method.href}
                  target={method.href.startsWith("http") ? "_blank" : undefined}
                  rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="bg-card rounded-xl p-6 border border-border flex items-center gap-4 hover:border-primary transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <method.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{method.label}</p>
                    <p className="font-medium">{method.value}</p>
                  </div>
                </a>
              </FadeInUp>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-secondary/30">
        <div className="container mx-auto px-4">
          <FadeInUp className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Follow Us on Social Media</h2>
            <p className="text-muted-foreground">Stay connected and get the latest updates</p>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <div className="flex flex-wrap justify-center gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 bg-card rounded-xl px-6 py-4 border border-border transition-all hover:border-primary hover:scale-105 ${link.color}`}
                >
                  <link.icon className="h-6 w-6" />
                  <span className="font-medium">{link.label}</span>
                </a>
              ))}
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <SlideIn direction="left">
              <div>
                <h2 className="text-3xl font-bold mb-4">Send Us a Message</h2>
                <p className="text-muted-foreground mb-8">
                  Fill out the form below and our team will get back to you within 24 hours.
                </p>
                <div className="aspect-video rounded-2xl overflow-hidden">
                  <img src="/modern-office-collaboration.png" alt="Contact" className="w-full h-full object-cover" />
                </div>
              </div>
            </SlideIn>

            <SlideIn direction="right">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Form</CardTitle>
                  <CardDescription>We typically respond within 24 hours</CardDescription>
                </CardHeader>
                <CardContent>
                  {submitted ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <Send className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                      <p className="text-muted-foreground">Thank you for reaching out. We will get back to you soon.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input id="firstName" placeholder="John" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input id="lastName" placeholder="Doe" required />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="john@example.com" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Select required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a subject" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="general">General Inquiry</SelectItem>
                            <SelectItem value="support">Technical Support</SelectItem>
                            <SelectItem value="partnership">Partnership</SelectItem>
                            <SelectItem value="press">Press & Media</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea id="message" placeholder="How can we help you?" rows={5} required />
                      </div>
                      <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </SlideIn>
          </div>
        </div>
      </section>
    </div>
  )
}
