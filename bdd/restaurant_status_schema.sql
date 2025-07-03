-- Table for restaurant status
CREATE TABLE restaurant_status (
  id INT PRIMARY KEY DEFAULT 1,
  is_open BOOLEAN NOT NULL DEFAULT TRUE
);

-- Insert initial status (open by default)
INSERT INTO restaurant_status (id, is_open) VALUES (1, TRUE) ON CONFLICT (id) DO NOTHING;