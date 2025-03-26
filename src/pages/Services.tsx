import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const serviceCategories = [
  {
    id: 'chronic',
    name: 'Chronic Diseases',
    description: 'Long-term holistic treatment plans for chronic health conditions',
    services: [
      { id: 'arthritis', title: 'Arthritis Treatment', description: 'Natural remedies and homeopathic medicines to relieve joint pain and inflammation.', image: '/arthritis.jpg' },
      { id: 'diabetes', title: 'Diabetes Management', description: 'Complementary treatment to manage blood sugar levels and improve overall health.', image: '/diabetes.jpg' },
      { id: 'thyroid', title: 'Thyroid Disorders', description: 'Homeopathic approach to balance thyroid hormones and relieve symptoms.', image: '/thyroid.jpg' },
      { id: 'respiratory', title: 'Respiratory Conditions', description: 'Treatment for asthma, bronchitis, and other chronic respiratory issues.', image: '/respiratory.jpg' },
    ]
  },
  {
    id: 'acute',
    name: 'Acute Conditions',
    description: 'Quick relief for temporary conditions and illnesses',
    services: [
      { id: 'fever', title: 'Fever & Infections', description: 'Homeopathic remedies to reduce fever and boost immune response to infections.', image: '/fever.jpg' },
      { id: 'allergies', title: 'Seasonal Allergies', description: 'Relief from seasonal allergies and hay fever symptoms.', image: '/allergies.jpg' },
      { id: 'digestive', title: 'Digestive Issues', description: 'Treatment for acute digestive disorders, food poisoning, and stomach ailments.', image: '/digestive.jpg' },
      { id: 'skin', title: 'Skin Conditions', description: 'Remedies for acute skin problems like rashes, hives, and infections.', image: '/skin.jpg' },
    ]
  },
  {
    id: 'wellness',
    name: 'Wellness & Prevention',
    description: 'Proactive care for overall health improvement and disease prevention',
    services: [
      { id: 'immunity', title: 'Immunity Boost', description: 'Strengthen your immune system with targeted homeopathic remedies and lifestyle guidance.', image: '/immunity.jpg' },
      { id: 'stress', title: 'Stress Management', description: 'Homeopathic approach to reduce stress, anxiety, and improve mental wellbeing.', image: '/stress.jpg' },
      { id: 'detox', title: 'Homeopathic Detox', description: 'Gentle detoxification program to remove toxins and revitalize your body.', image: '/detox.jpg' },
      { id: 'hormonal', title: 'Hormonal Balance', description: 'Natural solutions for PMS, menopause, and other hormonal imbalances.', image: '/hormonal.jpg' },
    ]
  }
];

const Services = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="py-20 bg-gradient-to-b from-sage-50 to-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h1 className="text-4xl font-serif font-bold text-homeo-900 mb-4">Our Homeopathic Services</h1>
              <p className="text-lg text-gray-600">Discover our range of personalized homeopathic treatments designed to address the root cause of your health concerns and promote natural healing.</p>
            </div>
            
            <Tabs defaultValue="chronic" className="w-full">
              <TabsList className="flex justify-center mb-12 bg-transparent space-x-1">
                {serviceCategories.map(category => (
                  <TabsTrigger key={category.id} value={category.id} className="data-[state=active]:bg-homeo-600 data-[state=active]:text-white px-6 py-3">
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {serviceCategories.map(category => (
                <TabsContent key={category.id} value={category.id} className="mt-4 animate-fade-in-up">
                  <div className="text-center mb-10">
                    <h2 className="text-2xl font-serif font-semibold text-homeo-800 mb-2">{category.name}</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">{category.description}</p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
                    {category.services.map(service => (
                      <Card key={service.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-row items-center p-4">
                        <img src={service.image} alt={service.title} className="w-32 h-32 object-cover rounded-lg mr-4 transform hover:scale-105 transition-transform duration-300" />
                        <div className="flex-grow">
                          <CardHeader className="bg-homeo-50/50 pb-4">
                            <CardTitle className="text-xl text-homeo-800">{service.title}</CardTitle>
                          </CardHeader>
                          <CardContent className="pt-6">
                            <p className="text-gray-700 mb-6">{service.description}</p>
                            <Button onClick={() => navigate('/#appointment')} className="bg-homeo-600 hover:bg-homeo-700 text-white w-full">Book Appointment</Button>
                          </CardContent>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
