-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS btree_gist;
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- 1. Room Types & Units
CREATE TABLE room_types (
  id text PRIMARY KEY,
  name text NOT NULL,
  base_price_paise integer NOT NULL,
  capacity_adults integer NOT NULL,
  capacity_children integer NOT NULL
);

CREATE TABLE room_units (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  room_type_id text REFERENCES room_types(id) ON DELETE CASCADE,
  unit_identifier text NOT NULL
);

-- 2. Bookings
CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'cancelled', 'expired');

CREATE TABLE bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  unit_id uuid REFERENCES room_units(id) ON DELETE RESTRICT,
  guest_name text NOT NULL,
  guest_email text NOT NULL,
  guest_phone text NOT NULL,
  stay_period daterange NOT NULL, -- [check_in, check_out)
  status booking_status NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now(),
  
  -- Prevent double booking using GiST exclusion
  CONSTRAINT no_double_booking EXCLUDE USING gist (
    unit_id WITH =, 
    stay_period WITH &&
  ) WHERE (status IN ('pending', 'confirmed'))
);

-- 3. Contact Messages
CREATE TABLE contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  message text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- 4. Rate Limiting Counter
CREATE TABLE rate_limits (
  ip_address text PRIMARY KEY,
  request_count integer NOT NULL DEFAULT 1,
  last_request timestamptz NOT NULL DEFAULT now()
);

-- Reset rate limits daily (simplified for pg_cron)
SELECT cron.schedule('reset_rate_limits', '0 0 * * *', $$
  TRUNCATE TABLE rate_limits;
$$);

-- Expire pending bookings older than 15 minutes
SELECT cron.schedule('expire_pending_bookings', '* * * * *', $$
  UPDATE bookings SET status = 'expired' 
  WHERE status = 'pending' AND created_at < now() - interval '15 minutes';
$$);

-- RLS
ALTER TABLE room_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE room_units ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Anon can read room types
CREATE POLICY "Anon read room_types" ON room_types FOR SELECT USING (true);

-- No anon access to units, bookings, or messages (write only happens via security definer RPC functions)
