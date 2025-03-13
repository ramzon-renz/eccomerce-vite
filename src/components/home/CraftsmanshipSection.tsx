import React from "react";
import { motion } from "framer-motion";
import { Award, Clock, Users, Hammer } from "lucide-react";
import TestimonialSlider from "./TestimonialSlider";

interface Statistic {
  id: number;
  value: string;
  label: string;
  icon: React.ReactNode;
}

interface CraftsmanshipSectionProps {
  title?: string;
  description?: string;
  statistics?: Statistic[];
}

const defaultStatistics: Statistic[] = [
  {
    id: 1,
    value: "25+",
    label: "Years of Experience",
    icon: <Clock className="h-8 w-8 text-amber-600" />,
  },
  {
    id: 2,
    value: "10,000+",
    label: "Doors Crafted",
    icon: <Hammer className="h-8 w-8 text-amber-600" />,
  },
  {
    id: 3,
    value: "5,000+",
    label: "Happy Customers",
    icon: <Users className="h-8 w-8 text-amber-600" />,
  },
  {
    id: 4,
    value: "15+",
    label: "Industry Awards",
    icon: <Award className="h-8 w-8 text-amber-600" />,
  },
];

const CraftsmanshipSection = ({
  title = "Our Craftsmanship",
  description = "We take pride in our meticulous attention to detail and commitment to excellence. Each door is handcrafted by our skilled artisans using traditional techniques combined with modern precision.",
  statistics = defaultStatistics,
}: CraftsmanshipSectionProps) => {
  return (
    <section className="py-16 px-4 bg-stone-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            {title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-gray-600 text-lg"
          >
            {description}
          </motion.p>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {statistics.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-sm text-center flex flex-col items-center"
            >
              <div className="mb-4 p-3 rounded-full bg-amber-50">
                {stat.icon}
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">
                {stat.value}
              </h3>
              <p className="text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Craftsmanship Image */}
        <div className="mb-16 relative overflow-hidden rounded-lg">
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="aspect-w-16 aspect-h-7 relative"
          >
            <img
              src="https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=1200&q=80"
              alt="Craftsman working on wooden door"
              className="w-full h-[400px] object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent flex items-center">
              <div className="text-white p-8 md:p-12 max-w-lg">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  Handcrafted Excellence
                </h3>
                <p className="text-white/90">
                  Every door tells a story of skilled craftsmanship, premium
                  materials, and meticulous attention to detail. Our master
                  woodworkers bring decades of experience to each piece they
                  create.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Testimonial Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h3 className="text-2xl font-bold text-center mb-8">
            What Our Customers Say
          </h3>
          <TestimonialSlider />
        </motion.div>
      </div>
    </section>
  );
};

export default CraftsmanshipSection;
