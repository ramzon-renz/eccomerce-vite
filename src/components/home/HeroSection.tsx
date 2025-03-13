import React, { useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  backgroundImage?: string;
  onExplore?: () => void;
}

const HeroSection = ({
  title = "Handcrafted Wooden Doors",
  subtitle = "Premium craftsmanship for your home, built to last generations",
  ctaText = "Explore Products",
  backgroundImage = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80",
  onExplore = () => console.log("Explore products clicked"),
}: HeroSectionProps) => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);

  // Multiple background images for auto-rotation
  const backgroundImages = [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80",
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1920&q=80",
    "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=1920&q=80",
    "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=1920&q=80",
  ];

  const handleExplore = () => {
    navigate("/products");
  };

  useEffect(() => {
    setIsMounted(true);

    // Auto-rotate background images
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1,
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[700px] overflow-hidden bg-gray-900">
      {/* Parallax Background with Auto-Rotation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImageIndex}
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            y: isMounted ? y : 0,
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          style={{
            opacity: isMounted ? opacity : 1,
          }}
        >
          <div className="absolute inset-0 bg-black/40 z-10" />
          <img
            src={backgroundImages[currentImageIndex]}
            alt="Wooden door craftsmanship"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-20 container mx-auto h-full flex flex-col justify-center items-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            {title}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 drop-shadow-md">
            {subtitle}
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              onClick={handleExplore}
              className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-6 text-lg rounded-md"
            >
              {ctaText}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </motion.div>

        {/* Decorative Elements / Image Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-0 right-0 flex justify-center"
        >
          <div className="flex space-x-2">
            {backgroundImages.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${i === currentImageIndex ? "w-4 bg-amber-600" : "bg-white/70"}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
