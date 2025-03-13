import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductDetail from "@/components/product/ProductDetail";

// Mock product data - in a real app, this would come from an API
const products = [
  {
    id: "1",
    name: "Classic Oak Door",
    price: 899.99,
    description:
      "Handcrafted solid oak door with premium finish and elegant design.",
    longDescription:
      "Our Classic Oak Door represents the pinnacle of traditional craftsmanship. Each door is meticulously handcrafted from premium solid oak, known for its exceptional durability and timeless beauty. The natural grain patterns are enhanced with our proprietary finishing process, creating a warm, inviting appearance that will elevate any space in your home.",
    images: [
      "https://images.unsplash.com/photo-1517142089942-ba376ce32a2e?w=800&q=80",
      "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&q=80",
      "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=800&q=80",
      "https://images.unsplash.com/photo-1531835551805-16d864c8d311?w=800&q=80",
    ],
    material: "Oak",
    style: "Classic",
    dimensions: {
      width: 36,
      height: 80,
      thickness: 1.75,
    },
  },
  {
    id: "2",
    name: "Modern Walnut Entry Door",
    price: 1299.99,
    description:
      "Contemporary walnut door with sleek lines and minimalist hardware.",
    longDescription:
      "Our Modern Walnut Entry Door combines contemporary design with exceptional craftsmanship. Made from premium walnut wood, this door features clean lines and a sophisticated finish that makes a bold statement. The minimalist hardware complements the door's modern aesthetic while providing secure, smooth operation.",
    images: [
      "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&q=80",
      "https://images.unsplash.com/photo-1517142089942-ba376ce32a2e?w=800&q=80",
      "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=800&q=80",
      "https://images.unsplash.com/photo-1531835551805-16d864c8d311?w=800&q=80",
    ],
    material: "Walnut",
    style: "Modern",
    dimensions: {
      width: 36,
      height: 80,
      thickness: 1.75,
    },
  },
  {
    id: "3",
    name: "Rustic Pine Barn Door",
    price: 749.99,
    description:
      "Authentic barn-style sliding door made from reclaimed pine wood.",
    longDescription:
      "Our Rustic Pine Barn Door brings farmhouse charm to any space. Crafted from reclaimed pine wood, each door has unique character and patina that tells a story. The sliding barn door hardware provides smooth operation while adding an industrial accent to the rustic design.",
    images: [
      "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=800&q=80",
      "https://images.unsplash.com/photo-1517142089942-ba376ce32a2e?w=800&q=80",
      "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&q=80",
      "https://images.unsplash.com/photo-1531835551805-16d864c8d311?w=800&q=80",
    ],
    material: "Pine",
    style: "Rustic",
    dimensions: {
      width: 42,
      height: 84,
      thickness: 1.5,
    },
  },
];

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch product details
    setIsLoading(true);
    setTimeout(() => {
      const foundProduct = products.find((p) => p.id === id) || products[0];
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
