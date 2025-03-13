import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import CustomizationPage from "./pages/CustomizationPage";
import QuotePage from "./pages/QuotePage";
import GalleryPage from "./pages/GalleryPage";
import ProcessPage from "./pages/ProcessPage";
import NotFoundPage from "./pages/NotFoundPage";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { Toaster } from "./components/ui/toaster";
import routes from "tempo-routes";

function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <Suspense fallback={<p>Loading...</p>}>
          <>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:id" element={<ProductDetailPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/customize" element={<CustomizationPage />} />
              <Route path="/quote" element={<QuotePage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/process" element={<ProcessPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
            {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
            <Toaster />
          </>
        </Suspense>
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;
