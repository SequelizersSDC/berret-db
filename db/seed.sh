#!/bin/bash

#Bash script for generating data and seeding the postgres DB, make sure it's installed and running

#location of script
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd)"

#DB INFO, Change as needed
DATABASE="products"
USER="badger"
SCHEMA="$DIR/schema.sql"

#seed csv files
PROD="$DIR/data/products.csv"
PHOTO="$DIR/data/photos.csv"
SIZE="$DIR/data/size.csv"
COLOR="$DIR/data/color.csv"
SIZEJ="$DIR/data/size_joins.csv"
COLORJ="$DIR/data/color_joins.csv"

#table names
PRODT='product(name, brand, item_num, avg_rating, num_ratings, price)'
PHOTOT='photo(prod_id, thumb, small, regular, "raw")'
SIZET='sizes(size)'
COLORT='colors(color, price_diff)'
SIZEJT='size_join_table(size_id, prod_id)'
COLORJT='color_join_table(color_id, prod_id)'

#lines input variable
LINES=${1:-1000000}

#create DB and Tables
psql postgres < $SCHEMA

#Data generator file
GEN="$DIR/gen_data.js"

#create seed csv files
node $GEN --lines=$LINES

#seed db with those files
psql -d $DATABASE -U $USER -c "\copy $PRODT FROM '$PROD' DELIMITER ',' CSV HEADER;"
psql -d $DATABASE -U $USER -c "\copy $PHOTOT FROM '$PHOTO' DELIMITER ',' CSV HEADER;"
psql -d $DATABASE -U $USER -c "\copy $SIZET FROM '$SIZE' DELIMITER ',' CSV HEADER;"
psql -d $DATABASE -U $USER -c "\copy $COLORT FROM '$COLOR' DELIMITER ',' CSV HEADER;"
psql -d $DATABASE -U $USER -c "\copy $SIZEJT FROM '$SIZEJ' DELIMITER ',' CSV HEADER;"
psql -d $DATABASE -U $USER -c "\copy $COLORJT FROM '$COLORJ' DELIMITER ',' CSV HEADER;"

#psql -d products -U badger -c "\copy product(name, item_num, avg_rating, num_reviews, price) FROM './data/products.csv' DELIMITER ',' CSV HEADER;"
#psql -d products -U badger -c "\copy photo(prod_id, thumb, small, regular, raw) FROM './data/photos.csv' DELIMITER ',' CSV HEADER;"
#psql -d products -U badger -c "\copy sizes(size) FROM './data/size.csv' DELIMITER ',' CSV HEADER;"
#psql -d products -U badger -c "\copy colors(color, price_diff) FROM './data/color.csv' DELIMITER ',' CSV HEADER;"
#psql -d products -U badger -c "\copy size_join_table(size_id, prod_id) FROM './data/size_joins.csv' DELIMITER ',' CSV HEADER;"
#psql -d products -U badger -c "\copy color_join_table(color_id, prod_id) FROM './data/color_joins.csv' DELIMITER ',' CSV HEADER;"