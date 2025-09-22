// src/components/MainLayout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Cart, CartOverlay } from '@/components/ui/cart';

const MainLayout = () => {
  return (
    <>
      <Header />
      <CartOverlay />
      <Cart />
      <main>
        <Outlet /> {/* This is where your page components will be rendered */}
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;