import Link from "next/link"
import Image from "next/image"
import { Mail, MapPin, Phone } from "lucide-react"
import { FaXTwitter, FaFacebookF, FaTiktok, FaYoutube, FaWhatsapp } from "react-icons/fa6"

const footerLinks = {
  platform: [
    { href: "/marketplace", label: "Marketplace" },
    { href: "/studio/builder", label: "Studio" },
    { href: "/departments", label: "Departments" },
    { href: "/store", label: "Store" },
  ],
  company: [
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
    { href: "/careers", label: "Careers" },
    { href: "/press", label: "Press" },
  ],
  resources: [
    { href: "/community", label: "Community" },
    { href: "/programs", label: "Programs" },
    { href: "/docs", label: "Documentation" },
    { href: "/help", label: "Help Center" },
  ],
  legal: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/cookies", label: "Cookie Policy" },
  ],
}

const socialLinks = [
  { href: "https://x.com/albashsolutions", icon: FaXTwitter, label: "X (Twitter)" },
  { href: "https://web.facebook.com/profile.php?id=100076069236843", icon: FaFacebookF, label: "Facebook" },
  { href: "https://www.tiktok.com/@albashsolutions", icon: FaTiktok, label: "TikTok" },
  { href: "https://www.youtube.com/@albashsolutions", icon: FaYoutube, label: "YouTube" },
  { href: "https://wa.me/2348068185000", icon: FaWhatsapp, label: "WhatsApp" },
]

export function Footer() {
  return (
    <footer className="bg-secondary/50 border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image src="/images/logo.jpg" alt="AlbashSolutions Logo" width={40} height={40} className="rounded-lg" />
              <span className="font-bold text-xl">AlbashSolutions</span>
            </Link>
            <p className="text-muted-foreground text-sm mb-4 max-w-xs">
              A hybrid digital/physical ecosystem helping you digitilizeze your ideas, talents, products, and services.
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a href="mailto:albashsolutions@gmail.com" className="hover:text-primary transition-colors">
                  albashsolutions@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <a href="tel:+2348051916160" className="hover:text-primary transition-colors">
                  +234 8051916160
                </a>
              </div>
              <div className="flex items-center gap-2">
                <FaWhatsapp className="h-4 w-4" />
                <a
                  href="https://wa.me/2348068185000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  WhatsApp Us
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Nigeria</span>
              </div>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h3 className="font-semibold mb-4">Platform</h3>
            <ul className="space-y-2">
              {footerLinks.platform.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} AlbashSolutions. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label={link.label}
              >
                <link.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
