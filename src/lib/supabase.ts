
import { createClient } from '@supabase/supabase-js';

// Supabase credentials
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://bqlvlveuxiryarhhhowt.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJxbHZsdmV1eGlyeWFyaGhob3d0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI3MzAyMTUsImV4cCI6MjA1ODMwNjIxNX0.vGMMw8LUc6WUyahp5EVkWmp1xqc9B_fRMpNs198ltGM';

// Initialize the Supabase client with the provided credentials
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types based on our schema
export type UserProfile = {
  id: string;
  created_at: string;
  email: string;
  full_name: string;
  phone: string;
  avatar_url?: string;
};

export type Appointment = {
  id: string;
  created_at: string;
  user_id: string;
  patient_name: string;
  patient_email: string;
  patient_phone: string;
  appointment_date: string;
  appointment_time: string;
  symptoms: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  doctor_notes?: string;
};

export type AppointmentWithProfile = Appointment & {
  profiles: UserProfile;
};
