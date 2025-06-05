
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, Edit3, BarChart3 } from 'lucide-react';

const FeatureCard = ({ icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="bg-card p-6 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center text-center glassmorphic"
  >
    <div className="p-4 bg-primary/10 rounded-full mb-4 text-primary">{icon}</div>
    <h3 className="text-xl font-semibold mb-2 text-foreground">{title}</h3>
    <p className="text-muted-foreground text-sm">{description}</p>
  </motion.div>
);

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, type: 'spring', stiffness: 100 }}
        className="mb-12"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            FormGenie
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Effortlessly create custom service booking calculators for your business. No code, all magic!
        </p>
        <div className="space-x-4">
          <Button size="lg" asChild className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-primary-foreground shadow-lg transform hover:scale-105 transition-transform duration-300">
            <Link to="/build">Create Your First Calculator</Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="shadow-lg transform hover:scale-105 transition-transform duration-300">
            <Link to="/dashboard">View Dashboard</Link>
          </Button>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
        <FeatureCard
          icon={<Edit3 size={32} />}
          title="Customizable Forms"
          description="Tailor every aspect of your booking form to fit your unique services and pricing."
          delay={0.2}
        />
        <FeatureCard
          icon={<Zap size={32} />}
          title="Instant Setup"
          description="Get your booking calculator live in minutes. No complex configurations needed."
          delay={0.4}
        />
        <FeatureCard
          icon={<BarChart3 size={32} />}
          title="Track Submissions"
          description="Easily manage and view all your customer bookings through a simple dashboard."
          delay={0.6}
        />
      </div>
      
      <motion.div 
        className="w-full max-w-4xl p-8 bg-card rounded-2xl shadow-2xl glassmorphic"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-primary">How It Works</h2>
        <ol className="space-y-6 text-left">
          <li className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-8 h-8 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center font-bold">1</div>
            <div>
              <h3 className="font-semibold text-lg text-foreground">Design Your Calculator</h3>
              <p className="text-muted-foreground">Use our intuitive builder to add fields like property type, square footage, service frequency, and custom add-ons.</p>
            </div>
          </li>
          <li className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-8 h-8 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center font-bold">2</div>
            <div>
              <h3 className="font-semibold text-lg text-foreground">Share Your Form</h3>
              <p className="text-muted-foreground">Embed the calculator on your website or share a direct link with your customers.</p>
            </div>
          </li>
          <li className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-8 h-8 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center font-bold">3</div>
            <div>
              <h3 className="font-semibold text-lg text-foreground">Receive Bookings</h3>
              <p className="text-muted-foreground">Customers fill out the form, get an instant estimate (optional), and submit their booking. You get notified!</p>
            </div>
          </li>
        </ol>
      </motion.div>

      <div className="mt-16">
        <img  class="rounded-lg shadow-xl w-full max-w-3xl" alt="Abstract representation of a dynamic form builder interface" src="https://images.unsplash.com/photo-1693045181224-9fc2f954f054" />
      </div>

    </div>
  );
};

export default HomePage;
