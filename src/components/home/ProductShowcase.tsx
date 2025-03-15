import React, { useState, useEffect, useCallback } from "react";
import { useCart } from "@/context/CartContext";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import FilterBar from "./FilterBar";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
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
  searchQuery?: string;
}

const ProductShowcase: React.FC<ProductShowcaseProps> = ({
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
    material: "all",
    style: "all",
    priceRange: "all",
    category: "all",
    type: "all",
    searchQuery: searchQuery,
  });

  const [searchParams] = useSearchParams();

  const handleFilterChange = useCallback((newFilters: FilterOptions) => {
    setActiveFilters(newFilters);
  }, []);

  useEffect(() => {
    // Initialize filters based on filterCategory and type from URL
    const category = searchParams.get("category");
    const type = searchParams.get("type");
    const searchQuery = searchParams.get("search");

    if (category) {
      setActiveFilters(prev => ({
        ...prev,
        category: category.toLowerCase()
      }));
    }

    if (type) {
      setActiveFilters(prev => ({
        ...prev,
        type: type.toLowerCase()
      }));
    }

    if (searchQuery) {
      setActiveFilters(prev => ({
        ...prev,
        searchQuery: searchQuery.toLowerCase()
      }));
    }
  }, [searchParams]);

  useEffect(() => {
    let filtered = [...products];

    // Apply category filter
    if (activeFilters.category && activeFilters.category !== "all") {
      filtered = filtered.filter(product => 
        product.category.toLowerCase() === activeFilters.category.toLowerCase()
      );
    }

    // Apply type filter
    if (activeFilters.type && activeFilters.type !== "all") {
      filtered = filtered.filter(product => 
        product.type.toLowerCase() === activeFilters.type.toLowerCase()
      );
    }

    // Apply search query filter
    if (activeFilters.searchQuery) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(activeFilters.searchQuery) || 
        product.description.toLowerCase().includes(activeFilters.searchQuery)
      );
    }

    // Apply material filter
    if (activeFilters.material && activeFilters.material !== "all") {
      filtered = filtered.filter(product => 
        product.material.toLowerCase() === activeFilters.material.toLowerCase()
      );
    }

    // Apply style filter
    if (activeFilters.style && activeFilters.style !== "all") {
      filtered = filtered.filter(product => 
        product.style.toLowerCase() === activeFilters.style.toLowerCase()
      );
    }

    // Apply price range filter
    if (activeFilters.priceRange && activeFilters.priceRange !== "all") {
      filtered = filtered.filter(product => {
        const price = product.price;
        switch (activeFilters.priceRange) {
          case "budget":
            return price >= 500 && price <= 1000;
          case "mid":
            return price >= 1000 && price <= 2500;
          case "premium":
            return price >= 2500 && price <= 5000;
          case "luxury":
            return price >= 5000;
          default:
            return true;
        }
      });
    }

    setFilteredProducts(filtered);
  }, [products, activeFilters]);

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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 "
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
                  setActiveFilters({ material: "all", style: "all", priceRange: "all", category: "all", type: "all" })
                }
              >
                Clear Filters
              </Button>
            </div>
          )}
        </motion.div>

        {/* View All Button */}
        {location.pathname !== "/products" && (
          <div className="text-center">
            <Button variant="outline" className="group" onClick={() => navigate("/products")}>
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
