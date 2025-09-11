import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface BookingWithFlight {
  id: number;
  user_id: string | null;
  seat_number: number;
  created_at: string | null;
  flight: {
    id: number;
    flight_number: string;
    origin: string;
    destination: string;
    departure_time: string;
    arrival_time: string;
    price: number | null;
  } | null;
}

export const useBookings = (userOnly = false) => {
  const [bookings, setBookings] = useState<BookingWithFlight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase
        .from('bookings')
        .select(`
          id,
          user_id,
          seat_number,
          created_at,
          flight:flights(
            id,
            flight_number,
            origin,
            destination,
            departure_time,
            arrival_time,
            price
          )
        `)
        .order('created_at', { ascending: false });

      // If userOnly is true, filter by current user
      if (userOnly) {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          query = query.eq('user_id', user.id);
        } else {
          setBookings([]);
          setLoading(false);
          return;
        }
      }

      const { data, error: fetchError } = await query;

      if (fetchError) {
        throw fetchError;
      }

      setBookings(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [userOnly]);

  return { bookings, loading, error, refetch: fetchBookings };
};