import React from 'react';
import { ArrowRight, Clock, MapPin, Phone } from 'lucide-react';

const Hero = () => {
  return (
    <section className="min-h-screen relative flex flex-col justify-center pt-16 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[#ab8ded]" />
        <div className="absolute top-1/4 -right-64 w-[600px] h-[600px] rounded-full bg-[#ab8ded]/50 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full bg-[#ab8ded]/60 blur-3xl" />
      </div>
      
      <div className="container px-6 md:px-12 pt-12 pb-20 md:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          {/* Left column - Text content */}
          <div className="space-y-6 animate-fade-in-up">
            <div className="inline-block bg-homeo-100/80 text-homeo-800 text-sm font-medium px-4 py-1.5 rounded-full">
              Holistic Healing Through Homeopathy
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold leading-tight text-homeo-950">
              Natural Healing for a <span className="text-homeo-700">Better Life</span>
            </h1>
            <p className="text-lg text-gray-700 max-w-xl">
              Experience the gentle power of homeopathic treatments tailored to your unique 
              health needs. Our approach treats the whole person, not just the symptoms.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <a 
                href="#appointment" 
                className="inline-flex items-center bg-homeo-600 hover:bg-homeo-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-sm hover:shadow-md"
              >
                Book Appointment
                <ArrowRight size={18} className="ml-2" />
              </a>
              <a 
                href="services" 
                className="inline-flex items-center bg-white hover:bg-gray-50 text-homeo-800 border border-gray-200 px-6 py-3 rounded-lg font-medium transition-all duration-300"
              >
                Our Services
              </a>
              <a 
                href="ImageGallery" 
                className="inline-flex items-center bg-homeo-600 hover:bg-homeo-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-sm hover:shadow-md"
              >
              Sucessfull Cases
              </a>
              
            </div>
          </div>
          
          {/* Right column - Info cards */}
          <div className="space-y-5 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="glass-card p-6 space-y-6 w-full max-w-6xl">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 bg-homeo-100 rounded-lg p-3 text-homeo-700">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-homeo-900 mb-1">Clinic Location</h3>
                  <p className="text-gray-600">GEORGIAN MULTI SPECIALITY HOMOEOPATHIC CLINIC PERINGALA,294X+7VF, Peringala, jn, Kerala 683565</p>
                  <p className="text-gray-600">Ernakulam City, 683565</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 bg-homeo-100 rounded-lg p-3 text-homeo-700">
                  <Clock size={24} />
                </div>
                <div className="w-full text-left">
                  <h3 className="text-lg font-medium text-homeo-900 mb-1">Working Hours</h3>
                  <p className="text-gray-600 font-semibold">Monday to Saturday</p>
                  <p className="text-gray-600">Morning at Vembily: 8:30 AM - 9:30 AM (only for pre-booked)</p>
                  <p className="text-gray-600">In Velagu: 10:00 AM - 12:30 PM</p>
                  <p className="text-gray-600">In Peringala: 4:30 PM - 7:00 PM</p>
                  <p className="text-gray-600">Night at Vembily: 7:15 PM - 8:15 PM (only for pre-booked)</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 bg-homeo-100 rounded-lg p-3 text-homeo-700">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-homeo-900 mb-1">Contact Us</h3>
                  <p className="text-gray-600">Phone: +91 89070 56526</p>
                  <p className="text-gray-600">Email: georgianhomoeomedicalcenter@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;