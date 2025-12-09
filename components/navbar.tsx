"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  Menu,
  X,
  ChevronDown,
  Store,
  Briefcase,
  Building2,
  Wrench,
  Hexagon,
  Palette,
  Users,
  GraduationCap,
  Shield,
  Building,
  LinkIcon,
  Award,
  Cpu,
  MessageSquare,
  UserPlus,
  Calendar,
  Radio,
  Rocket,
  Gift,
  BookOpen,
  User,
  LogIn,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import { createClient } from "@/lib/supabase/client"
import type { Profile } from "@/lib/types"

const marketplaceLinks = [
  {
    href: "/marketplace/builders",
    label: "Builders",
    icon: Briefcase,
    description: "Ideas & innovations from builders",
  },
  {
    href: "/marketplace/institutions",
    label: "Institutions",
    icon: Building2,
    description: "Educational products & services",
  },
  { href: "/marketplace/businesses", label: "Businesses", icon: Store, description: "Business products & solutions" },
  { href: "/marketplace/tools", label: "Tools", icon: Wrench, description: "100+ professional tools" },
  { href: "/marketplace/tokenized", label: "Tokenized", icon: Hexagon, description: "NFTs & tokenized assets" },
]

const studioLinks = [
  { href: "/studio/builder", label: "Builder Studio", icon: Palette, description: "Create and showcase your ideas" },
  {
    href: "/studio/institution",
    label: "Institution Studio",
    icon: GraduationCap,
    description: "Academic content creation",
  },
  { href: "/studio/business", label: "Business Studio", icon: Building, description: "Business branding tools" },
  { href: "/studio/cases", label: "Case Studies", icon: BookOpen, description: "Success stories & templates" },
]

const departmentLinks = [
  {
    href: "/departments/verification",
    label: "Verification",
    icon: Shield,
    description: "Document & identity verification",
  },
  { href: "/departments/institution", label: "Institution", icon: GraduationCap, description: "Academic applications" },
  { href: "/departments/business", label: "Business", icon: Building, description: "Business applications" },
  {
    href: "/departments/blockchain",
    label: "Blockchain",
    icon: LinkIcon,
    description: "Tokenization & NFT verification",
  },
  { href: "/departments/reputation", label: "Reputation", icon: Award, description: "Reputation & badges" },
  { href: "/departments/tech", label: "Tech", icon: Cpu, description: "Technical support" },
]

const communityLinks = [
  { href: "/community/discussions", label: "Discussions", icon: MessageSquare, description: "Community forums" },
  { href: "/community/mentorship", label: "Mentorship", icon: UserPlus, description: "Connect with mentors" },
  { href: "/community/events", label: "Events", icon: Calendar, description: "Upcoming events" },
  { href: "/community/build-in-public", label: "Build in Public", icon: Radio, description: "Share your journey" },
]

