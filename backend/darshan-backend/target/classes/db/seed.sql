USE darshan_db;

INSERT IGNORE INTO categories(id, name, active) VALUES
  (1,'Beverages',true),
  (2,'South Indian',true),
  (3,'Snacks',true);

INSERT IGNORE INTO products(id, category_id, sku, name, description, price, image_emoji, active) VALUES
  (11,2,'SKU-DS-001','Masala Dosa','Crispy dosa with masala',80.00,'🥞',true),
  (12,1,'SKU-TE-001','Tea','Hot tea',15.00,'☕',true),
  (13,3,'SKU-SA-001','Samosa','Crispy samosa',20.00,'🥟',true);

INSERT IGNORE INTO inventory(product_id, quantity, low_stock_threshold, last_restocked_at) VALUES
  (11,50,10,NOW()),
  (12,30,10,NOW()),
  (13,40,10,NOW());

-- Passwords are bcrypt for 'admin123' and 'staff123' (you can change later)
INSERT IGNORE INTO users(id, username, password_hash, full_name, phone, role, active) VALUES
  (1,'admin','$2a$10$7tGqg0Vgr7JQwTQ0apg2uu4Sg7G0hSg7VY5s8mS8o5o4d7k2dQh9G','Admin','', 'ADMIN', true),
  (2,'staff','$2a$10$g7v0K3jZtZ0iVfG3H0qg4e8K2mQ5m8t5p3wG1m2p8rB3Jm0xB9k2S','Staff','', 'STAFF', true);
