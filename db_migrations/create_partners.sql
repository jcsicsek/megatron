CREATE TABLE partners
(
  id serial NOT NULL,
  contact_name text,
  business_name text,
  phone text,
  subdomain text,
  logo_url text,
  created timestamp,
  modified timestamp,
  active boolean,
  user_id int
);
