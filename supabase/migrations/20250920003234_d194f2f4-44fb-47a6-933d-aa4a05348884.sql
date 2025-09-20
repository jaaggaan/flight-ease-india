-- Add Indian flight routes to match common searches
INSERT INTO public.flights (flight_number, origin, destination, departure_time, arrival_time, price) VALUES
-- Mumbai to Kolkata routes
('6E 2143', 'Mumbai (BOM)', 'Kolkata (CCU)', '2025-09-24 08:00:00+00', '2025-09-24 10:15:00+00', 4500.00),
('AI 1623', 'Mumbai (BOM)', 'Kolkata (CCU)', '2025-09-24 14:30:00+00', '2025-09-24 16:45:00+00', 5200.00),
('SG 8143', 'Mumbai (BOM)', 'Kolkata (CCU)', '2025-09-24 19:15:00+00', '2025-09-24 21:30:00+00', 3800.00),

-- Kolkata to Mumbai routes  
('6E 2144', 'Kolkata (CCU)', 'Mumbai (BOM)', '2025-09-28 09:00:00+00', '2025-09-28 11:15:00+00', 4300.00),
('AI 1624', 'Kolkata (CCU)', 'Mumbai (BOM)', '2025-09-28 15:45:00+00', '2025-09-28 18:00:00+00', 5000.00),
('UK 2533', 'Kolkata (CCU)', 'Mumbai (BOM)', '2025-09-28 20:30:00+00', '2025-09-28 22:45:00+00', 4800.00),

-- Delhi to Mumbai routes
('6E 1001', 'Delhi (DEL)', 'Mumbai (BOM)', '2025-09-25 06:30:00+00', '2025-09-25 08:45:00+00', 4200.00),
('AI 1301', 'Delhi (DEL)', 'Mumbai (BOM)', '2025-09-25 12:00:00+00', '2025-09-25 14:15:00+00', 4800.00),
('SG 8001', 'Delhi (DEL)', 'Mumbai (BOM)', '2025-09-25 18:15:00+00', '2025-09-25 20:30:00+00', 3900.00),

-- Mumbai to Delhi routes
('6E 1002', 'Mumbai (BOM)', 'Delhi (DEL)', '2025-09-26 07:15:00+00', '2025-09-26 09:30:00+00', 4100.00),
('AI 1302', 'Mumbai (BOM)', 'Delhi (DEL)', '2025-09-26 13:30:00+00', '2025-09-26 15:45:00+00', 4700.00),
('UK 2001', 'Mumbai (BOM)', 'Delhi (DEL)', '2025-09-26 19:45:00+00', '2025-09-26 22:00:00+00', 5100.00);