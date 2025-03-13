import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Heart,
  Share2,
  ShoppingCart,
  Check,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

interface ProductDetailProps {
  id?: string;
  name?: string;
  price?: number;
  description?: string;
  longDescription?: string;
  images?: string[];
  material?: string;
  style?: string;
  dimensions?: {
    width: number;
    height: number;
    thickness: number;
  };
  features?: string[];
  specifications?: Record<string, string>;
  relatedProducts?: {
    id: string;
    name: string;
    image: string;
  }[];
  onBack?: () => void;
}

const ProductDetail = ({
  id = "1",
  name = "Classic Oak Door",
  price = 899.99,
  description = "Handcrafted solid oak door with premium finish and elegant design.",
  longDescription = "Our Classic Oak Door represents the pinnacle of traditional craftsmanship. Each door is meticulously handcrafted from premium solid oak, known for its exceptional durability and timeless beauty. The natural grain patterns are enhanced with our proprietary finishing process, creating a warm, inviting appearance that will elevate any space in your home.",
  images = [
    "https://images.unsplash.com/photo-1517142089942-ba376ce32a2e?w=800&q=80",
    "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&q=80",
    "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=800&q=80",
    "https://images.unsplash.com/photo-1531835551805-16d864c8d311?w=800&q=80",
  ],
  material = "Oak",
  style = "Classic",
  dimensions = {
    width: 36,
    height: 80,
    thickness: 1.75,
  },
  features = [
    "Solid oak construction",
    "Premium finish",
    "Elegant design",
    "Durable hardware",
    "Custom sizing available",
    "10-year warranty",
  ],
  specifications = {
    Material: "Solid Oak",
    Finish: "Natural Satin",
    Hardware: "Brass or Stainless Steel",
    Insulation: "R-Value 5.2",
    Weight: "45 lbs",
    Installation: "Professional installation recommended",
  },
  relatedProducts = [
    {
      id: "2",
      name: "Modern Walnut Entry Door",
      image:
        "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=300&q=80",
    },
    {
      id: "3",
      name: "Rustic Pine Barn Door",
      image:
        "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=300&q=80",
    },
    {
      id: "4",
      name: "Craftsman Mahogany Door",
      image:
        "https://images.unsplash.com/photo-1531835551805-16d864c8d311?w=300&q=80",
    },
  ],
  onBack = () => window.history.back(),
}: ProductDetailProps) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [imageZoomed, setImageZoomed] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    addToCart({
      id,
      name,
      price,
      image: images[0],
      quantity,
      material,
      style,
    });

    // Show toast or notification
    toast({
      title: "Added to cart",
      description: `${quantity} x ${name} added to your cart`,
    });
  };

  const handleRequestQuote = () => {
    addToCart({
      id,
      name,
      price,
      image: images[0],
      quantity,
      material,
      style,
    });
    navigate("/quote");
  };

  const handleImageClick = () => {
    setImageZoomed(!imageZoomed);
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = `Check out this amazing ${name} from Artisan Wooden Doors!`;

    let shareUrl = "";
    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        break;
      case "pinterest":
        shareUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&media=${encodeURIComponent(images[0])}&description=${encodeURIComponent(text)}`;
        break;
      case "email":
        shareUrl = `mailto:?subject=${encodeURIComponent(`Check out this ${name}`)}&body=${encodeURIComponent(`${text}\n\n${url}`)}`;
        break;
      case "copy":
        navigator.clipboard.writeText(url);
        toast({
          title: "Link copied",
          description: "Product link has been copied to clipboard",
        });
        setShareModalOpen(false);
        return;
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank");
    }
    setShareModalOpen(false);
  };

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          size="sm"
          className="mb-6 text-gray-600"
          onClick={onBack}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Products
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div>
            <div className="relative overflow-hidden rounded-lg bg-gray-100 mb-4 h-[400px] md:h-[500px] cursor-zoom-in">
              <motion.img
                key={selectedImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, scale: imageZoomed ? 1.5 : 1 }}
                transition={{ duration: 0.3 }}
                src={images[selectedImage]}
                alt={`${name} - View ${selectedImage + 1}`}
                className={`w-full h-full object-cover transition-all duration-300 ${imageZoomed ? "cursor-zoom-out" : "cursor-zoom-in"}`}
                onClick={handleImageClick}
              />
              {imageZoomed && (
                <div
                  className="absolute inset-0 bg-black/20 z-10"
                  onClick={handleImageClick}
                ></div>
              )}
            </div>

            <div className="grid grid-cols-4 gap-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative overflow-hidden rounded-md h-20 ${selectedImage === index ? "ring-2 ring-amber-600" : "ring-1 ring-gray-200"}`}
                >
                  <img
                    src={image}
                    alt={`${name} thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="flex flex-wrap items-start justify-between mb-2">
              <div>
                <div className="flex gap-2 mb-2">
                  <Badge
                    variant="secondary"
                    className="bg-amber-100 text-amber-800"
                  >
                    {material}
                  </Badge>
                  <Badge variant="outline">{style}</Badge>
                </div>
                <h1 className="text-3xl font-bold text-gray-900">{name}</h1>
              </div>
              <div className="flex gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          if (isInWishlist(id)) {
                            removeFromWishlist(id);
                            toast({
                              title: "Removed from wishlist",
                              description: `${name} has been removed from your wishlist`,
                            });
                          } else {
                            addToWishlist({
                              id,
                              name,
                              price,
                              image: images[0],
                              material,
                              style,
                            });
                            toast({
                              title: "Added to wishlist",
                              description: `${name} has been added to your wishlist`,
                            });
                          }
                        }}
                      >
                        <Heart
                          className={`h-5 w-5 ${isInWishlist(id) ? "text-red-500 fill-red-500" : "text-gray-500"}`}
                        />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        {isInWishlist(id)
                          ? "Remove from wishlist"
                          : "Add to wishlist"}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setShareModalOpen(true)}
                      >
                        <Share2 className="h-5 w-5 text-gray-500" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Share product</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>

            <div className="mt-4 mb-6">
              <p className="text-3xl font-bold text-gray-900">
                ${price.toFixed(2)}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Free shipping on orders over $1000
              </p>
            </div>

            <p className="text-gray-700 mb-6">{description}</p>

            {/* Dimensions */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-2">
                Dimensions
              </h3>
              <div className="flex gap-4">
                <div className="text-center">
                  <span className="block text-lg font-semibold">
                    {dimensions.width}"
                  </span>
                  <span className="text-xs text-gray-500">Width</span>
                </div>
                <div className="text-center">
                  <span className="block text-lg font-semibold">
                    {dimensions.height}"
                  </span>
                  <span className="text-xs text-gray-500">Height</span>
                </div>
                <div className="text-center">
                  <span className="block text-lg font-semibold">
                    {dimensions.thickness}"
                  </span>
                  <span className="text-xs text-gray-500">Thickness</span>
                </div>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex border rounded-md">
                <button
                  className="px-3 py-2 border-r"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                  }
                  className="w-12 text-center py-2"
                />
                <button
                  className="px-3 py-2 border-l"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
              <Button
                className="flex-1 bg-amber-600 hover:bg-amber-700 text-white"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={handleRequestQuote}
              >
                Request Quote
              </Button>
            </div>

            {/* Key Features */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-2">
                Key Features
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tabs for more info */}
            <Tabs defaultValue="description" className="mt-8">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
                <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
              </TabsList>
              <TabsContent
                value="description"
                className="mt-4 text-sm text-gray-700"
              >
                <p className="mb-4">{longDescription}</p>
                <p>
                  Our doors are crafted with precision and care, ensuring that
                  each piece meets our exacting standards for quality and
                  durability. We use only the finest materials and traditional
                  woodworking techniques, combined with modern technology, to
                  create doors that will stand the test of time.
                </p>
              </TabsContent>
              <TabsContent value="specifications" className="mt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Object.entries(specifications).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex justify-between border-b pb-2"
                    >
                      <span className="font-medium text-sm">{key}</span>
                      <span className="text-sm text-gray-600">{value}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent
                value="shipping"
                className="mt-4 text-sm text-gray-700"
              >
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-1">Shipping</h4>
                    <p>
                      We offer free shipping on all orders over $1,000. Standard
                      shipping typically takes 5-7 business days. Expedited
                      shipping options are available at checkout.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Returns</h4>
                    <p>
                      We stand behind our products and offer a 30-day return
                      policy. Custom orders cannot be returned unless there is a
                      manufacturing defect.
                    </p>
                  </div>
                  <div className="flex items-start bg-blue-50 p-3 rounded-md">
                    <Info className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                    <p className="text-blue-800 text-xs">
                      Please note that due to the custom nature of our products,
                      production time is typically 2-3 weeks before shipping.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            You May Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <motion.div
                key={product.id}
                whileHover={{ y: -5 }}
                className="group relative bg-white border rounded-lg overflow-hidden"
              >
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-48 w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-medium text-gray-900">
                    {product.name}
                  </h3>
                  <div className="mt-2 flex justify-between items-center">
                    <Button
                      variant="link"
                      className="p-0 h-auto text-amber-600"
                      onClick={() => navigate(`/products/${product.id}`)}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Share Modal */}
      {shareModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setShareModalOpen(false)}
        >
          <div
            className="bg-white rounded-lg p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold mb-4">Share this product</h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <Button
                variant="outline"
                className="flex items-center justify-center gap-2"
                onClick={() => handleShare("facebook")}
              >
                <svg
                  className="h-5 w-5 text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
                Facebook
              </Button>
              <Button
                variant="outline"
                className="flex items-center justify-center gap-2"
                onClick={() => handleShare("twitter")}
              >
                <svg
                  className="h-5 w-5 text-blue-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
                Twitter
              </Button>
              <Button
                variant="outline"
                className="flex items-center justify-center gap-2"
                onClick={() => handleShare("pinterest")}
              >
                <svg
                  className="h-5 w-5 text-red-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                </svg>
                Pinterest
              </Button>
              <Button
                variant="outline"
                className="flex items-center justify-center gap-2"
                onClick={() => handleShare("email")}
              >
                <svg
                  className="h-5 w-5 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Email
              </Button>
            </div>
            <div className="mt-4">
              <Button
                className="w-full bg-amber-600 hover:bg-amber-700 text-white"
                onClick={() => handleShare("copy")}
              >
                Copy Link
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
