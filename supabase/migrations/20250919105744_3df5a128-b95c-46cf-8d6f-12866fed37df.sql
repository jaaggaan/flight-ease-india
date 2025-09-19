-- Enable RLS on flights table (if not already enabled)
ALTER TABLE public.flights ENABLE ROW LEVEL SECURITY;

-- Enable RLS on bookings table (if not already enabled)  
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Verify all tables have proper RLS policies
-- The flights table should allow public reading but only admin insertion
-- The bookings table should be user-specific