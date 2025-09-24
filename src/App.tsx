// src/App.tsx

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Providers
import { CartProvider } from "./contexts/cart-context";
import AuthProvider from "./contexts/auth-context";
import WishlistProvider from "./contexts/wishlist-context";
import LenisProvider from "./components/LenisProvider";

// Components & Layout
import ErrorBoundary from "./components/ErrorBoundary";
import MainLayout from "./components/MainLayout"; // Correctly imported

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Collections from "./pages/Collections";
import CollectionDetail from "./pages/CollectionDetail";
import OurStory from "./pages/OurStory";
import Shop from "./pages/Shop";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Wishlist from "./pages/Wishlist";
import ConfirmEmail from "./pages/ConfirmEmail";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import OrderConfirmation from "./pages/OrderConfirmation";
import CheckoutSimple from "./pages/CheckoutSimple";

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <WishlistProvider>
            <CartProvider>
              <LenisProvider>
                <BrowserRouter>
                  {/* Toasters are placed outside Routes so they are not affected by navigation */}
                  <Toaster />
                  <Sonner />
                  
                  <Routes>
                    {/* Wrap all pages that need the Header and Footer in the MainLayout Route */}
                    <Route element={<MainLayout />}>
                      <Route path="/" element={<Index />} />
                      <Route path="/our-story" element={<OurStory />} />
                      <Route path="/shop" element={<Shop />} />
                      <Route path="/signin" element={<SignIn />} />
                      <Route path="/signup" element={<SignUp />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/wishlist" element={<Wishlist />} />
                      <Route path="/collections" element={<Collections />} />
                      <Route path="/collections/:id" element={<CollectionDetail />} />
                      <Route path="/checkout" element={<CheckoutSimple />} />
                      <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
                      <Route path="/confirm-email" element={<ConfirmEmail />} />
                      <Route path="/forgot-password" element={<ForgotPassword />} />
                      <Route path="/reset-password" element={<ResetPassword />} />
                    </Route>

                    {/* This is the catch-all route for pages that don't exist */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
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