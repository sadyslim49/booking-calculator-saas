
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

const NotFoundPage = () => {
  return (
    <motion.div 
      className="flex flex-col items-center justify-center text-center min-h-[calc(100vh-200px)]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <AlertTriangle className="w-24 h-24 text-destructive mb-8 animate-pulse" />
      <h1 className="text-6xl font-extrabold text-primary mb-4">404</h1>
      <h2 className="text-3xl font-semibold text-foreground mb-6">Oops! Page Not Found.</h2>
      <p className="text-lg text-muted-foreground mb-8 max-w-md">
        The page you're looking for doesn't exist or has been moved. Let's get you back on track.
      </p>
      <Button size="lg" asChild className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-primary-foreground shadow-lg transform hover:scale-105 transition-transform duration-300">
        <Link to="/">Go to Homepage</Link>
      </Button>
      <div className="mt-12">
        <img  class="w-64 h-auto opacity-50" alt="A lost robot or a broken compass illustration" src="https://images.unsplash.com/photo-1697564265040-de0bad1fc3d1" />
      </div>
    </motion.div>
  );
};

export default NotFoundPage;
