-- Create flights table
CREATE TABLE public.flights (
  id SERIAL PRIMARY KEY,
  flight_number TEXT NOT NULL,
  origin TEXT NOT NULL,
  destination TEXT NOT NULL,
  departure_time TIMESTAMP WITH TIME ZONE NOT NULL,
  arrival_time TIMESTAMP WITH TIME ZONE NOT NULL,
  price DECIMAL(10,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create bookings table
CREATE TABLE public.bookings (
  id SERIAL PRIMARY KEY,
  user_id UUID,
  flight_id INTEGER REFERENCES public.flights(id),
  seat_number INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on both tables
ALTER TABLE public.flights ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- RLS policies for flights (public read access)
CREATE POLICY "Anyone can view flights" ON public.flights
  FOR SELECT USING (true);

-- RLS policies for bookings (user-specific access)
CREATE POLICY "Users can view their own bookings" ON public.bookings
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own bookings" ON public.bookings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own bookings" ON public.bookings
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own bookings" ON public.bookings
  FOR DELETE USING (auth.uid() = user_id);

-- Insert sample flight data
INSERT INTO public.flights (flight_number, origin, destination, departure_time, arrival_time, price) VALUES
('SY101', 'New York (JFK)', 'Los Angeles (LAX)', '2024-01-15 08:00:00+00', '2024-01-15 11:30:00+00', 299.99),
('SY102', 'Los Angeles (LAX)', 'New York (JFK)', '2024-01-15 14:00:00+00', '2024-01-15 22:15:00+00', 319.99),
('SY201', 'Chicago (ORD)', 'Miami (MIA)', '2024-01-16 09:30:00+00', '2024-01-16 13:45:00+00', 199.99),
('SY202', 'Miami (MIA)', 'Chicago (ORD)', '2024-01-16 15:20:00+00', '2024-01-16 18:30:00+00', 189.99),
('SY301', 'Seattle (SEA)', 'Denver (DEN)', '2024-01-17 07:15:00+00', '2024-01-17 10:45:00+00', 159.99),
('SY302', 'Denver (DEN)', 'Seattle (SEA)', '2024-01-17 12:00:00+00', '2024-01-17 14:30:00+00', 169.99),
('SY401', 'Boston (BOS)', 'San Francisco (SFO)', '2024-01-18 06:45:00+00', '2024-01-18 10:15:00+00', 349.99),
('SY402', 'San Francisco (SFO)', 'Boston (BOS)', '2024-01-18 16:30:00+00', '2024-01-19 01:45:00+00', 359.99);