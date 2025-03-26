
import { supabase } from '@/lib/supabase';

export interface AppointmentSlot {
  id: string;
  time: string;
  date: string;
  isAvailable: boolean;
}

export interface AppointmentFormData {
  name: string;
  phone: string;
  email: string;
  date: string;
  timeSlot: string;
  symptoms: string;
}

// Generate time slots from 4:30 PM to 7:00 PM with 30-minute intervals
export const generateTimeSlots = async (date: string): Promise<AppointmentSlot[]> => {
  const slots: AppointmentSlot[] = [];
  const startHour = 16; // 4 PM
  const startMinute = 30; // 30 minutes
  const endHour = 19; // 7 PM
  
  try {
    // Get booked appointments from Supabase
    const { data: bookedAppointments, error } = await supabase
      .from('appointments')
      .select('appointment_time')
      .eq('appointment_date', date)
      .in('status', ['confirmed', 'pending']);
    
    if (error) {
      console.error('Error fetching booked appointments:', error);
      return [];
    }
    
    // Extract booked times
    const bookedTimes = (bookedAppointments || []).map(app => app.appointment_time);
    
    // Generate slots from 4:30 PM to 7:00 PM
    for (let hour = startHour; hour < endHour; hour++) {
      // For the first hour (4 PM), start from 30 minutes
      const minuteStart = hour === startHour ? startMinute : 0;
      
      for (let minute = minuteStart; minute < 60; minute += 30) {
        if (hour === endHour - 1 && minute >= 0) {
          // Stop at 7:00 PM (19:00)
          if (minute > 0) break;
        }
        
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        
        // Check if this slot is already booked
        const isBooked = bookedTimes.includes(timeString);
        
        slots.push({
          id: `${date}-${timeString}`,
          time: timeString,
          date,
          isAvailable: !isBooked
        });
      }
    }
    
    return slots;
  } catch (error) {
    console.error('Error generating time slots:', error);
    return [];
  }
};

// Format date for display
export const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  
  return new Date(dateString).toLocaleDateString('en-US', options);
};

// Format time for display (convert from 24h to 12h format)
export const formatTime = (time: string): string => {
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours, 10);
  const period = hour >= 12 ? 'PM' : 'AM';
  const formattedHour = hour % 12 || 12;
  
  return `${formattedHour}:${minutes} ${period}`;
};

// Save appointment to Supabase
export const saveAppointment = async (formData: AppointmentFormData, userId?: string): Promise<{ success: boolean; error?: string }> => {
  try {
    const { data, error } = await supabase
      .from('appointments')
      .insert([
        {
          user_id: userId || null,
          patient_name: formData.name,
          patient_email: formData.email,
          patient_phone: formData.phone,
          appointment_date: formData.date,
          appointment_time: formData.timeSlot,
          symptoms: formData.symptoms,
          status: 'pending'
        }
      ]);
      
    if (error) throw error;
    
    return { success: true };
  } catch (error: any) {
    console.error('Error saving appointment:', error);
    return { 
      success: false, 
      error: error.message || 'Failed to save appointment'
    };
  }
};

// Clinic location for Google Maps
export const clinicLocation_peringala = {
  latitude: 10.00569070248216, // Default Kerala coordinates (can be updated with actual clinic location)
  longitude: 76.3996586872802,
  name: "Dr. Georghese Paul Homeopathy Clinic"
};
export const clinicLocation_velagu = {
  latitude: 10.05349904031814, // Default Kerala coordinates (can be updated with actual clinic location)
  longitude: 76.43155830246037,
  name: "Dr. Georghese Paul Homeopathy Clinic"
};
export const clinicLocation_vembily = {
  latitude: 10.004602061740831, // Default Kerala coordinates (can be updated with actual clinic location)
  longitude: 76.41655163631482,
  name: "Dr. Georghese Paul Homeopathy Clinic"
};


// Generate Google Maps URL
export const generateGoogleMapsLink_peringala = (): string => {
  return `https://www.google.com/maps/dir/?api=1&destination=${clinicLocation_peringala.latitude},${clinicLocation_peringala.longitude}&destination_place_id=${encodeURIComponent(clinicLocation_peringala.name)}`;
};
export const generateGoogleMapsLink_velagu = (): string => {
  return `https://www.google.com/maps/dir/?api=1&destination=${clinicLocation_velagu.latitude},${clinicLocation_velagu.longitude}&destination_place_id=${encodeURIComponent(clinicLocation_velagu.name)}`;
};
export const generateGoogleMapsLink_vembily = (): string => {
  return `https://www.google.com/maps/dir/?api=1&destination=${clinicLocation_vembily.latitude},${clinicLocation_vembily.longitude}&destination_place_id=${encodeURIComponent(clinicLocation_vembily.name)}`;
};

// Prepare WhatsApp message with appointment details
export const generateWhatsAppMessage = (formData: AppointmentFormData): string => {
  const message = `
Hello Dr. Georghese Paul Varghese, I would like to book an appointment:
Name: ${formData.name}
Date: ${formatDate(formData.date)}
Time: ${formatTime(formData.timeSlot)}
Symptoms: ${formData.symptoms}

Please confirm this appointment. Thank you!
`;
  
  return encodeURIComponent(message.trim());
};

// Generate a WhatsApp link with appointment details
export const generateWhatsAppLink = (formData: AppointmentFormData): string => {
  const phoneNumber = "+91 89070 56526"; // Indian format for doctor's WhatsApp (+91 9946583184)
  const message = generateWhatsAppMessage(formData);
  
  return `https://wa.me/${phoneNumber}?text=${message}`;
};

// Validate form data
export const validateForm = (formData: AppointmentFormData): { isValid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};
  
  if (!formData.name.trim()) {
    errors.name = "Name is required";
  }
  
  if (!formData.phone.trim()) {
    errors.phone = "Phone number is required";
  } else if (!/^\+?\d{10,15}$/.test(formData.phone.replace(/[\s-]/g, ''))) {
    errors.phone = "Please enter a valid phone number";
  }
  
  if (!formData.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = "Please enter a valid email address";
  }
  
  if (!formData.date) {
    errors.date = "Please select a date";
  }
  
  if (!formData.timeSlot) {
    errors.timeSlot = "Please select a time slot";
  }
  
  if (!formData.symptoms.trim()) {
    errors.symptoms = "Please describe your symptoms";
  } else if (formData.symptoms.length < 10) {
    errors.symptoms = "Please provide more details about your symptoms";
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
