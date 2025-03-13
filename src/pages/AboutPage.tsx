import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AboutSection from "@/components/about/AboutSection";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="pt-20">
        <AboutSection />
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
