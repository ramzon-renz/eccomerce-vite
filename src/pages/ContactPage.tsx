import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactForm from "@/components/contact/ContactForm";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="pt-20">
        <ContactForm />
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;
