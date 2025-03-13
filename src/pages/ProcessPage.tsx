import React from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, Clock, Wrench, CheckCircle, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProcessPage = () => {
  const navigate = useNavigate();

  const processSteps = [
    {
      id: 1,
      title: "Material Selection",
      description:
        "We begin by carefully selecting the finest wood materials for your door. Each piece of wood is inspected for quality, grain pattern, and durability to ensure it meets our exacting standards.",
      image:
        "https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=800&q=80",
      icon: <Wrench className="h-8 w-8 text-amber-600" />,
    },
    {
      id: 2,
      title: "Design & Planning",
      description:
        "Our master craftsmen work with you to create a detailed design plan. We consider your home's architecture, your personal style preferences, and functional requirements to create the perfect door design.",
      image:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
      icon: <Users className="h-8 w-8 text-amber-600" />,
    },
    {
      id: 3,
      title: "Crafting Process",
      description:
        "Using a combination of traditional woodworking techniques and modern precision tools, our artisans carefully craft each component of your door. This meticulous process ensures exceptional quality and attention to detail.",
      image:
        "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&q=80",
      icon: <Clock className="h-8 w-8 text-amber-600" />,
    },
    {
      id: 4,
      title: "Finishing & Quality Control",
      description:
        "Each door receives multiple layers of premium finishes to enhance its natural beauty and provide lasting protection. Our quality control team inspects every door to ensure it meets our rigorous standards before delivery.",
      image:
        "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=800&q=80",
      icon: <CheckCircle className="h-8 w-8 text-amber-600" />,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative bg-amber-50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              >
                Our Craftsmanship Process
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg text-gray-600 mb-8"
              >
                Discover how we transform raw wood into exceptional doors
                through our time-honored craftsmanship process, blending
                traditional techniques with modern precision.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Process Steps */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16 ${
                  index % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div
                  className={`order-2 ${index % 2 === 1 ? "md:order-1" : "md:order-2"}`}
                >
                  <div className="rounded-lg overflow-hidden">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-[300px] md:h-[400px] object-cover"
                    />
                  </div>
                </div>

                <div
                  className={`order-1 ${index % 2 === 1 ? "md:order-2" : "md:order-1"}`}
                >
                  <div className="flex items-center mb-4">
                    <div className="bg-amber-100 rounded-full p-3 mr-4">
                      {step.icon}
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {step.id}. {step.title}
                    </h2>
                  </div>
                  <p className="text-gray-600 mb-6 text-lg">
                    {step.description}
                  </p>
                </div>

                {index < processSteps.length - 1 && (
                  <div className="col-span-1 md:col-span-2 flex justify-center my-8">
                    <Separator className="w-16 bg-amber-200 h-1" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* Our Commitment */}
        <section className="bg-stone-50 py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-3xl font-bold text-gray-900 mb-4"
              >
                Our Commitment to Excellence
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="max-w-3xl mx-auto text-gray-600 text-lg"
              >
                Every door we create is a testament to our unwavering commitment
                to quality, craftsmanship, and customer satisfaction.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-lg shadow-sm"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Quality Materials
                </h3>
                <p className="text-gray-600">
                  We source only the finest woods and materials, ensuring that
                  every door we create is built to last for generations.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-lg shadow-sm"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Master Craftsmanship
                </h3>
                <p className="text-gray-600">
                  Our team of skilled artisans brings decades of experience to
                  every project, combining traditional techniques with modern
                  precision.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-lg shadow-sm"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Customer Satisfaction
                </h3>
                <p className="text-gray-600">
                  We work closely with our clients throughout the process to
                  ensure that every door exceeds expectations in both form and
                  function.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-gray-900 mb-4"
            >
              Ready to Experience Our Craftsmanship?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto text-gray-600 text-lg mb-8"
            >
              Whether you're looking for a standard door from our collection or
              a custom-designed piece, we're here to help you find the perfect
              door for your home.
            </motion.p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                className="bg-amber-600 hover:bg-amber-700 text-white"
                onClick={() => navigate("/products")}
              >
                Browse Our Collection
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" onClick={() => navigate("/customize")}>
                Design Your Custom Door
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProcessPage;
