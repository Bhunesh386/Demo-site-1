INSERT INTO room_types (id, name, base_price_paise, capacity_adults, capacity_children) VALUES
('deluxe', 'Deluxe Room', 249900, 2, 1),
('super-deluxe', 'Super Deluxe Room', 349900, 2, 1),
('royal-suite', 'Ratnawali Royal Suite', 549900, 2, 1);

-- Insert 5 Deluxe units
INSERT INTO room_units (room_type_id, unit_identifier) VALUES
('deluxe', '101'), ('deluxe', '102'), ('deluxe', '103'), ('deluxe', '104'), ('deluxe', '105');

-- Insert 5 Super Deluxe units
INSERT INTO room_units (room_type_id, unit_identifier) VALUES
('super-deluxe', '201'), ('super-deluxe', '202'), ('super-deluxe', '203'), ('super-deluxe', '204'), ('super-deluxe', '205');

-- Insert 2 Royal Suite units
INSERT INTO room_units (room_type_id, unit_identifier) VALUES
('royal-suite', '301'), ('royal-suite', '302');
