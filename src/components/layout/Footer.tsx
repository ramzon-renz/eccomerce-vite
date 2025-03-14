import React from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Loader2,
} from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";

interface FooterProps {
  companyName?: string;
  address?: string;
  phone?: string;
  contactEmail?: string;
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    youtube?: string;
  };
  navigationLinks?: {
    title: string;
    href: string;
  }[];
}

const Footer = ({
  companyName = "Artisan Wooden Doors",
  address = "123 Craftsman Way, Woodville, CA 90210",
  phone = "+1 (555) 123-4567",
  contactEmail = "info@artisanwoodendoors.com",
  socialLinks = {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    twitter: "https://twitter.com",
    youtube: "https://youtube.com",
  },
  navigationLinks = [
    { title: "Home", href: "/" },
    { title: "Products", href: "/products" },
    { title: "Our Process", href: "/process" },
    { title: "Gallery", href: "/gallery" },
    { title: "About Us", href: "/about" },
    { title: "Contact", href: "/contact" },
  ],
}: FooterProps) => {
  const [emailInput, setEmailInput] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;

    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5001/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: emailInput }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to subscribe');
      }

      toast.success('Successfully subscribed to newsletter!');
      setEmailInput("");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to subscribe');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="bg-stone-900 text-stone-200 pt-12 pb-6 px-4 md:px-8 w-full">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">{companyName}</h3>
            <p className="mb-6 text-stone-400 text-sm">
              Crafting premium wooden doors with exceptional attention to detail
              since 1985.
            </p>
            <div className="flex space-x-4">
              <a
                href={socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-400 hover:text-amber-500 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-400 hover:text-amber-500 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href={socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-400 hover:text-amber-500 transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href={socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-400 hover:text-amber-500 transition-colors"
                aria-label="YouTube"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {navigationLinks.slice(0, 6).map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-stone-400 hover:text-amber-500 transition-colors text-sm"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin
                  size={18}
                  className="text-amber-500 mr-2 mt-0.5 flex-shrink-0"
                />
                <span className="text-stone-400 text-sm">{address}</span>
              </li>
              <li className="flex items-center">
                <Phone
                  size={18}
                  className="text-amber-500 mr-2 flex-shrink-0"
                />
                <a
                  href={`tel:${phone.replace(/[^0-9+]/g, "")}`}
                  className="text-stone-400 hover:text-amber-500 transition-colors text-sm"
                >
                  {phone}
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="text-amber-500 mr-2 flex-shrink-0" />
                <a
                  href={`mailto:${contactEmail}`}
                  className="text-stone-400 hover:text-amber-500 transition-colors text-sm"
                >
                  {contactEmail}
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Newsletter
            </h3>
            <p className="text-stone-400 mb-4 text-sm">
              Subscribe to receive updates on new products, special offers, and
              design inspiration.
            </p>
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col space-y-2"
            >
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-2 bg-stone-800 border border-stone-700 rounded-md text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                required
              />
              <Button
                type="submit"
                className="bg-amber-600 hover:bg-amber-700 text-white w-full"
                size="sm"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Subscribing...
                  </>
                ) : (
                  'Subscribe'
                )}
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 mt-6 border-t border-stone-800 text-center md:flex md:justify-between md:text-left">
          <p className="text-stone-500 text-xs">
            © {new Date().getFullYear()} {companyName}. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex flex-wrap justify-center md:justify-end gap-4">
            <a
              href="/privacy"
              className="text-stone-500 hover:text-amber-500 transition-colors text-xs"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              className="text-stone-500 hover:text-amber-500 transition-colors text-xs"
            >
              Terms of Service
            </a>
            <a
              href="/sitemap"
              className="text-stone-500 hover:text-amber-500 transition-colors text-xs"
            >
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
