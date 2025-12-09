"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"

const stats = [
  { value: 10000, label: "Active Users", suffix: "+" },
  { value: 5000, label: "Verified Listings", suffix: "+" },
  { value: 2500, label: "NFTs Minted", suffix: "+" },
  { value: 500, label: "Institutions", suffix: "+" },
]

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      const duration = 2000
      const steps = 60
      const increment = value / steps
      let current = 0
      const timer = setInterval(() => {
        current += increment
        if (current >= value) {
          setCount(value)
          clearInterval(timer)
        } else {
          setCount(Math.floor(current))
        }
      }, duration / steps)
      return () => clearInterval(timer)
    }
  }, [isInView, value])

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

export function StatsSection() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="bg-primary rounded-3xl p-8 sm:p-12 lg:p-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl sm:text-5xl font-bold text-primary-foreground mb-2">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-primary-foreground/80">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
