-- Vider la table pour éviter les doublons avant de la remplir à nouveau.
-- C'est une commande plus standard que TRUNCATE et devrait éviter les problèmes de permissions.
DELETE FROM menu_items;

-- Insertion des entrées
INSERT INTO menu_items (name, description, price, category, image_url)
VALUES
  ('Nems Poulet x4', 'Délicieux nems croustillants au poulet, parfaits pour une entrée savoureuse.', 5.00, 'Entrées', 'assets/images/nems.jpg'),
  ('Nems Crevettes x4', 'Nems croustillants aux crevettes, une entrée légère et parfumée.', 5.50, 'Entrées', 'assets/images/nems.jpg'),
  ('Nems Légumes x4', 'Nems végétariens aux légumes frais, une option saine et gourmande.', 5.00, 'Entrées', 'assets/images/nems.jpg'),
  ('Crevettes Tempura x3', 'Crevettes enrobées d''une pâte légère et frites à la perfection.', 4.90, 'Entrées', 'assets/images/nems.jpg'),
  ('Beignet de crevette x3', 'Beignets de crevettes moelleux et savoureux.', 4.90, 'Entrées', 'assets/images/nems.jpg'),
  ('Brochettes poulet satay x2', 'Brochettes de poulet marinées à la sauce satay, grillées et parfumées.', 5.00, 'Entrées', 'assets/images/nems.jpg'),
  ('Brochettes poulet yakitori x2', 'Brochettes de poulet laquées à la sauce yakitori, tendres et sucrées-salées.', 4.50, 'Entrées', 'assets/images/nems.jpg'),
  ('Brochette bœuf fromage x2', 'Brochettes de bœuf et fromage, une combinaison originale et fondante.', 5.50, 'Entrées', 'assets/images/nems.jpg'),
  ('Pince de crabe x3', 'Délicieuses pinces de crabe, idéales pour les amateurs de fruits de mer.', 4.50, 'Entrées', 'assets/images/nems.jpg'),
  ('Rouleaux de printemps x2', 'Rouleaux frais et légers, garnis de légumes croquants et de vermicelles.', 5.00, 'Entrées', 'assets/images/nems.jpg'),
  ('Riz nature', 'Riz blanc parfumé, accompagnement idéal pour tous nos plats.', 4.00, 'Entrées', 'assets/images/nems.jpg');

