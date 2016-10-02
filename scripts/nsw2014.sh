node redistribution.js \
  --in1 /Users/david/Documents/Geodata/Federal/NSW_2008/final/NSW_ELB_region.shp \
  --in2 /Users/david/Documents/Geodata/Federal/NSW_2014/final/NSW_electoral_boundaries_25-02-2016.shp \
  --idField1 ELECT_DIV --nameField1 DIV_NUMBER \
  --idField2 E_div_number --nameField2 Elect_div \
  --pairs ../config/nsw2014-pairs.txt \
  --out /Users/david/Development/redistribution/app/data/nsw.json
