#!/bin/bash

IN_DIR="$HOME/Documents/Geodata"
OUT_DIR="$HOME/Development/redistribution/app/data"

rm -f $OUT_DIR/nsw.json

../node_modules/.bin/mapshaper \
  -i $IN_DIR/Federal/NSW_2008/final/NSW_ELB_region.shp $IN_DIR/Federal/NSW_2014/final/NSW_electoral_boundaries_25-02-2016.shp \
  combine-files -simplify 0.1
  -rename-layers old,new \
  -each '$.properties = { id: $.properties.DIV_NUMBER, name: $.properties.ELECT_DIV }' target=old \
  -each '$.properties = { id: $.properties.E_div_numb, name: $.properties.Elect_div }' target=new \
  -clip bbox=113,-44,154,-9 \
  -o format=topojson $OUT_DIR/nsw.json
