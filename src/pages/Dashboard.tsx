
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase, Appointment } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Loader2, Calendar, Clock, Phone, Mail, FileText } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { toast } from 'sonner';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchAppointments = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('appointments')
          .select('*')
          .eq('user_id', user.id)
          .order('appointment_date', { ascending: false });

        if (error) throw error;
        setAppointments(data || []);
      } catch (error: any) {
        toast.error('Error loading appointments: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();

    // Subscribe to changes
    const appointmentsSubscription = supabase
      .channel('appointments-channel')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'appointments', filter: `user_id=eq.${user.id}` },
        (payload) => {
          fetchAppointments();
        }
      )
      .subscribe();

    return () => {
      appointmentsSubscription.unsubscribe();
    };
  }, [user, navigate]);

  const cancelAppointment = async (appointmentId: string) => {
    try {
      const { error } = await supabase
        .from('appointments')
        .update({ status: 'cancelled' })
        .eq('id', appointmentId);

      if (error) throw error;
      
      toast.success('Appointment cancelled successfully');
    } catch (error: any) {
      toast.error('Error cancelling appointment: ' + error.message);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-green-500">Confirmed</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500">Pending</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-500">Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8 bg-sage-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="glass-card p-8">
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-homeo-900 mb-6">
              My Appointments
            </h1>

            <Tabs defaultValue="all" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="past">Past</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="space-y-6">
                {renderAppointmentsTable(appointments, loading, cancelAppointment, getStatusBadge)}
              </TabsContent>
              
              <TabsContent value="upcoming" className="space-y-6">
                {renderAppointmentsTable(
                  appointments.filter(app => new Date(app.appointment_date) >= new Date() && app.status !== 'cancelled'),
                  loading,
                  cancelAppointment,
                  getStatusBadge
                )}
              </TabsContent>
              
              <TabsContent value="past" className="space-y-6">
                {renderAppointmentsTable(
                  appointments.filter(app => new Date(app.appointment_date) < new Date() || app.status === 'cancelled'),
                  loading,
                  cancelAppointment,
                  getStatusBadge
                )}
              </TabsContent>
            </Tabs>
            
            <div className="mt-8 flex justify-center">
              <Button 
                onClick={() => navigate('/')} 
                className="bg-homeo-600 hover:bg-homeo-700 text-white"
              >
                Book New Appointment
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const renderAppointmentsTable = (
  appointments: Appointment[],
  loading: boolean,
  cancelAppointment: (id: string) => Promise<void>,
  getStatusBadge: (status: string) => JSX.Element
) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-homeo-600" />
        <span className="ml-2 text-homeo-900">Loading appointments...</span>
      </div>
    );
  }

  if (appointments.length === 0) {
    return (
      <div className="text-center py-12 bg-white/80 rounded-lg">
        <p className="text-lg text-gray-600">No appointments found</p>
        <p className="text-sm text-gray-500 mt-1">Book an appointment to get started</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table className="border-collapse border border-gray-200 bg-white/80 rounded-lg">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[180px]">Date & Time</TableHead>
            <TableHead className="hidden md:table-cell">Symptoms</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appointments.map((appointment) => (
            <TableRow key={appointment.id}>
              <TableCell className="font-medium">
                <div className="flex flex-col">
                  <div className="flex items-center">
                    <Calendar className="mr-1 h-4 w-4 text-homeo-600" />
                    <span>{format(new Date(appointment.appointment_date), 'MMM dd, yyyy')}</span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <Clock className="mr-1 h-4 w-4" />
                    <span>{appointment.appointment_time}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <div className="truncate max-w-xs">
                  {appointment.symptoms.substring(0, 50)}
                  {appointment.symptoms.length > 50 ? '...' : ''}
                </div>
              </TableCell>
              <TableCell>{getStatusBadge(appointment.status)}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="h-8"
                      >
                        <FileText className="h-3.5 w-3.5 mr-1" />
                        Details
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-lg text-homeo-900">
                          Appointment Details
                        </AlertDialogTitle>
                        <AlertDialogDescription asChild>
                          <div className="space-y-4 mt-4">
                            <div className="grid grid-cols-[100px_1fr] gap-2">
                              <span className="font-medium text-gray-700">Date:</span>
                              <span>{format(new Date(appointment.appointment_date), 'MMMM dd, yyyy')}</span>
                            </div>
                            <div className="grid grid-cols-[100px_1fr] gap-2">
                              <span className="font-medium text-gray-700">Time:</span>
                              <span>{appointment.appointment_time}</span>
                            </div>
                            <div className="grid grid-cols-[100px_1fr] gap-2">
                              <span className="font-medium text-gray-700">Status:</span>
                              <span>{getStatusBadge(appointment.status)}</span>
                            </div>
                            <div className="grid grid-cols-[100px_1fr] gap-2">
                              <span className="font-medium text-gray-700">Symptoms:</span>
                              <div className="text-gray-700 whitespace-pre-line">
                                {appointment.symptoms}
                              </div>
                            </div>
                            {appointment.doctor_notes && (
                              <div className="grid grid-cols-[100px_1fr] gap-2">
                                <span className="font-medium text-gray-700">Doctor Notes:</span>
                                <div className="text-gray-700 whitespace-pre-line">
                                  {appointment.doctor_notes}
                                </div>
                              </div>
                            )}
                          </div>
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Close</AlertDialogCancel>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  
                  {appointment.status === 'pending' && new Date(appointment.appointment_date) > new Date() && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          className="h-8"
                        >
                          Cancel
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Cancel Appointment</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to cancel this appointment? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>No, keep it</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => cancelAppointment(appointment.id)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Yes, cancel it
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Dashboard;
