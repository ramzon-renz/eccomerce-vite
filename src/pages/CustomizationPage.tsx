import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CustomizationForm from "@/components/product/CustomizationForm";

const CustomizationPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="pt-20">
        <CustomizationForm />
      </main>

      <Footer />
    </div>
  );
};

export default CustomizationPage;
