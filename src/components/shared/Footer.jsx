
import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-card/80 backdrop-blur-lg text-center py-6 border-t border-border/50"
    >
      <div className="container mx-auto px-4">
        <p className="text-sm text-muted-foreground">
          &copy; {currentYear} FormGenie. All rights reserved.
        </p>
        <p className="text-xs text-muted-foreground/70 mt-1">
          Crafted with <span role="img" aria-label="love">💜</span> by Hostinger Horizons
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;
