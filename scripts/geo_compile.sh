#!/bin/bash

IN_DIR="$HOME/Documents/Geodata"
OUT_DIR="$HOME/Development/electoral/app/data"

function convert {

    in_file="$IN_DIR/$1"
    out_file="$OUT_DIR/$2"
    source_layer=$3
    name_field=$4
    id_field=$5

    rm -f $out_file
    ogr2ogr -f GeoJSON -sql "SELECT $name_field as name, $id_field as id FROM $source_layer" $out_file $in_file

}

convert Federal/NSW_2008/final/NSW_ELB_region.shp nsw-pre.json NSW_ELB_region ELECT_DIV DIV_NUMBER
convert Federal/NSW_2014/proposed/E_NSW_F_region.shp nsw-proposed.json E_NSW_F_region Elect_div E_div_numb
perl -pi -e 's#Eden-monaro#Eden-Monaro#g' $OUT_DIR/nsw-proposed.json

