import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
  productId?: string;
}

const galleryImages: GalleryImage[] = [
  {
    id: "1",
    src: "https://images.unsplash.com/photo-1517142089942-ba376ce32a2e?w=800&q=80",
    alt: "Classic Oak Door",
    category: "interior",
    productId: "1",
  },
  {
    id: "2",
    src: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&q=80",
    alt: "Modern Walnut Entry Door",
    category: "exterior",
    productId: "2",
  },
  {
    id: "3",
    src: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=800&q=80",
    alt: "Rustic Pine Barn Door",
    category: "interior",
    productId: "3",
  },
  {
    id: "4",
    src: "https://images.unsplash.com/photo-1531835551805-16d864c8d311?w=800&q=80",
    alt: "Craftsman Mahogany Door",
    category: "exterior",
    productId: "4",
  },
  {
    id: "5",
    src: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80",
    alt: "Contemporary Cherry Pocket Door",
    category: "interior",
    productId: "5",
  },
  {
    id: "6",
    src: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&q=80",
    alt: "Traditional Oak French Doors",
    category: "exterior",
    productId: "6",
  },
  {
    id: "7",
    src: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80",
    alt: "Modern Black Front Door",
    category: "exterior",
    productId: "7",
  },
  {
    id: "8",
    src: "https://images.unsplash.com/photo-1600566752355-09c1c6fd1e0a?w=800&q=80",
    alt: "Minimalist Interior Door",
    category: "interior",
    productId: "8",
  },
  {
    id: "9",
    src: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80",
    alt: "Rustic Wooden Barn Door",
    category: "custom",
    productId: "9",
  },
  {
    id: "10",
    src: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=800&q=80",
    alt: "Custom Glass Panel Door",
    category: "custom",
    productId: "10",
  },
  {
    id: "11",
    src: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80",
    alt: "Elegant Entry Door",
    category: "exterior",
    productId: "11",
  },
  {
    id: "12",
    src: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&q=80",
    alt: "Custom Carved Door",
    category: "custom",
    productId: "12",
  },
];

const GalleryPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const navigate = useNavigate();

  const filteredImages =
    activeCategory === "all"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);

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
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            >
              Our Door Gallery
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-2xl mx-auto text-gray-600"
            >
              Browse our collection of handcrafted wooden doors. Each piece
              showcases our commitment to quality craftsmanship and timeless
              design.
            </motion.p>
          </div>

          <Tabs defaultValue="all" className="mb-8">
            <div className="flex justify-center">
              <TabsList className="grid grid-cols-4 w-full max-w-md">
                <TabsTrigger
                  value="all"
                  onClick={() => setActiveCategory("all")}
                >
                  All
                </TabsTrigger>
                <TabsTrigger
                  value="interior"
                  onClick={() => setActiveCategory("interior")}
                >
                  Interior
                </TabsTrigger>
                <TabsTrigger
                  value="exterior"
                  onClick={() => setActiveCategory("exterior")}
                >
                  Exterior
                </TabsTrigger>
                <TabsTrigger
                  value="custom"
                  onClick={() => setActiveCategory("custom")}
                >
                  Custom
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all" className="mt-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredImages.map((image) => (
                  <motion.div
                    key={image.id}
                    whileHover={{ y: -5, scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                    className="cursor-pointer overflow-hidden rounded-lg shadow-md bg-white"
                    onClick={() => openLightbox(image)}
                  >
                    <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="interior" className="mt-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredImages.map((image) => (
                  <motion.div
                    key={image.id}
                    whileHover={{ y: -5, scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                    className="cursor-pointer overflow-hidden rounded-lg shadow-md bg-white"
                    onClick={() => openLightbox(image)}
                  >
                    <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="exterior" className="mt-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredImages.map((image) => (
                  <motion.div
                    key={image.id}
                    whileHover={{ y: -5, scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                    className="cursor-pointer overflow-hidden rounded-lg shadow-md bg-white"
                    onClick={() => openLightbox(image)}
                  >
                    <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="custom" className="mt-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredImages.map((image) => (
                  <motion.div
                    key={image.id}
                    whileHover={{ y: -5, scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                    className="cursor-pointer overflow-hidden rounded-lg shadow-md bg-white"
                    onClick={() => openLightbox(image)}
                  >
                    <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Call to Action */}
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Can't find what you're looking for?
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              We specialize in custom doors tailored to your exact
              specifications.
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

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <div
            className="relative max-w-4xl w-full bg-white rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70 transition-all z-10"
              onClick={closeLightbox}
            >
              <X className="h-6 w-6" />
            </button>

            <div className="flex flex-col md:flex-row">
              <div className="md:w-2/3">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  className="w-full h-auto max-h-[80vh] object-contain"
                />
              </div>
              <div className="p-6 md:w-1/3 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-2">
                    {selectedImage.alt}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Category:{" "}
                    {selectedImage.category.charAt(0).toUpperCase() +
                      selectedImage.category.slice(1)}
                  </p>
                  <p className="text-gray-700">
                    This beautiful door showcases our commitment to quality
                    craftsmanship and attention to detail.
                  </p>
                </div>

                {selectedImage.productId && (
                  <Button
                    className="mt-6 bg-amber-600 hover:bg-amber-700 text-white"
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
