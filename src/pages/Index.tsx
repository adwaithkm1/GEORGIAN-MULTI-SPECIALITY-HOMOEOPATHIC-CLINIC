
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import DoctorProfile from '@/components/DoctorProfile';
import AppointmentForm from '@/components/AppointmentForm';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <DoctorProfile />
        <AppointmentForm />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
