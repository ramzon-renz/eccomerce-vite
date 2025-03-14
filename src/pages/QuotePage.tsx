import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import QuotationForm from "@/components/product/QuotationForm";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const QuotePage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmitSuccess = () => {
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <main className="pt-20 pb-16">
          <div className="max-w-3xl mx-auto px-4 py-16 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Quote Request Submitted!
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Thank you for your request. Our team will review your requirements
              and contact you within 24-48 business hours with a detailed quote.
            </p>
            <Button
              className="bg-amber-600 hover:bg-amber-700 text-white"
              onClick={() => (window.location.href = "/")}
            >
              Return to Homepage
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-20 pb-16">
        <QuotationForm onSubmitSuccess={handleSubmitSuccess} />
      </main>
      <Footer />
    </div>
  );
};

export default QuotePage;
