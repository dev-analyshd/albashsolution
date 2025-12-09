"use client"

import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"
import { FadeInUp } from "@/components/ui/motion-wrapper"

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Builder",
    avatar: "/professional-woman-portrait.png",
    content:
      "AlbashSolutions helped me turn my side project into a verified business. The tokenization feature is game-changing!",
    rating: 5,
  },
  {
    name: "Dr. Michael Okonkwo",
    role: "Institution Head",
    avatar: "/professional-man-glasses-portrait.png",
    content:
      "We've partnered with AlbashSolutions to showcase our students' work. The verification process adds credibility to their portfolios.",
    rating: 5,
  },
  {
    name: "Elena Rodriguez",
    role: "Small Business Owner",
    avatar: "/confident-businesswoman.png",
    content:
      "The marketplace tools and studio features have helped us reach customers we never could have found otherwise.",
    rating: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <FadeInUp className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-balance">What Our Community Says</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Join thousands of creators who have transformed their ideas into reality.
          </p>
        </FadeInUp>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="bg-card rounded-xl p-6 border border-border relative"
            >
              <Quote className="absolute top-4 right-4 h-8 w-8 text-primary/10" />

              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-chart-4 text-chart-4" />
                ))}
              </div>

              <p className="text-muted-foreground mb-6">{testimonial.content}</p>

              <div className="flex items-center gap-3">
                <img
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
