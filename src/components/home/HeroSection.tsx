import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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

  const handleExplore = () => {
    navigate("/products");
  };
  const [isMounted, setIsMounted] = useState(false);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className="relative w-full h-[700px] overflow-hidden bg-gray-900">
      {/* Parallax Background */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{
          y: isMounted ? y : 0,
          opacity: isMounted ? opacity : 1,
        }}
      >
        <div className="absolute inset-0 bg-black/40 z-10" />
        <img
          src={backgroundImage}
          alt="Wooden door craftsmanship"
          className="w-full h-full object-cover"
        />
      </motion.div>

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

        {/* Decorative Elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-0 right-0 flex justify-center"
        >
          <div className="flex space-x-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-2 h-2 rounded-full bg-white/70" />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
