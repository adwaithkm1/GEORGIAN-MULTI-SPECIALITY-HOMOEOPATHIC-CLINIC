import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, MapPin } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { formatDate, formatTime, generateGoogleMapsLink_vembily, generateGoogleMapsLink_velagu, generateGoogleMapsLink_peringala } from '@/utils/appointmentUtils';

const AppointmentForm = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [availableSlots, setAvailableSlots] = useState<Array<{
    time: string;
    isAvailable: boolean;
    location: string;
  }>>([]);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    timeSlot: '',
    symptoms: ''
  });

  // Generate time slots when date is selected
  useEffect(() => {
    if (selectedDate) {
      const today = new Date();
      const isToday = selectedDate.toDateString() === today.toDateString();
      
      const allSlots = [
        { time: '08:30', location: 'Vembily (Morning)' },
        { time: '08:45', location: 'Vembily (Morning)' },
        { time: '09:00', location: 'Vembily (Morning)' },
        { time: '09:15', location: 'Vembily (Morning)' },
        { time: '10:00', location: 'Velagu' },
        { time: '10:15', location: 'Velagu' },
        { time: '11:30', location: 'Velagu' },
        { time: '11:45', location: 'Velagu' },
        { time: '16:30', location: 'Peringala' },
        { time: '16:45', location: 'Peringala' },
        { time: '17:00', location: 'Peringala' },
        { time: '17:45', location: 'Peringala' },
        { time: '18:00', location: 'Peringala' },
        { time: '18:15', location: 'Peringala' },
        { time: '18:30', location: 'Peringala' },
        { time: '18:45', location: 'Peringala' },
        { time: '19:00', location: 'Peringala' },
        { time: '19:15', location: 'Vembily (Night)' },
        { time: '19:30', location: 'Vembily (Night)' },
        { time: '19:45', location: 'Vembily (Night)' },
        { time: '20:00', location: 'Vembily (Night)' },
        { time: '20:15', location: 'Vembily (Night)' },


      ];

      const processedSlots = allSlots.map(slot => {
        if (isToday) {
          const [hours, minutes] = slot.time.split(':').map(Number);
          const slotTime = new Date();
          slotTime.setHours(hours, minutes, 0, 0);
          return {
            ...slot,
            isAvailable: slotTime > today
          };
        }
        return { ...slot, isAvailable: true };
      });

      setAvailableSlots(processedSlots);
    } else {
      setAvailableSlots([]);
    }
  }, [selectedDate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTimeSlotSelect = (slot: string) => {
    setSelectedSlot(slot);
    setFormData(prev => ({ ...prev, timeSlot: slot }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construct the URL with form data
    const params = new URLSearchParams({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      date: formData.date,
      time: formData.timeSlot,
      symptoms: formData.symptoms
    });

    const url = `https://homeo-web-data-fetcher.onrender.com//receive-data?${params.toString()}`;
    
    // Open the URL in a new tab
    window.open(url, '_blank');
    
    // Reset form
    setFormData({
      name: '',
      phone: '',
      email: '',
      date: '',
      timeSlot: '',
      symptoms: ''
    });
    setSelectedDate(undefined);
    setSelectedSlot('');
  };
  const openGoogleMaps_vembily = () => {
    const mapsUrl = generateGoogleMapsLink_velagu();
    window.open(mapsUrl, '_blank');
  };

  const openGoogleMaps_peringala = () => {
    const mapsUrl = generateGoogleMapsLink_peringala();
    window.open(mapsUrl, '_blank');
  };
  const openGoogleMaps_velagu = () => {
    const mapsUrl = generateGoogleMapsLink_vembily();
    window.open(mapsUrl, '_blank');
  };

  return (
    <section id="appointment" className="py-20 md:py-32 relative bg-sage-50/50">
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-white/50 to-transparent" />
        <div className="absolute top-1/4 right-0 w-[300px] h-[300px] rounded-full bg-homeo-100/40 blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] rounded-full bg-sage-100/40 blur-3xl" />
      </div>
      
      <div className="container px-6 md:px-12">
        <div className="max-w-xl mx-auto text-center mb-16 animate-fade-in-up">
          <div className="inline-block bg-homeo-100/80 text-homeo-800 text-sm font-medium px-4 py-1.5 rounded-full mb-4">
            Schedule Your Visit
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-homeo-900 mb-6">
            Book an Appointment
          </h2>
          <p className="text-lg text-gray-700">
            Fill out the form below to schedule a consultation. Your appointment request 
            will be sent directly to our system for processing.
          </p>
          
          {/* Google Maps Button for Clinic Location */}
          <div className="mt-6">
            <Button
              type="button"
              onClick={openGoogleMaps_vembily}
              className="w-full py-6 bg-homeo-600 hover:bg-homeo-700 text-white font-medium text-lg rounded-lg transition-all duration-300 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <MapPin size={18} />
              View Clinic Location in Velagu
            </Button>
            <p className="text-sm text-gray-500 mt-2">
              Click to get directions to our clinic on Google Maps
            </p>
          </div>
          <div className="mt-6">
            <Button
              type="button"
              onClick={openGoogleMaps_peringala}
              className="w-full py-6 bg-homeo-600 hover:bg-homeo-700 text-white font-medium text-lg rounded-lg transition-all duration-300 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <MapPin size={18} />
              View Clinic Location in Peringala
            </Button>
            <p className="text-sm text-gray-500 mt-2">
              Click to get directions to our clinic on Google Maps
            </p>
          </div>
          <div className="pt-2">
            <Button
              type="button"
              onClick={openGoogleMaps_velagu}
              className="w-full py-6 bg-homeo-600 hover:bg-homeo-700 text-white font-medium text-lg rounded-lg transition-all duration-300 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <MapPin size={18} />
              View Clinic Location in Vembily
            </Button>
            <p className="text-sm text-gray-500 mt-2">
              Click to get directions to our clinic on Google Maps
            </p>
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="glass-card p-8 md:p-10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Field */}
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-homeo-900 font-medium">
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full py-3 px-4 rounded-lg border bg-white/70 focus:ring-2 focus:ring-homeo-500 focus:border-homeo-500 outline-none transition-all border-gray-200"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                
                {/* Phone Field */}
                <div className="space-y-2">
                  <label htmlFor="phone" className="block text-homeo-900 font-medium">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full py-3 px-4 rounded-lg border bg-white/70 focus:ring-2 focus:ring-homeo-500 focus:border-homeo-500 outline-none transition-all border-gray-200"
                    placeholder="+91 XXXXXXXXXX"
                    required
                  />
                </div>
                
                {/* Email Field */}
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-homeo-900 font-medium">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full py-3 px-4 rounded-lg border bg-white/70 focus:ring-2 focus:ring-homeo-500 focus:border-homeo-500 outline-none transition-all border-gray-200"
                    placeholder="Enter your email address"
                    required
                  />
                </div>
                
                {/* Date Picker */}
                <div className="space-y-2">
                  <label className="block text-homeo-900 font-medium">
                    Preferred Date
                  </label>
                  <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start border py-6 px-4 text-left font-normal bg-white/70 hover:bg-white transition-all border-gray-200"
                      >
                        <CalendarIcon className="mr-3 h-5 w-5 text-gray-400" />
                        {selectedDate ? formatDate(selectedDate.toISOString()) : "Select a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-white" align="start">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={(date) => {
                          setSelectedDate(date);
                          setIsCalendarOpen(false);
                          setFormData(prev => ({ ...prev, date: date.toISOString().split('T')[0] }));
                        }}
                        disabled={(date) => {
                          const today = new Date();
                          today.setHours(0, 0, 0, 0);
                          
                          return date < today || date.getDay() === 0;
                        }}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              
              {/* Time Slots */}
              <div className="space-y-3">
                <label className="block text-homeo-900 font-medium">
                  Available Time Slots
                </label>
                <p className="text-gray-600 font-semibold">Monday to Saturday</p>
                <p className="text-gray-600">Morning at Vembily: 8:30 AM - 9:30 AM (only for pre-booked)</p>
                <p className="text-gray-600">In Velagu: 10:00 AM - 12:30 PM</p>
                <p className="text-gray-600">In Peringala: 4:30 PM - 7:00 PM</p>
                <p className="text-gray-600">Night at Vembily: 7:15 PM - 8:15 PM (only for pre-booked)</p>
                
                {selectedDate ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {availableSlots.map((slot) => (
                      <button
                        key={slot.time}
                        type="button"
                        onClick={() => slot.isAvailable && handleTimeSlotSelect(slot.time)}
                        className={`p-3 rounded-lg text-center transition-all text-sm border ${
                          selectedSlot === slot.time 
                            ? 'bg-homeo-600 text-white border-homeo-700' 
                            : slot.isAvailable 
                              ? 'border-gray-200 hover:bg-homeo-50 cursor-pointer' 
                              : 'border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed'
                        }`}
                        disabled={!slot.isAvailable}
                      >
                        <div className="flex flex-col items-center">
                          <div className="flex items-center gap-1">
                            <Clock size={14} />
                            <span>{formatTime(slot.time)}</span>
                          </div>
                          <div className="text-xs mt-1">{slot.location}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 bg-gray-50/80 rounded-lg text-center text-gray-500">
                    Please select a date to view available time slots
                  </div>
                )}
              </div>
              
              {/* Symptoms */}
              <div className="space-y-2">
                <label htmlFor="symptoms" className="block text-homeo-900 font-medium">
                  Describe Your Symptoms
                </label>
                <textarea
                  id="symptoms"
                  name="symptoms"
                  value={formData.symptoms}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full py-3 px-4 rounded-lg border bg-white/70 focus:ring-2 focus:ring-homeo-500 focus:border-homeo-500 outline-none transition-all border-gray-200"
                  placeholder="Please describe your symptoms or concerns in detail..."
                ></textarea>
              </div>
              
              {/* Submit Button */}
              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={!selectedDate || !selectedSlot}
                  className="w-full py-6 bg-homeo-600 hover:bg-homeo-700 text-white font-medium text-lg rounded-lg transition-all duration-300 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit Appointment Request
                </Button>
                <p className="text-sm text-center text-gray-500 mt-3">
                  Your request will be processed and confirmed shortly.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppointmentForm;