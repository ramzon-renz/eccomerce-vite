import React from "react";
import { motion } from "framer-motion";
import Navbar from "./layout/Navbar";
import HeroSection from "./home/HeroSection";
import ProductShowcase from "./home/ProductShowcase";
import CraftsmanshipSection from "./home/CraftsmanshipSection";
import Footer from "./layout/Footer";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navbar transparent={true} />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <HeroSection
          title="Handcrafted Wooden Doors"
          subtitle="Premium craftsmanship for your home, built to last generations"
          ctaText="Explore Products"
          backgroundImage="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80"
          onExplore={() => console.log("Explore products clicked")}
        />

        {/* Product Showcase */}
        <ProductShowcase
          title="Our Premium Collection"
          subtitle="Discover our handcrafted wooden doors, each piece a testament to exceptional craftsmanship and timeless design."
          onViewAll={() => console.log("View all products clicked")}
        />

        {/* Craftsmanship Section */}
        <CraftsmanshipSection
          title="Our Craftsmanship"
          description="We take pride in our meticulous attention to detail and commitment to excellence. Each door is handcrafted by our skilled artisans using traditional techniques combined with modern precision."
        />
      </main>

      {/* Footer */}
      <Footer
        companyName="Artisan Wooden Doors"
        address="123 Craftsman Way, Woodville, CA 90210"
        phone="+1 (555) 123-4567"
        contactEmail="info@artisanwoodendoors.com"
      />
    </div>
  );
};

export default HomePage;
