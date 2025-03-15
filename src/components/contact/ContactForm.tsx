import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react";

interface ContactFormProps {
  address?: string;
  phone?: string;
  email?: string;
  mapLocation?: string;
}

const ContactForm = ({
  address = "123 Craftsman Way, Woodville, CA 90210",
  phone = "+1 (555) 123-4567",
  email = "info@artisanwoodendoors.com",
  mapLocation = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0673431806383!2d-122.41941548468204!3d37.77492997975903!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c6c8f4459%3A0xb10ed6d9b5050fa5!2sTwitter%20HQ!5e0!3m2!1sen!2sus!4v1648641118777!5m2!1sen!2sus",
}: ContactFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Show a toast message indicating that the submission is in progress
    toast({
        title: "Submitting...",
        description: "Your message is being sent.",
        duration: 2000, // Duration in milliseconds
    });

    try {
        const response = await fetch('http://localhost:5001/api/contact', {  // Update the endpoint to include the correct port
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();
        toast({
            title: "Message Sent",
            description: result.message || "Thank you for your inquiry. We'll get back to you shortly.",
            // variant: "success", // Optional: specify a variant if your toast library supports it
        });
        setFormData({
            name: "",
            email: "",
            phone: "",
            subject: "",
            message: "",
        });
    } catch (error) {
        toast({
            title: "Error",
            description: "There was an error sending your message. Please try again later.",
            variant: "destructive", // Optional: specify a variant for error messages
        });
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Contact Us
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-gray-600"
          >
            Have questions about our wooden doors or need a custom quote? Reach
            out to our team and we'll get back to you as soon as possible.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white rounded-lg shadow-sm p-6 border border-gray-100"
          >
            <h3 className="text-xl font-semibold mb-6">Send Us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    required
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="(555) 123-4567"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="Product Inquiry"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Please provide details about your inquiry..."
                  rows={5}
                  required
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-amber-600 hover:bg-amber-700 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-xl font-semibold mb-6">
                Contact Information
              </h3>
              <ul className="space-y-6">
                <li className="flex items-start">
                  <MapPin className="h-6 w-6 text-amber-600 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Our Location</h4>
                    <p className="text-gray-600 mt-1">{address}</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Phone className="h-6 w-6 text-amber-600 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Phone Number</h4>
                    <p className="text-gray-600 mt-1">
                      <a
                        href={`tel:${phone.replace(/[^0-9+]/g, "")}`}
                        className="hover:text-amber-600 transition-colors"
                      >
                        {phone}
                      </a>
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Mail className="h-6 w-6 text-amber-600 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Email Address</h4>
                    <p className="text-gray-600 mt-1">
                      <a
                        href={`mailto:${email}`}
                        className="hover:text-amber-600 transition-colors"
                      >
                        {email}
                      </a>
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Business Hours</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-gray-600">Monday - Friday:</div>
                  <div className="font-medium">9:00 AM - 6:00 PM</div>
                  <div className="text-gray-600">Saturday:</div>
                  <div className="font-medium">10:00 AM - 4:00 PM</div>
                  <div className="text-gray-600">Sunday:</div>
                  <div className="font-medium">Closed</div>
                </div>
              </div>
            </div>

            {/* Google Maps Embed */}
            <div className="h-[300px] rounded-lg overflow-hidden border border-gray-200">
              <iframe
                src={mapLocation}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
