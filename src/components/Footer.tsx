import React from 'react';
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="contact" className="bg-homeo-900 text-white">
      <div className="container px-6 md:px-12 py-14 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-20">
          {/* Practice Info */}
          <div className="space-y-6">
            <a href="#" className="inline-block text-2xl font-serif font-bold text-white">
              GEORGIAN <span className="text-sage-300">MULTI SPECIALITY HOMOEOPATHIC CLINIC</span>
            </a>
            <p className="text-homeo-100/80 max-w-md">
              We're dedicated to providing holistic healing through homeopathic treatments tailored to your unique needs.
              Our approach treats the whole person, not just the symptoms.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.facebook.com/people/Georgian-Multi-Speciality-Homoeopathy-Clinic/100064171418289/?mibextid=ZbWKwL" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-homeo-800 hover:bg-homeo-700 text-white p-2.5 rounded-full transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="https://x.com/GEORGIAN_HOMOEO" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-homeo-800 hover:bg-homeo-700 text-white p-2.5 rounded-full transition-all duration-300"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
              <a 
                href="https://www.instagram.com/georgianhomoeomedicalcenter" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-homeo-800 hover:bg-homeo-700 text-white p-2.5 rounded-full transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-xl font-medium">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#about" className="text-homeo-100/80 hover:text-white transition-all duration-200">About Us</a>
              </li>
              <li>
                <a href="#services" className="text-homeo-100/80 hover:text-white transition-all duration-200">Our Services</a>
              </li>
              <li>
                <a href="#doctor" className="text-homeo-100/80 hover:text-white transition-all duration-200">Meet the Doctor</a>
              </li>
              <li>
                <a href="#appointment" className="text-homeo-100/80 hover:text-white transition-all duration-200">Book Appointment</a>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-xl font-medium">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin size={20} className="text-homeo-400 flex-shrink-0 mt-1" />
                <span className="text-homeo-100/80">
                GEORGIAN MULTI SPECIALITY HOMOEOPATHIC CLINIC 294X+7VF,Peringala, jn
                Ernakulam City, Kerala 683565
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin size={20} className="text-homeo-400 flex-shrink-0 mt-1" />
                <span className="text-homeo-100/80">
                GEORGIAN MULTI SPECIALITY HOMOEOPATHIC CLINIC 2C38+RJ6, Pallikkara 
                Ernakulam City, Kerala 683562
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin size={20} className="text-homeo-400 flex-shrink-0 mt-1" />
                <span className="text-homeo-100/80">
                GEORGIAN MULTI SPECIALITY HOMOEOPATHIC CLINIC 3C3J+CJ4, Thaikkavu Rd,
                Ernakulam, Kerala 683562 
                
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <Phone size={20} className="text-homeo-400 flex-shrink-0 mt-1" />
                <span className="text-homeo-100/80">
                  +91 89070 56526
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <Mail size={20} className="text-homeo-400 flex-shrink-0 mt-1" />
                <span className="text-homeo-100/80">
                georgianhomoeomedicalcenter@gmail.com
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-homeo-800 mt-10 pt-8 text-center">
          <p className="text-homeo-200/70 text-sm">
            &copy; {new Date().getFullYear()} HomeopathyCare. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
