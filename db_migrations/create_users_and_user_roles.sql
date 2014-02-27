CREATE TABLE users
(
  id serial NOT NULL,
  email text,
  password text,
  created timestamp,
  modified timestamp,
  last_login timestamp,
  active boolean
);

CREATE TABLE user_roles
(
  id serial NOT NULL,
  user_id int,
  role text,
  created timestamp,
  modified timestamp
);
