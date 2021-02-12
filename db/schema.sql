DROP DATABASE IF EXISTS products CASCADE;

CREATE DATABASE products;

\c products;

CREATE ROLE student WITH SUPERUSER PASSWORD 'student';

-- ---
-- Table 'product'
--
-- ---

DROP TABLE IF EXISTS product CASCADE;

CREATE TABLE product (
  id          SERIAL UNIQUE,
  name        VARCHAR,
  brand       VARCHAR,
  item_num    INTEGER,
  avg_rating  INTEGER,
  num_ratings INTEGER,
  price       VARCHAR,
  PRIMARY KEY (id, item_num)
) PARTITION BY RANGE (id);

-- ---
-- product Partition Tables
--
-- ---
DROP TABLE IF EXISTS product_one_mil;
CREATE TABLE product_one_mil PARTITION OF product FOR VALUES FROM (1) TO (1000000);
DROP TABLE IF EXISTS product_two_mil;
CREATE TABLE product_two_mil PARTITION OF product FOR VALUES FROM (1000001) TO (2000000);
DROP TABLE IF EXISTS product_three_mil;
CREATE TABLE product_three_mil PARTITION OF product FOR VALUES FROM (2000001) TO (3000000);
DROP TABLE IF EXISTS product_four_mil;
CREATE TABLE product_four_mil PARTITION OF product FOR VALUES FROM (3000001) TO (4000000);
DROP TABLE IF EXISTS product_five_mil;
CREATE TABLE product_five_mil PARTITION OF product FOR VALUES FROM (4000001) TO (5000000);
DROP TABLE IF EXISTS product_six_mil;
CREATE TABLE product_six_mil PARTITION OF product FOR VALUES FROM (5000001) TO (6000000);
DROP TABLE IF EXISTS product_seven_mil;
CREATE TABLE product_seven_mil PARTITION OF product FOR VALUES FROM (6000001) TO (7000000);
DROP TABLE IF EXISTS product_eight_mil;
CREATE TABLE product_eight_mil PARTITION OF product FOR VALUES FROM (7000001) TO (8000000);
DROP TABLE IF EXISTS product_nine_mil;
CREATE TABLE product_nine_mil PARTITION OF product FOR VALUES FROM (8000001) TO (9000000);
DROP TABLE IF EXISTS product_ten_mil;
CREATE TABLE product_ten_mil PARTITION OF product FOR VALUES FROM (9000001) TO (10000000);
DROP TABLE IF EXISTS product_overflow;
CREATE TABLE product_overflow PARTITION OF product DEFAULT;


-- ---
-- Table 'photo'
--
-- ---

DROP TABLE IF EXISTS photo CASCADE;

CREATE TABLE photo (
  id SERIAL,
  prod_id INTEGER REFERENCES product (id),
  thumb VARCHAR,
  small VARCHAR,
  regular VARCHAR,
  raw VARCHAR,
  PRIMARY KEY (id, prod_id)
) PARTITION BY RANGE (prod_id);

-- ---
-- photo Partition Tables
--
-- ---

DROP TABLE IF EXISTS photo_one_mil;
CREATE TABLE photo_one_mil PARTITION OF photo FOR VALUES FROM (1) TO (1000000);
DROP TABLE IF EXISTS photo_two_mil;
CREATE TABLE photo_two_mil PARTITION OF photo FOR VALUES FROM (1000001) TO (2000000);
DROP TABLE IF EXISTS photo_three_mil;
CREATE TABLE photo_three_mil PARTITION OF photo FOR VALUES FROM (2000001) TO (3000000);
DROP TABLE IF EXISTS photo_four_mil;
CREATE TABLE photo_four_mil PARTITION OF photo FOR VALUES FROM (3000001) TO (4000000);
DROP TABLE IF EXISTS photo_five_mil;
CREATE TABLE photo_five_mil PARTITION OF photo FOR VALUES FROM (4000001) TO (5000000);
DROP TABLE IF EXISTS photo_six_mil;
CREATE TABLE photo_six_mil PARTITION OF photo FOR VALUES FROM (5000001) TO (6000000);
DROP TABLE IF EXISTS photo_seven_mil;
CREATE TABLE photo_seven_mil PARTITION OF photo FOR VALUES FROM (6000001) TO (7000000);
DROP TABLE IF EXISTS photo_eight_mil;
CREATE TABLE photo_eight_mil PARTITION OF photo FOR VALUES FROM (7000001) TO (8000000);
DROP TABLE IF EXISTS photo_nine_mil;
CREATE TABLE photo_nine_mil PARTITION OF photo FOR VALUES FROM (8000001) TO (9000000);
DROP TABLE IF EXISTS photo_ten_mil;
CREATE TABLE photo_ten_mil PARTITION OF photo FOR VALUES FROM (9000001) TO (10000000);
DROP TABLE IF EXISTS photo_overflow;
CREATE TABLE photo_overflow PARTITION OF photo DEFAULT;

-- ---
-- Table 'sizes'
--
-- ---

DROP TABLE IF EXISTS sizes CASCADE;

CREATE TABLE sizes (
  id SERIAL PRIMARY KEY,
  size INTEGER
);