const programLinks = [
  { href: "/programs/bootcamps", label: "Bootcamps", icon: Rocket, description: "Intensive learning programs" },
  { href: "/programs/grants", label: "Grants", icon: Gift, description: "Funding opportunities" },
  { href: "/programs/student-programs", label: "Student Programs", icon: GraduationCap, description: "For students" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [user, setUser] = useState<Profile | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(async ({ data: { user: authUser } }) => {
      if (authUser) {
        const { data } = await supabase.from("profiles").select("*").eq("id", authUser.id).single()
        setUser(data)
      }
    })
  }, [])

  const isDashboard = pathname.startsWith("/dashboard")

  if (isDashboard) return null

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "glass shadow-lg" : "bg-transparent",
      )}
    >
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/images/logo.jpg" alt="AlbashSolutions Logo" width={40} height={40} className="rounded-lg" />
          <span className="font-bold text-xl hidden sm:block">AlbashSolutions</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent">Marketplace</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                    {marketplaceLinks.map((link) => (
                      <li key={link.href}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={link.href}
                            className="flex items-start gap-3 rounded-lg p-3 hover:bg-accent transition-colors"
                          >
                            <link.icon className="h-5 w-5 text-primary mt-0.5" />
                            <div>
                              <div className="font-medium">{link.label}</div>
                              <p className="text-sm text-muted-foreground">{link.description}</p>
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent">Studio</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                    {studioLinks.map((link) => (
                      <li key={link.href}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={link.href}
                            className="flex items-start gap-3 rounded-lg p-3 hover:bg-accent transition-colors"
                          >
                            <link.icon className="h-5 w-5 text-primary mt-0.5" />
                            <div>
                              <div className="font-medium">{link.label}</div>
                              <p className="text-sm text-muted-foreground">{link.description}</p>
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent">Departments</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[600px] md:grid-cols-3">
                    {departmentLinks.map((link) => (
                      <li key={link.href}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={link.href}
                            className="flex items-start gap-3 rounded-lg p-3 hover:bg-accent transition-colors"
                          >
                            <link.icon className="h-5 w-5 text-primary mt-0.5" />
                            <div>
                              <div className="font-medium text-sm">{link.label}</div>
                              <p className="text-xs text-muted-foreground">{link.description}</p>
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent">Community</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                    {communityLinks.map((link) => (
                      <li key={link.href}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={link.href}
                            className="flex items-start gap-3 rounded-lg p-3 hover:bg-accent transition-colors"
                          >
                            <link.icon className="h-5 w-5 text-primary mt-0.5" />
                            <div>
                              <div className="font-medium">{link.label}</div>
                              <p className="text-sm text-muted-foreground">{link.description}</p>
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent">Programs</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4">
                    {programLinks.map((link) => (
                      <li key={link.href}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={link.href}
                            className="flex items-start gap-3 rounded-lg p-3 hover:bg-accent transition-colors"
                          >
                            <link.icon className="h-5 w-5 text-primary mt-0.5" />
                            <div>
                              <div className="font-medium">{link.label}</div>
                              <p className="text-sm text-muted-foreground">{link.description}</p>
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/store" legacyBehavior passHref>
                  <NavigationMenuLink className="px-4 py-2 text-sm font-medium hover:text-primary transition-colors">
                    Store
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-3">
          {user ? (
            <Link href={`/dashboard/${user.role}`}>
              <Button variant="ghost" size="sm" className="gap-2">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Dashboard</span>
              </Button>
            </Link>
          ) : (
            <>
              <Link href="/auth/login" className="hidden sm:block">
                <Button variant="ghost" size="sm" className="gap-2">
                  <LogIn className="h-4 w-4" />
                  Login
                </Button>
              </Link>
              <Link href="/apply/builder">
                <Button size="sm" className="gap-2">
                  <Users className="h-4 w-4" />
                  <span className="hidden sm:inline">Apply Now</span>
                </Button>
              </Link>
            </>
          )}

          {/* Mobile menu button */}
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass border-t border-border"
          >
            <div className="container mx-auto px-4 py-4 space-y-4">
              <MobileNavSection title="Marketplace" links={marketplaceLinks} onClose={() => setIsOpen(false)} />
              <MobileNavSection title="Studio" links={studioLinks} onClose={() => setIsOpen(false)} />
              <MobileNavSection title="Departments" links={departmentLinks} onClose={() => setIsOpen(false)} />
              <MobileNavSection title="Community" links={communityLinks} onClose={() => setIsOpen(false)} />
              <MobileNavSection title="Programs" links={programLinks} onClose={() => setIsOpen(false)} />
              <Link
                href="/store"
                onClick={() => setIsOpen(false)}
                className="block py-2 font-medium hover:text-primary transition-colors"
              >
                Store
              </Link>
              <div className="pt-4 border-t border-border flex gap-3">
                <Link href="/auth/login" className="flex-1">
                  <Button variant="outline" className="w-full bg-transparent">
                    Login
                  </Button>
                </Link>
                <Link href="/apply/builder" className="flex-1">
                  <Button className="w-full">Apply Now</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

function MobileNavSection({
  title,
  links,
  onClose,
}: {
  title: string
  links: Array<{ href: string; label: string; icon: any; description: string }>
  onClose: () => void
}) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full py-2 font-medium"
      >
        {title}
        <ChevronDown className={cn("h-4 w-4 transition-transform", isExpanded && "rotate-180")} />
      </button>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="pl-4 space-y-1"
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="flex items-center gap-2 py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
