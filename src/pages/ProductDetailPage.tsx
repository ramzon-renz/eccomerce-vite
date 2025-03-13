import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductDetail from "@/components/product/ProductDetail";
import productData from "@/data/products.json";
import type { Product, ProductData } from "@/types/product";

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch product details
    setIsLoading(true);
    setTimeout(() => {
      const foundProduct = (productData as ProductData).products.find((p) => p.id === id) || (productData as ProductData).products[0];
      setProduct(foundProduct);
      setIsLoading(false);
    }, 800);
  }, [id]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="pt-20">
        {isLoading ? (
          <div className="container mx-auto px-4 py-16 flex justify-center items-center h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-600"></div>
          </div>
        ) : product ? (
          <ProductDetail
            id={product.id}
            name={product.name}
            price={product.price}
            description={product.description}
            longDescription={product.longDescription}
            images={product.images}
            material={product.material}
            style={product.style}
            dimensions={product.dimensions}
            features={product.features}
            specifications={product.specifications}
            relatedProducts={(productData as ProductData).products
              .filter(p => p.id !== product.id)
              .slice(0, 3)
              .map(p => ({
                id: p.id,
                name: p.name,
                image: p.images[0]
              }))}
          />
        ) : (
          <div className="container mx-auto px-4 py-16 text-center">
            <h2 className="text-2xl font-bold text-gray-900">
              Product not found
            </h2>
            <p className="text-gray-600 mt-2">
              The product you're looking for doesn't exist or has been removed.
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetailPage;
