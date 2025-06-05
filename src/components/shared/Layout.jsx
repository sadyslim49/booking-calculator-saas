
import React from 'react';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import { motion } from 'framer-motion';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-background to-muted/50">
      <Header />
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-grow container mx-auto px-4 py-8"
      >
        {children}
      </motion.main>
      <Footer />
    </div>
  );
};

export default Layout;
