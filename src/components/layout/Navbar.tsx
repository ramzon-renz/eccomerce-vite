import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  Search,
  ShoppingCart,
  Heart,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CartDrawer from "../cart/CartDrawer";
import { Link, useNavigate } from "react-router-dom";
import WishlistDrawer from "../wishlist/WishlistDrawer";

interface NavbarProps {
  logo?: string;
  transparent?: boolean;
}

const productCategories = [
  {
    title: "Interior Doors",
    href: "/products?category=interior",
    description: "Elegant interior doors for every room in your home",
    items: [
      { title: "Panel Doors", href: "/products?category=interior&type=panel" },
      { title: "Flush Doors", href: "/products?category=interior&type=flush" },
      { title: "French Doors", href: "/products?category=interior&type=french" },
      { title: "Barn Doors", href: "/products?category=interior&type=barn" },
    ],
  },
  {
    title: "Exterior Doors",
    href: "/products?category=exterior",
    description: "Durable and stylish doors for your home's entrance",
    items: [
      { title: "Entry Doors", href: "/products?category=exterior&type=entry" },
      { title: "Patio Doors", href: "/products?category=exterior&type=patio" },
      { title: "Storm Doors", href: "/products?category=exterior&type=storm" },
      { title: "Security Doors", href: "/products?category=exterior&type=security" },
    ],
  },
  {
    title: "Custom Doors",
    href: "/customize",
    description: "Tailor-made doors crafted to your exact specifications",
    items: [
      { title: "Select Material", href: "/customize?section=material" },
      { title: "Set Dimensions", href: "/customize?section=dimensions" },
      { title: "Glass Options", href: "/customize?section=glass" },
      { title: "Finishing Touches", href: "/customize?section=finish" },
    ],
  },
];

const mainNavItems = [
  { title: "Home", href: "/" },
  { title: "About Us", href: "/about" },
  { title: "Gallery", href: "/gallery" },
  { title: "Contact", href: "/contact" },
];

const Navbar = ({ logo = "/vite.svg", transparent = false }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Handle scroll effect for transparent navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  const navbarClasses = cn(
    "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300",
    {
      "bg-white shadow-md": !transparent || isScrolled,
      "bg-transparent": transparent && !isScrolled,
    },
  );

  return (
    <header className={navbarClasses}>
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Wooden Doors" className="h-10 w-auto" />
            <span className="font-semibold text-xl hidden sm:inline-block">
              Artisan Doors
            </span>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-1">
          <NavigationMenu>
            <NavigationMenuList>
              {/* Products Dropdown */}
              <NavigationMenuItem>
                <NavigationMenuTrigger>Products</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[600px] grid-cols-3 gap-3 p-4">
                    {productCategories.map((category) => (
                      <div key={category.title} className="p-3">
                        <Link to={category.href}>
                          <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">
                              {category.title}
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {category.description}
                            </p>
                          </NavigationMenuLink>
                        </Link>
                        <ul className="mt-2 space-y-1">
                          {category.items.map((item) => (
                            <li key={item.title}>
                              <Link to={item.href}>
                                <NavigationMenuLink className="block select-none rounded-md px-3 py-2 text-xs leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                                  {item.title}
                                </NavigationMenuLink>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Main Nav Items */}
              {mainNavItems.map((item) => (
                <NavigationMenuItem key={item.title}>
                  <Link to={item.href} className={navigationMenuTriggerStyle()}>
                    {item.title}
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Action Buttons */}
          <div className="flex items-center ml-4 space-x-2">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Search"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="h-5 w-5" />
            </Button>
            <WishlistDrawer />
            <CartDrawer />
            <Button
              size="sm"
              className="ml-2"
              onClick={() => navigate("/quote")}
            >
              Get a Quote
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden flex items-center">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Search"
            className="mr-2"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <Search className="h-5 w-5" />
          </Button>
          <WishlistDrawer triggerClassName="mr-2" />
          <CartDrawer triggerClassName="mr-2" />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[350px] p-0">
              <div className="flex flex-col h-full">
                <div className="p-4 border-b">
                  <div className="flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2">
                      <img
                        src={logo}
                        alt="Wooden Doors"
                        className="h-8 w-auto"
                      />
                      <span className="font-semibold text-lg">
                        Artisan Doors
                      </span>
                    </Link>
                    <SheetClose className="rounded-full p-2 hover:bg-gray-100">
                      <X className="h-5 w-5" />
                    </SheetClose>
                  </div>
                </div>

                <div className="flex-1 overflow-auto py-4">
                  <nav className="flex flex-col space-y-1">
                    {/* Products Accordion */}
                    <div className="px-4">
                      <details className="group [&_summary::-webkit-details-marker]:hidden">
                        <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                          <span className="text-sm font-medium">Products</span>
                          <ChevronDown className="h-5 w-5 transition duration-300 group-open:rotate-180" />
                        </summary>

                        <ul className="mt-2 space-y-1 px-4">
                          {productCategories.map((category) => (
                            <li key={category.title}>
                              <details className="group [&_summary::-webkit-details-marker]:hidden">
                                <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                                  <span className="text-sm font-medium">
                                    {category.title}
                                  </span>
                                  <ChevronDown className="h-4 w-4 transition duration-300 group-open:rotate-180" />
                                </summary>
                                <ul className="mt-2 space-y-1 px-4">
                                  {category.items.map((item) => (
                                    <li key={item.title}>
                                      <Link
                                        to={item.href}
                                        className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                      >
                                        {item.title}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </details>
                            </li>
                          ))}
                        </ul>
                      </details>
                    </div>

                    {/* Main Nav Items */}
                    {mainNavItems.map((item) => (
                      <Link
                        key={item.title}
                        to={item.href}
                        className="flex items-center gap-2 rounded-lg px-8 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100"
                      >
                        {item.title}
                      </Link>
                    ))}
                  </nav>
                </div>

                <div className="border-t p-4">
                  <Button className="w-full" onClick={() => navigate("/quote")}>
                    Get a Quote
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-md p-4 border-t border-gray-200 z-50">
          <form
            onSubmit={handleSearch}
            className="container mx-auto flex items-center"
          >
            <input
              type="text"
              placeholder="Search for doors..."
              className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button
              type="submit"
              className="rounded-l-none bg-amber-600 hover:bg-amber-700"
            >
              <Search className="h-5 w-5" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="ml-2"
              onClick={() => setIsSearchOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </form>
        </div>
      )}
    </header>
  );
};

export default Navbar;
