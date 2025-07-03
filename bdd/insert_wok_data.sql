
-- Vider les tables Wok pour éviter les doublons avant de les remplir à nouveau.
DELETE FROM wok_bases;
DELETE FROM wok_pulpes;
DELETE FROM wok_favoris;
DELETE FROM wok_sauces;
DELETE FROM wok_toppings;

-- Insertion des bases du Wok
INSERT INTO wok_bases (name, price)
VALUES
  ('Pâtes de riz', 6.90),
  ('Nouilles jaunes', 6.90),
  ('Udon', 6.90),
  ('Riz parfumé', 6.90);

-- Insertion des pulpes du Wok
INSERT INTO wok_pulpes (name, price)
VALUES
  ('Oignons', 0.40),
  ('Ail', 0.40),
  ('Gingembre', 0.40),
  ('Piment', 0.40);

-- Insertion des favoris du Wok
INSERT INTO wok_favoris (name, price)
VALUES
  ('Poulet', 2.00),
  ('Poulet crousti', 2.80),
  ('Bœuf', 2.50),
  ('Crevettes', 2.50),
  ('Calamar', 2.50),
  ('Tofu', 2.00),
  ('Pak choï', 1.40),
  ('Poivrons', 1.40),
  ('Oignons doux', 1.20),
  ('Citronnelle', 1.20),
  ('Brocolis', 1.40),
  ('Basilic thaï', 1.20),
  ('Mini maïs', 1.40),
  ('Ananas', 1.40),
  ('Champignon noir', 1.50),
  ('Champignon de Paris', 1.50),
  ('Shitaké', 1.50),
  ('Bambou', 1.40),
  ('Noix de cajou', 1.20);

-- Insertion des sauces du Wok
INSERT INTO wok_sauces (name)
VALUES
  ('Pad Thaï'),
  ('Pad See Ew'),
  ('Curry Rouge'),
  ('Curry Jaune'),
  ('Aigre-douce');

-- Insertion des toppings du Wok
INSERT INTO wok_toppings (name, price)
VALUES
  ('Coriandre fraîche', 0.60),
  ('Cacahuètes', 0.60),
  ('Oignons frits', 0.60),
  ('Crevettes séchées', 0.60),
  ('Ciboulette thaï', 0.60),
  ('Citron', 0.60),
  ('Graines de sesame', 0.60);
