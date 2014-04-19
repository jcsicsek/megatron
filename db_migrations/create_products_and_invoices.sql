CREATE TABLE products
(
  id serial NOT NULL,
  name text,
  description text,
  sku text,
  price int,
  quantity int,
  created timestamp,
  modified timestamp,
  invoice_id int
);

CREATE TABLE invoices
(
  id serial NOT NULL,
  created timestamp,
  modified timestamp
);
