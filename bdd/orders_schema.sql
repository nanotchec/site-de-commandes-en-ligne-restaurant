-- Table for orders
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_address TEXT NOT NULL,
  items JSONB NOT NULL, -- Store array of items as JSONB
  total NUMERIC NOT NULL,
  status TEXT NOT NULL DEFAULT 'submitted', -- e.g., 'submitted', 'accepted', 'refused', 'preparing', 'ready', 'delivered'
  delivery_slot TEXT, -- Optional delivery time slot
  refusal_reason TEXT -- Optional reason for refusal
);