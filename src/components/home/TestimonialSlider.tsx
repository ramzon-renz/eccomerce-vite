import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
}

interface TestimonialSliderProps {
  testimonials?: Testimonial[];
}

const defaultTestimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Interior Designer",
    company: "Modern Spaces",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
    content:
      "The craftsmanship of these wooden doors is exceptional. My clients are always impressed with the quality and attention to detail.",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Homeowner",
    company: "",
    avatar:"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
    content:
      "We renovated our entire home and chose these doors for every room. The difference in quality compared to our previous doors is remarkable.",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Architect",
    company: "Rodriguez & Associates",
    avatar: "https://images.unsplash.com/photo-1565884280295-98eb83e41c65?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
    content:
      "As an architect, I appreciate the precision and durability of these wooden doors. They complement my designs perfectly.",
  },
  {
    id: 4,
    name: "David Thompson",
    role: "Construction Manager",
    company: "Thompson Builders",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
    content:
      "Working with this manufacturer has been seamless. The doors arrive on time and installation is straightforward due to their precise measurements.",
  },
];

const TestimonialSlider = ({
  testimonials = defaultTestimonials,
}: TestimonialSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [api, setApi] = useState<CarouselApi | null>(null);

  const scrollTo = (index: number) => {
    if (api) {
      api.scrollTo(index);
    }
  };

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrentIndex(api.selectedScrollSnap());
    };

    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <div className="w-full max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-sm">
      <Carousel
        opts={{
          loop: true,
          align: "center",
        }}
        className="w-full"
        setApi={setApi}
      >
        <CarouselContent>
          {testimonials.map((testimonial) => (
            <CarouselItem key={testimonial.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center text-center p-6 h-full"
              >
                <div className="mb-6 text-amber-600">
                  <Quote size={36} />
                </div>

                <p className="text-gray-700 mb-6 italic text-lg">
                  "{testimonial.content}"
                </p>

                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-gray-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {testimonial.role}
                      {testimonial.company && `, ${testimonial.company}`}
                    </p>
                  </div>
                </div>
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Decorative Elements / Image Indicators */}
        <div className="flex justify-center mt-6 gap-2">
          <CarouselPrevious className="static translate-y-0 mr-2" />
          <div className="flex gap-2 items-center">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-amber-600 w-4" : "bg-gray-300"
                }`}
                onClick={() => scrollTo(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          <CarouselNext className="static translate-y-0 ml-2" />
        </div>
      </Carousel>
    </div>
  );
};

export default TestimonialSlider;
