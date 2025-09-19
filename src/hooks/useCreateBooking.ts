import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface CreateBookingData {
  flight_id: number;
  passenger_details: Array<{
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
  }>;
  payment_id?: string;
}

export const useCreateBooking = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createBooking = async (bookingData: CreateBookingData) => {
    try {
      setLoading(true);
      setError(null);

      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User must be logged in to create booking');
      }

      // Generate random seat numbers for each passenger
      const bookings = bookingData.passenger_details.map((_, index) => ({
        user_id: user.id,
        flight_id: bookingData.flight_id,
        seat_number: Math.floor(Math.random() * 180) + 1, // Random seat 1-180
      }));

      const { data, error: insertError } = await supabase
        .from('bookings')
        .insert(bookings)
        .select();

      if (insertError) {
        throw insertError;
      }

      return {
        bookings: data,
        bookingId: 'SY' + Math.random().toString(36).substr(2, 8).toUpperCase()
      };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create booking';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { createBooking, loading, error };
};