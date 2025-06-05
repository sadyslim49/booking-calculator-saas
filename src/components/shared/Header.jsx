import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Calculator, LayoutDashboard, Home, Sparkles, LogIn, LogOut, UserCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Header = () => {
  const { user, signOut, loading } = useAuth();

  const getInitials = (email) => {
    if (!email) return 'U';
    const parts = email.split('@')[0].split(/[._-]/);
    return parts.map(part => part[0]).join('').toUpperCase().slice(0,2);
  };

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      className="bg-card/80 backdrop-blur-lg shadow-lg sticky top-0 z-50"
    >
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-primary hover:text-primary/80 transition-colors">
          <Sparkles className="h-8 w-8" />
          <span>FormGenie</span>
        </Link>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" asChild>
            <Link to="/"><Home className="mr-2 h-4 w-4" />Home</Link>
          </Button>
          {user && (
            <>
              <Button variant="ghost" asChild>
                <Link to="/build"><Calculator className="mr-2 h-4 w-4" />Build</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link to="/dashboard"><LayoutDashboard className="mr-2 h-4 w-4" />Dashboard</Link>
              </Button>
            </>
          )}

          {!loading && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-9 w-9">
                    {/* Placeholder for user avatar image if available */}
                    {/* <AvatarImage src={user.user_metadata?.avatar_url || ""} alt={user.email} /> */}
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {getInitials(user.email)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">My Account</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut} className="cursor-pointer text-red-600 hover:!text-red-600 focus:text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : !loading && !user ? (
            <Button variant="outline" asChild>
              <Link to="/auth"><LogIn className="mr-2 h-4 w-4" />Sign In</Link>
            </Button>
          ) : null}
        </div>
      </nav>
    </motion.header>
  );
};

export default Header;