-- ---
-- Table 'size_join_table'
--
-- ---

DROP TABLE IF EXISTS size_join_table CASCADE;

CREATE TABLE size_join_table (
  size_id INTEGER REFERENCES sizes(id),
  prod_id INTEGER REFERENCES product(id)
) PARTITION BY RANGE (prod_id);

-- ---
-- size_join Partition Tables
--
-- ---

DROP TABLE IF EXISTS size_join_one_mil;
CREATE TABLE size_join_one_mil PARTITION OF size_join_table FOR VALUES FROM (1) TO (1000000);
DROP TABLE IF EXISTS size_join_two_mil;
CREATE TABLE size_join_two_mil PARTITION OF size_join_table FOR VALUES FROM (1000001) TO (2000000);
DROP TABLE IF EXISTS size_join_three_mil;
CREATE TABLE size_join_three_mil PARTITION OF size_join_table FOR VALUES FROM (2000001) TO (3000000);
DROP TABLE IF EXISTS size_join_four_mil;
CREATE TABLE size_join_four_mil PARTITION OF size_join_table FOR VALUES FROM (3000001) TO (4000000);
DROP TABLE IF EXISTS size_join_five_mil;
CREATE TABLE size_join_five_mil PARTITION OF size_join_table FOR VALUES FROM (4000001) TO (5000000);
DROP TABLE IF EXISTS size_join_six_mil;
CREATE TABLE size_join_six_mil PARTITION OF size_join_table FOR VALUES FROM (5000001) TO (6000000);
DROP TABLE IF EXISTS size_join_seven_mil;
CREATE TABLE size_join_seven_mil PARTITION OF size_join_table FOR VALUES FROM (6000001) TO (7000000);
DROP TABLE IF EXISTS size_join_eight_mil;
CREATE TABLE size_join_eight_mil PARTITION OF size_join_table FOR VALUES FROM (7000001) TO (8000000);
DROP TABLE IF EXISTS size_join_nine_mil;
CREATE TABLE size_join_nine_mil PARTITION OF size_join_table FOR VALUES FROM (8000001) TO (9000000);
DROP TABLE IF EXISTS size_join_ten_mil;
CREATE TABLE size_join_ten_mil PARTITION OF size_join_table FOR VALUES FROM (9000001) TO (10000000);
DROP TABLE IF EXISTS size_join_overflow;
CREATE TABLE size_join_overflow PARTITION OF size_join_table DEFAULT;

-- ---
-- Table 'colors'
--
-- ---

DROP TABLE IF EXISTS colors CASCADE;

CREATE TABLE colors (
  id SERIAL PRIMARY KEY,
  color VARCHAR,
  price_diff INTEGER
);

-- ---
-- Table 'color_join_table'
--
-- ---

DROP TABLE IF EXISTS color_join_table CASCADE;

CREATE TABLE color_join_table (
  color_id INTEGER REFERENCES colors (id),
  prod_id INTEGER REFERENCES product (id)
) PARTITION BY RANGE (prod_id);

-- ---
-- color_join Partition Tables
--
-- ---

DROP TABLE IF EXISTS color_join_one_mil;
CREATE TABLE color_join_one_mil PARTITION OF color_join_table FOR VALUES FROM (1) TO (1000000);
DROP TABLE IF EXISTS color_join_two_mil;
CREATE TABLE color_join_two_mil PARTITION OF color_join_table FOR VALUES FROM (1000001) TO (2000000);
DROP TABLE IF EXISTS color_join_three_mil;
CREATE TABLE color_join_three_mil PARTITION OF color_join_table FOR VALUES FROM (2000001) TO (3000000);
DROP TABLE IF EXISTS color_join_four_mil;
CREATE TABLE color_join_four_mil PARTITION OF color_join_table FOR VALUES FROM (3000001) TO (4000000);
DROP TABLE IF EXISTS color_join_five_mil;
CREATE TABLE color_join_five_mil PARTITION OF color_join_table FOR VALUES FROM (4000001) TO (5000000);
DROP TABLE IF EXISTS color_join_six_mil;
CREATE TABLE color_join_six_mil PARTITION OF color_join_table FOR VALUES FROM (5000001) TO (6000000);
DROP TABLE IF EXISTS color_join_seven_mil;
CREATE TABLE color_join_seven_mil PARTITION OF color_join_table FOR VALUES FROM (6000001) TO (7000000);
DROP TABLE IF EXISTS color_join_eight_mil;
CREATE TABLE color_join_eight_mil PARTITION OF color_join_table FOR VALUES FROM (7000001) TO (8000000);
DROP TABLE IF EXISTS color_join_nine_mil;
CREATE TABLE color_join_nine_mil PARTITION OF color_join_table FOR VALUES FROM (8000001) TO (9000000);
DROP TABLE IF EXISTS color_join_ten_mil;
CREATE TABLE color_join_ten_mil PARTITION OF color_join_table FOR VALUES FROM (9000001) TO (10000000);
DROP TABLE IF EXISTS color_join_overflow;
CREATE TABLE color_join_overflow PARTITION OF color_join_table DEFAULT;