-- Insertion des plats
INSERT INTO menu_items (name, description, price, category, image_url)
VALUES
  ('Pad Thaï - Poulet', 'Pâtes de riz, oignons, chou, carotte, œuf, soja, cacahuètes, citron, coriandre.', 12.50, 'Plats', 'assets/images/pad-thai.jpg'),
  ('Pad Thaï - Tofu', 'Pâtes de riz, oignons, chou, carotte, œuf, soja, cacahuètes, citron, coriandre.', 12.50, 'Plats', 'assets/images/pad-thai.jpg'),
  ('Pad Thaï - Poulet Crousti', 'Pâtes de riz, oignons, chou, carotte, œuf, soja, cacahuètes, citron, coriandre.', 13.50, 'Plats', 'assets/images/pad-thai.jpg'),
  ('Pad Thaï - Bœuf', 'Pâtes de riz, oignons, chou, carotte, œuf, soja, cacahuètes, citron, coriandre.', 13.50, 'Plats', 'assets/images/pad-thai.jpg'),
  ('Pad Thaï - Crevettes', 'Pâtes de riz, oignons, chou, carotte, œuf, soja, cacahuètes, citron, coriandre.', 13.50, 'Plats', 'assets/images/pad-thai.jpg'),
  ('Khao Pad - Poulet', 'Riz frit, oignons, chou, carotte, œuf, soja, cacahuètes, citron, coriandre.', 12.50, 'Plats', 'assets/images/pad-thai.jpg'),
  ('Khao Pad - Tofu', 'Riz frit, oignons, chou, carotte, œuf, soja, cacahuètes, citron, coriandre.', 12.50, 'Plats', 'assets/images/pad-thai.jpg'),
  ('Khao Pad - Poulet Crousti', 'Riz frit, oignons, chou, carotte, œuf, soja, cacahuètes, citron, coriandre.', 13.50, 'Plats', 'assets/images/pad-thai.jpg'),
  ('Khao Pad - Bœuf', 'Riz frit, oignons, chou, carotte, œuf, soja, cacahuètes, citron, coriandre.', 13.50, 'Plats', 'assets/images/pad-thai.jpg'),
  ('Khao Pad - Crevettes', 'Riz frit, oignons, chou, carotte, œuf, soja, cacahuètes, citron, coriandre.', 13.50, 'Plats', 'assets/images/pad-thai.jpg'),
  ('Bò Bún - Poulet', 'Vermicelle de riz, nems, salade, carotte, concombre, soja, menthe, coriandre, cacahuètes.', 12.50, 'Plats', 'assets/images/pad-thai.jpg'),
  ('Bò Bún - Bœuf', 'Vermicelle de riz, nems, salade, carotte, concombre, soja, menthe, coriandre, cacahuètes.', 13.50, 'Plats', 'assets/images/pad-thai.jpg'),
  ('Bò Bún - Crevettes', 'Vermicelle de riz, nems, salade, carotte, concombre, soja, menthe, coriandre, cacahuètes.', 13.50, 'Plats', 'assets/images/pad-thai.jpg'),
  ('Soupe Tom Yum', 'Soupe thaïlandaise épicée à base de galanga, citronnelle, lait de coco et crevettes.', 14.50, 'Plats', 'assets/images/pad-thai.jpg'),
  ('Poulet au curry', 'Poulet cuisiné avec des légumes et lait de coco. Accompagné de riz parfumé.', 14.50, 'Plats', 'assets/images/pad-thai.jpg');

-- Insertion des desserts
INSERT INTO menu_items (name, description, price, category, image_url)
VALUES
  ('Coupelle mangue', 'Délicieuse coupelle de mangue fraîche, un dessert exotique et rafraîchissant.', 5.00, 'Desserts', 'assets/images/nems.jpg'),
  ('Coupelle ananas', 'Coupelle d''ananas frais, sucré et juteux.', 5.00, 'Desserts', 'assets/images/nems.jpg'),
  ('Glace', 'Sélection de glaces artisanales pour une touche de douceur.', 4.90, 'Desserts', 'assets/images/nems.jpg'),
  ('Mochi glace x2', 'Deux mochis glacés, une spécialité japonaise douce et rafraîchissante.', 5.00, 'Desserts', 'assets/images/nems.jpg');

-- Insertion des boissons
INSERT INTO menu_items (name, description, price, category, image_url)
VALUES
  ('Soft', 'Boissons rafraîchissantes sans alcool.', 2.00, 'Boissons', 'assets/images/nems.jpg'),
  ('Maya', 'Boisson exotique à base de litchi et eau de coco.', 3.90, 'Boissons', 'assets/images/nems.jpg'),
  ('Citronnade', 'Citronnade maison, désaltérante et acidulée.', 2.00, 'Boissons', 'assets/images/nems.jpg'),
  ('Ginger beer', 'Boisson au gingembre, pétillante et légèrement épicée.', 3.00, 'Boissons', 'assets/images/nems.jpg'),
  ('Eau / eau gazeuse', 'Eau plate ou gazeuse, pour accompagner votre repas.', 2.00, 'Boissons', 'assets/images/nems.jpg'),
  ('Mogu Mogu', 'Boisson fruitée avec des morceaux de nata de coco.', 3.00, 'Boissons', 'assets/images/nems.jpg'),
  ('Bubble Tea', 'Thé aux perles de tapioca, disponible en plusieurs saveurs.', 6.00, 'Boissons', 'assets/images/nems.jpg');