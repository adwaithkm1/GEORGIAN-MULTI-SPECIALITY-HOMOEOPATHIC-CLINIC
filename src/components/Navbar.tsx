
import React, { useState, useEffect } from 'react';
import { Menu, X, User, LogIn, LogOut } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out py-4 px-6 md:px-12",
        isScrolled ? "bg-white/80 backdrop-blur-lg shadow-subtle" : "bg-transparent"
      )}
    >
      <nav className="flex items-center justify-between max-w-7xl mx-auto">
        <Link to="/" className="text-2xl font-serif font-bold text-homeo-800 transition-all hover:text-homeo-9600">
          GEORGIAN <span className="text-sage-600">MULTI SPECIALITY HOMOEOPATHIC CLINIC</span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-homeo-800 hover:text-homeo-600 transition-all">Home</Link>
          <Link to="/services" className="text-homeo-800 hover:text-homeo-600 transition-all">Services</Link>
          <a href="/#doctor" className="text-homeo-800 hover:text-homeo-600 transition-all">Doctor</a>
          <a href="/#appointment" className="text-homeo-800 hover:text-homeo-600 transition-all">Book Appointment</a>
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2 bg-white/70 hover:bg-white">
                  <User size={16} />
                  <span>Account</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link to="/dashboard" className="cursor-pointer">My Appointments</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={() => signOut()}
                  className="text-red-600 cursor-pointer"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/login">
              
            </Link>
          )}
        </div>
        
        {/* Mobile Navigation Toggle */}
        <button 
          className="md:hidden text-homeo-800 hover:text-homeo-600 transition-all"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-md py-6 px-8 md:hidden animate-fade-in">
          <div className="flex flex-col space-y-4">
            <Link 
              to="/"
              className="text-homeo-800 hover:text-homeo-600 transition-all py-2 border-b border-gray-100"
            >
              Home
            </Link>
            <Link 
              to="/services"
              className="text-homeo-800 hover:text-homeo-600 transition-all py-2 border-b border-gray-100"
            >
              Services
            </Link>
            <a 
              href="/#doctor" 
              className="text-homeo-800 hover:text-homeo-600 transition-all py-2 border-b border-gray-100"
            >
              Doctor
            </a>
            <a 
              href="/#appointment" 
              className="text-homeo-800 hover:text-homeo-600 transition-all py-2 border-b border-gray-100"
            >
              Book Appointment
            </a>
            
            {user ? (
              <>
                <Link 
                  to="/dashboard"
                  className="text-homeo-800 hover:text-homeo-600 transition-all py-2 border-b border-gray-100"
                >
                  My Appointments
                </Link>
                <button
                  onClick={() => signOut()}
                  className="flex items-center text-red-600 hover:text-red-700 transition-all py-2"
                >
                  <LogOut size={18} className="mr-2" />
                  Sign out
                </button>
              </>
            ) : (
              <Link 
                
              >
                
                
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
