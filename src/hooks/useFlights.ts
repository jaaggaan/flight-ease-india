import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Flight {
  id: number;
  flight_number: string;
  origin: string;
  destination: string;
  departure_time: string;
  arrival_time: string;
  price: number | null;
  created_at: string | null;
}

export const useFlights = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFlights = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('flights')
        .select('*')
        .order('departure_time', { ascending: true });

      if (fetchError) {
        throw fetchError;
      }

      setFlights(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch flights');
    } finally {
      setLoading(false);
    }
  };

  const searchFlights = async (origin?: string, destination?: string) => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase
        .from('flights')
        .select('*')
        .order('departure_time', { ascending: true });

      if (origin) {
        query = query.ilike('origin', `%${origin}%`);
      }
      
      if (destination) {
        query = query.ilike('destination', `%${destination}%`);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) {
        throw fetchError;
      }

      setFlights(data || []);
      return data || [];
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search flights');
      return [];
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlights();
  }, []);

  return { flights, loading, error, refetch: fetchFlights, searchFlights };
};