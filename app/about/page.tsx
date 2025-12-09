import { FadeInUp, SlideIn } from "@/components/ui/motion-wrapper"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Target, Eye, Heart, Users, Shield, Hexagon, Globe } from "lucide-react"

const values = [
  {
    icon: Shield,
    title: "Trust & Verification",
    description: "Every listing and user goes through rigorous verification.",
  },
  { icon: Users, title: "Community First", description: "We build for and with our community of creators." },
  { icon: Hexagon, title: "Innovation", description: "Leveraging blockchain and AI for the future." },
  { icon: Globe, title: "Accessibility", description: "Making digital transformation available to everyone." },
]

const team = [
  {
    name: "Bashar Halilu Mada",
    role: "CEO & Founder",
    image: "/images/export.png",
    objectPosition: "center top",
  },
  {
    name: "Analys Hud",
    role: "CTO",
    image: "/images/1759006493290-2.jpg",
    objectPosition: "center center",
  },
  {
    name: "Aminu Sahabi",
    role: "Community Lead",
    image: "/professional-man-head-of-verification.jpg",
    objectPosition: "center center",
  },
  {
    name: "Aisha Patel",
    role: "Head of Verification",
    image: "/professional-woman-community-manager.png",
    objectPosition: "center center",
  },
]

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <FadeInUp className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-balance">
              Building the Future of Digital Ecosystems
            </h1>
            <p className="text-lg text-muted-foreground mb-8 text-pretty">
              AlbashSolutions is a hybrid digital/physical platform that helps individuals, students, institutions, and
              businesses digitize their ideas, talents, products, and services through verification, tokenization, and
              marketplace integration.
            </p>
            <Link href="/apply/builder">
              <Button size="lg" className="gap-2">
                Join Our Community
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </FadeInUp>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <SlideIn direction="left">
              <div className="bg-card rounded-2xl p-8 border border-border h-full">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <Target className="h-7 w-7 text-primary" />
                </div>
                <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                <p className="text-muted-foreground">
                  To democratize digital transformation by providing accessible tools and verified platforms for
                  creators worldwide to bring their ideas to life, build credibility, and connect with opportunities
                  they deserve.
                </p>
              </div>
            </SlideIn>
            <SlideIn direction="right">
              <div className="bg-card rounded-2xl p-8 border border-border h-full">
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                  <Eye className="h-7 w-7 text-accent" />
                </div>
                <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
                <p className="text-muted-foreground">
                  A world where every individual, regardless of background, has the tools and platform to transform
                  their talents and ideas into verified, tokenized assets that create real value and opportunity.
                </p>
              </div>
            </SlideIn>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <FadeInUp className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do.
            </p>
          </FadeInUp>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <FadeInUp key={value.title} delay={index * 0.1}>
                <div className="bg-card rounded-xl p-6 border border-border text-center h-full">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </div>
              </FadeInUp>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <FadeInUp className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The passionate people behind AlbashSolutions.
            </p>
          </FadeInUp>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <FadeInUp key={member.name} delay={index * 0.1}>
                <div className="text-center">
                  <div className="aspect-square rounded-2xl overflow-hidden mb-4">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      style={{ objectPosition: member.objectPosition || "center center" }}
                    />
                  </div>
                  <h3 className="font-semibold text-lg">{member.name}</h3>
                  <p className="text-muted-foreground">{member.role}</p>
                </div>
              </FadeInUp>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <FadeInUp>
            <Heart className="h-12 w-12 text-primary-foreground mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-6">Join Our Growing Community</h2>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto mb-8">
              Be part of the movement that is transforming how ideas become reality.
            </p>
            <Link href="/apply/builder">
              <Button size="lg" variant="secondary" className="gap-2">
                Get Started Today
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </FadeInUp>
        </div>
      </section>
    </div>
  )
}
