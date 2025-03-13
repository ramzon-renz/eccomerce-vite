import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Award, Clock, Users, Hammer } from "lucide-react";

interface AboutSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  mission?: string;
  vision?: string;
  values?: { title: string; description: string }[];
  teamMembers?: {
    name: string;
    role: string;
    image: string;
    bio: string;
  }[];
}

const AboutSection = ({
  title = "About Artisan Wooden Doors",
  subtitle = "Crafting Excellence Since 1985",
  description = "Artisan Wooden Doors is a family-owned business with over three decades of experience in crafting premium wooden doors. Our journey began in a small workshop with a simple mission: to create beautiful, durable doors that enhance the character of any home.",
  mission = "To craft exceptional wooden doors that combine traditional craftsmanship with modern design, providing our customers with products that are both beautiful and built to last generations.",
  vision = "To be recognized as the premier wooden door manufacturer, known for uncompromising quality, innovative designs, and exceptional customer service.",
  values = [
    {
      title: "Craftsmanship",
      description:
        "We take pride in the meticulous attention to detail that goes into every door we create.",
    },
    {
      title: "Quality",
      description:
        "We use only the finest materials and never compromise on the quality of our products.",
    },
    {
      title: "Sustainability",
      description:
        "We are committed to responsible sourcing and environmentally friendly practices.",
    },
    {
      title: "Innovation",
      description:
        "We continuously explore new techniques and designs to stay at the forefront of our industry.",
    },
  ],
  teamMembers = [
    {
      name: "Robert Anderson",
      role: "Founder & Master Craftsman",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=robert",
      bio: "With over 40 years of woodworking experience, Robert founded Artisan Wooden Doors with a vision to create doors that combine traditional craftsmanship with modern design.",
    },
    {
      name: "Maria Rodriguez",
      role: "Lead Designer",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=maria",
      bio: "Maria brings 15 years of architectural design experience to our team, specializing in creating door designs that balance aesthetics with functionality.",
    },
    {
      name: "James Chen",
      role: "Production Manager",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=james",
      bio: "James oversees our production process, ensuring that every door meets our exacting standards for quality and craftsmanship.",
    },
    {
      name: "Sarah Johnson",
      role: "Customer Relations",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      bio: "Sarah works closely with our clients to understand their needs and ensure that every project exceeds expectations.",
    },
  ],
}: AboutSectionProps) => {

  const navigate = useNavigate();

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-amber-600 font-medium mb-6"
          >
            {subtitle}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-gray-600 text-lg"
          >
            {description}
          </motion.p>
        </div>

        {/* Our Story Section with Image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h2>
            <p className="text-gray-600 mb-4">
              What began as a small family workshop has grown into a respected
              name in the wooden door industry. Our founder, Robert Anderson,
              learned the craft of woodworking from his father and grandfather,
              carrying forward a legacy of excellence that spans generations.
            </p>
            <p className="text-gray-600 mb-6">
              Today, we combine traditional woodworking techniques with modern
              technology to create doors that are not only beautiful but built
              to last. Every door that leaves our workshop represents our
              commitment to quality and craftsmanship.
            </p>
            <Button
              className="bg-amber-600 hover:bg-amber-700 text-white"
              onClick={() => navigate("/process")}
            >
              Learn More About Our Process
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="rounded-lg overflow-hidden"
          >
            <img
              src="https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=800&q=80"
              alt="Craftsman working on wooden door"
              className="w-full h-[400px] object-cover"
            />
          </motion.div>
        </div>

        {/* Mission, Vision, Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-amber-50 p-6 rounded-lg"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Our Mission
            </h3>
            <p className="text-gray-700">{mission}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-amber-50 p-6 rounded-lg"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">Our Vision</h3>
            <p className="text-gray-700">{vision}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-amber-50 p-6 rounded-lg"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">Our Values</h3>
            <ul className="space-y-2">
              {values.map((value, index) => (
                <li key={index} className="text-gray-700">
                  <span className="font-medium">{value.title}:</span>{" "}
                  {value.description}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {[
            {
              icon: <Clock className="h-8 w-8 text-amber-600" />,
              value: "35+",
              label: "Years of Experience",
            },
            {
              icon: <Hammer className="h-8 w-8 text-amber-600" />,
              value: "15,000+",
              label: "Doors Crafted",
            },
            {
              icon: <Users className="h-8 w-8 text-amber-600" />,
              value: "8,000+",
              label: "Happy Customers",
            },
            {
              icon: <Award className="h-8 w-8 text-amber-600" />,
              value: "25+",
              label: "Industry Awards",
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-sm text-center flex flex-col items-center border border-gray-100"
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

        {/* Our Team */}
        <div className="mb-12">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="max-w-3xl mx-auto text-gray-600">
              Our talented team combines decades of experience with a passion
              for woodworking and design. Each member brings unique skills and
              perspectives to create doors that are both beautiful and
              functional.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100"
              >
                <div className="p-4 bg-amber-50 flex justify-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="font-bold text-lg text-gray-900">
                    {member.name}
                  </h3>
                  <p className="text-amber-600 mb-4">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-amber-50 rounded-lg p-8 text-center"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Transform Your Home with a Custom Wooden Door?
          </h2>
          <p className="text-gray-700 mb-6 max-w-3xl mx-auto">
            Contact our team today to discuss your project requirements or
            browse our collection of premium wooden doors.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              className="bg-amber-600 hover:bg-amber-700 text-white"
              onClick={() => navigate("/products")}
            >
              Browse Our Collection
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" onClick={() => navigate("/contact")}>Contact Us</Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
