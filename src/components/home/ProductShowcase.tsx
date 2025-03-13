import React, { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import FilterBar from "./FilterBar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import productData from "@/data/products.json";
import type { ProductCardData, ProductData } from "@/types/product";

interface ProductShowcaseProps {
  title?: string;
  subtitle?: string;
  products?: ProductCardData[];
  onViewAll?: () => void;
  filterCategory?: string;
  searchQuery?: string;
}

interface FilterOptions {
  material: string;
  style: string;
  priceRange: string;
}

const ProductShowcase = ({
  title = "Our Premium Collection",
  subtitle = "Discover our handcrafted wooden doors, each piece a testament to exceptional craftsmanship and timeless design.",
  products = (productData as ProductData).products.map(product => ({
    id: product.id,
    name: product.name,
    price: product.price,
    description: product.description,
    image: product.images[0],
    material: product.material.toLowerCase(),
    style: product.style.toLowerCase()
  })),
  onViewAll = () => console.log("View all products"),
  filterCategory = "",
  searchQuery = "",
}: ProductShowcaseProps) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [filteredProducts, setFilteredProducts] = useState<ProductCardData[]>(products);
  const [activeFilters, setActiveFilters] = useState<FilterOptions>({
    material: "",
    style: "",
    priceRange: "",
  });

  useEffect(() => {
    // Apply filters when they change
    let result = [...products];

    // Apply URL-based category filter if present
    if (filterCategory) {
      result = result.filter(
        (product) =>
          product.material.toLowerCase() === filterCategory.toLowerCase() ||
          product.style.toLowerCase() === filterCategory.toLowerCase(),
      );
    }

    // Apply search query if present
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.material.toLowerCase().includes(query) ||
          product.style.toLowerCase().includes(query),
      );
    }

    // Apply UI filters
    if (activeFilters.material) {
      result = result.filter(
        (product) =>
          product.material.toLowerCase() ===
          activeFilters.material.toLowerCase(),
      );
    }

    if (activeFilters.style) {
      result = result.filter(
        (product) =>
          product.style.toLowerCase() === activeFilters.style.toLowerCase(),
      );
    }

    if (activeFilters.priceRange) {
      // Apply price range filtering
      switch (activeFilters.priceRange) {
        case "budget":
          result = result.filter((product) => product.price < 1000);
          break;
        case "mid":
          result = result.filter(
            (product) => product.price >= 1000 && product.price < 2500,
          );
          break;
        case "premium":
          result = result.filter(
            (product) => product.price >= 2500 && product.price < 5000,
          );
          break;
        case "luxury":
          result = result.filter((product) => product.price >= 5000);
          break;
      }
    }

    setFilteredProducts(result);
  }, [products, filterCategory, searchQuery, activeFilters]);

  const handleFilterChange = (filters: FilterOptions) => {
    setActiveFilters(filters);
  };

  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <section className="py-16 px-4 md:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            {title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-600 max-w-3xl mx-auto"
          >
            {subtitle}
          </motion.p>
        </div>

        {/* Filter Bar */}
        <FilterBar onFilterChange={handleFilterChange} />

        {/* Product Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <motion.div key={product.id} variants={itemVariants}>
                <ProductCard
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  description={product.description}
                  image={product.image}
                  material={product.material}
                  style={product.style}
                  onView={() => navigate(`/products/${product.id}`)}
                  onAddToCart={() => {
                    addToCart({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      image: product.image,
                      quantity: 1,
                      material: product.material,
                      style: product.style,
                    });
                  }}
                />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">
                No products match your current filters.
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() =>
                  setActiveFilters({ material: "", style: "", priceRange: "" })
                }
              >
                Clear Filters
              </Button>
            </div>
          )}
        </motion.div>

        {/* View All Button */}
        <div className="text-center">
          <Button
            variant="outline"
            className="group"
            onClick={onViewAll}
          >
            View All Products
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
