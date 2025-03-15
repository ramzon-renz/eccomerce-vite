import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductShowcase from "@/components/home/ProductShowcase";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";

const ProductsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Parse URL parameters
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get("category");
    const searchParam = params.get("search");

    if (categoryParam) {
      setCategory(categoryParam);
    }

    if (searchParam) {
      setSearchQuery(searchParam);
    }

    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [location.search]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="pt-20">
        {/* Page Header */}
        <div className="bg-gray-50 py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              >
                {searchQuery
                  ? `Search Results for "${searchQuery}"`
                  : category
                    ? `${category.charAt(0).toUpperCase() + category.slice(1)} Doors`
                    : "Our Premium Door Collection"}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg text-gray-600"
              >
                {searchQuery
                  ? `Showing results for "${searchQuery}" in our collection of handcrafted wooden doors.`
                  : category
                    ? `Browse our selection of premium ${category} doors, crafted with exceptional attention to detail.`
                    : "Browse our extensive collection of handcrafted wooden doors, each piece a testament to exceptional craftsmanship and timeless design."}
              </motion.p>
            </div>
          </div>
        </div>

        {/* Product Showcase */}
        {isLoading ? (
          <div className="container mx-auto px-4 py-16 flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-600"></div>
          </div>
        ) : (
          <ProductShowcase
            title={
              searchQuery
                ? "Search Results"
                : category
                  ? `${category.charAt(0).toUpperCase() + category.slice(1)} Doors`
                  : "All Products"
            }
            subtitle={
              searchQuery
                ? `Showing results for "${searchQuery}"`
                : category
                  ? `Discover our collection of premium ${category} wooden doors`
                  : "Discover our complete collection of premium wooden doors"
            }
            filterCategory={category}
            searchQuery={searchQuery}
            onViewAll={() => navigate("/products")}
          />
        )}

        {/* Call to Action */}
        <div className="bg-amber-50 py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              We specialize in custom doors tailored to your exact
              specifications. Contact our team to discuss your unique
              requirements.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                className="bg-amber-600 hover:bg-amber-700 text-white"
                onClick={() => navigate("/customize")}
              >
                Design Your Custom Door
              </Button>
              <Button variant="outline" onClick={() => navigate("/contact")}>
                Contact Our Team
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductsPage;
