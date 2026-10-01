-- 5. Tariffs (Seasonal pricing and declared tariffs for GST)
CREATE TABLE daily_tariffs (
  room_type_id text REFERENCES room_types(id) ON DELETE CASCADE,
  tariff_date date NOT NULL,
  declared_tariff_paise integer NOT NULL, -- Highest published rate for GST slab determination
  actual_price_paise integer NOT NULL,    -- Actual charged amount
  PRIMARY KEY (room_type_id, tariff_date)
);

-- RPC for atomic availability check and booking creation
CREATE OR REPLACE FUNCTION create_booking_request(
  p_room_type_slug text,
  p_check_in date,
  p_check_out date,
  p_guest_name text,
  p_guest_email text,
  p_guest_phone text,
  p_adults integer,
  p_children integer
) RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_room_type record;
  v_unit_id uuid;
  v_booking_id uuid;
  v_total_price integer := 0;
  v_total_tax integer := 0;
  v_total_cgst integer := 0;
  v_total_sgst integer := 0;
  v_current_date date := p_check_in;
  v_night_price integer;
  v_night_declared integer;
  v_slab numeric;
  v_night_tax integer;
BEGIN
  -- 1. Validate inputs
  IF p_check_in < current_date THEN
    RETURN json_build_object('success', false, 'error', 'Check-in cannot be in the past.');
  END IF;
  IF p_check_out <= p_check_in THEN
    RETURN json_build_object('success', false, 'error', 'Check-out must be after check-in.');
  END IF;

  -- 2. Get room type and capacity
  SELECT * INTO v_room_type FROM room_types WHERE id = p_room_type_slug;
  IF NOT FOUND THEN
    RETURN json_build_object('success', false, 'error', 'Invalid room type.');
  END IF;
  
  IF (p_adults + p_children) > (v_room_type.capacity_adults + v_room_type.capacity_children) THEN
    RETURN json_build_object('success', false, 'error', 'Guest count exceeds capacity.');
  END IF;

  -- 3. Calculate Pricing & Taxes per night
  WHILE v_current_date < p_check_out LOOP
    -- Attempt to get seasonal tariff, fallback to base price
    SELECT declared_tariff_paise, actual_price_paise INTO v_night_declared, v_night_price
    FROM daily_tariffs 
    WHERE room_type_id = p_room_type_slug AND tariff_date = v_current_date;

    IF NOT FOUND THEN
      v_night_declared := v_room_type.base_price_paise;
      v_night_price := v_room_type.base_price_paise;
    END IF;

    -- Determine GST slab based on declared tariff
    IF v_night_declared <= 100000 THEN
      v_slab := 0.0;
    ELSIF v_night_declared <= 750000 THEN
      v_slab := 0.05;
    ELSE
      v_slab := 0.18;
    END IF;

    -- Calculate tax on actual price
    v_night_tax := round(v_night_price * v_slab);
    v_total_price := v_total_price + v_night_price;
    v_total_tax := v_total_tax + v_night_tax;
    
    -- CGST and SGST are split evenly
    v_total_cgst := v_total_cgst + round(v_night_tax / 2.0);
    v_total_sgst := v_total_sgst + round(v_night_tax / 2.0);

    v_current_date := v_current_date + 1;
  END LOOP;

  -- 4. Find available unit
  SELECT id INTO v_unit_id
  FROM room_units u
  WHERE u.room_type_id = p_room_type_slug
  AND NOT EXISTS (
    SELECT 1 FROM bookings b
    WHERE b.unit_id = u.id
    AND b.status IN ('pending', 'confirmed')
    AND b.stay_period && daterange(p_check_in, p_check_out, '[)')
  )
  LIMIT 1;

  IF v_unit_id IS NULL THEN
    RETURN json_build_object(
      'success', false, 
      'error', 'No rooms available for the selected dates.',
      'code', 'UNAVAILABLE'
    );
  END IF;

  -- 5. Create booking atomically
  BEGIN
    INSERT INTO bookings (unit_id, guest_name, guest_email, guest_phone, stay_period, status)
    VALUES (
      v_unit_id, p_guest_name, p_guest_email, p_guest_phone, 
      daterange(p_check_in, p_check_out, '[)'), 'pending'
    ) RETURNING id INTO v_booking_id;
  EXCEPTION WHEN OTHERS THEN
    -- GiST exclusion constraint violation (double booking collision)
    IF SQLSTATE = '23P01' THEN
      RETURN json_build_object('success', false, 'error', 'Room just became unavailable. Please try again.', 'code', 'CONFLICT');
    END IF;
    RAISE;
  END;

  RETURN json_build_object(
    'success', true,
    'booking_id', v_booking_id,
    'breakdown', json_build_object(
      'base_total', v_total_price,
      'tax_total', v_total_tax,
      'cgst', v_total_cgst,
      'sgst', v_total_sgst,
      'grand_total', v_total_price + v_total_tax
    )
  );
END;
$$;

-- Grant execute to anon
GRANT EXECUTE ON FUNCTION create_booking_request TO anon;
