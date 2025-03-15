import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import productData from "@/data/products.json";
import type { ProductData } from "@/types/product";
interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
  productId?: string;
}

// Transform products data into gallery images
const galleryImages: GalleryImage[] = (productData as ProductData).products.map(product => ({
  id: product.id,
  src: product.images[0],
  alt: product.name,
  category: product.style.toLowerCase(),
  productId: product.id
}));

console.log('Initial gallery images:', galleryImages);

const GalleryPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const navigate = useNavigate();

  // Get unique categories from products
  const categories = ["all", ...new Set((productData as ProductData).products.map(product => product.style.toLowerCase()))];
  console.log('Available categories:', categories);

  const filteredImages =
    activeCategory === "all"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);
  
  console.log('Active category:', activeCategory);
  console.log('Filtered images:', filteredImages);

  const openLightbox = (image: GalleryImage) => {
    console.log("Opening lightbox for:", image);
    setSelectedImage(image);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = "auto";
  };

  const viewProduct = (productId: string) => {
    navigate(`/products/${productId}`);
    closeLightbox();
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            >
              Our Door Gallery
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-2xl mx-auto text-gray-600 px-4 sm:px-0"
            >
              Browse our collection of handcrafted wooden doors. Each piece
              showcases our commitment to quality craftsmanship and timeless
              design.
            </motion.p>
          </div>

          <div className="flex justify-center mb-8">
            <Tabs 
              defaultValue="all" 
              value={activeCategory}
              onValueChange={setActiveCategory}
              className="w-full max-w-6xl mx-auto"
            >
              <div className="flex justify-center px-2 sm:px-4">
                <div className="w-full overflow-x-auto scrollbar-hide -mx-2 sm:mx-0">
                  <TabsList className="inline-flex h-auto min-h-[40px] sm:h-10 items-center justify-start sm:justify-center rounded-md bg-gray-100 p-1 text-gray-500 w-full">
                    {categories.map((category) => (
                      <TabsTrigger
                        key={category}
                        value={category}
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-gray-950 data-[state=active]:shadow-sm flex-1 min-w-[80px] sm:min-w-[90px] md:min-w-[100px]"
                      >
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>
              </div>

              {categories.map((category) => (
                <TabsContent key={category} value={category} className="mt-4 sm:mt-8">
                  <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 px-1 sm:px-2 md:px-4 lg:px-0">
                    {(category === "all" ? galleryImages : galleryImages.filter(img => img.category === category)).map((image) => (
                      <motion.div
                        key={image.id}
                        whileHover={{ y: -5, scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                        className="cursor-pointer overflow-hidden rounded-lg shadow-md bg-white group"
                        onClick={() => openLightbox(image)}
                      >
                        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden relative">
                          <img
                            src={image.src}
                            alt={image.alt}
                            className="w-full h-32 xs:h-36 sm:h-40 md:h-48 lg:h-56 object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300 flex items-center justify-center">
                            <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm sm:text-base font-medium">
                              View Details
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>



        </div>
      </main>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-2 sm:p-4"
          onClick={closeLightbox}
        >
          <div
            className="relative w-full max-w-4xl bg-white rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70 transition-all z-10"
              onClick={closeLightbox}
            >
              <X className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>

            <div className="flex flex-col md:flex-row">
              <div className="md:w-2/3">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  className="w-full h-auto max-h-[60vh] md:max-h-[80vh] object-contain"
                />
              </div>
              <div className="p-4 md:p-6 md:w-1/3">
                <h3 className="text-lg sm:text-xl font-bold mb-2">
                  {selectedImage.alt}
                </h3>
                <p className="text-gray-600 mb-4">
                  Category:{" "}
                  {selectedImage.category.charAt(0).toUpperCase() +
                    selectedImage.category.slice(1)}
                </p>
                <p className="text-gray-700 mb-6">
                  This beautiful door showcases our commitment to quality
                  craftsmanship and attention to detail.
                </p>

                {selectedImage.productId && (
                  <Button
                    className="w-full sm:w-auto bg-amber-600 hover:bg-amber-700 text-white"
                    onClick={() => viewProduct(selectedImage.productId!)}
                  >
                    View Product Details
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default GalleryPage;
