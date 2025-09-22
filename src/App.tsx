import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./contexts/cart-context";
import AuthProvider from "./contexts/auth-context";
import WishlistProvider from "./contexts/wishlist-context";
import { Cart, CartOverlay } from "@/components/ui/cart";
import ErrorBoundary from "./components/ErrorBoundary";
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
import Wishlist from "./pages/Wishlist";
// Import the new pages
import ConfirmEmail from "./pages/ConfirmEmail";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import LenisProvider from "./components/LenisProvider";
import AuthDebug from "./components/AuthDebug";

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <WishlistProvider>
            <CartProvider>
              <LenisProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                  <div className="min-h-screen bg-background">
                    <CartOverlay />
                    <Cart />
                    <AuthDebug />
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/our-story" element={<OurStory />} />
                      <Route path="/shop" element={<Shop />} />
                      <Route path="/signin" element={<SignIn />} />
                      <Route path="/signup" element={<SignUp />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/wishlist" element={<Wishlist />} />
                      <Route path="/collections" element={<Collections />} />
                      <Route path="/collections/:id" element={<CollectionDetail />} />
                      <Route path="/checkout" element={<Checkout />} />
                      {/* Add the new routes here */}
                      <Route path="/confirm-email" element={<ConfirmEmail />} />
                      <Route path="/forgot-password" element={<ForgotPassword />} />
                      <Route path="/reset-password" element={<ResetPassword />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </div>
                </BrowserRouter>
              </LenisProvider>
            </CartProvider>
          </WishlistProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;