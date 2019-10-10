-- Drops the not_amazondb if it already exists --
DROP DATABASE IF EXISTS not_amazondb;

-- Created the DB "not_amazondb" (only works on local connections)
CREATE DATABASE not_amazondb;

-- Use the not_amazondb for all the rest of the script
USE not_amazondb;

-- Created the table "Products"
CREATE TABLE products (
  id int AUTO_INCREMENT NOT NULL,
  name varchar(30) NOT NULL,
  PRIMARY KEY(id)
);

-- Inserted a set of records into the table
INSERT INTO products (name, dept, cost)
VALUES ("Kitten mittens", "pet", 15 );

INSERT INTO products (name, dept, cost)
VALUES ("Kitty mug", "home", 10 );

INSERT INTO products (name, dept, cost)
VALUES ("Kitty pillow", "home", 10 );

INSERT INTO products (name, dept, cost)
VALUES ("Pusheen shirt", "clothing", 15 );

INSERT INTO products (name, dept, cost)
VALUES ("Hello kitty bow", "accessories", 5 );

INSERT INTO products (name, dept, cost)
VALUES ("Kitten food- 5 lb bag", "pet", 10 );

INSERT INTO products (name, dept, cost)
VALUES ("Hello Kitty steering wheel cover", "auto", 20 );