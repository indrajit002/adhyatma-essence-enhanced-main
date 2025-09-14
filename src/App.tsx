import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./contexts/cart-context";
import { AuthProvider } from "./contexts/auth-context";
import { StripeProvider } from "./contexts/stripe-context";
import { Cart, CartOverlay } from "@/components/ui/cart";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Checkout from "./pages/Checkout";
import Collections from "./pages/Collections";
import CollectionDetail from "./pages/CollectionDetail";
import OurStory from "./pages/OurStory";
import Shop from "./pages/Shop";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import CartTest from "./components/CartTest";
import LenisProvider from "./components/LenisProvider";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <CartProvider>
          <StripeProvider>
            <LenisProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <div className="min-h-screen bg-background">
                <CartOverlay />
                <Cart />
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/our-story" element={<OurStory />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/signin" element={<SignIn />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/collections" element={<Collections />} />
                  <Route path="/collections/:id" element={<CollectionDetail />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/cart-test" element={<CartTest />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </BrowserRouter>
            </LenisProvider>
          </StripeProvider>
        </CartProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
