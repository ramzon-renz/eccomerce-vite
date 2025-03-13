import React, { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import FilterBar from "./FilterBar";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
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
  category: string;
  type: string;
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
    style: product.style.toLowerCase(),
    category: product.category.toLowerCase(),
    type: product.type.toLowerCase()
  })),
  onViewAll = () => console.log("View all products"),
  filterCategory = "",
  searchQuery = "",
}: ProductShowcaseProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart } = useCart();
  const [filteredProducts, setFilteredProducts] = useState<ProductCardData[]>(products);
  const [activeFilters, setActiveFilters] = useState<FilterOptions>({
    material: "",
    style: "",
    priceRange: "",
    category: "",
    type: "",
  });

  useEffect(() => {
    // Parse URL parameters
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get("category");
    const typeParam = params.get("type");
    const searchParam = params.get("search");

    // Apply filters when they change
    let result = [...products];

    // Apply URL-based category filter if present
    if (categoryParam) {
      result = result.filter(
        (product) =>
          product.category.toLowerCase() === categoryParam.toLowerCase()
      );
    }

    // Apply URL-based type filter if present
    if (typeParam) {
      result = result.filter(
        (product) =>
          product.type.toLowerCase() === typeParam.toLowerCase()
      );
    }

    // Apply search query if present
    if (searchQuery || searchParam) {
      const query = (searchQuery || searchParam || "").toLowerCase();
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.material.toLowerCase().includes(query) ||
          product.style.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          product.type.toLowerCase().includes(query)
      );
    }

    // Apply UI filters
    if (activeFilters.category) {
      result = result.filter(
        (product) =>
          product.category.toLowerCase() === activeFilters.category.toLowerCase()
      );
    }

    if (activeFilters.type) {
      result = result.filter(
        (product) =>
          product.type.toLowerCase() === activeFilters.type.toLowerCase()
      );
    }

    if (activeFilters.material) {
      result = result.filter(
        (product) =>
          product.material.toLowerCase() === activeFilters.material.toLowerCase()
      );
    }

    if (activeFilters.style) {
      result = result.filter(
        (product) =>
          product.style.toLowerCase() === activeFilters.style.toLowerCase()
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
            (product) => product.price >= 1000 && product.price < 2500
          );
          break;
        case "premium":
          result = result.filter(
            (product) => product.price >= 2500 && product.price < 5000
          );
          break;
        case "luxury":
          result = result.filter((product) => product.price >= 5000);
          break;
      }
    }

    // Debug logging
    console.log('URL Parameters:', { categoryParam, typeParam, searchParam });
    console.log('Active Filters:', activeFilters);
    console.log('Filtered Products:', result);

    setFilteredProducts(result);
  }, [activeFilters, filterCategory, searchQuery, products, location.search]);

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
                  category={product.category}
                  type={product.type}
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
                      category: product.category,
                      type: product.type,
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
                  setActiveFilters({ material: "", style: "", priceRange: "", category: "", type: "" })
                }
              >
                Clear Filters
              </Button>
            </div>
          )}
        </motion.div>

        {/* View All Button */}
        {onViewAll && (
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
        )}
      </div>
    </section>
  );
};

export default ProductShowcase;
