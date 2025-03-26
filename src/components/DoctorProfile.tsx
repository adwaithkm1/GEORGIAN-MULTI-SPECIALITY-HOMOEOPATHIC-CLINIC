
import React from 'react';
import { Award, BookOpen, Heart, Shield } from 'lucide-react';

const DoctorProfile = () => {
  return (
    <section id="doctor" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-tr from-homeo-50/50 to-sage-50/30" />
        <div className="absolute top-1/3 -left-32 w-[300px] h-[300px] rounded-full bg-sage-100/60 blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] rounded-full bg-homeo-100/50 blur-3xl" />
      </div>
      
      <div className="container px-6 md:px-12">
        <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in-up">
          <div className="inline-block bg-homeo-100/80 text-homeo-800 text-sm font-medium px-4 py-1.5 rounded-full mb-4">
            Meet Our Specialist
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-homeo-900 mb-6">
            Expert Homeopathic Care from Dr. Georghese Paul Varghese
          </h2>
          <p className="text-lg text-gray-700">
            With over 10 years of experience in homeopathic medicine, Dr.  Georghese Paul Varghese combines traditional 
            wisdom with modern approaches to provide holistic healing solutions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Doctor Image */}
          <div className="lg:col-span-5 animate-fade-in-up">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-tr from-homeo-200 to-sage-200 rounded-3xl blur opacity-30"></div>
              <div className="glass-card overflow-hidden rounded-2xl aspect-[4/5] relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                <img
                  src="/1000023715.jpg"
                  alt="Dr. Georghese Paul Varghese"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
          
          {/* Doctor Info */}
          <div className="lg:col-span-7 space-y-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="glass-card p-7">
              <h3 className="text-xl font-medium text-homeo-900 mb-4">Professional Background</h3>
              <p className="text-gray-700 mb-5">
              Dr. Georghese Paul Varghese is a board-certified homeopathic physician who earned his BHMS (Bachelor of Homeopathic Medicine and Surgery) from Father Muller Homoeopathy Medical College, Mangalore, with advanced training in classical homeopathy.
              After completing his medical education, he established the Georgian Multi-Speciality Homoeopathy Clinic, dedicated to providing holistic and patient-centered care.
              </p>
              <p className="text-gray-700">
              Driven by a passion for addressing the root causes of health issues rather than merely suppressing symptoms, Dr. Varghese specializes in treating chronic conditions, hormonal imbalances, climatic diseases, and mental health concerns through the principles of homeopathy.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              <div className="glass-card p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-homeo-100 rounded-full p-2 text-homeo-700">
                    <BookOpen size={20} />
                  </div>
                  <h4 className="font-medium text-homeo-900">Education</h4>
                </div>
                <ul className="space-y-2 text-gray-700">
                  <li>• BHMS (Bachelor of Homeopathic Medicine and Surgery),FATHER MULLER HOMOEOPATHY MEDICAL COLLEGE MANGLORE </li>
                  <li>• Advanced in classical homeopathy treatment</li>
                </ul>
              </div>
              
              <div className="glass-card p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-homeo-100 rounded-full p-2 text-homeo-700">
                    <Award size={20} />
                  </div>
                  <h4 className="font-medium text-homeo-900">Certifications</h4>
                </div>
                <ul className="space-y-2 text-gray-700">
                  <li>• Board Certified Homeopathic Physician</li>
                  <li>• Certificate of Registration at The Travencore Cochin Council of Homoeopathic Medicine</li>
                  <li>• Provisional degree certificate at Rajiv  gandhi university of health science Karnataka</li>
                </ul>
              </div>
              
              <div className="glass-card p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-homeo-100 rounded-full p-2 text-homeo-700">
                    <Heart size={20} />
                  </div>
                  <h4 className="font-medium text-homeo-900">Specialties</h4>
                </div>
                <ul className="space-y-2 text-gray-700">
                  <li>• Infertility case</li>
                  <li>• Hormonnal imbalance</li>
                  <li>• Mental health diseases </li>
                  <li>• Pediatric diseases</li>
                  <li>• Palliative treatment</li>
                  <li>• Chronic disease management</li>
                  <li>• Life style disease</li>
                  <li>• Skin care</li>
                  <li>• Counseling for all age people (family counseling center)</li>
                </ul>
              </div>
              
              <div className="glass-card p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-homeo-100 rounded-full p-2 text-homeo-700">
                    <Shield size={20} />
                  </div>
                  <h4 className="font-medium text-homeo-900">Approach</h4>
                </div>
                <ul className="space-y-2 text-gray-700">
                  <li>• Individualized Treatment Plans</li>
                  <li>• A Complete Family Care Treatment</li>
                  <li>• Holistic Assessment & Care</li>
                  <li>• Treats the whole person, not just the symptoms</li>

                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoctorProfile;
